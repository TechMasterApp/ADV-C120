function preload() {
  
}

function setup() {
  canvas = createCanvas(415, 300);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
  synth = window.speechSynthesis
}

function draw() {
  image(video, 0, 0, 415, 300)
  classifier.classify(video, gotResult)
}

function modelLoaded() {
  
}

function gotResult(error, result) {
  if (error) {
    console.error(error)
  }

  document.getElementById("label").innerHTML = "Object : " + result[0].label
  document.getElementById("confidence").innerHTML = "Accuracy : " + (result[0].confidence * 100).toFixed() + "%"
  if (result[0].confidence > 0.5) {
    utterThis = new SpeechSynthesisUtterance("I see" + result[0].label)
    synth.speak(utterThis)
  }
}