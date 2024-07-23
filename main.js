import { rightCarousel as rc, leftCarousel as lc} from './modules/carousel.mjs'
import {loadTextures}  from './modules/3Drender.mjs'


function changeTexture(index){
    loadTextures(index)
}

window.rightCarousel = rc;
window.leftCarousel = lc;
window.changeTexture =  changeTexture;