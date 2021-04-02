import { getClusterEffectsByType, getPassivesByEffect } from './helpers'
import { clusterEffects, passives } from './data'

describe('data/helpers', () => {
  describe('getClusterEffectsByType', () => {
    it('Should return empty array if type is not valid', () => {
      const type = 'invalid'

      expect(getClusterEffectsByType(type)).toEqual([])
    })

    it('Should return non-empty array if type is valid', () => {
      const type = 'large'

      expect(getClusterEffectsByType(type).length).not.toEqual(0)
      expect(getClusterEffectsByType(type).length).toBeLessThan(
        clusterEffects.length
      )
    })
  })

  describe('getPassivesByEffect', () => {
    it('Should return empty array if type is not valid', () => {
      const effect = 'invalid'

      expect(getPassivesByEffect(effect)).toEqual([])
    })

    it('Should return non-empty array if type is valid', () => {
      const effect = '169'

      expect(getPassivesByEffect(effect).length).not.toEqual(0)
      expect(getPassivesByEffect(effect).length).toBeLessThan(passives.length)
    })
  })
})
