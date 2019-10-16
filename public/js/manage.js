function showOption() {
    var option = document.getElementById('selection').value;
    var optionContent;
    console.log('=========================');
    console.log(option);
    
    console.log('=========================');
    
    optionContent = document.getElementsByClassName('option_content');
    for (i = 0; i < optionContent.length; i++) {
      optionContent[i].style.display = "none";
    }
    // var selection = document.getElementById('selection');
    document.getElementById(option).style.display = "block";
  
    // document.option_form.action = option == "info" ? "/info" : "/";
  
  }
  function getLink(){
    document.getElementById('info_link').style.display = "block";
    document.getElementById('info_toki').style.display = "none";
  }