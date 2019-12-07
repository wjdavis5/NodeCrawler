const sleep = require('sleep-promise');

export class CrawlerBot implements ICrawlerBot{
    
    private keepCrawlin: boolean;
    private memoryQueue: ISiteQueuer;
    private webCrawlerFactory: ICrawlerFactory;
    private consecutiveEmptyDequeue: number = 0;
    private numberOfCrawlers: number = 0;
    private instanceHolder: Array<ISiteCrawler>;

    constructor(memoryQueue: ISiteQueuer, webCrawlerFactory: ICrawlerFactory, numberOfCrawlers: number){
        this.memoryQueue = memoryQueue;
        this.webCrawlerFactory = webCrawlerFactory;
        this.numberOfCrawlers = numberOfCrawlers;
        this.instanceHolder = new Array<ISiteCrawler>();
    }

    private populateCrawlers(){
        while(this.instanceHolder.length < this.numberOfCrawlers){
            this.instanceHolder.push(this.webCrawlerFactory.GetCrawler(this.memoryQueue));
        }
    }
    
    public async StartCrawl() {
        this.populateCrawlers();
        this.keepCrawlin = true;
        while(this.keepCrawlin){
            let nextPage = await this.memoryQueue.dequeue();
            if(!nextPage) {
                console.debug("No pages to crawl");
                await sleep(++this.consecutiveEmptyDequeue*200);
                continue;
            }
            this.consecutiveEmptyDequeue = 0;
            let currentCrawler = this.instanceHolder.pop();
            this.instanceHolder.unshift(currentCrawler);
            await currentCrawler.crawl(nextPage);
            }
    }

    public StopCrawl(){
        this.keepCrawlin = false;
    }

}