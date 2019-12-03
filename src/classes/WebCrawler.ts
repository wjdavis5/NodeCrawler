import request = require('request-promise');
import cheerio = require('cheerio');

export class WebCrawler implements ISiteCrawler {

    siteQueuer: ISiteQueuer;
    private scannedUris: Array<string>;
    
    constructor(queuer: ISiteQueuer) {
        this.siteQueuer = queuer;
        this.scannedUris = new Array<string>();
    }

    public async crawl(uri: string) {
        if(this.scannedUris.includes(uri)){
            console.debug("Not adding already scanned item")
            return;
        }
        this.scannedUris.push(uri);
        let page: string
        console.log("Loading page: " + uri);
        await request.get(uri)
            .then((body) => {page = body;})
            .catch((err) => {console.debug(err);});
        console.debug(page);

        let foundUris: Array<string> = await this.getUris(page);
        foundUris.forEach(element => {
            console.debug(element);
            if(this.scannedUris.includes(element)){
                console.debug("Not adding already scanned item")
                return;
            }
            this.siteQueuer.queue(element);
        });
    }

    public async getUris(body: string){
        const foundUris: Array<string> = new Array<string>();

        let cheerioPage = cheerio.load(body);
        const aTags = cheerioPage('a');
        for(let i = 0; i < aTags.length; i++){
            let href: string = aTags[i].attribs.href;

            //ignore page anchors
            if(href.indexOf("#") != -1)continue;
            //not handling relative uris right now
            if(href.indexOf("http") === -1)continue;
            foundUris.push(href);
        }

        return foundUris;
    }
}




