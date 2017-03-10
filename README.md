# PARCIAL 1 BACK
# back-end: https://github.com/Josega149/WebTestBack
# front-end: https://github.com/Josega149/WebTestFront



Para correr el proyecto:
    * Se abre en dos consolas la ubicacion del back y front
    * A ambas se les da npm install que instalara todos los paquetes necesarios en node modules
    * A ambas se les da npm start para iniciar los servicios
    
    * El front end se despliega en http://localhost:8081/
    * El back end se despliega en el puerto local 3000
    
    * Se ingresa una palabra clave de busqueda en el front
    * se da SEARCH


Mi SALSA secreta:

Desarrolle en el front end un mini juego de memoria. Consiste en encontrar cuales dos entre las 30 imagenes mostradas
comparten el mismo numero entre 1 y 15. Una vez descubiertas las dos, se debe undir click sobre una y luego sobre la otra
(seguido) para que valga el punto. A medida que se van descubriendo pares, se van tornando grises y se debe seguir 
adivinando hasta que todas las imagenes estan en gris. Cabe aclarar que desarrolle e implemente el juego desde 0 aunque (claramente) no es invencion mia.



En el back end hay una clase principal en ./modules/index.js que es a donde llegan todas las peticiones del backend.
Hay un solo metodo que se usa desde el front end: (GET) /flickr/url/:term.  Este metodo recupera las llaves de la API de
flickr (que no se incluyen en el repo por seguridad) y hace peticiones de imagenes dado un termino y por relevancia en el flickrManager.
El flickrManager optiene imagenes completas, pero inmediatamente construye las urls y eso es lo que retorna (las urls de las
imagenes del termino pasado por parametro). Esto se hace para que la carga de red sea considerablemente mas liviana.

En el front end se desarrollan varias funcionalidades y esta escrito en javascript- react. La pagina principal es 
/src/components/app.js. Cuando el usuario a ingresado en el input el termino deseado y presiona el boton de SEARCH, app.js crea en render la matriz que tiene una lista de columnas, que tiene una lista de fotos a desplegar. Adicionalmente, cada foto es un boton,
y tiene un numero del 1 al 15 asociado a ella. Esto para propositos del juego descrito anteriormente. 
Para realizar otra busqueda se borra el campo input y se da SEARCH de nuevo.

Este es un proyecto cuya funcionalidad principal es buscar imagenes relacionadas a un termino especifico y desplegarlas 
segun el codigo de color del arcoiris.




