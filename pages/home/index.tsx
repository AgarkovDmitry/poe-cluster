import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDebounce } from 'use-debounce'

import { clusterTypes } from 'data/data'
import {
  getClusterBasesByType,
  getNotablesByFilter,
  getIsClusterTypeActive,
  getTypeByBase,
} from 'data/helpers'

import Grid from 'components/grid/Grid'

import ClusterBaseBlock from './components/cluster-base-block/ClusterBaseBlock'
import NotableBlock from './components/notable-block/NotableBlock'
import ClusterBlock from './components/cluster-block/ClusterBlock'

import styles from './styles.module.css'

const DEFAULT_CLUSTER_TYPE = '69'

export default function Home() {
  const { isReady, query } = useRouter()

  const [selectedType, setSelectedType] = useState('')
  const [filter, setFilter] = useState('')
  const [filterValue] = useDebounce(filter, 350)

  const queryNotable = (query.notable as string) || ''

  const handleSelectType = (type: string) => () => {
    setSelectedType(type)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  if (!isReady) {
    return null
  }

  const activeType =
    selectedType || getTypeByBase(query.base as string) || DEFAULT_CLUSTER_TYPE

  const filteredNotables = getNotablesByFilter(filterValue)

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
                  selected={activeType === type.id}
                  active={getIsClusterTypeActive(type.id, queryNotable)}
                  onClick={handleSelectType(type.id)}
                  text={type.text}
                />
              ))}
            </Grid>

            <Grid className={styles.grid}>
              {getClusterBasesByType(activeType).map((base) => (
                <ClusterBaseBlock
                  base={base}
                  key={base.id_base}
                  display='selected'
                />
              ))}
            </Grid>

            <Grid className={styles.grid}>
              {getClusterBasesByType(activeType).map((base) => (
                <ClusterBaseBlock
                  base={base}
                  key={base.id_base}
                  display='active'
                />
              ))}
            </Grid>

            <Grid className={styles.grid}>
              {getClusterBasesByType(activeType).map((base) => (
                <ClusterBaseBlock
                  base={base}
                  key={base.id_base}
                  display='default'
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
              {filteredNotables
                .filter((notable) => notable.id === queryNotable)
                .map((notable) => (
                  <NotableBlock notable={notable} key={notable.id} />
                ))}
            </Grid>

            <Grid className={styles.grid}>
              {filteredNotables
                .filter((notable) => notable.id !== queryNotable)
                .map((notable) => (
                  <NotableBlock notable={notable} key={notable.id} />
                ))}
            </Grid>
          </div>
        </Grid>
      </main>
    </div>
  )
}
