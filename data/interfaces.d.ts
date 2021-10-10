export type Affix = 'prefix' | 'suffix'

interface Tier {
  ilvl: string
  weighting: string
}

export interface ClusterType {
  id: string
  text: string
}

export interface ClusterBase {
  id_bgroup: string
  id_base: string
  name_base: string
  is_jewellery: string
  base_type: string
  has_childs: string
  master_base: string
  unique_notable: string
  enchant: string
  img: string
}

export interface Notable {
  id: string
  name: string
  affix: Affix
  img: string
  ilvl: string
  description: string[]
  tiers: Record<string, Tier>
}
