const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const newsScraper = async() => { 
    const news = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.coindesk.com/search?s=kadena`);

    //determine how many pages there are
    const[el0] = await page.$x('//*[@id="queryly_advanced_container"]/div[5]/div[2]/button[6]/h6');
    const pages = await el0.getProperty('textContent');
    const mpages = pages.jsonValue();
    const maxpages = await mpages;

    for(let i = 0; i < +maxpages; i++){
        for(let j = 2;  j < 11; j++){
            const[el] = await page.$x(`//*[@id="queryly_advanced_container"]/div[5]/div[1]/div[${j}]/div/div/div/a[2]/h6`);
            const text = await el.getProperty('textContent');
            const title = await text.jsonValue();
            
            const [el2] = await page.$x(`//*[@id="queryly_advanced_container"]/div[5]/div[1]/div[${j}]/div/div/a`);
            const link = await el2.getProperty('href');
            const url = await link.jsonValue();

            const [el3] = await page.$x(`//*[@id="queryly_advanced_container"]/div[5]/div[1]/div[${j}]/div/div/a/img`);
            const src = await el3.getProperty('src');
            const imageURL = await src.jsonValue();

            const [el4] = await page.$x(`//*[@id="queryly_advanced_container"]/div[5]/div[1]/div[${j}]/div/div/div/div/div/h6`);
            const time = await el4.getProperty('textContent');
            const date = await time.jsonValue();

            news.push({title, url, imageURL, date})
            }
        const button = await page.$x('//*[@id="queryly_advanced_container"]/div[5]/div[2]/button[7]');
        await button[0].click();
    }

    browser.close();
    console.log(news);

    fs.writeFile(path.join(__dirname, 'articles.json'), JSON.stringify(news, null), (err) => {
        if(err) throw err;
        console.log('Write operation complete!');
    });

    return;
}

module.exports = { 
    newsScraper
}