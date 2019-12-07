import Redis = require('redis');
const {promisify} = require('util');

export class RedisQueuer implements ISiteQueuer {

    private redisClient: Redis.RedisClient;
    private queueName: string;
    private scannedSetName: string;
    private rPopAsync: any;
    private sAddAsync: any;
    private lPushAsync: any;
    constructor(redisClient: Redis.RedisClient) {
        this.redisClient = redisClient;
        this.queueName = "WebCrawlerQueue";
        this.scannedSetName = "ScannedSites";
        this.rPopAsync = promisify(this.redisClient.rpop).bind(this.redisClient);
        this.sAddAsync = promisify(this.redisClient.sadd).bind(this.redisClient);
        this.lPushAsync = promisify(this.redisClient.lpush).bind(this.redisClient);
    }

    public async queue(uri: IPage) {
        let numInserted: number = Number(await this.sAddAsync(this.scannedSetName,uri.destUri));
        if(numInserted <= 0){
            console.debug("Ignoring already scanned: " + uri);
            return;
        }
        console.debug("Queuing url: " + uri);
        await this.lPushAsync(this.queueName,JSON.stringify(uri));
    }

    public async dequeue(): Promise<IPage> {
        let uri: any = JSON.parse(await this.rPopAsync(this.queueName));
        //console.debug("DeQueue uri: " + uri);
        return uri;
    }
}
