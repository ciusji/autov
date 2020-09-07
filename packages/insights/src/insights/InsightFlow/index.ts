import { Record } from "../../commonTypes";
import { IFieldSummary } from "./interfaces";
import { VIEngine } from './engine';

interface VIProps {
    dataSource: Record[];
    fields?: string[];
    dimensions?: string[];
    measures?: string[];
}

export interface ViewSpace {
    dimensions: string[];
    measures: string[];
    contextDimensions: string[]
}

interface ConstRange {
    MAX: number;
    MIN: number;
}
type CacheResult = 'fieldsSummary' | 'subspaces';
export class VisualInsights {
    public dataSource: Record[];
    private engine: VIEngine;
    private subspaces: ViewSpace[] | null;
    private fieldsSummary: IFieldSummary[] | null;
    private dataGraph: { DG: number[][]; MG: number[][] } | null;
    private cache: Map<CacheResult, boolean>;
    constructor (props: VIProps) {
        this.engine = new VIEngine();
        this.dataSource = props.dataSource;

        let fieldKeys: string[] = [];
        if (props.fields) fieldKeys = props.fields;
        else if (props.dimensions && props.measures) fieldKeys = [...props.dimensions, ...props.measures];
        else fieldKeys = this.dataSource.length > 0 ? Object.keys(this.dataSource[0]) : [];

        this.engine
            .setFieldKeys(fieldKeys)
            .setDataSource(this.dataSource)
            .buildfieldsSummary();

        if (props.dimensions) {
            this.engine.setDimensions(props.dimensions);
        }
        if (props.measures) {
            this.engine.setMeasures(props.measures);
        }
    }

    public getFieldsSummary() {
        if (this.fieldsSummary === null) {
            this.engine.buildfieldsSummary();
            this.fieldsSummary = this.engine.fields;
            this.dataGraph = null;
        }
        return this.fieldsSummary;
    }

    public getDataGraph()  {
        this.getFieldsSummary();
        if (this.dataGraph === null) {
            this.engine.buildGraph()
            this.dataGraph = this.engine.dataGraph;
            this.subspaces = null;
        }
        return this.dataGraph;
    }

    public useDataGraph(props: { DG: number[][], MG: number[][] } | null) {
        if (props === null) {
            this.dataGraph = null;
            this.useSubspaces(null);
            return this;
        }
        this.engine.dataGraph.DG = props.DG;
        this.engine.dataGraph.MG = props.MG;
        // do not need to set this.subspaces = null, because getXXX will check all the node in the pipeline.
        // this.subspaces = null;
        return this;
    }

    public useSubspaces(props: ViewSpace[] | null) {
        if (props === null) {
            this.subspaces = null;
            return this;
        }
        this.subspaces = props;
        return this;
    }
}
