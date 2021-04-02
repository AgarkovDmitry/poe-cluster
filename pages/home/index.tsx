import { useState } from 'react'
import Head from 'next/head'
import classNames from 'classnames'

import Block from './components/block/Block'

import styles from './styles.module.css'

import { clusterTypes } from '../../data/data'
import { getClusterEffectsByType, getPassivesByEffect } from '../../data/helpers'

export default function Home() {
  const [selectedType, setSelectedType] = useState('large')
  const [selectedEffect, setSelectedEffect] = useState('169')

  const handleSelectType = (type: string) => () => {
    setSelectedType(type)
  }

  const handleEffectType = (effect: string) => () => {
    setSelectedEffect(effect)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Poe clusters</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Cluster jewels
        </h2>
        <div className={styles.clusterGrid}>
          {
            clusterTypes.map(type => (
              <Block
                className={styles.clusterBlock}
                key={type.id}
                selected={selectedType === type.id}
                onClick={handleSelectType(type.id)}
              >
                <img src={type.img} />
              </Block>
            ))
          }
        </div>

        <div className={styles.grid}>
          {
            getClusterEffectsByType(selectedType)
              .map(effect => (
                <Block
                  className={styles.effectBlock}
                  key={effect.text}
                  selected={selectedEffect === effect.id}
                  onClick={handleEffectType(effect.id)}
                >
                  {effect.text}
                </Block>
              ))
          }
        </div>

        <div className={styles.grid}>
          {getPassivesByEffect(selectedEffect)
            .map(passive => (
              <Block className={classNames(styles.passiveBlock, styles.grid)}>
                <div className={styles.passiveGrid}>
                  <img src={passive.img} className={styles.passiveImage} />
                  <div className={styles.passiveTitle}>
                    {passive.title}
                  </div>
                </div>
                <div className={styles.passiveWrap}>
                  <div className={styles.passiveDescrition}>
                    {passive.description.map(line => (
                      <div key={line}>
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className={styles.passiveNote}>
                    {passive.description.map(line => (
                      <div key={line}>
                        {line}
                      </div>
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
