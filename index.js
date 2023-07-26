const express = require('express')
const app = express()

app.get('/',(req,res) => {
    res.send('hello world')
})

app.get('/abaout',(req,res) => {
    res.send('pagina abaout')
})
app.listen(5000,()=>{
    console.log('server asdas')
})