import Dexie, { Table } from 'dexie'
import { BulkDataDefinition } from 'scryfall-sdk/out/api/BulkData'
import { NormedCard } from '../memory/types/normedCard'
import { CubeDefinition } from '../memory/types/cube'
export interface Collection {
  id: string
  name: string
  type: string
  blob: Blob
  lastUpdated: Date
}

export type Manifest = Omit<Collection, 'blob'>

export const toManifest = (
  bulkDataDefinition: BulkDataDefinition
): Manifest => ({
  ...bulkDataDefinition,
  name: bulkDataDefinition.uri,
  lastUpdated: new Date(bulkDataDefinition.updated_at),
})

export class TypedDexie extends Dexie {
  LAST_UPDATE = new Date('2023-06-24')

  collection!: Table<Collection>

  card!: Table<NormedCard>

  cube!: Table<CubeDefinition>

  constructor() {
    super('cogwork-librarian')

    this.version(1).stores({
      manifest: 'id, uri, type, updated_at',
      card: 'id, oracle_id, cmc, color_identity, colors, name, oracle_text, power, toughness',
    })

    this.version(2).stores({
      collection: 'id, name, last_updated',
      card: null,
      manifest: null,
    })

    this.version(3).stores({
      collection: 'id, name, last_updated',
      card: 'oracle_id, name',
    })

    this.version(4).stores({
      collection: 'id, name, last_updated',
      card: 'oracle_id, name',
      cube: 'key',
    }).upgrade (trans => {
      return trans.table("card").toCollection().modify (card => {
        if (card.cube_ids === undefined) {
          card.cube_ids = new Set()
        }
      })
    })

    this.version(5).stores({
      collection: 'id, name, last_updated',
      card: 'oracle_id, name',
      cube: 'key',
    }).upgrade (trans => {
      return trans.table("card").toCollection().modify (card => {
        if (card.cube_ids === undefined) {
          card.cube_ids = {}
        } else if (card.cube_ids instanceof Set) {
          const cube_ids = {}
          for (const id of Array.from(card.cube_ids)) {
            cube_ids[id as string] = true
          }
        }
      })
    })
  }

  addCube = async (cube: CubeDefinition) => {
    const existingCube: CubeDefinition = await this.cube.get(cube.key) ?? { key: cube.key, oracle_ids: [] }
    const cardSet = new Set(cube.oracle_ids)
    const toRemove = existingCube.oracle_ids.filter(it => !cardSet.has(it))
    await this.transaction("rw", this.cube, this.card, async () => {
      await this.cube.put(cube)
      await this.card.where("oracle_id").anyOf(cube.oracle_ids)
        .modify(it => {
          if (it.cube_ids === undefined) {
            it.cube_ids = {}
          }
          it.cube_ids[cube.key] = true
        })
      if (toRemove.length > 0) {
        await this.card.where("oracle_id").anyOf(toRemove)
          .modify(it => delete it.cube_ids[cube.key])
      }
    })
  }


}
export const cogDB = new TypedDexie()
