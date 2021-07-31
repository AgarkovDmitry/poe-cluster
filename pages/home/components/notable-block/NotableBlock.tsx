import classNames from 'classnames'
import { useRouter } from 'next/router'

import Grid from 'components/grid/Grid'
import Text from 'components/text/Text'
import Image from 'components/image/Image'

import { Notable } from 'data/interfaces'

import Block from '../block/Block'

import styles from './NotableBlock.module.css'

interface Props {
  notable: Notable
}

export default function NotableBlock({ notable }: Props) {
  const { query, push } = useRouter()
  
  const queryBase = query.base as string
  const queryNotable = (query.notable as string) || ''

  const { id, name, affix, ilvl, img, description, tiers } = notable
  const weighting = tiers[queryBase]?.weighting
  const selected = queryNotable === id
  const hidden = queryBase && !notable.tiers[queryBase]

  const handleClick = () => {
    push({
      query: {
        ...query,
        ...{
          ...(query.notable !== notable.id && { notable: notable.id }),
        },
      },
    })
  }

  return (
    <Block
      className={classNames(styles.block, {
        [styles.hidden]: hidden,
      })}
      onClick={handleClick}
      selected={selected}
    >
      <Grid className={styles.header}>
        <Image src={img} size='big' className={styles.image} />
        <div className={styles.title}>
          <Text color='title' bold={true} fontSize='big'>
            {name}
          </Text>
        </div>
        <div className={styles.craft}>
          <div className={styles.craftSubsection}>
            <Text fontSize='medium' color='title' bold={true}>
              {affix === 'prefix' ? 'P' : 'S'}
            </Text>
          </div>
          <div className={styles.craftSubsection}>
            <Text fontSize='medium' color='title' bold={true}>
              {ilvl === '1' ? '' : `${ilvl} lvl`}
            </Text>
          </div>
          <div className={styles.craftSubsection}>
            <Text fontSize='medium' color='title' bold={true}>
              {weighting}
            </Text>
          </div>
        </div>
      </Grid>
      <div className={styles.description}>
        {description?.map((line) => (
          <Text key={line} fontSize='medium'>
            {line}
          </Text>
        ))}
      </div>
    </Block>
  )
}
