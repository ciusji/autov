export interface Record {
  [key: string]: any
}

export interface NormalizedRecord {
  [key: string]: number
}

export type DataSource = Record[];

export type Dimensions = string[];
export type Measures = string[];
export type FieldType = 'quantitative' | 'nominal' | 'ordinal' | 'temporal';
export interface Field {
  name: string;
  type: FieldType;
}

export type FieldImpurity = [string, number, number, Field];
export interface Specification {
  position?: string[];
  color?: string[];
  size?: string[];
  shape?: string[];
  opacity?: string[];
  facets?: string[];
  page?: string[];
  filter?: string[];
  highFacets?: string[];
  geomType?: string[]
}

export interface View {
  schema: Specification;
  aggData: DataSource;
}

export type OperatorType = 'sum' | 'mean' | 'count';

// 数据集描述信息
export interface InsightSpace {
  dimensions: string[]
  measures: string[]
  type?: string
  order?: 'desc' | 'asc'
  score?: number
  significance: number
  impurity?: number
  description?: any
}

// dimension: 自变量
// measure: 因变量
// 这样理解概念，便于更好的应用图标
export type InsightWorker = (
  aggData: Record[],
  dimensions: string[],
  measures: string[]
) => Promise<InsightSpace | null>