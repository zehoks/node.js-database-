const pool = require('../../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = 'jwt_secret_value'

/**
 * signUp регистрирует нового клиента и
 * возвращает токен
 * @param {object} client_ 
 * @param client_.name Client name
 * @param client_.address
 * @param client_.phone
 * @param client_.email
 * @param client_.password
 */


async function signUp(client_) { 
    const hash = await bcrypt.hash(client_.password, 8)
    

    const { rows } = await pool.query(`
    INSERT INTO client_ (name,address,phone,email,password
    VALUES ($1,$2,$3,$4) RETURNING id; )
    `,[client_.name, client_.address, client_.phone, client_.email, hash])
    
    return jwt.sign(
        {
            id: rows[0].id,
            email: rows[0].email
        },
        secret, {
        expiresIn: '1d',
        }
    
    )
}

/**
 * signIn ищет пользователя по email
 * и проверяет подлинность пароля, генерирует токен
 * @param {*} email 
 * @param {*} password 
 */

async function signIn(email, password) {
    const { rows } = await pool.query(`
        Select id,email,password
        FROM client_
        WHERE email = $1

    `, [email]
    )
    // если пользователь с таким email
    // не найден 
    if (rows.length == 0) {
            throw new Error('User not found')
            
        }
        // проверяем правильность пароля 
        const isValid = await  bcrypt.compare(password, rows[0].password)
        if (!isValid) {
            throw new Error('User not found')
        }
         // если правильность введённых данных пользователем
        // подтверждена
        // expiresIn: "1d", токен живет один день и его нельзя убрать
    return jwt.sign(
        {
        id: rows[0].id,
        email: rows[0].email
        },
        secret, {
            expiresIn: "1d",
        })
}

module.exports = {
    signIn,
    signUp
    
}