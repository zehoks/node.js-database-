require('dotenv').config()
const express = require('express')
const pool = require('./config/db')
const app = express()

app.route('/now').get(async(req, res) => {
    const pgclient = await pool.connect()
    //создаст переменную rows и можно будет сразу с ней работать
    //    (такая конструкция уже была мб в les2)
    const { rows } = await pgclient.query('SELECT now()')
    await pgclient.release()
    res.send(rows[0].now)
    return
})
app.route('/user_order/:id').get(async (req, res) => {
    let pgclient
    try { 
        //значение из URL
        const { id } = req.params
        pgclient = await pool.connect()
        const { rows } = await pgclient.query(`
        SELECT id, name, created_at
        FROM order_
        WHERE client__id = $1
        ORDER BY created_at DESC
    `, [id])
    
        res.send(rows)
    } catch (err) {
        res.status(500).send({
            error:err.message
        })
        console.error(err)
    } finally {
        await pgclient.release()
        console.log('close db connection')
    }
})

app.route('/make_order/:id').get(async (req, res) => {
    //todo получать id не параметра, а их токена
    let pgclient
    try {
        pgclient = await pool.connect()
        const { id } = req.params
        const { rows } = await pgclient.query(`INSERT INTO order_ (client__id)
        VALUES ($1) RETURNING id
        `, [id])
        const orderID = rows[0].id
        res.send({
            order_id:orderID
        })
         //1. todo нужно определиться со структурой, которую будем передавать
        // Возможно такая структура:
        
    }catch (err) {
        res.status(500).send({
            error:err.message
        })
        console.error(err)
    } finally {
        await pgclient.release()
    }
})

app.route('/clients/:id').get(async (req, res) => {
    let pgclient
    try {
        pgclient = await pool.connect()
        const { id } = req.params
        const { rows } = await pgclient.query(`
        SELECT id,client__id, address, phone
        FROM order_
        WHERE id = $1
        ORDER BY id DESC
        `, [id])
        res.send(rows)
        
    } catch (error) {
        res.status(500).send({
            error:err.message
        })
        console.error(err)
    } finally {
        await pgclient.release()
    }


})

app.listen(8080, () => {
    console.log('Server started!!!!! on http://localhost:8080')
})

//если мы "открываем" запрос к api, то нужно прописать и его "закрытие", 
//пушо тогда сервак постоянно будет крутиться и ожидать нас