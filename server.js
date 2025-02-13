const express = require('express')
const cors = require('cors')
require('dotenv').config()
const routes = require('./backend/routes')
const errorHandler = require('./backend/middlewares/errorHandler'); 



const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)
app.use(errorHandler);


app.get('/', (req, res) =>{
    res.send("Backend esta funcionando!")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Servidor incializado na porta ${PORT}`)
})
