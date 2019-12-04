import { WebCrawler } from "./classes/WebCrawler";
import { RedisQueuer } from "./classes/RedisQueuer";
import Redis = require('redis');

const sleep = require('sleep-promise');
//const cheerioInst = require('cheerio');


const memoryQueue = new RedisQueuer(Redis.createClient(6379, "127.0.0.1"));
let webCrawler = new WebCrawler(memoryQueue);
//https://www.alexa.com/topsites

async function ScanPages(){
    while(true){
    let nextPage = await memoryQueue.dequeue();
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
