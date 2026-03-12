// posiciones de las imagenes
let maxLeft;
let maxTop;
const minLeft= 0;
const minTop = 0;
let timeDelta;
//ruta de las imagenes
let imgs = [
    "media/img/arboles/arbol1.png",
    "media/img/arboles/arbol2.png",
    "media/img/arboles/arbol3.png",
    "media/img/arboles/arbol4.png",
]
//coordenadas de la posicion de las imagenes
var originalX;
var originalY;

window.onload = function(){
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}


function sensorClick(){
    if(Date.now() - timeDelta < 150){ //verifica que no hemos arrastrado ningún objeto
        createPopup();
        }

    } 

    //la función "createpopup()"¨se ejecuta cuando el usuario ejecuta un evento (ejemplo "click")
function createPopup(parent){
    let p = document.getElementById("popup"); 
    if(p){
        p.parentNode.removeChild(p);
    }

    //se crea un elemento en ejecución de javascript

    let popup = document.createElement("div");//elemento crear "<div></div>"
    popup.id = "popup"; //id="popup"
    popup.className = "popup"; //class="popup"
    popup.style.top = parent.y - 110 + "px";
    popup.style.left = parent.x - 75 + "px";

    //se crea un elemento en ejecución de javascript
    let text = document.createElement("span");//elemento crear "<span></span>"
    text.textContent = parent.id; //contenido del span=id del popup o id del div que contiene al <span>
    popup.appendChild(text); // se ancla el objeto con class="map" al <div> popup

    //se crea un elemento en ejecución de javascript
    var map = document.getElementsByClassName("map");
    map.appendChild(popup);
}

//la función "baseOnLoad" se ejecuta al cargar el HTML
function baseOnLoad(){
    var map = document.getElementsByClassName("map")[0];
    let base = document.getElementsByClassName("base")[0];

    maxLeft = base.offsetWidth - 50;
    maxTop = base.offsetHeight - 50;

    for(let i = 0; i < 6; i++){
        let sensor = document.createElement("img");
        sensor.src = imgs[i % imgs.length];
        sensor.alt = i;
        sensor.id = i;
        sensor.draggable = true;
        sensor.classList.add("sensor");
        sensor.classList.add("dragme");

        sensor.style.left = `${Math.floor(Math.random()*900)}px`;
        sensor.style.top = `${Math.floor(Math.random()*500)}px`;

        sensor.onclick = sensorClick;

        let parent = document.getElementsByClassName("map")[0];
        parent.appendChild(sensor); 
    }
}

function startDrag(e){
    timeDelta = Date.now(); //obtiene la fecha y hora actual
    if(!e){ //si no hay evento
        var e = window.event; //se crea un evento heredado
    }
    if(e.preventDefault){
        e.preventDefault();
    }
    targ = e.target ? e.target : e.srcElement; //se obtiene la ultima posicion
    originalX = targ.style.left; // se establace la posicion x original para ser modificada en el proceso de arrastrado
    originalY = targ.style.top;

    if(!targ.classList.contains("dragme")){
        return;
    }

    offsetX = e.clientX;
    offsetY = e.clientY;

    coordX = parseInt(targ.style.left);
    coordY = parseInt(targ.style.top);
    drag = true;

    document.onmousemove = dragDiv; //Mover el elemento en el mousemove
    return false;
}

function dragDiv(e){
    if (!drag){ //si no ha movido por cualquier razón
        return; // si se finaliza la ejecución
    }
    if (!e){ // si no existe ningun evento
        e = window.event; // se agrega un evento
    }

    // verificar los bordes al mover el elemento seleccionado
    let newLeft = coordX + e.clientX - offsetX;
    if(newLeft < maxLeft && newLeft>minLeft){
        targ.style.left = newLeft+'px';
    }

    let newTop = coordY + e.clientY - offsetY;
    if(newTop <maxTop && newTop > minTop){
        targ.style.top = newTop +'px';
    }

    return false;
}

function stopDrag(){
    if(typeof drag == "undefined"){ //si se desconoce que existe un evento de tipo "draggable"
        return; //se finaliza la ejecución del evento previo
    }

    if(drag){ //si se está moviendo
        if(Date.now() - timeDelta > 150){ // se verifica que de verdad se movió a partir del valor del tiempo obtenido
            let p = document.getElementById("popup"); // se heredan todos los elementos del div <div id ="popup"> 
            if (p){ //si hay un popup seleccionado
                p.parentNode.removeChild(p); //reemplaza o eliminar el popup anterior dentro de "map"
            }
        }else{
            targ.style.left = originalX; //las posiciones no fueron calculadas, por lo tanro se reestablecen a las originales
            targ.style.top = originalY;
        }
    }

    drag = false; //deja de moverse
}