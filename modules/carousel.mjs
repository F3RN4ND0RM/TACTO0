import anime from 'animejs';

// animacion navbar
let tl = anime.timeline({ autoplay: false });
let imgs =  document.getElementsByClassName("img-container-item"); 


//Timeline 1 que controla el deslis de la
tl.add({
  targets: '.nav-bar',    
  translateY : '-90vh',
  easing: 'linear',
  duration: 2000, 
})
.add({
  targets: '.nav-img',
  bottom : ['75%','10%'],
  top : ['25%', '90%'],
  scale :0.2,
  easing: 'linear',
  duration: 2000,
}, 0)
.add({
  targets: '.nav-bar-footer',
  opacity: 0,
  translateY: '5em',
  easing: 'linear',
  duration: 1000,
},0 )


    //animacion drecha carouserl
let nextDerCarousel = anime({
  targets: '.img-container', 
  autoplay: false, // No inicie automaticamente
  translateX :[
    {value : 500, duration: 500 ,easing: 'linear'}, //empieza hacia la derecha
    {value : -100, duration: 0, easing: 'linear'}, //se regresa a la izquiera
    {value : 0, duration: 500, easing: 'linear'} //se centra nuevamente
  ],
  duration: 1000, //dura un segundo
  begin: () => { //al iniciar            
    //Bloquea los botones
    blockButtons()
  },
  update: (anim) =>{ //en cada update
    
    
    // si se encuentra entre el 30 y el 60% de la animacion oculta la imagen
    if (anim.progress >= 30 && anim.progress < 60) { 
          
      if (!anim.calledCarousel) {
        
        imgs = Array.from(imgs)
        imgs.forEach(img => {
          img.hidden = true
        })                  
      }        
    }
    //si se encuentra entre el 60 y el 100% animacion muestra la imagen y 
    // llama a carousel("der") que movera a la siguiente imagen a la derecha

    
    else if (anim.progress > 60 && anim.progress < 100  ){
      if (!anim.calledCarousel) {     //cimorueba que.calledCarousel no sea true para evitar se llame dos veces
        anim.calledCarousel = true;    // establece la propiedad calledCarousel como true
        imgs.forEach(img => {
            img.hidden = false
        })               
        carousel("der")            
        
      }
        
    }else if(anim.progress == 100){ //Si la animacion está al 100% 
      anim.calledCarousel = false;   //regresa calledCarousel a false (reinicia la variable)
    }

  },
  complete: () => { //Cuando se completa desbloquea los botones
    unblockButtons();
  },
});

//animacion izq carousel
let nextIzqCarousel = anime({
  targets: '.img-container',
  autoplay: false, //Concela el autoplay
  translateX :[
    {value : -500, duration: 500 ,easing: 'linear'}, //empieza moviendo ce haciua la derecha
    {value : 100, duration: 0, easing: 'linear'}, // se muieva hacia la derecha
    {value : 0, duration: 500, easing: 'linear'} // se centra nuevamente
  ],
  duration: 1000, //dura un segundo
  begin: () => {//al iniciar bloque los botones
    blockButtons()
  },
  update: (anim) =>{ //en cada actualizacion

    //Si la animacion se encuentre entre el 30 y el 60 % oculta las imagenes
    if (anim.progress >= 30 && anim.progress < 60) { 

      if (!anim.calledCarousel) {        
        imgs = Array.from(imgs)
        imgs.forEach(img => {
          img.hidden = true
        })              
      }
    }

    //si la animacion se encuentra entre  el 60 y el 100  muestra las imagenes 
    else if (anim.progress > 60 && anim.progress < 100  ){
      if (!anim.calledCarousel) {     //comprueba que calledCarousel no sea verdadero evita doble llamado
        anim.calledCarousel = true; // inicialisa calledCarousel como verdadero     
        imgs.forEach(img => {
          img.hidden = false
      })               
        carousel("izq")      //llama a carousel izq      
        
      }
        
    }
    //si la animacion se termino regresa calledCarousel a false 
    else if(anim.progress == 100){ 
      anim.calledCarousel = false;   
    }

  },
  complete: () => { //Se completa la animacion y habilita los botones nuevamente
    unblockButtons()
  },
});

    

// Scroll event listener to update animation
document.addEventListener('scroll', () => {
  const scrollPercent = getScrollPercent();
  
  const cappedScrollPercent = Math.min(scrollPercent, 100);
  tl.seek((cappedScrollPercent / 75) * tl.duration);
});



//functio to block buttons
function blockButtons(){  
  let buttons =  document.getElementsByClassName("carousel-button-item");     
  buttons = Array.from(buttons);
  buttons.forEach(button => {
    button.disabled = true        
  });
}

//function to unblock buttons
function unblockButtons(){
  let buttons =  document.getElementsByClassName("carousel-button-item");     
  buttons = Array.from(buttons);
  buttons.forEach(button => {
    button.disabled = false        
  });  
}

// Function to calculate the scroll percentage
function getScrollPercent() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.offsetHeight;
  const winHeight = window.innerHeight;
  return (scrollTop /((docHeight - winHeight) / 2)) * 200;
}



//control carousel!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

//llama a carousel hacia la derecha
export function rightCarousel(){  
  nextDerCarousel.play()
}

//llama a carousel hacia la izquierda
export function leftCarousel(){
  nextIzqCarousel.play()
}

//funcion carousel, recibe izq o der dependiendo de la direccion que se activara
 function  carousel(direction){

  //obtenemos todas las imagenes disponibles con la clase img-container
  let imgs =  document.getElementsByClassName("img-container");

  //lo convertimos en array
  imgs = Array.from(imgs);

  //obtenemos la que tiene img-on
  let img = imgs.filter((img) => img.classList.contains("img-on"));

  //obtenemos su index
  let index = imgs.indexOf(img[0])

  //variable que controlara a cual se moverá      
  let next = 0;
              
  //a que direccion se mueve se define la siguiente imagen para no traspasar los limites
  switch (direction) {
    case "izq":            
    if(index == 0){
      next = imgs.length - 1
    }else{
      next = index - 1
    }
      break;
  
    default:
      if(index == imgs.length - 1){
        next = 0
      }else{
        next = index + 1
      }
      break;
  }



  //se oculta el index y se muestra el next
  imgs[index].classList.toggle("img-on")
  imgs[index].classList.toggle("img-off")
  imgs[next].classList.toggle("img-on")               
  imgs[next].classList.toggle("img-off")            
}

