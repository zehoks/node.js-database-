require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const id = 1

client.connect()
client
    .query(
        `SELECT *
      FROM discount
       WHERE id = $1`,
        [id]
    )
    .then((result) => console.log(result.rows))
    .catch((e) => console.log(e.stack))
    .then(() => client.end())
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
console.log(2)
