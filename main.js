
prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'/>";
    });
}
console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fNFREG9Om/model.json", modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction1;
    speak_data_2 = "The second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak();
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction1;
        document.getElementById("result_emotion_name2").innerHTML = prediction2;
    }
    if (prediction1 == "happy") {
        document.getElementById("updata_emoji").innerHTML = "&#128522;";
    }
    if (prediction1 == "sad") {
        document.getElementById("updata_emoji").innerHTML = "&#128532";
    }
    if (prediction1 == "angry") {
        document.getElementById("updata_emoji").innerHTML = "&#128545;";
    }

    if (prediction2 == "happy") {
        document.getElementById("updata_emoji2").innerHTML = "&#128522;";
    }
    if (prediction2 == "sad") {
        document.getElementById("updata_emoji2").innerHTML = "&#128532";
    }
    if (prediction2 == "angry") {
        document.getElementById("updata_emoji2").innerHTML = "&#128545;";
    }
}