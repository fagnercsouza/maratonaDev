const express = require('express');
const server = express();
const db = require('./db')

//acessar arquivos estáticos (css, html)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//configuração nunjucks
const nunjucks = require('nunjucks')
    
nunjucks.configure("views", {
    express: server,
    noCache: true, 
})
server.get('/', (req, res)=>{
    
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("Erro 500");
        }

        const ideasReverso = [...rows].reverse()
            
        const lastIdea = []
        for(idea of ideasReverso) {
            if(lastIdea.length < 2){
                lastIdea.push(idea);
            }
        }
        
        console.log("Execultando index");
        return res.render("index.html", { ideas: lastIdea})
    })
    
})

server.get('/ideias', (req, res)=> {
    
    req.body
    
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("Erro 500");
        }

    const ideasReverso = [...rows].reverse()
    return res.render("ideias.html", { ideas: ideasReverso })
    })
})

server.post('/', (req, res) => {

    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
        `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ] 
    db.run(query, values, function(err){
        if(err) return console.log(err)
        console.log(this)

        return res.redirect("/ideias")
        
    })

})
server.listen(3000);