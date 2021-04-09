import { computedClusterBases, computedNotables } from './data'

export const getClusterBasesByType = (type: string) =>
  computedClusterBases.filter((base) => base.master_base === type)

export const getNotablesByBase = (base: string) =>
  computedNotables.filter((notable) => !base || !!notable.tiers[base])

export const getIsClusterBaseActive = (base: string, notable: string) =>
  !!computedNotables.find(
    (computedNotable) => notable === computedNotable.id_modifier
  )?.tiers[base]

export const getIsClusterTypeActive = (type: string, notable: string) =>
  !!getClusterBasesByType(type).find((t) =>
    getIsClusterBaseActive(t.id_base, notable)
  )
