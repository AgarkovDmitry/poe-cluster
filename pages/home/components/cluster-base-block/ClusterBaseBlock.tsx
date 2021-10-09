import { useRouter } from 'next/router'

import { getIsClusterBaseActive } from 'data/helpers'
import { ClusterBase } from 'data/interfaces'

import ClusterBlock from '../cluster-block/ClusterBlock'

interface Props {
  base: ClusterBase
}

export default function ClusterBaseBlock({ base }: Props) {
  const { query, push } = useRouter()

  const queryBase = (query.base as string) || ''
  const queryNotable = (query.notable as string) || ''

  if (!base) {
    return null
  }

  const { id_base, name_base, img } = base
  const selected = queryBase === id_base
  const isClusterBaseActive = getIsClusterBaseActive(
    id_base,
    queryNotable
  )

  const handleSelectBase = (base: string) => () => {
    const isClusterBaseActive = getIsClusterBaseActive(
      base,
      queryNotable
    )
    const isNewBase = queryBase !== base

    push({
      query: {
        ...{
          ...(isNewBase && { base }),
        },
        ...{
          ...(isClusterBaseActive && {
            notable: queryNotable,
          }),
        },
      },
    })
  }

  return (
    <ClusterBlock
      key={id_base}
      selected={selected}
      active={isClusterBaseActive}
      onClick={handleSelectBase(id_base)}
      img={img}
      text={name_base}
    />
  )
}
