const express = require('express');
const router = express.Router();
const cors = require('cors');

const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

async function fetchUrlTitle(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const title = $('title').text().trim();

        return { title };
    } catch (error) {
        const alternativeTitle = new URL(url);
        return { title: alternativeTitle.hostname };
    }
}

router.get('/title', async (req, res) => {
    const requestUrl = req.query.url
    const fetchedtitle = await fetchUrlTitle(requestUrl)
    res.json(fetchedtitle)
})


module.exports = router