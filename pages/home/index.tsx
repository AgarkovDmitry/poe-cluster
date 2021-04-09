import { useState } from 'react'
import Head from 'next/head'

import { clusterTypes } from 'data/data'
import { getClusterBasesByType, getNotablesByBase } from 'data/helpers'

import Grid from 'components/grid/Grid'

import NotableBlock from './components/notable-block/NotableBlock'
import ClusterBlock from './components/cluster-block/ClusterBlock'

import styles from './styles.module.css'

export default function Home() {
  const [selectedType, setSelectedType] = useState('69')
  const [selectedBase, setSelectedBase] = useState('')

  const handleSelectType = (type: string) => () => {
    setSelectedType(type)
  }

  const handleEffectType = (effect: string) => () => {
    setSelectedBase(effect)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Poe clusters</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Grid className={styles.mobileGrid}>
          <div className={styles.basesBlock}>
            <Grid>
              {clusterTypes.map((type) => (
                <ClusterBlock
                  key={type.id}
                  selected={selectedType === type.id}
                  onClick={handleSelectType(type.id)}
                  text={type.text}
                />
              ))}
            </Grid>

            <Grid className={styles.grid}>
              {getClusterBasesByType(selectedType).map((base) => (
                <ClusterBlock
                  key={base.id_base}
                  selected={selectedBase === base.id_base}
                  onClick={handleEffectType(base.id_base)}
                  img={base.img}
                  text={base.name_base}
                />
              ))}
            </Grid>
          </div>

          <div className={styles.notablesBlock}>
            <Grid>
              {getNotablesByBase(selectedBase).map((notable) => (
                <NotableBlock
                  id={notable.id_modifier}
                  name={notable.name}
                  img={notable.img}
                  description={notable.description}
                  notes={notable.notes}
                  key={notable.id_modifier}
                />
              ))}
            </Grid>
          </div>
        </Grid>
      </main>
    </div>
  )
}
