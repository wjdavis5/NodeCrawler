export class MemoryQueuer implements ISiteQueuer{
    
    private memoryQueue: Array<string>

    constructor(){
        this.memoryQueue = new Array<string>();
    }
    
    queue(uri: string) {
        console.debug("Queuing url: "+ uri);
        this.memoryQueue.push(uri);
    }

    dequeue(): string {
        let uri: string = this.memoryQueue.pop();
        console.debug("DeQueue uri: " + uri);
        return uri;
    }

}