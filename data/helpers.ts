import { computedClusterBases, computedNotables, Notable } from './data'

export const getClusterBasesByType = (type: string) =>
  computedClusterBases.filter((base) => base.master_base === type)

export const getNotablesByBase = (base: string) => (notables: Notable[]) =>
  notables.filter((notable) => !base || !!notable.tiers[base])

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
