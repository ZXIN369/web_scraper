const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
const PORT = 8000
const URL = 'https://www.theguardian.com/uk'


axios(URL)
    .then(res => {
        const html = res.data
        // console.log(html)
        const $ = cheerio.load(html)
        const articles = []
        $('.fc-item__title', html).each(function(){
            const title = $(this).text()
            const link = $(this).find('a').attr('href')
            articles.push({
                title,
                link
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))


app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))