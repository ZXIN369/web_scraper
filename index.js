const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 8080
// const URL = 'https://www.theguardian.com/us'
const URL = 'https://www.cnbc.com/'
const TAG = 'a'
const ATTRIBUTE = 'href'
// const CLASS = '.fc-item__title'
const CLASS = '.RiverHeadline-headline'

//app.METHOD(PATH, HANDLER)
// app.get() // get data
// app.post() // add data
// app.put() // edit data
// app.delete() // delete data

app.use(cors())

app.get('/', (req, res)=> {
    res.json('This web-scraper is running')
    console.log('::> defaul message')
})

app.get('/feeds', (req, res)=> {
    axios(URL)
        .then(response => {
            const html = response.data
            // console.log(html)
            const $ = cheerio.load(html)
            const articles = []
            $(CLASS, html).each(function(){
                const title = $(this).text()
                const url = $(this).find(TAG).attr(ATTRIBUTE)
                articles.push({
                    title,
                    url
                })
            })
            console.log('::> show feeds')
            console.log(articles)
            res.json(articles)
        }).catch(err => console.log(err))
})



app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))