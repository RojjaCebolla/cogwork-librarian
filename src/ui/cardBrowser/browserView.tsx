import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CardImageView } from './cardViews/cardImageView'
import { PAGE_SIZE } from './constants'
import { useLocalStorage } from '../../api/local/useLocalStorage'
import { EnrichedCard } from '../../api/queryRunnerCommon'
import { DataSource, TaskStatus } from '../../types'
import { QueryReport } from '../../api/useReporter'
import { PageControl } from './pageControl'
import { useViewportListener } from '../../viewport'
import { TopBar } from './topBar'
import { ActiveCollection, DisplayType } from './types'
import { useDebugDetails } from './useDebugDetails'
import { CogError } from '../../error'
import { useHighlightPrism } from '../../api/local/syntaxHighlighting'
import { CardJsonView } from './cardViews/cardJsonView'
import { CardListView } from './cardViews/cardListView'
import { AdminPanel } from '../adminPanel'
import { CoglibIcon } from '../component/coglibIcon'
import { FlagContext } from '../../flags'

interface BrowserViewProps {
  status: TaskStatus
  result: Array<EnrichedCard>
  report: QueryReport
  source: DataSource
  addCard: (name: string) => void
  addIgnoredId: (id: string) => void
  ignoredIds: string[]
  errors: CogError[]
  lockCoglib: boolean
  openCoglib: () => void
}

export const BrowserView = React.memo(
  ({
    addCard,
    addIgnoredId,
    ignoredIds,
    result,
    status,
    source,
    report,
    errors,
    openCoglib,
    lockCoglib,
  }: BrowserViewProps) => {
    const { adminMode } = useContext(FlagContext).flags
    const viewport = useViewportListener()
    const [activeCollection, setActiveCollection] = useState<ActiveCollection>('search')
    const [displayType, setDisplayType] = useLocalStorage<DisplayType>('display-type', 'cards')
    const topOfResults = useRef<HTMLDivElement>()

    const cards: Record<ActiveCollection, EnrichedCard[]> = useMemo(() => {
      const ignoredIdSet = new Set(ignoredIds)
      return {
        search: result.filter((it) => !ignoredIdSet.has(it.data.oracle_id)),
        ignore: result.filter((it) => ignoredIdSet.has(it.data.oracle_id)),
      }
    }, [result, ignoredIds])
    const activeCards = useMemo(
      () => cards[activeCollection],
      [activeCollection, cards]
    )

    const {
      visibleDetails,
      setVisibleDetails,
      revealDetails,
      setRevealDetails,
    } = useDebugDetails()

    const [pageSize] = useLocalStorage('page-size', PAGE_SIZE)
    const [page, setPage] = useState(0)
    const onPageChange = (n: number) => {
      setPage(n)
      setTimeout(() => {
        // this doesn't quite work for mobile. idk why
        topOfResults.current?.scrollTo(0,0)
      }, 100)
    }
    const lowerBound = page * pageSize + 1
    const upperBound = (page + 1) * pageSize
    useEffect(() => {
      onPageChange(0)
    }, [result])
    const currentPage = useMemo(
      () => activeCards.slice(lowerBound - 1, upperBound),
      [activeCards, lowerBound, upperBound]
    )
    const showCards = activeCards.length > 0 && status !== 'error'

    useHighlightPrism([result, revealDetails, visibleDetails])

    if (status === 'unstarted') {
      return <div className='void'>
        {viewport.desktop && adminMode && <AdminPanel><CoglibIcon isActive={adminMode} size='3em' /></AdminPanel>}
        {viewport.desktop && !adminMode && <CoglibIcon size='3em' />}
      </div>
    }

    return <div className='results'>
        <div className='column content'>
          <TopBar
            errors={errors}
            source={source}
            status={status}
            report={report}
            activeCount={activeCards.length}
            searchCount={cards.search.length}
            ignoreCount={cards.ignore.length}
            visibleDetails={visibleDetails}
            setVisibleDetails={setVisibleDetails}
            revealDetails={revealDetails}
            setRevealDetails={setRevealDetails}
            lowerBound={lowerBound}
            upperBound={upperBound}
            page={page}
            setPage={onPageChange}
            pageSize={pageSize}
            displayType={displayType}
            setDisplayType={setDisplayType}
            activeCollection={activeCollection}
            setActiveCollection={setActiveCollection}
            openCoglib={openCoglib}
          />

          {showCards && <>
            <div ref={topOfResults} className='result-container'>
              {displayType === 'cards' && <>
                {lockCoglib && viewport.desktop && <>
                  <div className="card-view"/>
                  <div className="card-view"/>
                </>}
                {currentPage.map((card) => (
                  <CardImageView
                    onAdd={() => addCard(card.data.name)}
                    onIgnore={() => addIgnoredId(card.data.oracle_id)}
                    key={card.data.id}
                    card={card}
                    revealDetails={revealDetails}
                    visibleDetails={visibleDetails}
                  />
                ))}
              </>}
              {displayType === 'json' && <CardJsonView result={currentPage} />}
              {displayType === 'list' && <CardListView result={currentPage} />}
            </div>
            {viewport.mobile && <div className='bottom-page-control'>
              <PageControl
                page={page}
                setPage={onPageChange}
                pageSize={pageSize}
                upperBound={upperBound}
                cardCount={activeCards.length}
              />
            </div>}
          </>}
        </div>
      </div>
  }
)
