/*export class ODataPagedResult<T> {
    public data: T[];
    public count: number;
    public nextLink: string;
}*/
export interface ODataPagedResult<T>{
    data: T[];
    count: number;
    nextLink: string;
}
