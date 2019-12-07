const sleep = require('sleep-promise');

export class CrawlerBot implements ICrawlerBot{
    
    private keepCrawlin: boolean;
    private memoryQueue: ISiteQueuer;
    private webCrawler: ISiteCrawler;
    private consecutiveEmptyDequeue: number = 0;

    constructor(memoryQueue: ISiteQueuer, webCrawler: ISiteCrawler){
        this.memoryQueue = memoryQueue;
        this.webCrawler = webCrawler;
    }
    
    public async StartCrawl() {
        this.keepCrawlin = true;
        while(this.keepCrawlin){
            let nextPage = await this.memoryQueue.dequeue();
            if(!nextPage) {
                console.debug("No pages to crawl");
                await sleep(++this.consecutiveEmptyDequeue*200);
                continue;
            }
            this.consecutiveEmptyDequeue = 0;
            await this.webCrawler.crawl(nextPage);
            }
    }

    public StopCrawl(){
        this.keepCrawlin = false;
    }

}