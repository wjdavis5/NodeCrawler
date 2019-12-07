import { WebCrawler } from "./classes/WebCrawler";
import { RedisQueuer } from "./classes/RedisQueuer";
import { CrawlerBot } from "./classes/CrawlerBot";
import Redis = require('redis');


const memoryQueue = new RedisQueuer(Redis.createClient(6379, "127.0.0.1"));
let webCrawler = new WebCrawler(memoryQueue);
let crawlerBot = new CrawlerBot(memoryQueue,webCrawler);

crawlerBot.StartCrawl();
