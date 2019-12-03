import { WebCrawler } from "./classes/WebCrawler";
import { MemoryQueuer } from "./classes/MemoryQueuer";

//const cheerioInst = require('cheerio');


const memoryQueue = new MemoryQueuer();
let webCrawler = new WebCrawler(memoryQueue);
webCrawler.crawl("https://wtfismyip.com");

