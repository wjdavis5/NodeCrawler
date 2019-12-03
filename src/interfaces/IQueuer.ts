interface ISiteQueuer{
    queue(uri: string);
    dequeue(): string;
}


