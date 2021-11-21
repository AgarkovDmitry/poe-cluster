import { computedNotables } from './data'

import {
  getClusterBasesByType,
  getNotablesByFilter,
  getIsClusterBaseActive,
  getIsClusterTypeActive,
  getTypeByBase,
} from './helpers'

describe('data/helpers', () => {
  describe('getClusterBasesByType', () => {
    it('Should return empty array if type is not valid', () => {
      const type = 'invalid'

      expect(getClusterBasesByType(type)).toEqual([])
    })

    it('Should return non-empty array if type is valid', () => {
      const type = '70'

      expect(getClusterBasesByType(type).length).toEqual(14)
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

  describe('getNotablesByFilter', () => {
    it('Should return full array if no filter provided', () => {
      const effect = ''

      expect(getNotablesByFilter(effect)).toEqual(
        computedNotables
      )
    })

    it('Should return array with 1 element, if filter is name', () => {
      const effect = 'Adrenaline'

      expect(getNotablesByFilter(effect).length).toEqual(1)
    })

    it('Should return array with 1 element, if filter is name in wrong case', () => {
      const effect = 'adrenaline'

      expect(getNotablesByFilter(effect).length).toEqual(1)
    })

    it('Should return array with 1 element, if filter is name with spaces', () => {
      const effect = '           adrenaline  '

      expect(getNotablesByFilter(effect).length).toEqual(1)
    })
  })

  describe('getIsClusterBaseActive', () => {
    it('Should return false if type and notable are not valid', () => {
      const base = 'invalid'
      const notable = 'invalid'

      expect(getIsClusterBaseActive(base, notable)).toEqual(false)
    })

    it('Should return false if notable is not valid', () => {
      const base = '168'
      const notable = 'invalid'

      expect(getIsClusterBaseActive(base, notable)).toEqual(false)
    })

    it('Should return false if type is not valid', () => {
      const base = 'invalid'
      const notable = '244'

      expect(getIsClusterBaseActive(base, notable)).toEqual(false)
    })

    it('Should return true if type and notable are not valid', () => {
      const base = '168'
      const notable = '277'

      expect(getIsClusterBaseActive(base, notable)).toEqual(true)
    })
  })

  describe('getIsClusterTypeActive', () => {
    it('Should return false if type and notable are not valid', () => {
      const type = 'invalid'
      const notable = 'invalid'

      expect(getIsClusterTypeActive(type, notable)).toEqual(false)
    })

    it('Should return false if notable is not valid', () => {
      const type = '69'
      const notable = 'invalid'

      expect(getIsClusterTypeActive(type, notable)).toEqual(false)
    })

    it('Should return false if type is not valid', () => {
      const type = 'invalid'
      const notable = '244'

      expect(getIsClusterTypeActive(type, notable)).toEqual(false)
    })

    it('Should return true if type and notable are not valid', () => {
      const type = '71'
      const notable = '244'

      expect(getIsClusterTypeActive(type, notable)).toEqual(true)
    })
  })

  describe('getTypeByBase', () => {
    it('Should return type, if base is valid', () => {
      const base = '168'
      const type = '69'

      expect(getTypeByBase(base)).toEqual(type)
    })
  })
  describe('getTypeByBase', () => {
    it('Should not return type, if base is not valid', () => {
      const base = '9999'
      const type = undefined

      expect(getTypeByBase(base)).toEqual(type)
    })
  })
})
