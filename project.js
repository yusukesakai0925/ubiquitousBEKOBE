let capture;
let img;
let bodypix;
let body;

function setup(){
	let c = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
	capture = createCapture(VIDEO);
	capture.size(200, 200);
	pixelDensity(1);
	capture.hide();
	bodypix = ml5.bodyPix(capture, modelReady);
  textSize(220*windowWidth*2.4/2560);
	textAlign(CENTER, CENTER);
}


let resize_x = 1.0;
let resize_y = 1.0;

function draw(){
	scale(-1, 1);	//左右反転
  	background(255);
	let img = capture.get();
	resize_x = windowWidth/img.width;
	resize_y = windowHeight/img.height;
	img.resize(windowWidth, windowHeight);
	image(img, -width, 0);

	for(let i=0;i<1000;i++){
		scale(-1, 1);
		stroke(205, 0, 70+i*0.3);
		strokeWeight(5);
		line(0, windowHeight*3.4/5+i, width, windowHeight*3.4/5+i);
	}
	for(let i = 0; i<30; i++){
		scale(-1, 1);
		fill(205, 0, 40+2*i);
		noStroke();
		//textFont("'Sawarabi Mincho', cursive");
		text("BE KOBE", windowWidth/2+i, windowHeight*3/5+i);
	}
	if(body){	//このifないとバグります
		body.resize(windowWidth, windowHeight);
		image(body, -width, 0);
	}
}




function mousePressed(){
	let fs = fullscreen();
	fullscreen(!fs);
}

function windowResized() {
	// print("ウィンドウサイズの変更");
	resizeCanvas(windowWidth, windowHeight);
	textSize(220*windowWidth*2.4/2560);
}


function keyPressed() {
	if(key === "c"){
		saveCanvas(c, 'myCanvas', 'jpg');
	}
}

const options = {
	outputStride: 16, // 8, 16, or 32, default is 16
	segmentationThreshold: 0.5 // 0 - 1, defaults to 0.5 
}


function modelReady() {
	console.log('ready!')
	bodypix.segment(gotResults, options)
  }
  
  function gotResults(err, result) {
	if (err) {
	  console.log(err)
	  return
	}
  
	segmentation = result;
	body = segmentation.backgroundMask
	bodypix.segment(capture, gotResults)
  }

