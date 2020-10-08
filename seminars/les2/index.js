
// // ctrl+k+c
// ctrl+k+u
// подключаем dotenv, который переложит данные из .env в process.env
require('dotenv').config()
// подключаем node-postgres, коннектор к базе PG
const { Client } = require('pg')
// создаем подключение к базе данных
// !!Обратите внимание, я тут переименовал client (как мы использовали раньше)
// на pgclient. Дело в том, что конкретно в этой задаче у нас появляются
// смысловые конфликты. У нас есть переменная глобальная client, которая
// содержить подключение к базе данных, также у нас есть client в базе данных
// чтобы такого не было, я назвал переменную pgclient
const pgclient = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

/**
 * Оформление нового заказа
 * 1. Создаем новый заказ и получем его ID
 * 2. Подсчитываем цену заказа
 * 3. Каждый товар из заказа добавить в таблицу order_menu
 */
async function createOrder() {
    // пытаемся подключиться к базе
    // !тут была ошибка, забыли await. В итоге не ждали, что
    // подключение точно готово (или будет ошибка)
    // У нас работало, потому что успевало подключиться, но могло и не повезти)
    await pgclient.connect()

    // пока мы тупо захордкодили создание нового заказа
    // потом мы можем поменять это на входной параметр и вызывая эту функцию
    // с нужными параметрами - создавать заказ
    //
    // Также пока мы забили на создание заказа с несколькими продуктами
    // К этому придём чуть позже
    const order = {
        clientID: 1,
        // TODO: array menu
        menu: {
            id: 1,
            count: 2,
        },
    }

    // асинхронный код удобно оборачивать в try catch
    // в try находится весь код, в catch он попадёт, если возникнет
    // какая-то ошибка (throw)
    try {
        // pg (node-postgres) достаточно низкоуровневый коннектор, поэтому
        // работаем с базой без всякой магии. Чтобы начать транзакцию -
        // используем BEGIN - https://node-postgres.com/features/transactions
        //
        // Далее все запросы до commit or rollback будут выполняться
        // в транзакции
        await pgclient.query('BEGIN')
        // Создали заказ и получили его ID
        //
        // $1 - мы используем для обозначения параметра,
        // это фишка pg (в других СУБД есть нечто подобно)
        // если в запрос должна подставляться какая-то переменная
        // которая приходит откуда-то, то мы должны использовать только
        // такой вид, потому что он защищает от SQL инъекций
        // параметры (values) которые будут подставляться вместо $1
        // указываются во 2-ом параметре функции в виде массива!
        // Т.е. 1-ый элемент массива подставится вместо $1, второй - вместо $2 и т.д.
        //
        // благодаря RETURNING id - INSERT не просто добавляет данные,
        // а также возвращает указанный атрибут(ы)
        // В данном случае это необходимо
        const resOrderID = await pgclient.query(
            `INSERT INTO order_ (client_id) VALUES ($1) RETURNING id`,
            [order.clientID]
        )
        // resOrderID - это объект, который возвращает pg query
        // тут просто надо обратиться к доке, все данные, которые возвращает
        // запрос находятся в rows. rows всегда массив,
        // тут мы точно знаем, что нам нужен первый элемент массива
        // потому что добавляем только 1 значение. Также наш запрос возвращает
        // только id, поэтому обращение идёт именно таким образом, тут для
        // удобства просто кладём это значение в переменную
        //
        // Примечание: смотрите, я тут дал прям осознанное название переменной
        // resOrderID, но на самом деле это вообще не нужно,
        // мы положили в неё результат запроса и на следующей строчке выкинули
        // поэтому в дальнейшем я буду использовать переменную без смысла для такого
        //
        // На самом деле чем длиннее название переменной, чем дольше она используется
        // и тем она нужнее
        const orderID = resOrderID.rows[0].id
        console.log('new order: ', orderID)

        // Вы можете раскомментить строчку ниже, она отправит код
        // в catch блок
        // Выше в таблицу уже был добавлен новый заказ, если мы сделаем
        // rollback - это изменение в базе не будет сохранено
        // throw 'My Test ERROR'

        // Тут мы получаем из меню стоимость
        // всех продуктов, которые хочет заказать клиент
        // нам это нужно, чтобы посчитать стоимость продуктов, в дальнейшем
        // мы можем вынести это на сторону БД, допустим
        //
        // Обратите внимание, что мы решили заюзать тип money, что не очень
        // решение. Этот тип возвращается именно в виде $10.00 допустим,
        // что как бы не имеет никакого отношения к числовому типу, мы не может
        // в js это спарсить в float. Но можно сделать на стороне базы
        // преобразование типов из money в numeric, это ок для нас, но в целом
        // это плохое решение, нам нужно будет везде преобразовывать, тогда
        // он теряет смысл, можно было сделать сразу в numeric
        //
        // Нам из query нужен конкретный объект (в данных случаях)
        // т.е. мы всегда используем .rows, можно сделать несколько иначе, я покажу
        // в следующем запросе
        const qs = await pgclient.query(
            `
            SELECT id, price::numeric
            FROM menu
            WHERE id = $1
            `,
            // TODO: array
            [order.menu.id]
        )

        // считаем price, умножив цену на количество таких продуктов
        const price = qs.rows[0].price * order.menu.count
        console.log('price:', price)

        // Тут мы добавляем в order_menu наш заказанный продукт
        //
        // Чисто в качестве примера я добавил к запросу RETURNING order_id (он не нужен тут)
        // обратите внимание, что я написал вместо const qs как раньше, я написал
        // деструктуризацию объекта const { rows } - вытащил бы из того результата,
        // который возвращает query - только объект с этим ключом. Т.е. тут создастся
        // const переменная rows!
        // Это аналог, если бы мы положили в результат в переменную qi и потом
        // обратились qi.rows. Я сделал немного другую запись { rows: qi }, это
        // означает: вытащи из объекта rows, создай и положи то, что содержится в
        // rows - в qi.
        const {
            rows: qi,
        } = await pgclient.query(
            'INSERT INTO order_menu (order_id, menu_id, count, price) VALUES ($1, $2, $3, $4) RETURNING order_id',
            [orderID, order.menu.id, order.menu.count, price]
        )
        console.log('order_menu:', qi[0].order_id)

        // все запросы выполнились успешно, без ошибок. В таком случае можно сделать commit
        await pgclient.query('COMMIT')
        console.log('COMMIT')
    } catch (err) {
        // Если произошла ошибка - то делаем ROLLBACK
        console.error(err)
        await pgclient.query('ROLLBACK')
        console.log('ROLLBACK')
        // Скорее всего сама функция createOrder не должна вернуть ответ без ошибки
        // мы тут перехватили ошибку, чтобы завершить транзакцию, поэтому
        // нам надо просто передать её дальше (throw err)
        throw err
    } finally {
        // У нас нужно обязательно закрыть соединение с базой.
        // Это удобно сделать в finally области. Она всегда выполняется либо после
        // try, либо после catch
        await pgclient.end()
        console.log('CLOSE CONNECTION')
    }
}

createOrder()
    .then(() => {
        console.log('success')
    })
    .catch((err) => {
        console.log('error', err)
    })