import rawData from './raw.json'
import { notableImages } from './notable-images'

export const rawClusterBases = rawData.bases.seq.filter(base => base.id_bgroup === '12')

export const rawNotableSkills = rawData.modifiers.seq.filter(mod => mod.notable === '1')

export const clusterTypes = [
  {
    id: '69',
    img: 'https://web.poecdn.com/image/Art/2DItems/Jewels/NewGemBase3.png?w=1&h=1&scale=1',
  },
  {
    id: '71',
    img: 'https://web.poecdn.com/image/Art/2DItems/Jewels/NewGemBase2.png?w=1&h=1&scale=1',
  },
  {
    id: '70',
    img: 'https://web.poecdn.com/image/Art/2DItems/Jewels/NewGemBase1.png?w=1&h=1&scale=1',
  },
]


export const computedNotables = rawNotableSkills.map(skill => {
  const description = JSON.parse(rawData.mdefs[skill.id_modifier])
  const tiers = rawData.tiers[skill.id_modifier]

  return {
    description,
    notes: [],
    tiers,
    img: notableImages[skill.id_modifier],
    name: skill.name_modifier.split('1 Added Passive Skill is ')[1],
    ...skill
  }
})

console.log(computedNotables.map(n => ({ name: n.name, id: n.id_modifier })))

