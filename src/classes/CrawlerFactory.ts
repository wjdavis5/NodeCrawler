import { WebCrawler } from "./WebCrawler";

export class CrawlerFactory implements ICrawlerFactory{
    
    GetCrawler(memoryQueue: ISiteQueuer): ISiteCrawler {
        return new WebCrawler(memoryQueue);
    }

}