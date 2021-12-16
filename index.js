const express = require('express')
const path = require('path')


// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '5e0e188505a149c98ebd78c416431bdc',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
let students = []

const app = express()
app.use(express.json())



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `/public/index.html`))
    rollbar.info('html file served corretly')
})
app.post(`/api/student`, (req, res)=> {
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student added successfully', {author: 'jake'})

    res.status(200).send(students)
})


const port = process.env.PORT || 4545 
app.use(rollbar.errorHandler())
app.listen(port, () => console.log('take us to warp '))

