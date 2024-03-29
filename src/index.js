const express = require('express');
const requests = require('requests');
const { apikey } = require('./config');
const cors = require('cors')
const app = express();  //initialize app
const port = process.env.PORT || 8000

app.use(cors())

app.get('/',(req,res)=>{
    res.send('welcome to home page')
});
app.get('/temp',(req,res)=>{
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${apikey}`)
            .on('data', (chunk) => {
                // console.log(chunk)
                res.write(chunk);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.send()
                // console.log('end');
            })
});
app.get('*',(req,res)=>{
    res.send('error 404!,record not found...')
});
app.listen(port,()=>{
    console.log(`server run on port ${port}`);
})