

export interface Element {
    position : number;
    name : string;
    weight: number;
    symbol : string;
}

export interface PageSettings {
    pageLength      : number;
    pageSize        : number;
    pageSizeOptions : number[];
    pageIndex       : number;
}

export interface SortSettings {
    sortField       :   string;
    sortDirection   :   string;
}


export interface Search {
    loading : boolean;
    query   : string;
    error   : string;
}

