require('dotenv').config()
const express = require('express')

// body parser, чтобы была возможность парсить body
const bodyParser = require('body-parser')

//allow cors
var cors = require('cors')

// Middleware
const authMiddleware = require('./midleware/auth')

// Services
const clientService = require('./services/client')
const menuService = require('./services/menu')
const orderService = require('./services/order')

const app = express()
// чтобы парсить application/json
app.use(bodyParser.json())
app.use(cors())

// TODO API (д):
// 1) По id заказа order_menu возвращать состав заказа (с названием продуктов)
// 2) DELETE /user_order/:id - (id - id заказа)

app.route('/menu').get(async (req, res) => {
const { name } = req.query

try {
    const menu = await menuService.findMenu(name)
    res.send(menu)
    } catch (err) {
    res.status(500).send({
    error: err.message,
    })
    }
})

// Все заказы конкретного пользователя
// id пользователя берётся из токена
app.route('/user_order').get(authMiddleware, async (req, res) => {
try {
    const order = await orderService.findOrderByClientID(req.client_.id)
    res.send(order)
    } catch (err) {
    res.status(500).send({
    error: err.message,
    })
    }
})

// Сделать новый заказ
app.route('/make_order').post(authMiddleware, async (req, res) => {
try {
    const orderID = await orderService.makeOrder(req.client_.id, req.body)

    res.send({
        order_id: orderID,
    })
    } catch (err) {
    res.status(500).send({
    error: err.message,
    })
    }
})

app.route('/sign_in').post(async (req, res) => {
const { email, password } = req.body

    try {
    const token = await clientService.signIn(email, password)

    res.send({
    token,
    })
    } catch (err) {
    res.status(500).send({
    error: err.message,
    })
    }
})

// Зарегистрироваться
app.route('/sign_up').post(async (req, res) => {
  // Если какой-то из параметров не будет передан, то
  // будет SQL ошибка (NOT NULL contraint)
  // По хорошему, нам надо тут проверить, что
  // параметры, которые не могут быть NULL переданы
    const { name, address, phone, email, password } = req.body

try {
    const token = await clientService.signUp({
    name,
    address,
    password,
    phone,
    email,
    })

    res.send({
        id: token,
    })
    } catch (err) {
    res.status(500).send({
    error: err.message,
    })
    }
})

app.route('/user_order/:id').delete(async (req, res) => {
    let pgclient
    try {
    const deleteOrderId = await orderService.deleteOrderByClientID(req.client_.id)
    res.send(deleteOrderId) 
    } catch (err) {
        res.status(500).send({
            error:err.message
        })
        console.error(err)
    } finally {
        await pgclient.release()
    }
})
app.listen(80, () => {
    console.log('Server started on http://localhost:80')
})

//если мы "открываем" запрос к api, то нужно прописать и его "закрытие", 
//пушо тогда сервак постоянно будет крутиться и ожидать нас