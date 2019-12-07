import request = require('request-promise');
import cheerio = require('cheerio');
import { Page } from './Page';


export class WebCrawler implements ISiteCrawler {

    siteQueuer: ISiteQueuer;
    
    constructor(queuer: ISiteQueuer) {
        this.siteQueuer = queuer;
    }

    public async crawl(uri: IPage) {
        if(uri.destUri == null){
            return;
        }
        if(uri.destUri === uri.sourceUri){
            console.log("Not scanning page where source matches destination");
            return;
        }
        let page: string
        console.log("Loading page: " + uri);
        await request.get(uri.destUri)
            .then((body) => {page = body;})
            .catch((err) => {console.debug(err);});
        //console.debug(page);

        let foundUris: Array<string> = await this.getUris(page);
        await foundUris.forEach(element => {
            //console.debug(element);
            if(element === uri.destUri || element == uri.sourceUri){
                return;
            }
            this.siteQueuer.queue(new Page(element,uri.destUri));
        });
    }

    public async getUris(body: string){
        const foundUris: Array<string> = new Array<string>();
        try{
            let cheerioPage = cheerio.load(body);
            const aTags = cheerioPage('a');
            for(let i = 0; i < aTags.length; i++){
                try{
                    let href: string = aTags[i].attribs.href;

                    //ignore page anchors
                    if(href.indexOf("#") != -1)continue;
                    if(href.indexOf("mailto") != -1) continue;
                    //not handling relative uris right now
                    if(href.indexOf("http") === -1)continue;
                    foundUris.push(href);
                }
                catch(err){
                    //suppress
                }
                
            }
        }
        catch(err){
            //supress;
        }
        return foundUris;
    }
}




