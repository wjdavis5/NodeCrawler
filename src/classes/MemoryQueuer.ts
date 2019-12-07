export class MemoryQueuer implements ISiteQueuer{
    
    private memoryQueue: Array<IPage>

    constructor(){
        this.memoryQueue = new Array<IPage>();
    }
    
    queue(uri: IPage) {
        console.debug("Queuing url: "+ uri);
        this.memoryQueue.push(uri);
    }

    dequeue(): Promise<IPage> {
        let uri: IPage = this.memoryQueue.pop();
        console.debug("DeQueue uri: " + uri);
        return new Promise<IPage>(() => {return uri;});
    }

}

