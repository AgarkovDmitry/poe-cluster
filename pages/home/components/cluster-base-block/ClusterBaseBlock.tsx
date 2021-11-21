import { useRouter } from 'next/router'

import { getIsClusterBaseActive } from 'data/helpers'
import { ClusterBase } from 'data/interfaces'

import ClusterBlock from '../cluster-block/ClusterBlock'

interface Props {
  base: ClusterBase
  display: 'selected' | 'active' | 'default'
}

export default function ClusterBaseBlock({ base, display }: Props) {
  const { query, push } = useRouter()

  const queryBase = (query.base as string) || ''
  const queryNotable = (query.notable as string) || ''

  if (!base) {
    return null
  }

  const { id_base, name_base, img } = base
  const selected = queryBase === id_base
  const active = getIsClusterBaseActive(id_base, queryNotable)

  const handleSelectBase = () => {
    const isNewBase = queryBase !== id_base

    push({
      query: {
        ...{
          ...(isNewBase && { base: id_base }),
        },
        ...{
          ...(active && {
            notable: queryNotable,
          }),
        },
      },
    })
  }

  if (display === 'selected' && !selected) {
    return null
  }

  if (display === 'active' && (selected || !active)) {
    return null
  }

  if (display === 'default' && (selected || active)) {
    return null
  }

  return (
    <ClusterBlock
      key={id_base}
      selected={selected}
      active={active}
      onClick={handleSelectBase}
      img={img}
      text={name_base}
    />
  )
}
