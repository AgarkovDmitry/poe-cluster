import Grid from 'components/grid/Grid'
import Text from 'components/text/Text'
import Image from 'components/image/Image'

import { Notable } from 'data/data'

import Block from '../block/Block'

import styles from './NotableBlock.module.css'

interface Props {
  notable: Notable
  onClick: () => void
  selected: boolean
}

export default function NotableBlock({
  notable: { name, img, description, notes },
  onClick,
  selected,
}: Props) {
  return (
    <Block className={styles.block} onClick={onClick} selected={selected}>
      <div>
        <Grid>
          <Image src={img} size='big' />
          <Text
            className={styles.title}
            color='title'
            bold={true}
            fontSize='big'
          >
            {name}
          </Text>
        </Grid>
        <div className={styles.subsection}>
          {description?.map((line) => (
            <Text key={line} fontSize='medium'>
              {line}
            </Text>
          ))}
        </div>
        <div className={styles.subsection}>
          {notes?.map((line) => (
            <Text key={line} fontSize='medium' color='hint' italic={true}>
              {line}
            </Text>
          ))}
        </div>
      </div>
    </Block>
  )
}
