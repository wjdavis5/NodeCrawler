interface ICrawlerBot { 
    StartCrawl(): Promise<any>;
    StopCrawl(): any;
}