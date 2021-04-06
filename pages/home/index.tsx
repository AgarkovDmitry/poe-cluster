import { useState } from 'react'
import Head from 'next/head'
import classNames from 'classnames'

import Block from './components/block/Block'

import styles from './styles.module.css'

import { clusterTypes } from '../../data/data'
import { getClusterBasesByType, getNotablesByBase } from '../../data/helpers'

export default function Home() {
  const [selectedType, setSelectedType] = useState('69')
  const [selectedBase, setSelectedBase] = useState('')

  const handleSelectType = (type: string) => () => {
    setSelectedType(type)
    setSelectedBase('')
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
        <h2 className={styles.title}>Cluster jewels</h2>
        <div className={styles.clusterGrid}>
          {clusterTypes.map((type) => (
            <Block
              className={styles.clusterBlock}
              key={type.id}
              selected={selectedType === type.id}
              onClick={handleSelectType(type.id)}
            >
              <img src={type.img} />
            </Block>
          ))}
        </div>

        <div className={styles.grid}>
          {getClusterBasesByType(selectedType).map((base) => (
            <Block
              className={styles.effectBlock}
              key={base.id_base}
              selected={selectedBase === base.id_base}
              onClick={handleEffectType(base.id_base)}
            >
              <div className={styles.passiveGrid}>
                <img className={styles.baseImage} src={base.img} />
                <div className={styles.baseTitle}>{base.name_base}</div>
              </div>
            </Block>
          ))}
        </div>

        <div className={styles.grid}>
          {getNotablesByBase(selectedBase).map((notable) => (
            <Block
              className={classNames(styles.passiveBlock, styles.grid)}
              key={notable.id_modifier}
            >
              <div className={styles.passiveGrid}>
                <img src={notable.img} className={styles.passiveImage} />
                <div className={styles.passiveTitle}>
                  {notable.name} ({notable.id_modifier})
                </div>
              </div>
              <div className={styles.passiveWrap}>
                <div className={styles.passiveDescrition}>
                  {notable.description?.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
              <div className={styles.notesWrap}>
                <div className={styles.passiveNote}>
                  {notable.notes?.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            </Block>
          ))}
        </div>
      </main>
    </div>
  )
}
