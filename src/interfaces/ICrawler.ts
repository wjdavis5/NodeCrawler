interface ISiteCrawler {
    siteQueuer: ISiteQueuer;
    crawl(uri: string);
}