// export const passives = [
//   {
//     description: [
//       '30% increased Elemental Damage with Attack Skills',
//       '10% chance to Freeze, Shock and Ignite',
//       '15% increased Effect of Non-Damaging Ailments',
//     ],
//     notes: [
//       '(Freeze lowers Enemy Action Speed to zero, preventing them from acting. Duration is based on the Cold Damage of the Hit)',
//       '(Shock increases Damage taken by up to 50%, depending on the amount of Lightning Damage in the hit, for 2 seconds)',
//       '(Ignite deals Fire Damage over time, based on the base Fire Damage of the Skill, for 4 seconds)',
//       '(Ailments that do not deal Damage are Scorched, Chilled, Frozen, Brittle, Shocked, and Sapped)'
//     ],
//     title: 'Calamitious',
//     effects: ['167', '169'],
//     img:
//       images.attackDamage,
//     id: '277',
//   },
//   {
//     description: [
//       '10% increased Attack Speed if you\'ve Hit with your Main Hand Weapon Recently',
//       '10% increased Movement Speed if you\'ve Hit with your Off Hand Weapon Recently',
//     ],
//     title: 'Combat Rhythm',
//     effects: ['167'],
//     img:
//       images.dualWieldingDamage,
//     id: '288',
//   },
//   {
//     description: [
//       'Attack Skills deal 25% increased Damage while Dual Wielding',
//       '+5% Chance to Block Attack Damage while Dual Wielding',
//       '30% increased Attack Critical Strike Chance while Dual Wielding',
//     ],
//     title: 'Deadly Repartee',
//     effects: ['167'],
//     img:
//       images.dualWieldingDamage,
//     id: '302',
//   },
//   {
//     description: [
//       '20% increased Attack Damage',
//       '20% increased Damage with Ailments from Attack Skills',
//       'Enemies Killed with Attack Hits have a 15% chance to Explode, dealing a tenth of their Life as Physical Damage',
//     ],
//     notes: [
//       '(Ailments that deal Damage are Bleeding, Ignited, and Poisoned)',
//     ],
//     title: 'Devastator',
//     effects: ['167', '169'],
//     img:
//       images.attackDamage,
//     id: '304',
//   },
//   {
//     description: [
//       '0.8% of Attack Damage Leeched as Life',
//       '25% increased Attack Damage when on Full Life',
//       'Attacks have 10% chance to Maim on Hit',
//     ],
//     notes: [
//       '(Leeched Life is recovered over time. Multiple Leeches can occur simultaneously, up to a maximum rate)',
//     ],
//     title: 'Drive the Destruction',
//     effects: ['167', '169'],
//     img:
//       images.attackDamage,
//     id: '313',
//   },
//   {
//     description: [
//       '0.4% of Attack Damage Leeched as Life',
//       '30% increased Damage while Leeching',
//       '15% increased Attack Speed while Leeching',
//     ],
//     notes: [
//       '(Leeched Life is recovered over time. Multiple Leeches can occur simultaneously, up to a maximum rate)',
//     ],
//     title: 'Feed the Fury',
//     effects: ['167', '169'],
//     img:
//       images.attackDamage,
//     id: '339',
//   },
//   {
//     description: [
//       '8% increased Attack Speed',
//       '0.4% of Attack Damage Leeched as Mana',
//       '20% increased Damage while Leeching',
//     ],
//     notes: [
//       '(Leeched Mana is recovered over time. Multiple Leeches can occur simultaneously, up to a maximum rate)',
//     ],
//     title: 'Fuel the Fight',
//     effects: ['167', '169'],
//     img:
//       images.attackDamage,
//     id: '347',
//   },
//   {
//     description: [
//       '8% increased Attack Speed',
//       '0.4% of Attack Damage Leeched as Mana',
//       '20% increased Damage while Leeching',
//     ],
//     notes: [
//       '(Leeched Mana is recovered over time. Multiple Leeches can occur simultaneously, up to a maximum rate)',
//     ],
//     title: 'Fuel the Fight',
//     effects: ['167', '169'],
//     img:
//       images.attackDamage,
//     id: '347',
//   },
//   {
//     description: [
//       'Attack Skills deal 25% increased Damage while Dual Wielding',
//       '3% chance to Dodge Attack or Spell Hits if you\'ve Hit an Enemy Recently',
//     ],
//     notes: [
//       '(Recently refers to the past 4 seconds)',
//     ],
//     title: 'Hit and Run',
//     effects: ['167'],
//     img:
//       images.dualWieldingDamage,
//     id: '363',
//   },
//   {
//     description: [
//       'Attack Skills deal 20% increased Damage while Dual Wielding',
//       '5% increased Attack Speed while Dual Wielding',
//       '5% chance to gain a Frenzy Charge on Kill while Dual Wielding',
//     ],
//     title: 'Insatiable Killer',
//     effects: ['167'],
//     img:
//       images.dualWieldingDamage,
//     id: '368',
//   },
//   {
//     description: [
//       '8% increased Attack Speed while Dual Wielding',
//       '16% increased Accuracy Rating while Dual Wielding',
//       '32% increased Damage if you\'ve used a Travel Skill Recently',
//     ],
//     notes: [
//       '(Recently refers to the past 4 seconds)',
//     ],
//     title: 'Martial Momentum',
//     effects: ['167'],
//     img:
//       images.dualWieldingDamage,
//     id: '383',
//   },
//   {
//     description: [
//       '60% increased Main Hand Attack Damage while wielding two different Weapon Types',
//       '30% increased Off Hand Attack Speed while wielding two different Weapon Types',
//     ],
//     title: 'Quick and Deadly',
//     effects: ['167'],
//     img:
//       images.dualWieldingDamage,
//     id: '428',
//   },
//   {
//     description: [
//       'Attacks have 10% chance to cause Bleeding',
//       '10% chance to Impale Enemies on Hit with Attacks',
//       '15% increased Effect of Impales inflicted by Hits that also inflict Bleeding',
//     ],
//     notes: [
//       '(Bleeding deals Physical Damage over time, based on the base Physical Damage of the Skill. Damage is higher while moving)',
//       '(When an Impaled enemy is hit, the Impale reflects 10% of the physical damage of the Impaling hit to that enemy. Impale lasts for 5 hits)',
//     ],
//     title: 'Vicious Skewering',
//     effects: ['167', '169'],
//     img:
//       images.attackDamage,
//     id: '503',
//   },
// ]
