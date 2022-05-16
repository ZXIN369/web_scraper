const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 8000
const URL = 'https://www.theguardian.com/uk'
const TAG = 'a'
const ATTRIBUTE = 'href'

//app.METHOD(PATH, HANDLER)
// app.get() // get data
// app.post() // add data
// app.put() // edit data
// app.delete() // delete data

app.use(cors())

app.get('/', (req, res)=> {
    res.json('This web-scraper is running')
})

app.get('/results', (req, res)=> {
    axios(URL)
        .then(response => {
            const html = response.data
            // console.log(html)
            const $ = cheerio.load(html)
            const articles = []
            $('.fc-item__title', html).each(function(){
                const title = $(this).text()
                const url = $(this).find(TAG).attr(ATTRIBUTE)
                articles.push({
                    title,
                    url
                })
            })
            // console.log(articles)
            res.json(articles)
        }).catch(err => console.log(err))
})



app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))