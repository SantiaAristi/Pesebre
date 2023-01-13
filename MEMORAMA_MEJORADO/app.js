//Author: Ing(c) Santiago Aristizabal Sepulveda
//Primer Bootcamp "íscina-42" UTP sobre fullstack
//Date: 2023-01-13
//Technologic University of Pereira

let cardContainer = document.querySelector('.cardContainer'); // card container
generateCards(); // function that generate of cards

let children = Array.from(document.querySelectorAll('.child2'));  // back-face of card, array de las cartas
let parentContainer = Array.from(document.querySelectorAll('.parentContainer')); // This contains back and front face of card
let arrayImage = ['imagenes/parejas-001.png','imagenes/parejas-001.png','imagenes/parejas-002.png', 'imagenes/parejas-002.png','imagenes/parejas-003.png','imagenes/parejas-003.png','imagenes/parejas-004.png','imagenes/parejas-004.png','imagenes/parejas-005.png','imagenes/parejas-005.png','imagenes/parejas-006.png','imagenes/parejas-006.png','imagenes/parejas-007.png','imagenes/parejas-007.png','imagenes/parejas-008.png','imagenes/parejas-008.png']; // directions of images for cards
let arrayShuffle = []; // array for card shuffle
let arrayNames = ['maria','jose', 'melchor', 'baltazar', 'gaspar', 'dios', 'mula', 'pastor']; // array for names of each pair
let arrayAudio = ['.audioMaria','.audioJose','.audioMelchor','.audioBaltazar', '.audioGaspar','.audioJesus', '.audioMula', '.audioPastor'];
let arrayNumber = [4,5,2,1,3,6,7,8]; // array for position of each image on html
let arrayInformation = ['La primera celebración navideña en la que se montó un pesebre para la conmemoración del nacimiento de Jesús, fue en la nochebuena del año 1223, realizada por San Francisco de Asís.', 'En Ecuador, México, Colombia, Guatemala, El Salvador, Venezuela, Perú, Argentina, Chile y Canarias,  la figura del Niño Jesús se coloca después de la llegada de la Navidad.', 'El villancico es un género de canción cuya letra hace referencia a la Navidad.', 'A la nanita nana es un villancico compuesto por Jeremías Quintero, oriundo de Barbacoas, Nariño.', 'La palabra Tutaina es utilizada en Perú para referirse coloquialmente a una fiesta pequeña, por lo que el título de este villancico se refiere a la celebración de la tradicional novena de aguinaldos.','El villancico es un género de canción cuya letra hace referencia a la Navidad.', 'En las posadas, cada uno de los nueve días representa un valor, como humildad, fortaleza, desapego, caridad, confianza, justicia, pureza, alegría y generosidad.','A las novenas se les llama “Las Posadas” y  son fiestas populares en México, Honduras, Guatemala, El Salvador, Costa Rica, Nicaragua y Panamá.'] // array for each phrase of pairs
randomImage(); // this function random images on the array
insertImage(); // this function insert images on html

let clickCount = true, block = true, firstClass = 0, secondClass = 0, firstParent = 0, secondParent = 0, countPairs = 0;
let grandpaModal = document.querySelector('.grandpaContainerPop'); // Container of modal pesebre
let button = document.querySelector('.beginButton'); // button intro modal
let modal = document.querySelector('.containerIntro'); // container modal intro
let body = document.querySelector('body'); // body of html
let background = document.querySelector('.backgroundModal'); // background modal intro
let arrayCover = Array.from(document.querySelectorAll('.grandpaContainerPop .containerPop .containerPuzzle .containerImage img')); // every image of pesebre cover
let buttonModalCover = document.querySelector('.buttonModal'); // button of pesebre modal
let paragraphModal = document.querySelector('.paragraphModal'); // paragraph of pesebre modal
let footerModal = document.querySelector('.containerIconsGameOver'); // footer end modal
let titleModal = document.querySelector('.grandpaContainerPop .containerPop .containerPuzzle .containerText h1');
let reload = false; 
let containerPop = document.querySelector('.grandpaContainerPop .containerPop');

