import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// constantes del programa
const div = document.getElementById('shirt-canvas') //Elemento html donde se pondrá la escena
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000) 
const light = new THREE.DirectionalLight( 0xffffff,3)
const light2 =new THREE.HemisphereLight( 0xd7cbff, 0x1a0362, 1 );
const render = new THREE.WebGLRenderer({ antialias: true, gammaOutput : true,  alpha: true });
const textureLoader = new THREE.TextureLoader()
const buttons = Array.from(document.getElementsByClassName("shirt-button-item"));
const text = document.getElementById("text2D")
const textos = ['Tu  Empresa', 'Tus  Diseños', 'Tu  Evento',]
const controls = new OrbitControls( camera, render.domElement );

console.log(text)

/*
const backgrounds = [
	'../assets/textures/image.png',
	'../assets/textures/wood.png',
	'../assets/textures/crazy.png',
]*/

//array de texturas
const textures = [
	'../assets/textures/t1.jpg',
	'../assets/textures/t2.jpg',
	'../assets/textures/t3.jpg',
]

//array de los detalles de la camisa
const texturesDetails = [
	textureLoader.load('../assets/3d/Shirt_Normal.png'),
	textureLoader.load('../assets/3d/Shirt_Rough.png'),
	textureLoader.load('../assets/3d/Shirt_Basecolor.png')
]

//inicialisamos el loader
let  loader =  new THREE.ObjectLoader();
let model;

//configuramos el render
if(window.innerWidth > 500 && window.innerWidth < 900){
	render.setSize( window.innerWidth-60, window.innerHeight-60); //Ponemos el tamaño del render
}else if(window.innerWidth < 500) {
	render.setSize( window.innerWidth-100, window.innerHeight-100); //Ponemos el tamaño del render
}else{
	render.setSize( window.innerWidth, window.innerHeight); //Ponemos el tamaño del render	
}
render.setAnimationLoop( animate );


//la agregamos al div el render
div.appendChild(render.domElement )

//configuración de camára
camera.position.set(0,8.417,16.551)
camera.rotation.set(-10.80,0,0)

//configuración de controles
controls.target.set(0,5,0)
controls.enablePan= false
controls.enableZoom= false
controls.enableRotate = true
controls.autoRotate = true
controls.autoRotateSpeed = 3
controls.dampingFactor = true
controls.minPolarAngle = 3*Math.PI/8
controls.maxPolarAngle = 3*Math.PI/8

let contador = -1;
let controler = true;
let controler_switch = true

//cambia el diseño y controla la velocidad de giro
controls.addEventListener(
	"change",
	event =>{		
		let angle =  controls.getAzimuthalAngle();			
		if(angle >= -1.59 & angle <= -1.56 && controler_switch){	
			controler=true				
			controls.autoRotateSpeed = 20
		}else if(angle >= -0.1 && angle <= 0.1 && controler && controler_switch){
			controler=false			
			contador++			
			loadTextures((contador%3)+1)
			controls.autoRotateSpeed = 3			
		}
	},
)
//bloque el cambio del diseño y de velocidad funcion antigüa 
controls.addEventListener(
	"start", 
	event =>{
		controler_switch = false
	}
)
//activa el cambio del diseño y de velocidad funcion antigüa 
controls.addEventListener(
	"end", 
	event =>{
		controler_switch = true
	}
)

controls.update();

//añade las luces
light.position.set(0,0,0)
light2.position.set(0,0,0)
scene.add(light)
scene.add(light2)

// función que actualiza el tamaño del render al -
// cambiar el tamaño de la ventana
window.addEventListener( 'resize', function () {	
	model_scale()
} );

//Cargamos el modelo
loader.load(
	// resource URL
	'../assets/3d/shirt.json',

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
        model = obj
		// Add the loaded object to the scene		
		scene.add( obj );
		obj.position.set(0,5,0)
		obj.rotation.set(0,0,0)
		//cambiamos el tamaño del objeto
		model_scale()
		loadTextures(1)
	}
);
//funcion para escalar el objeto segun el ancho de la pantalla
function model_scale(){
	if(window.innerWidth > 600){
		model.scale.set(0.13,0.13,0.13)
		camera.aspect = window.innerWidth / window.innerHeight;
		render.setSize( window.innerWidth, window.innerHeight); //Ponemos el tamaño del render
	}else{
		model.scale.set(0.1,0.1,0.1)
		camera.aspect = (window.innerWidth -100)/( window.innerHeight-100);
		render.setSize( window.innerWidth-100, window.innerHeight-100); //Ponemos el tamaño del render
	}
	
	camera.updateProjectionMatrix();	

}

//funcion para la animación
function animate() {	
	//copia la posición de la camara para la luz
	// y la muueve hacia abajo 20 unidades
	light.position.copy( camera.position );
	light.position.setY(20)	
	controls.update();
	render.render( scene, camera );
}

/// función para cambiar el fondo 
/*
function loadBackground(index) {

	textureLoader.load(
		backgrounds[index],
		(texture)=>{
			texture.colorSpace = THREE.SRGBColorSpace,
			texture.magFilter = THREE.LinearFilter;
			texture.minFilter = THREE.LinearMipMapLinearFilter;
			texture.encoding = THREE.sRGBEncoding;
			texture.anisotropy = 16
			scene.background = texture;
			loadTexture(index)
		},
		//onupdate callback
		undefined,
		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	)
}
*/

//funcion que cambia el diseño de la camisa
function loadTexture(index){
	
	textureLoader.load(
		//carga la textura que este en el arreglo[index]
		textures[index],
		//onload callback
		(texture)=>{
			//define la configuración de color de la textura
			texture.colorSpace = THREE.SRGBColorSpace, 
			texture.magFilter = THREE.LinearFilter;
			texture.minFilter = THREE.LinearMipMapLinearFilter;
			texture.encoding = THREE.sRGBEncoding;
			texture.anisotropy = 16

			//creamos un material nuevo 
			let material = new THREE.MeshStandardMaterial({
				//diseño de la camisa
				map:texture, 
				//detalles
				normalMap: texturesDetails[0], 
				normalScale : new THREE.Vector2(1.5, 1.5),
				roughnessMap: texturesDetails[1],	
				side: THREE.DoubleSide  } );		

			/* let buttons = new THREE.MeshPhongMaterial({
				map:texturesDetails[2],
				color: 0x000000
			})
			model.material= [material, buttons]
			*/
			
			//actualisamos el material
			model.material= material
			text.innerText = textos[index]
		},
		//onupdate callback
		undefined,

		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	)	
}

//funcion que actualiza los botones 

function buttonsUpdate(index){	
	buttons.forEach(button => {
		if (button.classList.contains("selected")){
			button.classList.toggle("selected")			
		}			
	})
	buttons[index].classList.add("selected")	
}

//funcion exportada para cambiar la textura
export function loadTextures(index){

	contador = index-1
	loadTexture(index-1)
	buttonsUpdate(index-1)
	//loadBackground(index-1)	
}

