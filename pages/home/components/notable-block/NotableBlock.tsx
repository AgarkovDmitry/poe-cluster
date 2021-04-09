import Grid from 'components/grid/Grid'
import Text from 'components/text/Text'
import Image from 'components/image/Image'

import Block from '../block/Block'

import styles from './NotableBlock.module.css'

interface Props {
  id: string
  name: string
  img: string
  description?: string[]
  notes?: string[]
}

export default function NotableBlock({
  id,
  name,
  img,
  description,
  notes,
}: Props) {
  return (
    <Block className={styles.block}>
      <Grid>
        <Grid>
          <Image src={img} size='big' />
          <Text
            className={styles.title}
            color='title'
            bold={true}
            fontSize='big'
          >
            {name} ({id})
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
      </Grid>
    </Block>
  )
}
