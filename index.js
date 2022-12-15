const http = require('http');
const fs = require('fs');
const url = require('url');
const {guardarDB, leerDB} = require('./helpers/guardarDB');
const ControllerUser = require('./controllers/controller.users');
const PORT = process.env.PORT || 3000;
const _ControllerUser = new ControllerUser();
const usersJSON = fs.readFileSync('./data/users.json','utf8');
_ControllerUser.cargarUsersFromArray(JSON.parse(usersJSON));


const app = http.createServer(async (req,res)=>{
    const parsedUrl =url.parse(req.url, true);

    if(parsedUrl.pathname === '/'){
       const html = fs.readFileSync('./views/users.html');
       res.writeHead(200, { 'Content-Type': 'text/html' });
       res.write(html);
    }  

    if(parsedUrl.pathname === '/users'){
        if(req.method==='GET'){
            res.writeHead(200, { 'Content-Type': 'text/json' });
            if(parsedUrl.query.id){
                res.write(JSON.stringify(_ControllerUser.getUser(parsedUrl.query.id)));
            }else{
                res.write(JSON.stringify(_ControllerUser.listadoArr));
            }
        }

        if(req.method==='POST'){
            req.on('data',(data)=>{
                const {name, age, country} = JSON.parse(data);
                _ControllerUser.crearUser(name, age,country);
                guardarDB(_ControllerUser.listadoArr); 
            });

            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.write(JSON.stringify({status:'OK'}));
        }

        if(req.method==='PUT'){
            req.on('data',(data)=>{
                const {id, name, age, country} = JSON.parse(data);
                _ControllerUser.editUser(id, name, age,country);
                guardarDB(_ControllerUser.listadoArr); 
            });

            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.write(JSON.stringify({status:'OK'}));
        }

        if(req.method==='DELETE'){
            req.on('data',(data)=>{
                const {id} = JSON.parse(data);
                _ControllerUser.deleteUser(id);
                guardarDB(_ControllerUser.listadoArr); 
            });
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.write(JSON.stringify({status:'OK'}));
        }
     }  

    if(parsedUrl.pathname.indexOf('/public/css/') !== -1){
        const html = fs.readFileSync('.'+req.url);
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(html);
    }  

    if(parsedUrl.pathname.indexOf('/public/js/') !== -1){
        const html = fs.readFileSync('.'+req.url);
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(html);
     }  

     if(parsedUrl.pathname !== '/' && parsedUrl.pathname !== '/users' && parsedUrl.pathname.indexOf('/public/') === -1){
        const html = fs.readFileSync('./views/users.html');
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Ruta no encontrada');
     }  

    res.end();
});

app.listen(PORT,()=>{
    console.log("Escuchado en puerto",PORT)
})