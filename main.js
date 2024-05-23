    // animacion navbar
    let tl = anime.timeline({ autoplay: false });
    let tl2 = anime.timeline({ autoplay:false })

    tl.add({
      targets: '.nav-bar',    
      translateY : '-90vh',
      easing: 'linear',
      duration: 1000, 
    })
    
    tl2.add({
      targets: '.nav-img',
      translateY: '45vh',
      scale :0.2,
      easing: 'linear',
      duration: 1000,
    })

    

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
      tl2.seek((cappedScrollPercent / 75) * tl2.duration);
    });


    //control carousel
    const myCarouselElement = document.querySelector('#carousel')

    const carousel = new bootstrap.Carousel(myCarouselElement, {
      interval: 100,
      touch: false
    })