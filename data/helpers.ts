import { computedClusterBases, computedNotables } from './data'

export const getClusterBasesByType = (type: string) =>
  computedClusterBases.filter((base) => base.master_base === type)

export const getNotablesByFilter = (filter: string) => {
  const parsedFilter = filter.trim().toLowerCase()

  return computedNotables.filter(
    (notable) =>
      notable.name.toLowerCase().includes(parsedFilter) ||
      notable.description.find((line: string) =>
        line.toLowerCase().includes(parsedFilter)
      )
  )
}

export const getIsClusterBaseActive = (base: string, notable: string) =>
  !!computedNotables.find((computedNotable) => notable === computedNotable.id)
    ?.tiers[base]

export const getIsClusterTypeActive = (type: string, notable: string) =>
  !!getClusterBasesByType(type).find((t) =>
    getIsClusterBaseActive(t.id_base, notable)
  )

export const getTypeByBase = (id_base: string) =>
  computedClusterBases.find((base) => base.id_base === id_base)?.master_base
