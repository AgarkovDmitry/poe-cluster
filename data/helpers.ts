import { computedClusterBases, computedNotables } from './data'

export const getClusterBasesByType = (type: string) =>
  computedClusterBases.filter((base) => base.master_base === type)

export const getNotablesByBase = (base: string) =>
  computedNotables.filter((notable) => !base || !!notable.tiers[base])
