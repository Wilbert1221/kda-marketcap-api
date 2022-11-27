const { response } = require('express');
const express = require('express');
const scraper = require('./NewsScraper');

const api = express();
const PORT = process.env.PORT || 5000;

api.use(express.json());

api.get('/', (req, res) => {
    res.send('Welcome to the Kadena MarketCap API');
});

//GET news articles 
api.get('/articles', async(req, res) => {
    const news = await scraper.newsScraper(); 
    res.send(news);
})

api.listen(PORT, () => console.log(`Server running on port ${PORT}!`));