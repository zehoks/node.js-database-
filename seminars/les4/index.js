const express = require('express')
const app = express()

app.route('/get').get((req, res) => {
    res.send('hiii mirok')
})

app.route('/group/:group').get((req, res) => {
   // console.log(req)// много данных в терминале
    //из params объекта мы можем достать свойство
    const group = req.params.group
    res.send(`hiiii ${group}`)
})

app.listen(8080, () => {
    console.log('Server started!!!!! on http://localhost:8080')
})

////
//
