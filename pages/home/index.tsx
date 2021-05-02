import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDebounce } from 'use-debounce'

import { clusterTypes, computedNotables } from 'data/data'
import {
  getClusterBasesByType,
  getNotablesByFilter,
  getIsClusterBaseActive,
  getIsClusterTypeActive,
  getTypeByBase,
} from 'data/helpers'

import Grid from 'components/grid/Grid'

import NotableBlock from './components/notable-block/NotableBlock'
import ClusterBlock from './components/cluster-block/ClusterBlock'

import styles from './styles.module.css'

const DEFAULT_CLUSTER_TYPE = '69'

export default function Home() {
  const { isReady, query, push } = useRouter()

  const [selectedType, setSelectedType] = useState('')
  const [filter, setFilter] = useState('')
  const [filterValue] = useDebounce(filter, 350)

  const handleSelectType = (type: string) => () => {
    setSelectedType(type)
  }

  const handleSelectBase = (base: string) => () => {
    push({
      query: {
        ...{
          ...(query.base !== base && { base }),
        },
        ...{
          ...(getIsClusterBaseActive(base, query.notable as string) && {
            notable: query.notable,
          }),
        },
      },
    })
  }

  const handleNotableSelect = (notable: string) => () => {
    push({
      query: {
        ...query,
        ...{
          ...(query.notable !== notable && { notable }),
        },
      },
    })
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  if (!isReady) {
    return null
  }

  const activeType =
    selectedType || getTypeByBase(query.base as string) || DEFAULT_CLUSTER_TYPE
  const selectedBase = (query.base as string) || ''
  const selectedNotable = (query.notable as string) || ''

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
                  active={getIsClusterTypeActive(type.id, selectedNotable)}
                  onClick={handleSelectType(type.id)}
                  text={type.text}
                />
              ))}
            </Grid>

            <Grid className={styles.grid}>
              {getClusterBasesByType(activeType).map((base) => (
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
              {getNotablesByFilter(filterValue)(computedNotables)
                .sort((notable) => (notable.id === selectedNotable ? -1 : 1))
                .map((notable) => (
                  <NotableBlock
                    id={notable.id}
                    name={notable.name}
                    img={notable.img}
                    description={notable.description}
                    notes={notable.notes}
                    onClick={handleNotableSelect(notable.id)}
                    selected={selectedNotable === notable.id}
                    hidden={selectedBase && !notable.tiers[selectedBase]}
                    key={notable.id}
                  />
                ))}
            </Grid>
          </div>
        </Grid>
      </main>
    </div>
  )
}
