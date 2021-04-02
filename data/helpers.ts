import { clusterEffects, passives } from './data'

export const getClusterEffectsByType = (type: string) => clusterEffects
  .filter(effect => effect.clusterType === type)

export const getPassivesByEffect = (effect: string) => passives
  .filter(passive => passive.effects.includes(effect))
