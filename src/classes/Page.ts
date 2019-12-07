export class Page implements IPage{
    destUri: string;
    sourceUri: string;

    constructor(destinationUri: string, sourceUri: string){
        this.destUri = destinationUri;
        this.sourceUri = sourceUri;
    }
}