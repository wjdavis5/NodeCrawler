import { RedisQueuer } from "./classes/RedisQueuer";
import { CrawlerBot } from "./classes/CrawlerBot";
import Redis = require('redis');
import { CrawlerFactory } from "./classes/CrawlerFactory";


const memoryQueue = new RedisQueuer(Redis.createClient(6379, "127.0.0.1"));
let webCrawlerFactory = new CrawlerFactory();
let crawlerBot = new CrawlerBot(memoryQueue,webCrawlerFactory,4);

crawlerBot.StartCrawl();
