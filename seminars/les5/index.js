require('dotenv').config()//чтобы подгрузить параметры окружения
const express = require('express')
//bodyparser чтобы была возможность парсить body
const bodyParser = require('body-parser')
//const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = 'jwt_secret_value'
//Services
const clientService = require('./services/client')
const menuService = require('./services/menu')
const orderService = require('./services/order')

const app = express()
// чтобы парсить application/json
app.use(bodyParser.json())

// TODO API:
// 3) DELETE /user_order/:id - (id - id заказа)


/**
 * checkAuth валидирует токен,
 * в случае успеха возвращает payload
 * @param {*} req
 */
async function checkAuth(req){
    const authHeader = req.headers.Authorization


    let token 
    if (authHeader) {
        const h = authHeader.split(' ')
        if (h[0] !== 'Bearer') {
            throw new Error('Allowed only Bearer token')
        }

        token = h[1]
    } else {
        throw new Error ('Token not found')
    }

return jwt.verify(token,secret)

}


//все заказы конкретного пользователя
//id пользователя берется из токена
app.route('/user_order').get(async (req, res) => {
    let tokenPaylod
    try {
    tokenPaylod = await checkAuth(req)
    } catch (err) {
        res.status(401).send({
        error: err.message
    })
        return
    }

    let pgclient
    try {
    const order = await orderService.findOrderByClientID(tokenPaylod.id)

    res.send( order)
    } catch (err) {
    res.status(500).send({
    error: err.message
    })
    console.error(err)
    } finally {
    // Не забываем всегда закрывать соединение с базой
    await pgclient.release()
    }
})
//

app.route('/menu').get(async (req, res) => {
    const { name } = req.query

    try {
        const menu = await menuService.findMenu(name)
        res.send(menu)
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
})


///
//сделать новый заказ
// Структура body    
//      {
//     "menu_id":1,
//     "count":2
//     }
app.route('/make_order/:id').post(async (req, res) => {
    try {
        const { id } = req.params
        const orderID = await orderService.makeOrder(id, req.body)
        res.send({
            order_id:orderID
        })
         //1. todo нужно определиться со структурой, которую будем передавать
        // Возможно такая структура:
        
    } catch (err) {
        //
        res.status(500).send({
            error:err.message
        })
    } 
})

//зарегаться
app.route('/sign_up').post(async (req, res) => {
    const { name,
        address,
        phone,
        email,
        password } = req.body
    
    
    try {
        const token = await clientService.signUp({
            name,
            address,
            password,
            phone,
            email

        })
        res.send({
            id: token
        })
} catch (err) {
    res.status(500).send({
            error: err.message
        })
        console.error(err)
} 
    
})

app.route('/sign_in').post(async (req, res) => {

    const {
        email,
        password
    } = req.body
    try {
        const token = await clientService.signIn(email, password
        )
        
        res.send({
                token
            })
        

    } catch (err) {
        res.status(500).send({
    error: err.message
    }) 
    }

})


app.listen(8681, () => {
    console.log('Server started!!!!! on http://localhost:8080')
})

//если мы "открываем" запрос к api, то нужно прописать и его "закрытие", 
//пушо тогда сервак постоянно будет крутиться и ожидать нас