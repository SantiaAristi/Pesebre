let cardContainer = document.querySelector('.cardContainer'); // card container
generateCards(); // function that generate of cards

let children = Array.from(document.querySelectorAll('.child2'));  // back-face of card
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

// game memorama
parentContainer.forEach((card)=>{
  card.addEventListener('click',() =>{
    if(block){
      if(clickCount){
        if(!card.classList.contains('pair')){
          functionClick1(card);
        }
      }else if(!clickCount){
          if(!card.classList.contains('click')){
              if(!card.classList.contains('pair')){
                functionClick2(card);
                setTimeout(() => {
                  if(firstClass == secondClass){
                    processComparing();
                    let audioCorrecta = document.querySelector('.audioCorrecta');
                    audioCorrecta.play();
                  }else{
                      removeClass();
                  }
                  block = !block;
              },800);
              clickCount = !clickCount;
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
    audioCard.pause()
  }else{
    if(!reload){
      audioCard.stop();
      let endAudio = document.querySelector('.audioFinal');
      endAudio.play();
      footerModal.classList.remove('hidden');
      buttonModalCover.textContent = 'Repetir';
      paragraphModal.textContent = 'Y junto con la esperanza de la llegada del Niño Dios te deseamos de todo corazón que ese regalo que tanto has anhelado llegue a ti en esta navidad.'
      titleModal.textContent = 'Armaste tu pesebre'
      reload = true;
    }else{
      location.reload();
    }
  }
})

// Event for modal intro button
button.addEventListener('click', () => {
  modal.classList.add('hidden');
  body.classList.remove('overflow');
  background.classList.add('hidden');
  let audio = document.querySelector('.intro');
  audio.play();
})

// function: removing class
function removeClass(){
  secondParent.classList.remove('rotation');
  firstParent.classList.remove('rotation');
  firstParent.classList.remove('click');
  secondParent.classList.remove('click');
  let audioIncorrecta = document.querySelector('.audioIncorrecta')
  audioIncorrecta.play();
}

// function: processs for comparing pairs
function processComparing(){
  firstParent.classList.add('pair');
  secondParent.classList.add('pair');
  countPairs++;
  if(countPairs != 8){
    body.classList.add('overflow');
    window.scroll(0,0)
    grandpaModal.classList.remove('grandpaHidden');
    for(let i = 0; i < 8; i++){
      if(firstParent.classList.contains(arrayNames[i])){
        audioCard = document.querySelector(arrayAudio[i]);
        audioCard.play();
        paragraphModal.textContent = arrayInformation[i];
        setTimeout(()=>{
          setTimeout(()=>{arrayCover[arrayNumber[i]].classList.add('hidden');},2000);
          arrayCover[arrayNumber[i]].classList.add('fall');
        },2000);
        arrayCover[arrayNumber[i]].classList.add('vibration');
      }
    }
  }else{
    body.classList.add('overflow');
    window.scroll(0,0)
    grandpaModal.classList.remove('grandpaHidden');
    for(let i = 0; i < 8; i++){
      if(firstParent.classList.contains(arrayNames[i])){
        audioCard = document.querySelector(arrayAudio[i]);
        audioCard.play();
        paragraphModal.textContent = arrayInformation[i];
        setTimeout(()=>{
          setTimeout(()=>{arrayCover[arrayNumber[i]].classList.add('hidden');},2000);
          arrayCover[arrayNumber[i]].classList.add('fall');
        },2000);
        arrayCover[arrayNumber[i]].classList.add('vibration');
      }
    }
    buttonModalCover.classList.add('gameOver');
    buttonModalCover.textContent = 'Finalizar';
  }
}

// function: second click
function functionClick2(card){
  secondClass = Array.from(card.childNodes)[1].outerHTML;
    secondParent = card;
    card.classList.add('rotation');
    block = !block;
}

// function: first click
function functionClick1(card){
  card.classList.add('rotation');
  card.classList.add('click');
  firstClass = Array.from(card.childNodes)[1].outerHTML;
  firstParent = card;
  clickCount = !clickCount;
}

// function: insertion images in child2
function insertImage(){
    let contador = 0;
    while(contador < 16){
        let newImage = document.createElement('img');
        newImage.setAttribute('src',arrayShuffle[contador]);
        newImage.setAttribute('Alt','image');
        children[contador].appendChild(newImage);
        if('imagenes/parejas-001.png' == arrayShuffle[contador]){
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
    while(contador < 16){
        let random = Math.trunc(Math.random()*16);
        if(arrayImage[random] != 0){
          contador++;
          arrayShuffle.push(arrayImage[random]);
          arrayImage[random] = 0;
        } 
    }
}

// function: generation of cards
function generateCards(){
    for(let i = 0; i < 16; i++){
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