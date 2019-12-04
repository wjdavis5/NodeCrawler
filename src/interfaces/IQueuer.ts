interface ISiteQueuer{
    queue(uri: string);
    dequeue(): Promise<string>;
    
}


