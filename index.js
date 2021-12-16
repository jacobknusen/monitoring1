const express = require('express')
const path = require('path')


// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '5e0e188505a149c98ebd78c416431bdc',
  captureUncaught: true,
  captureUnhandledRejections: true,
})


const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `/public/index.html`))
    rollbar.info('html file served corretly')
})

const port = process.env.PORT || 4545 
app.listen(port, () => console.log('take us to warp '))