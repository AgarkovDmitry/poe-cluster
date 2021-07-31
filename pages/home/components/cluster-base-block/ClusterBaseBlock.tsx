import { useRouter } from 'next/router'

import { getIsClusterBaseActive } from 'data/helpers'
import { ClusterBase } from 'data/interfaces'

import ClusterBlock from '../cluster-block/ClusterBlock'

interface Props {
  base: ClusterBase
}

export default function ClusterBaseBlock({ base }: Props) {
  const { query, push } = useRouter()

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

  const queryBase = (query.base as string) || ''
  const queryNotable = (query.notable as string) || ''

  return (
    <ClusterBlock
      key={base.id_base}
      selected={queryBase === base.id_base}
      active={getIsClusterBaseActive(base.id_base, queryNotable)}
      onClick={handleSelectBase(base.id_base)}
      img={base.img}
      text={base.name_base}
    />
  )
}
