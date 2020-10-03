require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// Оформление нового ззаказа
// 1)Создаем новый заказ и получаем его ID
// 2)Подсчитываем цену заказа
// 3)Каждый Tоваp из заказа добавить в таблицу order_menu

async function creatOrder() {
    client.connect()
    //входные параметры для нового заказа
    const order = {
        clientID: 1,
        menu: {
            id: 1,
            count: 1,
        },
        // menu: [
        //     {
        //         id:1,
        //         count:1
        //     },
        //     {
        //         id:3,
        //         count:3,
        //     },
        // ],
    }

    //Cоздали заказ и получили его ID
    const resOrderID = await client.query(
        `INSERT INTO order_ (client__id) VALUES ($1) RETURNING id `, //$1 начит всего один атрибут
        [order.clientID]
    )
    const orderID = resOrderID.rows[0].id //rows выдает результат в виде масива который нам нужен, .id так как RETURNING id
    console.log(resOrderID.rows[0])

    const resPrice = await client.query(
        `SELECT id,price::numeric
    FROM menu
    WHERE id =$1 `,
        [order.menu.id]
    )
    const price = resPrice.rows[0].price * order.menu.count
    await client.query(
        `INSERT INTO order_menu (order_id, menu_id, count, price) VALUES  ($1, $2, $3, $4)`,
        [orderID, order.menu.id, order.menu.count, price]
    )

    await client.end()
}
creatOrder()
    .then(() => {
        console.log('success')
    })
    .catch((err) => {
        console.log('error', err)
    })
// // const id = 1

// // client.connect()
// // client
// //     .query(
// //         `SELECT *
// //       FROM discount
// //        WHERE id = $1`,
// //         [id]
// //     )
// //     .then((result) => console.log(result.rows))
// //     .catch((e) => console.log(e.stack))
// //     .then(() => client.end())
// // ctrl+k+c
// ctrl+k+u

// client.query(
//     `SELECT *
//     FROM discount
//     WHERE id = $1`,
//     [id],
//    function (err, res) {
//         console.log(1)
//         if (err) {
//             console.log(err)
//         }
//         if (res) {
//             console.log(err, res.rows)
//         }
//         client.end() //если конект открыт, то его нужно и закрыть
//     }
// )
// console.log(2)
