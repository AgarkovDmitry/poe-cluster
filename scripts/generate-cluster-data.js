const axios = require('axios')
const fs = require('fs')

const { notableImages, baseImages } = require('./images')

const DATA_URL = 'https://www.craftofexile.com/cgi/web/custom/poec_data.json'

axios
  .get(DATA_URL, {
    params: {
      v: '1632786598',
    },
  })
  .then((res) => {
    const data = JSON.parse(res.data.substring(6))

    const rawClusterBases = data.bases.seq.filter(
      (base) => base.id_bgroup === '12'
    )

    const rawNotableSkills = data.modifiers.seq.filter(
      (mod) => mod.notable === '1'
    )

    const types = [
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

    const bases = rawClusterBases.map((base) => ({
      ...base,
      img: baseImages[base.id_base],
    }))

    const notables = rawNotableSkills.map((skill) => {
      const description = JSON.parse(data.mdefs[skill.id_modifier])
      const rawTiers = data.tiers[skill.id_modifier]

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
        affix: skill.affix,
        ilvl,
      }
    })

    return {
      types,
      bases,
      notables,
    }
  })
  .then((data) => {
    return new Promise((_, reject) => {
      const fileName = './data/cluster-data.json'

      fs.writeFile(fileName, JSON.stringify(data), (err) => {
        if (err) reject(err)
        console.log(`Generated file ${fileName}`)
      })
    })
  })
