import Redis = require('redis');
const {promisify} = require('util');

export class RedisQueuer implements ISiteQueuer {

    private redisClient: Redis.RedisClient;
    private queueName: string;
    private scannedSetName: string;
    private rPopAsync: any
    constructor(redisClient: Redis.RedisClient) {
        this.redisClient = redisClient;
        this.queueName = "WebCrawlerQueue";
        this.scannedSetName = "ScannedSites";
        this.rPopAsync = promisify(this.redisClient.rpop).bind(this.redisClient);
    }

    queue(uri: string) {
        let numInserted: number = Number(this.redisClient.sadd(this.scannedSetName,uri));
        if(numInserted <= 0){
            console.debug("Ignoring already scanned: " + uri);
            return;
        }
        console.debug("Queuing url: " + uri);
        this.redisClient.lpush(this.queueName,uri);
    }

    public async dequeue(): Promise<string> {
        let uri: string = await this.rPopAsync(this.queueName)
        //console.debug("DeQueue uri: " + uri);
        return uri;
    }
}
