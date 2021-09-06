status_new="";
value="";
objects = [];

function setup(){
    video = createCapture(VIDEO);
    video.hide();

    canvas = createCanvas(500, 400);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    value = document.getElementById("object_name").value;

}

function modelLoaded(){
    console.log("Model Loaded!");
    status_new = true;
}

function draw(){
    image(video, 0, 0, 500, 400);

    if(status_new !="")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected" +objects.length;
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " +objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " +percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(object[i].label == value){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Object Metioned Found";
                var synth = window.speechSynthesis();
                var utterThis = new SpeechSynthesisUtterance(value + "Found"); 
                synth.speek(utterThis);
            } else{
                documentt.getElementById("status").innerHTML = "Object Mentioned Not Found"; 
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objects = results;
}