const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const sqlHelper = require('./sqlLiteHelper');
const emailHelper = require('./email')
const { response } = require('express');const cors = require('cors');

app.use(bodyParser.json({ extended: false }));


app.use(cors({
    origin: '*', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
app.get('/heartbeat', (req, res) => {
    return res.send("It works...This is not your problem... :)")
})

app.post('/insertNameToSqlDB', async (req, res) => {
    try{
       console.log("Request", req.body)
       firstName = req.body.firstName
       lastName = req.body.lastName
       jobNumber = req.body.jobNumber
       jobStatus = req.body.jobStatus
       createdAt = req.body.createdAt
       dueDate = req.body.dueDate
       let result = await sqlHelper.insertJobsDataIntoSqliteDb(firstName,lastName,jobNumber,jobStatus,createdAt, dueDate)
       console.log("Successfully put data ", result)
       return res.send("Query: "+ result)
    }
    catch(error) {
        return ("Error", error)
    }
})

app.post('/remind', async (req, res) => {
    try{
       let emailParams = req.body
       console.log("Hello World", emailParams)
       let result = await emailHelper.sendEmail(emailParams)
       return await res.send(emailParams)    }
    catch(error) {
        return ("Error", error)
    }
})


app.post('/deleteBasedOnJobNumber', async (req, res) => {
    try{
        jobNumber = req.body.jobNumber
       console.log("Request", req.body)
       let result = await sqlHelper.removeDataFromDb(jobNumber)
       return res.status(200).send(jobNumber)    }
    catch(error) {
        return ("Error", error)
    }
})

app.get('/showDataToClient',  (req, res) => {
    try {
        
        let result =  sqlHelper.getJobData()
        console.log("Return from database", result)
        setTimeout(() =>{
           return  res.json({'success' : true, 'result': result})
        },"1000")

    } catch (error) {
        console.log("There was an error", error)
    }
})

app.post('/updateUsers', (req, res) => {
    try {
        console.log("Trying...")
        let id = req.body.id
        let first_name = req.body.firstName
        let last_name = req.body.lastName
        let role = req.body.role
        let createdAt = req.body.createdAt
        let result = sqlHelper.insertUsersToDB(id, first_name, last_name, role, createdAt)
        console.log("we are alive ", result)
        return res.send(result)
    }
    catch(error) {
        console.log("Error", error)
    }
})

app.get('/showUsers',  (req, res) => {
    try {
        let result =  sqlHelper.getUsers()
        console.log("Return from database", result)
        setTimeout(() =>{
           return  res.json({'success' : true, 'result': result})
        },"1000")

    } catch (error) {
        console.log("There was an error", error)
    }
})

app.listen(port, () => {
    console.log(`Listening on: ${port}`)
  })