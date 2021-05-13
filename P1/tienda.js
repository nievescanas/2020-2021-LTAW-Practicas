
// - Módulo http
const http = require('http');
var url = require('url');

// - Puerto donde recibir las peticiones
const PUERTO = 9000;

//-- Acceso al módulo fs, para lectura de ficheros
var fs = require('fs');
var filename




const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";

    //-- Tipos mime por petición
    let mime = "text/"
    let mime_img = "image/"


    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    var filename = "." + url.pathname;

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error


    switch (url.pathname) {
        case "/":
            console.log("2");
            //-- Generar la respusta en función de las variables
            //-- code, code_msg y page
            content = fs.readFileSync("./Home.html", "utf-8")
            mime = mime + "html"
            res.statusCode = code;
            res.statusMessage = code_msg;
            res.setHeader('Content-Type',mime);
            res.write(content);
            res.end();
            break;

        default:
            let point_position = url.pathname.lastIndexOf(".")
            let tipo = url.pathname.slice(point_position+1)
            if (tipo == "png" || tipo == "jpeg" ) {
              mime = mime_img + tipo
            }else{
              mime = mime + tipo
            }

            fs.readFile(filename, function(err, data) {
                if (err) {
                  res.writeHead(404, {'Content-Type': 'text/html'});
                  return res.end("404 Not Found");
                }
                //-- Generar el mensaje de respuesta
                res.writeHead(200, {'Content-Type': mime});
                res.write(data);
                res.end();
              });
        break
   }

});

server.listen(PUERTO);

console.log("TIENDA. Escuchando en puerto: " + PUERTO);