require('dotenv').config()//чтобы подгрузить параметры окружения
const express = require('express')
const pool = require('./config/db')///благодаря exports мы смогли подключиться к настройкам подключения 
//bodyparser чтобы была возможность парсить body
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// TODO API:
// 1) POST /sign_in - Войти в систему. 
//    Передаваться будет email, password.
//    Нужно проверить, что пользователь в таким email и password
//    существует.
// 2) GET /menu Получить меню. Без параметров 
//      (TODO: добавить пагинацию, сортировку и фильтры (поиск по цене, по весу))
// 3) DELETE /user_order/:id - (id - id заказа)

app.route('/now').get(async(req, res) => {
    const pgclient = await pool.connect()
    //создаст переменную rows и можно будет сразу с ней работать
    //    (такая конструкция уже была мб в les2)
    const { rows } = await pgclient.query('SELECT now()')
    await pgclient.release()
    res.send(rows[0].now)
    return
})
//все заказы конкретного пользователя
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
//

app.route('/menu').get(async (req, res) => {
    let pgclient = await pool.connect()
    try {
        const { id } = req.params
        pgclient = await pool.connect()
        const { rows } = await pgclient.query(`
        SELECT id, name, price
        FROM menu
        `, [id])
        res.send(rows)
    } catch (error) {
    res.status(500).send({
            error:err.message
        })
        console.error(err) 
    } finally {
        await pgclient.release()
        console.log('close db connection')
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
    //todo получать id не параметра, а их токена
    // TODO: обработать ошибку, когда подключиться не удалось
    let pgclient = await pool.connect() //пропускает всю процедуру, если не будет подключения
    try {
        const { id } = req.params
        //открываем транзакцию
        await pgclient.query('BEGIN')
        //создали заказ и получили ID
        //rows -деструктуризация
        const { rows } = await pgclient.query(`INSERT INTO order_ (client__id)
        VALUES ($1) RETURNING id
        `, [id])
        const orderID = rows[0].id
        //делаем цикл по body, чтобы подготовить запрос на получение цены
        //по каждому товару из заказа
        //параметры для подготовки IN запроса
        //пример: IN ($1, $2, $3 )
        let values = [] // ["$1, $2, $3"]
        let params = [] // [1, 2, 3]
        for (const [i, item] of req.body.entries()) {
            params.push(`$${i + 1}`)
            values.push(item.menu_id)
        }


        //получить стоимость из меню
        const { rows: costQueryRes } = await pgclient.query(`
        
        SELECT id,price::numeric
        FROM menu
        WHERE id IN(${params.join(',')})`, values // в качестве параметров мы всегда передаем массив
            //поэтому пишем velues, если бы velues не был бы массиов, мы бы написали []
        )
        //мы хотим создать новую переменную, которая будет включать тоже самое, что
        //и входной bod, только с вычесленной ценой
        let orderWithCost = []
        for (const item of req.body) {
            // и для каждого элемнта найти цену в costQuery
            //получение при помощи запроса
            let cost = null
            for (const costitem of costQueryRes) {
                //ищем совпадение id в costQuery c menu_id переданном в body
                if (costitem.id == item.menu_id) {
                    cost = costitem.price
                }
            }
            if (!cost) {
            throw new Error(`Not found in menu: ${item.menu.id}`)
        }
        console.log(`COST:`, cost )
        orderWithCost.push({
            ...item,
            cost:cost*item.count//найденную стоимость  на кол-во
        })

        }

        
            //добавляем все продукты заказа в order_menu
        //оптимальный вариант это генирировать один INSERT 
        // который сразу добавит все в таблицу order_menu
        //(как мы делали раньше), Но тут попоробуем сделать с Promise.all
        //т.е. отправить одновременно в базу все запросы, а уже после
        //отправки эжать выполнение их всех вместе
        let promises = []
        for (const item of orderWithCost) {
        promises.push(pgclient.query(
        `INSERT INTO order_menu (order_id, menu_id, count, price) 
        VALUES ($1, $2, $3, $4);`,
        [orderID, item.menu_id, item.count, item.cost]
        ))
        }

        //ждем, когда выполнятся все запросы
        await Promise.all(promises)
        //коммитим 
        await pgclient.query('COMMIT')
        //тут cost либо null, либо null, либо с значением цены, и если cost null
        
        res.send({
            order_id:orderID
        })
         //1. todo нужно определиться со структурой, которую будем передавать
        // Возможно такая структура:
        
    } catch (err) {
        //
        await pgclient.query('ROLLBACK')
        res.status(500).send({
            error:err.message
        })
        console.error(err)
    } finally {
        await pgclient.release()
    }
})

//зарегаться
app.route('/sign_up').post(async (req, res) => {
    const { name,
        address,
        phone,
        email,
        password } = req.body
    
    let pgclient = await pool.connect()
    try {
    const {rows} =  await pgclient.query(`
    INSERT INTO client_ (name,address,phone,email,password VALUES ($1,$2,$3,$4) RETURNING id; )
        `, [name,address,phone,email,password])
    
        res.send({
            od:rows[0].id
        })
} catch (error) {
    res.status(500).send({
            error:err.message
        })
        console.error(err)
} finally {
    await pgclient.release()
    }
    
})

app.route('/sign_in').post(async (req, res) => {

    let pgclient = await pool.connect()
    try {
        const {email,password} = req.body
        const { rows } = await pgclient.query(`
        SELECT id
        FROM client_
        WHERE email = ($1) AND password = ($2)    
        `, [email], [password])
        res.send({
            od:rows[0].id
        })

    } catch (error) {
    res.status(500).send({
            error:err.message
        })
        console.error(err)
    } finally {
        await pgclient.release()
    }
})

app.route('/user_order/:id').post(async (req, res) => {
    let pgclient
    try {
        pgclient = await pool.connect()
        const { id } = req.params
        const { rows } = await pgclient.query(`DELETE
        FROM order
        WHERE id = ($1)
        RETURNING id`, [id])
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