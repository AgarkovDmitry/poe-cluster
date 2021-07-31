import { computedClusterBases, computedNotables } from './data'
import { Notable } from './interfaces'

export const getClusterBasesByType = (type: string) =>
  computedClusterBases.filter((base) => base.master_base === type)

export const getNotablesByFilter = (filter: string) => (notables: Notable[]) =>
  notables.filter((notable) => {
    const parsedFilter = filter.trim().toLowerCase()

    return (
      notable.name.toLowerCase().includes(parsedFilter) ||
      notable.description.find((line: string) =>
        line.toLowerCase().includes(parsedFilter)
      )
    )
  })

export const getIsClusterBaseActive = (base: string, notable: string) =>
  !!computedNotables.find(
    (computedNotable) => notable === computedNotable.id
  )?.tiers[base]

export const getIsClusterTypeActive = (type: string, notable: string) =>
  !!getClusterBasesByType(type).find((t) =>
    getIsClusterBaseActive(t.id_base, notable)
  )

export const getTypeByBase = (id_base: string) =>
  computedClusterBases.find((base) => base.id_base === id_base)?.master_base