const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    company: {
        type: String
    }
})

const Employee = mongoose.model('Employee', employeeSchema)

app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.render(__dirname + '/public/index.html')
})

app.post('/employee-form', (req, res) => {

    const employee = new Employee({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        company: req.body.company
    })
    console.log(employee)
    employee.save()
    res.json(employee)
})

app.post('/employee-detail', (req, res) => {

    const id = req.body.id
    employee = Employee.findById(id, (err,result)=>{
        console.log(result)
        res.json(result)
    })
})

app.get('/employee-list', (req, res) => {
    Employee.find({}, (err,result)=>{
        console.log(result)
        res.json(result)
    })
})

app.listen(3003, () => {
    console.log(`this application started at port 3003`);
})