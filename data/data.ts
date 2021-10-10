import { Notable, ClusterBase, ClusterType } from './interfaces'

import data from './cluster-data.json'

export const clusterTypes = (data.types as unknown) as ClusterType[]

export const computedClusterBases = (data.bases as unknown) as ClusterBase[]

export const computedNotables = (data.notables as unknown) as Notable[]
