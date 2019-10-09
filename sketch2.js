
let video;
let poseNet;
let poses = [];
var reyes;
var leyes;
var noses;
var rears;
var lears;

let x = 0;
let y = 0;

let img;
function preload() {
  for (var  i =4 ; i <7; i++) {
  reyes = loadImage('leyes/l0.png');
  leyes = loadImage('reyes/r0.png');
  noses = loadImage('noses/n0.png');
  rears = loadImage('lears/le0.png');
  lears = loadImage('rears/re0.png');


  }
}

function setup() {
  createCanvas(640, 480);
  //§createCanvas(windowWidth, windowHeight);
  //video.size(width, height);
  video = createCapture(VIDEO);

  //video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
   x = width/2
  //y = height/2

}
function gotPoses(poses) {
  if (poses.length > 0) {

  let nX = poses[0].pose.keypoints[0].position.x
  let nY = poses[0].pose.keypoints[0].position.y
  let elX = poses[0].pose.keypoints[1].position.x
  let elY = poses[0].pose.keypoints[1].position.y
  let erX = poses[0].pose.keypoints[2].position.x
  let erY = poses[0].pose.keypoints[2].position.y
  let reX = poses[0].pose.keypoints[4].position.x
  let reY = poses[0].pose.keypoints[4].position.y
  let leX = poses[0].pose.keypoints[3].position.x
  let leY = poses[0].pose.keypoints[3].position.y
  pose.nose.x = lerp(pose.nose.x, nX, 0.5);
  pose.nose.y = lerp(pose.nose.y, nY, 0.5);
  pose.rightEye.x = lerp(pose.rightEye.x, reX, 0.5);
  pose.rightEye.y = lerp(pose.rightEye.y, reY, 0.5);
  pose.leftEye.x = lerp(pose.leftEye.x, reX, 0.5);
  pose.leftEye.y = lerp(pose.leftEye.y, reY, 0.5);
  pose.leftEar.x = lerp(pose.leftEar.x, leX, 0.5);
  pose.leftEar.y = lerp(pose.leftEar.y, leY, 0.5);
  pose.rightEar.x = lerp(pose.rightEar.x, reX, 0.5);
  pose.rightEar.y = lerp(pose.rightEar.y, reY, 0.5);


  }
}

function modelReady() {
  select('#status').html('Model Loaded');

}

function draw() {

  imageMode(CORNER);
  image(video, 0, 0);




  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

  let d = dist(pose.nose.x, pose.nose.y, pose.rightEye.x, pose.rightEye.y);

    imageMode(CENTER);
    image(rears, pose.rightEar.x - 10, pose.rightEar.y, d * 1.25, d * 1.25);
		image(lears, pose.leftEar.x + 5, pose.leftEar.y - 10, d * 1.25, d * 1.25);
    image(noses, pose.nose.x, pose.nose.y - 15, d * 1.5, d * 1.5);
    image(reyes, pose.rightEye.x, pose.rightEye.y, d * 1.75, d * 1.75);
    image(leyes, pose.leftEye.x, pose.leftEye.y, d * 1.5, d * 1.5);


  }

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();
}
