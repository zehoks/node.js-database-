const pool = require('../../config/db')

/**
 * 
 * 
 * @param {string} name - название продукта
 */

async function findMenu(name) {
    let query = `
SELECT *
FROM menu
WHERE 1=1
    `

    const values = []

    if (name) {
        query += 'AND name ILIKE $1'
        values.push(`%${name}%`)
    }

    

    console.log(query)

    const { rows } = await pool.query(query, values)
    return rows
}

module.exports = {
    findMenu,
}