// game memorama
parentContainer.forEach((card)=>{ //Esta funcion permite controlar que tarjeta fue tocada, si la primera o la segunda carta y saber si ya fue abierta o si ya fue descubierta la pareja
  card.addEventListener('click',() =>{
    if(block){// sirve para bloquear el click y que no se pueda clikear otra mientras se voltean las cartas
      if(clickCount){ // se pregunta si block devuelve un true para saber si la carta ya fue elegida antes, ya que en el momento de seleccionar una carta se le a cambia el valor booleano a esta variable
        if(!card.classList.contains('pair')){ //se ptregunta si la carta contiene la clase pair, ya que cuando se encuentra una pareja esas cartas reciben la clase pair
          functionClick1(card); //en caso de que no se haya abierto ya esa carta, se le permite seleccionarla
        }
      }else if(!clickCount){//en este caso es para el segundo click ya que el primero ya actuo
          if(!card.classList.contains('click')){//se pregunta si tiene esta clase para saber si ya se le dio click
              if(!card.classList.contains('pair')){//se pregunta para saber si ya no fue encontrada
                functionClick2(card);//se llama a la funcion para dar el segundo click
                setTimeout(() => {
                  if(firstClass == secondClass){//estas dos variables contienen el trozo de javascript de la primera y segunda carta tocada y las compara para saber si son iguales
                    processComparing();//llama a la funcion para cambiar las propiedades de las cartas
                    let audioCorrecta = document.querySelector('.audioCorrecta');//toma el audio del html
                    audioCorrecta.play();//reproduce el audio
                  }else{
                      removeClass();//en caso de que las dos cartas fueran diferentes se llama a la funcion removeClass para quitar las clases agregadas durante el proceso del juego, le quita la rotacion a las cartas y les quita el click
                  }
                  block = !block; //Desbloquea el pointer para iniciar una nueva interaccion
              },800);
              clickCount = !clickCount; //Desbloquea los clicks para volver a iniciar una nueva interaccion de cartas
              }

          }
        }
    }
  })
})

// Event for modal pesebre button
buttonModalCover.addEventListener('click', () => {
  if(!buttonModalCover.classList.contains('gameOver')){
    grandpaModal.classList.add('grandpaHidden');
    body.classList.remove('overflow');
    audioCard.pause() //Pausa el audio de la carta
  }else{

    if(!reload){
      audioCard.pause(); //Pausa el audio de la carta
      let endAudio = document.querySelector('.audioFinal');
      endAudio.play(); //Reproduce el audio final al completar el memorama
      footerModal.classList.remove('hidden'); //Hace visible el footer del modal final
      buttonModalCover.textContent = 'Repetir';
      paragraphModal.textContent = 'Y junto con la esperanza de la llegada del Niño Dios te deseamos de todo corazón que ese regalo que tanto has anhelado llegue a ti en esta navidad.'
      titleModal.textContent = 'Armaste tu pesebre';
      titleModal.classList.add('center'); //Modifica la fuente del titulo del modal final
      containerPop.classList.add('borderRadius'); //añade un borde redondeado al container
      reload = true;

    }else{

      window.scroll(0,0); //Coordenadas del scroll
      location.reload(); //Al momento de recargar la pagina, devuelve el scroll a la parte superior de la pantalla
    }
  }
})

// Event for modal intro button
button.addEventListener('click', () => {
  modal.classList.add('hidden'); //Oculta el modal de introduccion
  body.classList.remove('overflow'); //Al ocultar el modal de introduccion, permite al usuario hacer scroll
  background.classList.add('hidden'); //Quita el background del modal
  let audio = document.querySelector('.intro'); 
  audio.play(); //Reproduce el audio inicial
})

// function: removing class
function removeClass(){
  secondParent.classList.remove('rotation'); //Vuelve a la posicion inicial las figuras
  firstParent.classList.remove('rotation');
  firstParent.classList.remove('click');
  secondParent.classList.remove('click');
  let audioIncorrecta = document.querySelector('.audioIncorrecta')
  audioIncorrecta.play(); //Reproduce el audio cuando la pareja es incorrecta
}

// function: processs for comparing pairs
//Esta funcion se ejecuta solamente si se encuentra una pareja
function processComparing(){
  firstParent.classList.add('pair');  //Añade las clases a las cartas para identificar que se encontró la pareja
  secondParent.classList.add('pair');
  countPairs++; //Aumenta la variable que cuenta el numero de parejas encontradas
  if(countPairs != 8){ 
    body.classList.add('overflow'); //Bloquea el scroll
    window.scroll(0,0);
    grandpaModal.classList.remove('grandpaHidden'); //Hace visible el modal que se despliega al encontrar una pareja
    for(let i = 0; i < 8; i++){ //Se realiza una busqueda en el array de nombres para identificar el nombre de la pareja encontrada
      if(firstParent.classList.contains(arrayNames[i])){ //Se busca el nombre de la clase en el array de nombres
        audioCard = document.querySelector(arrayAudio[i]);  //Guarda en una variable el audio correspondiente de la pareja encontrada, el cual es buscado en el array de audios
        audioCard.play(); //Reproduce el audio respectivo de la pareja encontrada
        paragraphModal.textContent = arrayInformation[i]; //Busca en el array de las frases, la respectiva frase de la pareja encontrada
        setTimeout(()=>{ //sleep
          setTimeout(()=>{arrayCover[arrayNumber[i]].classList.add('hidden');},2000);
          arrayCover[arrayNumber[i]].classList.add('fall'); //Despues de realizar la animcaion de la vibracion, realiza la animacion de la caida de la ficha 
        },2000); 
        arrayCover[arrayNumber[i]].classList.add('vibration'); //Primero genera la animacion de la vibracion
      }
    }

  }else{  //Se ejecuta cuando se encuentra la ultima pareja
    body.classList.add('overflow'); //Bloquea el scroll
    window.scroll(0,0)
    grandpaModal.classList.remove('grandpaHidden');
    for(let i = 0; i < 8; i++){ //Realiza el mismo proceso de buscar el audio y la frase respectiva de la pareja, para despues generar la animacion
      if(firstParent.classList.contains(arrayNames[i])){
        audioCard = document.querySelector(arrayAudio[i]);
        audioCard.play(); //Reproduce el audio respectivo de la pareja encontrada
        paragraphModal.textContent = arrayInformation[i]; //Busca en el array de las frases, la respectiva frase de la pareja encontrada
        setTimeout(()=>{
          setTimeout(()=>{arrayCover[arrayNumber[i]].classList.add('hidden');},2000);
          arrayCover[arrayNumber[i]].classList.add('fall');
        },2000);
        arrayCover[arrayNumber[i]].classList.add('vibration');
      }
    }
    buttonModalCover.classList.add('gameOver'); //El boton adquiere la clase para cambiar las propiedades del boton y desplegar el modal final
    buttonModalCover.textContent = 'Finalizar'; //Modifica el texto del boton para finalizar el memorama
  }
}

