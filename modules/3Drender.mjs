import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const div = document.getElementById('shirt-canvas') //Elemento html donde se pondrá la escena
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000) 
const light = new THREE.DirectionalLight( 0xffffff, 3)
const light2 =new THREE.HemisphereLight( 0x6c3800, 0x1a0362, 1 );
const render = new THREE.WebGLRenderer({ antialias: true, gammaOutput : true});
const textureLoader = new THREE.TextureLoader()
const buttons = Array.from(document.getElementsByClassName("shirt-button-item"));
const controls = new OrbitControls( camera, render.domElement );

/*
const backgrounds = [
	'../assets/textures/image.png',
	'../assets/textures/wood.png',
	'../assets/textures/crazy.png',
]*/

const textures = [
	'../assets/textures/t1.jpg',
	'../assets/textures/t2.jpg',
	'../assets/textures/t3.jpg',
]

const texturesDetails = [
	textureLoader.load('../assets/3d/Shirt_Normal.png'),
	textureLoader.load('../assets/3d/Shirt_Rough.png'),
	textureLoader.load('../assets/3d/Shirt_Rough.png')
]

let  loader =  new THREE.ObjectLoader();
let model;


render.setSize( window.innerWidth, window.innerHeight ); //Ponemos el tamaño del render
render.setAnimationLoop( animate );



div.appendChild(render.domElement )//la agregamos al div el render

camera.position.set(0,15.352,15.112)
camera.rotation.set(-0.5,0,0)


controls.target.set(0,7,0)
controls.enablePan= false
controls.enableZoom= false
controls.enableRotate = false
controls.autoRotate = true
controls.autoRotateSpeed = 3
controls.dampingFactor = true
controls.minPolarAngle = 3*Math.PI/8
controls.maxPolarAngle = 3*Math.PI/8

let contador = -1;
let controler = true;

controls.addEventListener(
	"change",
	event =>{		
		let angle =  controls.getAzimuthalAngle();			
		if(angle >= -1.59 & angle <= -1.56){	
			controler=true				
			controls.autoRotateSpeed = 20
		}else if(angle >= -0.1 && angle <= 0.1 && controler == true){
			controler=false			
			contador++			
			loadTextures((contador%3)+1)
			controls.autoRotateSpeed = 3
			
		}
	}
)

controls.update();

light.position.set(-0.780,16.579,31.463)
light2.position.set(0,15.352,0)
scene.add(light)
scene.add(light2)





window.addEventListener( 'resize', function () {


	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	render.setSize( window.innerWidth, window.innerHeight );	

} );


loader.load(
	// resource URL
	'../assets/3d/shirt.json',

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
        model = obj
		// Add the loaded object to the scene
        obj.scale.set(17.697,17.697,17.697)		
		scene.add( obj );
		loadTextures(1)
	}
);

function animate() {
	

	
	light.position.copy( camera.position );

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
function loadTexture(index){

	let result
	textureLoader.load(
		textures[index],
		//onload callback
		(texture)=>{
			texture.colorSpace = THREE.SRGBColorSpace,
			texture.magFilter = THREE.LinearFilter;
			texture.minFilter = THREE.LinearMipMapLinearFilter;
			texture.encoding = THREE.sRGBEncoding;
			texture.anisotropy = 16

			let material = new THREE.MeshStandardMaterial({
				map:texture,
				normalMap: texturesDetails[0],
				normalScale : new THREE.Vector2(2, 2),
				roughnessMap: texturesDetails[1],	
				side: THREE.DoubleSide  } );		
			let buttons = new THREE.MeshPhongMaterial({
				map:texturesDetails[2],
				color: 0x000000
			})
			model.material= [material, buttons]

		},
		//onupdate callback
		undefined,
		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	)



		
}

function buttonsUpdate(index){	
	buttons.forEach(button => {
		if (button.classList.contains("selected")){
			button.classList.toggle("selected")
		}			
	})
	buttons[index].classList.add("selected")	
}

export function loadTextures(index){

	console.log(index)
	loadTexture(index-1)
	buttonsUpdate(index-1)
	//loadBackground(index-1)	
}

