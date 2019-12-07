interface ICrawlerFactory{
    GetCrawler(memoryQueue: ISiteQueuer): ISiteCrawler;
}