// function: second click
function functionClick2(card){
  secondClass = Array.from(card.childNodes)[1].outerHTML; //Copia la estructura del codigo html
    secondParent = card; //Se guarda la segunda carta seleccionada en una variable
    card.classList.add('rotation'); //Rota la carta
    block = !block; //Bloquea el pointer mientras se realiza la comparacion de las cartas seleccionadas
}

// function: first click
function functionClick1(card){
  card.classList.add('rotation'); //Gira la primera carta
  card.classList.add('click'); //Clickea la primera carta
  firstClass = Array.from(card.childNodes)[1].outerHTML; //Copia la estructura del codigo html
  firstParent = card; //Se guarda la primera carta seleccionada en una variable
  clickCount = !clickCount; //El clickCount pasa a ser falso
}

// function: insertion images in child2
function insertImage(){
    let contador = 0;
    while(contador < 16){
        let newImage = document.createElement('img'); //Se crea la estructura html para una imagen
        newImage.setAttribute('src',arrayShuffle[contador]); //Se asigna una figura del array que desordena las imagenes a la etiqueta de imagen
        newImage.setAttribute('Alt','image');
        children[contador].appendChild(newImage);

        if('imagenes/parejas-001.png' == arrayShuffle[contador]){ //Se verifica para cada figura respecto al array de las imagenes y de esta manera se agrega la clase correspondiente de la figura asignada
            children[contador].parentNode.classList.add('maria'); 
          }else if('imagenes/parejas-002.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('jose');
          }else if('imagenes/parejas-003.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('dios');
          }else if('imagenes/parejas-004.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('melchor');
          }else if('imagenes/parejas-005.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('gaspar');
          }else if('imagenes/parejas-006.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('baltazar');
          }else if('imagenes/parejas-007.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('pastor');
          }else if('imagenes/parejas-008.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('mula');
          }
        contador++;
    }
}

// function: loop of random image
function randomImage(){
    let contador = 0;
    while(contador < 16){ //El ciclo será falso una vez se haya desordenado todo el arreglo original, ya que el contador solo aumenta cuando una imagen es desordenada
        let random = Math.trunc(Math.random()*16); //genera un numero aleatorio del 0 al 15
        if(arrayImage[random] != 0){
          contador++; 
          arrayShuffle.push(arrayImage[random]); //Agrega una imagen aleatorio del arreglo original a la cola del arreglo desordenado
          arrayImage[random] = 0; //Agrega un 0 en la posicion del arreglo desordenado
        } 
    }
}

// function: generation of cards
function generateCards(){
    for(let i = 0; i < 16; i++){ //Esta funcion genera toda la estructura donde se agregaran las cartas
        let grandpa = document.createElement('div');
        grandpa.classList.add('grandpaContainer');
        let parent = document.createElement('div');
        parent.classList.add('parentContainer');
        let child1 = document.createElement('div');
        child1.classList.add('child1');
        let img = document.createElement('img');
        img.setAttribute('src','imagenes/tarjeta_cubierta.png');
        img.setAttribute('Alt', 'image');
        img.classList.add('card');
        child1.appendChild(img);
        let child2 = document.createElement('div');
        child2.classList.add('child2');
        parent.appendChild(child1);
        parent.appendChild(child2);
        grandpa.appendChild(parent);
        cardContainer.appendChild(grandpa);
    }
} 

window.onbeforeunload = function () { //Al momento de recargar la pagina, devuelve el scroll a la posicion 0
  window.scrollTo(0, 0);
}

