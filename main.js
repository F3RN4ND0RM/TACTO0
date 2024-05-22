    // animacion navbar
    let tl = anime.timeline({ autoplay: false });
    let t2 = anime.timeline({ autoplay:false })

    tl.add({
      targets: '.nav-bar',
      height: ['100vh', '10vh'],
      easing: 'easeInOutCirc',
      duration: 300, // Shortened the duration for faster animation
    });

    t2.add({
      targets: '.wide-logo-img' ,
      height: ['100px', '30px'],
      easing: 'easeInOutCirc',
      duration: 300, 
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
      t2.seek((cappedScrollPercent / 75) * t2.duration);
    });


    //control carousel
    const myCarouselElement = document.querySelector('#carousel')

    const carousel = new bootstrap.Carousel(myCarouselElement, {
      interval: 100,
      touch: false
    })