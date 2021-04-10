import { useState } from 'react'
import Head from 'next/head'
import { useDebounce } from 'use-debounce'

import { clusterTypes, computedNotables } from 'data/data'
import {
  getClusterBasesByType,
  getNotablesByBase,
  getNotablesByFilter,
  getIsClusterBaseActive,
  getIsClusterTypeActive,
} from 'data/helpers'

import Grid from 'components/grid/Grid'

import NotableBlock from './components/notable-block/NotableBlock'
import ClusterBlock from './components/cluster-block/ClusterBlock'

import styles from './styles.module.css'

export default function Home() {
  const [selectedType, setSelectedType] = useState('69')
  const [selectedBase, setSelectedBase] = useState('')
  const [selectedNotable, setSelectedNotable] = useState('')
  const [filter, setFilter] = useState('')
  const [filterValue] = useDebounce(filter, 350)

  const handleSelectType = (type: string) => () => {
    setSelectedType(type)
  }

  const handleSelectBase = (base: string) => () => {
    const newBase = selectedBase === base ? '' : base
    setSelectedBase(newBase)

    if (!newBase || !getIsClusterBaseActive(newBase, selectedNotable)) {
      setSelectedNotable('')
    }
  }

  const handleSelectNotable = (notable: string) => () => {
    setSelectedNotable(selectedNotable === notable ? '' : notable)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
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
                  active={getIsClusterTypeActive(type.id, selectedNotable)}
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
                  active={getIsClusterBaseActive(base.id_base, selectedNotable)}
                  onClick={handleSelectBase(base.id_base)}
                  img={base.img}
                  text={base.name_base}
                />
              ))}
            </Grid>
          </div>

          <div className={styles.notablesBlock}>
            <input
              className={styles.searchInput}
              placeholder='Search Notables...'
              value={filter}
              onChange={handleFilterChange}
            />

            <Grid className={styles.grid}>
              {
                getNotablesByBase(selectedBase)(
                  getNotablesByFilter(filterValue)(
                    computedNotables
                  )
                )
                .map((notable) => (
                  <NotableBlock
                    key={notable.id}
                    notable={notable}
                    onClick={handleSelectNotable(notable.id)}
                    selected={selectedNotable === notable.id}
                  />
                ))}
            </Grid>
          </div>
        </Grid>
      </main>
    </div>
  )
}
