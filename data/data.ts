import rawData from './raw.json'
import { notableImages, baseImages } from './notable-images'
import { Notable } from './interfaces'

export const rawClusterBases = rawData.bases.seq.filter(
  (base) => base.id_bgroup === '12'
)

export const rawNotableSkills = rawData.modifiers.seq.filter(
  (mod) => mod.notable === '1'
)

export const clusterTypes = [
  {
    id: '69',
    text: 'Large Cluster',
  },
  {
    id: '71',
    text: 'Medium Cluster',
  },
  {
    id: '70',
    text: 'Small Cluster',
  },
]

export const computedClusterBases = rawClusterBases.map((base) => ({
  ...base,
  img: baseImages[base.id_base],
}))

type Affix = 'prefix' | 'suffix'

export const computedNotables: Notable[] = rawNotableSkills.map((skill) => {
  const description = JSON.parse(rawData.mdefs[skill.id_modifier])
  const rawTiers = rawData.tiers[skill.id_modifier]

  const tiers = Object.keys(rawTiers).reduce(
    (res, key) => ({ ...res, [key]: rawTiers[key][0] }),
    {}
  )

  const ilvl = tiers[Object.keys(tiers)[0]].ilvl

  return {
    description,
    notes: [],
    tiers,
    img: notableImages[skill.id_modifier],
    name: skill.name_modifier.split('1 Added Passive Skill is ')[1],
    id: skill.id_modifier,
    affix: skill.affix as Affix,
    ilvl,
  }
})
