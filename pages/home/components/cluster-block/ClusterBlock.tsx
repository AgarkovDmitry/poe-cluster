import Grid from 'components/grid/Grid'
import Text from 'components/text/Text'
import Image from 'components/image/Image'

import Block from '../block/Block'

import styles from './ClusterBlock.module.css'

interface Props {
  onClick: () => void
  selected: boolean
  img?: string
  text: string
}

export default function ClusterBlock({ selected, onClick, img, text }: Props) {
  return (
    <Block
      className={styles.block}
      selected={selected}
      onClick={onClick}
    >
      <Grid className={styles.grid}>
        {
          img && (
            <Image src={img} size='medium' />
          )
        }
        <Text
          fontSize='medium'
          className={styles.title}
          color='title'
        >
          {text}
        </Text>
      </Grid>
    </Block>
  )
}
