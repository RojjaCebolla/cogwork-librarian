import { QueryForm } from './queryForm/queryForm'
import { BrowserView } from './cardBrowser/browserView'
import React, { useContext } from 'react'
import { ProjectContext } from '../api/useProject'
import { weightAlgorithms } from '../api/queryRunnerCommon'
import { useQueryForm } from './queryForm/useQueryForm'
import { INTRO_EXAMPLE } from './docs/introExample'
import { FlagContext } from '../flags'
import { useLocalStorage } from '../api/local/useLocalStorage'
import { DataSource } from '../types'
import { useMemoryQueryRunner } from '../api/local/useQueryRunner'
import { useScryfallQueryRunner } from '../api/scryfall/useQueryRunner'
import { CogDBContext } from '../api/local/useCogDB'
import { SavedCards } from './savedCards'
import { Masthead } from './component/masthead'
import { Footer } from './footer'
import { parseQuerySet } from '../api/scryfallExtendedParser'

export const SearchView = () => {
  const { uniformMode } = useContext(FlagContext).flags
  const cogDB = useContext(CogDBContext)

  const { addIgnoredId, addCard, savedCards, ignoredIds, setSavedCards } = useContext(ProjectContext)
  const { queries, setQueries, options, setOptions } = useQueryForm({
    example: () => ({ queries: INTRO_EXAMPLE }),
  })
  const [source, setSource] = useLocalStorage<DataSource>('source', 'scryfall')
  const queryRunner = {
    local: useMemoryQueryRunner({
      getWeight: uniformMode ? weightAlgorithms.uniform : weightAlgorithms.zipf,
      corpus: cogDB.memory,
    }),
    scryfall: useScryfallQueryRunner({
      getWeight: uniformMode ? weightAlgorithms.uniform : weightAlgorithms.zipf,
    }),
  }[source]

  const [showSavedCards, setShowSavedCards] = useLocalStorage<boolean>("showSavedCards", true)

  const execute = (baseIndex: number) => {
    console.debug(`submitting query at line ${baseIndex}`)
    if (baseIndex < 0 || baseIndex >= queries.length) {
      console.error("baseIndex is out of bounds")
      return
    }

    parseQuerySet(queries, baseIndex)
      .map(({ queries, getWeight, injectPrefix }) => {
        queryRunner.run(queries, options, injectPrefix, getWeight)
          .catch(error => {
            console.error(error)
          })
      })
      .mapErr(console.error)
  }

  return<div className='search-view-root'>
    <div className='query-panel'>
      <div className='row'>
        <Masthead />
        <div className='saved-cards-toggle'>
          <button onClick={() => setShowSavedCards(prev => !prev)}>
            {showSavedCards ? "hide": "show"} saved cards
          </button>
        </div>
      </div>
      <QueryForm
        status={queryRunner.status}
        execute={execute}
        queries={queries}
        setQueries={setQueries}
        options={options}
        setOptions={setOptions}
        source={source}
        setSource={setSource}
      />
      <BrowserView
        report={queryRunner.report}
        result={queryRunner.result}
        status={queryRunner.status}
        errors={queryRunner.errors}
        addCard={addCard}
        addIgnoredId={addIgnoredId}
        ignoredIds={ignoredIds}
        source={source}
      />
      <Footer />
    </div>

    {<div className={`saved-cards-floater ${showSavedCards ? "show" : "hide"}`}>
      {showSavedCards && <SavedCards savedCards={savedCards} setSavedCards={setSavedCards} />}
    </div>}
  </div>;
}