import React, { useContext } from 'react'
import { TextEditor } from '../component/editor/textEditor'
import { DataSource, Setter, TaskStatus } from '../../types'
import { ScryfallIcon } from '../component/scryfallIcon'
import { CoglibIcon } from '../component/coglibIcon'
import { InfoModal } from '../component/infoModal'
import { DatabaseSettings } from './databaseSettings'
import { CogDBContext } from '../../api/local/useCogDB'
import { DBStatusLoader } from '../component/dbStatusLoader'

const description: Record<DataSource, String> = {
  scryfall:
    'fetches from scryfall using its API. Supports full scryfall syntax, but larger query sets will take longer to process.',
  local:
    'processes queries against a local database of oracle cards. syntax support is incomplete, but it runs an order of magnitude faster than communicating with scryfall',
}

export interface QueryFormProps {
  status: TaskStatus
  execute: (startIndex: number) => void
  queries: string[]
  setQueries: Setter<string[]>
  source: DataSource
  setSource: Setter<DataSource>
}

export const QueryForm = ({
  status,
  execute,
  queries,
  setQueries,
  source,
  setSource,
}: QueryFormProps) => {
  const { memStatus } = useContext(CogDBContext)
  // something about prism overrides the state update for this css class

  const canRunQuery = source === 'scryfall' || memStatus === 'success'
  const canSubmit = canRunQuery && status !== 'loading'
  const iconSize = 30
  return (
    <div className='query-form'>
      <div className={source}>
        <TextEditor
          queries={queries}
          setQueries={setQueries}
          onSubmit={execute}
          canSubmit={canSubmit}
          language='scryfall-extended-multi'
        />
      </div>

      <div className='row center execute-controls'>
        <label><strong>data source:</strong></label>
        <div className={`source-option row center ${source === 'scryfall' ? 'selected' : ''}`}>
          <div className='radio-button-holder'>
            <ScryfallIcon
              isActive={source === 'scryfall'}
              size={iconSize}
            />
            <input
              id={`source-scryfall`}
              type='radio'
              value='scryfall'
              checked={source === 'scryfall'}
              onChange={() => setSource('scryfall')}
            />
          </div>
          <label htmlFor={`source-scryfall`}>scryfall</label>
          <InfoModal title={<h2 className='row center'>
            <ScryfallIcon size={iconSize} />
            <span>data source: scryfall</span>
          </h2>} info={description['scryfall']} />
        </div>
        <div className={`source-option row center ${source === 'local' ? 'selected' : ''}`}>
            <div className='radio-button-holder'>
              <CoglibIcon
                size={iconSize}
                isActive={source === 'local'}
              />
              <input
                id={`source-local`}
                type='radio'
                value='local'
                checked={source === 'local'}
                onChange={() => setSource('local')}
              />
            </div>
            <label htmlFor={`source-local`}>local</label>
            {<DatabaseSettings />}
            <InfoModal
              title={<h2 className='row center'>
                <CoglibIcon size={iconSize} />
                <span>data source: local</span>
              </h2>}
              info={description['local']}
            />
          </div>

        <DBStatusLoader />
      </div>
    </div>
  )
}
