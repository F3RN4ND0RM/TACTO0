        // animacion navbar
    let tl = anime.timeline({ autoplay: false });
    tl.add({
      targets: '.nav-bar',    
      translateY : '-90vh',
      easing: 'linear',
      duration: 2000, 
    }).add({
      targets: '.nav-img',
      translateY: '45vh',
      scale :0.2,
      easing: 'linear',
      duration: 2000,
    }, 0)

    

    // Function to calculate the scroll percentage
    function getScrollPercent() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      return (scrollTop /((docHeight - winHeight) / 2)) * 100;
    }

    // Scroll event listener to update animation
    document.addEventListener('scroll', () => {
      const scrollPercent = getScrollPercent();
      
      const cappedScrollPercent = Math.min(scrollPercent, 100);
      tl.seek((cappedScrollPercent / 75) * tl.duration);
    });


    //control carousel!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1


    //animacion drecha carouserl
    let nextDerCarousel = anime({
      targets: '.img-container',
      autoplay: false,
      translateX :[
        {value : 500, duration: 500 ,easing: 'linear'},
        {value : -100, duration: 0, easing: 'linear'},
        {value : 0, duration: 500, easing: 'linear'}
      ],
      duration: 1000,
      begin: () => {
        buttons =  document.getElementsByClassName("carousel-button-item");     
        buttons = Array.from(buttons);
        buttons.forEach(button => {
          button.disabled = true        
        });
      },
      update: (anim) =>{

        if (anim.progress >= 30 && anim.progress < 60) {

          if (!anim.calledCarousel) {
            imgs =  document.getElementsByClassName("img-container");     
            imgs = Array.from(imgs)
            imgs.forEach(img => {
              img.hidden = true
            })                  
          }
        }else if (anim.progress > 60 && anim.progress < 100  ){
          if (!anim.calledCarousel) {     
            anim.calledCarousel = true;    
            imgs.forEach(img => {
              img.hidden = false
            })               
            carousel("der")            
            
          }
            
        }else if(anim.progress == 100){
          anim.calledCarousel = false;   
        }

      },
      complete: () => {
        buttons =  document.getElementsByClassName("carousel-button-item");     
        buttons = Array.from(buttons);
        buttons.forEach(button => {
          button.disabled = false        
        });  
      },
    });

    //animacion izq carouserl
    let nextIzqCarousel = anime({
      targets: '.img-container',
      autoplay: false,
      translateX :[
        {value : -500, duration: 500 ,easing: 'linear'},
        {value : 100, duration: 0, easing: 'linear'},
        {value : 0, duration: 500, easing: 'linear'}
      ],
      duration: 1000,
      begin: () => {
        buttons =  document.getElementsByClassName("carousel-button-item");     
        buttons = Array.from(buttons);
        buttons.forEach(button => {
          button.disabled = true        
        });
      },
      update: (anim) =>{

        if (anim.progress >= 30 && anim.progress < 60) {

          if (!anim.calledCarousel) {
            imgs =  document.getElementsByClassName("img-container");     
            imgs = Array.from(imgs)
            imgs.forEach(img => {
              img.hidden = true
            })                  
          }
        }else if (anim.progress > 60 && anim.progress < 100  ){
          if (!anim.calledCarousel) {     
            anim.calledCarousel = true;    
            imgs.forEach(img => {
              img.hidden = false
            })               
            carousel("izq")            
            
          }
            
        }else if(anim.progress == 100){
          anim.calledCarousel = false;   
        }

      },
      complete: () => {
        buttons =  document.getElementsByClassName("carousel-button-item");     
        buttons = Array.from(buttons);
        buttons.forEach(button => {
          button.disabled = false        
        });  
      },
    });


    //llama a carousel hacia la derecha
    function rightCarousel(){  
      nextDerCarousel.play()
    }

    //llama a carousel hacia la izquierda
    function leftCarousel(){
      nextIzqCarousel.play()
    }

    //funcion carousel, recibe izq o der dependiendo de la direccion que se activara
    function  carousel(direction){

      //obtenemos todas las imagenes disponibles con la clase img-container
      imgs =  document.getElementsByClassName("img-container");
      
      //lo convertimos en array
      imgs = Array.from(imgs);

      //obtenemos la que tiene img-on
      img = imgs.filter((img) => img.classList.contains("img-on"));

      //obtenemos su index
      index = imgs.indexOf(img[0])

      //variable que controlara a cual se moverá      
      next = 0;
                  
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

      console.log(index);
      console.log(next)

      //se oculta el index y se muestra el next
      imgs[index].classList.toggle("img-on")
      imgs[index].classList.toggle("img-off")
      imgs[next].classList.toggle("img-on")               
      imgs[next].classList.toggle("img-off")            
    }


    