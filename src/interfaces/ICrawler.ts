interface ISiteCrawler {
    siteQueuer: ISiteQueuer;
    crawl(uri: IPage);
}



