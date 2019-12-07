interface ISiteQueuer{
    queue(uri: IPage);
    dequeue(): Promise<IPage>;
}


