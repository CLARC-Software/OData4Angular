/*export class ODataMetadataResult<T> {
  public data: T[]|undefined;
  public count: number;
  public nextLink: string;
  public deltaLink: string;
  public id: string;
  public etag: string;
  public readLink: string;
  public editLink: string;
  public navigationLink: string;
  public associationLink: string;
  public type: string;
  public fillMetadata(obj: object){
    const keys = Object.keys(this);
    const keys2 = Object.keys(obj);
    keys.forEach((key) => {
      keys2.every((key2) => {
        if(key2.indexOf(key) > -1)
        {
          this[key] = obj[key2];
          return false;
        }
      });
    });
  }
}*/

export interface ODataMetadataResult<T>{
  data: T[];
  count: number;
  nextLink: string;
  deltaLink: string;
  id: string;
  etag: string;
  readLink: string;
  editLink: string;
  navigationLink: string;
  associationLink: string;
  type: string;
}
