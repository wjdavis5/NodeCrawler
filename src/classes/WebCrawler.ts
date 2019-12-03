import request = require('request-promise');
import cheerio = require('cheerio');

export class WebCrawler implements ISiteCrawler {

    siteQueuer: ISiteQueuer;
    
    constructor(queuer: ISiteQueuer) {
        this.siteQueuer = queuer;
    }

    public async crawl(uri: string) {
        let page: string
        console.log("Loading page: " + uri);
        await request.get(uri)
            .then((body) => {page = body;})
            .catch((err) => {console.debug(err);});
        console.debug(page);

        let foundUris: Array<string> = await this.getUris(page);
        foundUris.forEach(element => {
            console.debug(element);
            this.siteQueuer.queue(element);
        });
    }

    public async getUris(body: string){
        const foundUris: Array<string> = new Array<string>();

        let cheerioPage = cheerio.load(body);
        const aTags = cheerioPage('a');
        for(let i = 0; i <aTags.length; i++){
            let href: string = aTags[i].attribs.href;
            if(href.indexOf("#") != -1)continue;
            if(href.indexOf("http") === -1)continue;
            foundUris.push(href);
        }

        return foundUris;
    }
}




