import { WebCrawler } from "./classes/WebCrawler";
import { MemoryQueuer } from "./classes/MemoryQueuer";
const sleep = require('sleep-promise');
//const cheerioInst = require('cheerio');


const memoryQueue = new MemoryQueuer();
let webCrawler = new WebCrawler(memoryQueue);
//https://www.alexa.com/topsites

async function ScanPages(){
    while(true){
    let nextPage = memoryQueue.dequeue();
    if(!nextPage) {
        console.debug("No pages to crawl");
        await sleep(200);
        continue;
    }
    webCrawler.crawl(nextPage);
    }
}

webCrawler.crawl("https://www.alexa.com/topsites");
ScanPages();
