// const http = require('http')

// const server = http.createServer((req, res) => {
//     console.log(req.headers)//токен или куки который можно достать
//     res.writeHead(200, {
// 'content-type':'text/plain'//conten-text почти всегда указывается, возвращаем данные в виде текста
//     })
//     res.end('love_to_Irka ;)')
// })

// server.listen(8080)
//get запрос по конкретному url отправляется на сервак который мы создали и кинули на него запрос с надписью

const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    //токен или куки который можно достать
    if (req.url == '/get') {
        res.writeHead(200, { 'content-type': 'text/plain'})
        res.end('Its get ;)')
        return
    }
    res.writeHead(200, {
'content-type':'text/plain'//conten-text почти всегда указывается, возвращаем данные в виде текста
    })
    res.end('hellooooooooo ;)')
})
//поменяли headers на url, и тогда то что будет воодиться в строке браузера после localhost:8080/, будет приходить в терминал в vc
server.listen(8080)