function defaultSet(){
    var image = document.getElementById('tokki_image');
    var height = document.getElementById('toki_height').value;
    var weight = document.getElementById('toki_weight').value;
    var newHeight = 10 + height*0.8,
        newWeight = 10 + weight*0.8;
    image.style.height = newHeight + '%';
    image.style.width = newWeight + '%';
}