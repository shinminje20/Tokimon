// function openMenu(menuName, elmnt, color) {
//   var i, tabcontent, tablinks, content, form_content;

//   tabcontent = document.getElementsByClassName('tabcontent');
//   content = document.getElementsByClassName('content');
//   form_content = document.getElementsByClassName('form_content');
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//     content[i].style.display = "none";
//     form_content[i].style.display ="none";
//   }
//   tablinks = document.getElementsByClassName('tablink');

//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].style.backgroundColor = "";
//   }

//   document.getElementById(menuName).style.display = "block";

//   var x = document.getElementById(menuName+"_content");
//   x.style.display = "block";
//   x.style.borderColor = color;
//   elmnt.style.backgroundColor = color;
//   document.getElementById(menuName+"_form").style.display = "inline-block"
// }
// Get the element with id="defaultOpen" and click on it
// document.getElementById('defaultOpen').click();


// document.getElementById('selection').onchange("showOption('none');");

// function displayChange(){
//   document.getElementById('search_toki').style.display=none;
// }
// function buttonEnable(){
//   document.getElementById("apply_btn").disabled = false;
// }

// function enableSelection() {
//   var n = document.getElementById("manage_name").value;
//   console.log(n);
  
//   // if(n != ""){
//   document.getElementById("selection").disabled = false;
//   // }
  
// }
// window.addEventListener('keydown', function (event) {

//   // if the keyCode is 16 ( shift key was pressed )
//   if (event.keyCode === 16) {

//       event.preventDefault();

//       return false;
//   }

// });

function tokiResize(){
  var image = document.getElementById('tokimon_image'),
      newHeight = 10 + tokimonHeight.value*0.8,
      newWeight = 10 + tokimonWeight.value*0.8;
      if(newWeight>=60){
        image.src = "images/muscle_tokki.png";
      }else if(newWeight>=30){
        image.src = "images/muscle_tokki2.png";
      } else {
        image.src = "images/add_tokki.png";
      }
      image.style.height = newHeight +'%';
      image.style.width = newWeight +'%';
}

