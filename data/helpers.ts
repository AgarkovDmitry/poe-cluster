import { rawClusterBases, computedNotables } from './data'

export const getClusterBasesByType = (type: string) =>
  rawClusterBases.filter((base) => base.master_base === type)

export const getNotablesByBase = (base: string) =>
  computedNotables.filter(notable => !!notable.tiers[base])
