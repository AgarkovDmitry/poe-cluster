import { getClusterBasesByType, getNotablesByBase } from './helpers'
// import { clusterEffects, passives } from './data'

describe('data/helpers', () => {
  describe('getClusterBasesByType', () => {
    it('Should return empty array if type is not valid', () => {
      const type = 'invalid'

      expect(getClusterBasesByType(type)).toEqual([])
    })

    it('Should return non-empty array if type is valid', () => {
      const type = '70'

      expect(getClusterBasesByType(type).length).toEqual(12)
    })

    it('Should return non-empty array if type is valid', () => {
      const type = '69'

      expect(getClusterBasesByType(type).length).toEqual(17)
    })

    it('Should return non-empty array if type is valid', () => {
      const type = '71'

      expect(getClusterBasesByType(type).length).toEqual(21)
    })
  })

  describe('getNotablesByBase', () => {
    it('Should return empty array if type is not valid', () => {
      const effect = 'invalid'

      expect(getNotablesByBase(effect)).toEqual([])
    })

    it('Should return non-empty array if type is valid', () => {
      const effect = '169'

      expect(getNotablesByBase(effect).length).not.toEqual(0)
    })
  })
})
