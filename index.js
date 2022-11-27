const express = require('express');
const scraper = require('./NewsScraper');
var cron = require('node-cron');

const articles = require('./articles.json');

const api = express();
const PORT = process.env.PORT || 5000;

api.use(express.json());

cron.schedule('0 0 * * *', () => {
    //every day you want to scrape the data
    scraper.newsScraper();
  });

api.get('/', (req, res) => {
    res.send('Welcome to the Kadena MarketCap API');
});

//GET news articles 
api.get('/articles', async(req, res) => {
    try{ 
        res.json(articles);
    }
    catch(e){
        res.json(e);
    }
})

//GET KDA events
// api.get('/events', async(req, res) => {
//     try{ 
//         res.json(events);
//     }
//     catch(e){
//         res.json(e);
//     }
// })

api.listen(PORT, () => console.log(`Server running on port ${PORT}!`));