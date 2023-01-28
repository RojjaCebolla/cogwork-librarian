import React, { useMemo, useState } from 'react'
import { CardView } from './cardView'
import { PAGE_SIZE } from './constants'
import { useLocalStorage } from '../../api/local/useLocalStorage'
import { EnrichedCard } from '../../api/queryRunnerCommon'
import { DataSource, ObjectValues, TaskStatus } from '../../types'
import { QueryReport } from '../../api/useReporter'
import { PageControl } from './pageControl'
import { useViewportListener } from '../../viewport'
import { ResizeHandle } from '../resizeHandle'
import { TopBar } from './topBar'
import { useDebugDetails } from './useDebugDetails'

interface BrowserViewProps {
  status: TaskStatus
  result: Array<EnrichedCard>
  report: QueryReport
  source: DataSource
  addCard: (name: string) => void
  addIgnoredId: (id: string) => void
  ignoredIds: string[]
}

const activeCollections = {
  search: 'search',
  ignore: 'ignore',
} as const
type ActiveCollection = ObjectValues<typeof activeCollections>

const MIN_WIDTH = 500
export const BrowserView = React.memo(
  ({
    addCard,
    addIgnoredId,
    ignoredIds,
    result,
    status,
    source,
    report,
  }: BrowserViewProps) => {
    const viewport = useViewportListener()
    const [width, setWidth] = useState<number>(viewport.width * 66)

    // TODO: Add collection switching
    const [activeCollection, setActiveCollection] =
      useState<ActiveCollection>('search')
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

    // TODO make configurable
    const [pageSize] = useLocalStorage('page-size', PAGE_SIZE)
    const [page, setPage] = useState(0)
    const lowerBound = page * pageSize + 1
    const upperBound = (page + 1) * pageSize

    const currentPage = useMemo(
      () => activeCards.slice(lowerBound - 1, upperBound),
      [activeCards, lowerBound, upperBound]
    )

    if (status == 'unstarted') {
      return null
    }

    return viewport.desktop ? (
      <div className='results' style={{ width }}>
        <ResizeHandle
          onChange={setWidth}
          min={MIN_WIDTH}
          max={viewport.width * 0.8}
          viewport={viewport}
        />
        <div className='column content'>
          <TopBar
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
            setPage={setPage}
            pageSize={pageSize}
          />

          {activeCards.length > 0 && (
            <div className='result-container'>
              {currentPage.map((card) => (
                <CardView
                  onAdd={() => addCard(card.data.name)}
                  onIgnore={() => addIgnoredId(card.data.oracle_id)}
                  key={card.data.id}
                  card={card}
                  revealDetails={revealDetails}
                  visibleDetails={visibleDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className='results'>
        <div className='column content'>
          <TopBar
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
            setPage={setPage}
            pageSize={pageSize}
          />

          {activeCards.length > 0 && (
            <>
              <div className='result-container'>
                {currentPage.map((card) => (
                  <CardView
                    onAdd={() => addCard(card.data.name)}
                    onIgnore={() => addIgnoredId(card.data.oracle_id)}
                    key={card.data.id}
                    card={card}
                    revealDetails={revealDetails}
                    visibleDetails={visibleDetails}
                  />
                ))}
              </div>

              <div className='bottom-page-control'>
                <PageControl
                  page={page}
                  setPage={setPage}
                  pageSize={pageSize}
                  upperBound={upperBound}
                  cardCount={activeCards.length}
                />
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
)
