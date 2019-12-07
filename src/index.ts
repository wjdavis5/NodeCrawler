import { WebCrawler } from "./classes/WebCrawler";
import { RedisQueuer } from "./classes/RedisQueuer";
import Redis = require('redis');
const sleep = require('sleep-promise');


const memoryQueue = new RedisQueuer(Redis.createClient(6379, "127.0.0.1"));
let webCrawler = new WebCrawler(memoryQueue);

async function ScanPages(){
    while(true){
    let nextPage = await memoryQueue.dequeue();
    if(!nextPage) {
        console.debug("No pages to crawl");
        await sleep(200);
        continue;
    }
    await webCrawler.crawl(nextPage);
    }
}
const maxInstances: number = 40;
const instanceContainer: Array<any> = new Array<any>();
while(instanceContainer.length < maxInstances){
    instanceContainer.push(ScanPages());
}
