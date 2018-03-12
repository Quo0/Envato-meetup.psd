function log(el){
  console.log(el);
}
window.onload = function(){
  fixedHeader();
  menuToggle();
  smoothLinks();
  timeCounter();
}


//////////////////////////////////////////////////////////////////////////////////////////

function fixedHeader(){
  var headerWrapper = document.querySelector("#header-wrapper");
  var header = document.querySelector("header");
  var clockBlock = document.querySelector(".clock-block");
  window.addEventListener("scroll",function(){
    if(window.pageYOffset > 800){
      headerWrapper.style.position = "fixed";
      headerWrapper.style.top = 0;
      headerWrapper.style.background = "rgba(51, 51, 51, 0.95)";
      headerWrapper.style.zIndex = "2000";
      header.style.padding = "1em 2em";
      // to stop shaking
      clockBlock.style.paddingTop = "21em";
    }
    else{
      headerWrapper.style.position = "unset";
      headerWrapper.style.top = "-500%";
      headerWrapper.style.background = "#333";
      header.style.padding = "3em 0 0 0";
      // to stop shaking
      clockBlock.style.paddingTop = "11.5em";
    }
  })
}

//////////////////////////////////////////////////////////////////////////////////////////

function menuToggle(){
  var openMenuBtn = document.querySelector(".menu-toggler");
  var statusIcon = document.querySelector(".status-icon");
  var menu = document.querySelector("#nav");
  function closeMenu(){
    menu.classList = "";
    statusIcon.style.transform = "rotateX(0deg)";
  }  
  openMenuBtn.addEventListener('click', function(e){
      
      if(menu.classList != "menu-open"){
        menu.classList = "menu-open";
        statusIcon.style.transform = "rotateX(180deg)";
      }
      else{
        closeMenu();
      }
  })
  window.addEventListener('scroll', function(){
    closeMenu();
  });  
}

//////////////////////////////////////////////////////////////////////////////////////////

function smoothLinks(){

/*In this function I met the conflict between "offsetTop" and "positon properties.
  Becouse of this "offsetTop" property start counting not from the Window but from 
  his closest desendant element which has the "position" property,
  (and we cant quikly change our styles in CSS) we need to add this checkPosition() function.
  It looks for the initial point and acoumulate offsetTop, so we can scroll straight
  to the desired element position */

  var menuNav = document.querySelector("#nav");
  menuNav.addEventListener('click', function(e){
    if(e.target.tagName == "A"){
      e.preventDefault();
      var path = e.target.getAttribute("href");
      var header = document.querySelector("header");
      var targetElement = document.querySelector(path);     
      var targetElementTop = targetElement.offsetTop - ( header.offsetHeight / 6 );
      var scrollPosition = window.pageYOffset;
      var firstTarget = targetElement; 
      var offsetSum = 0;
      ////////////////////////////////
      checkPosition();
      function checkPosition(){
        var offsetParent = targetElement.offsetParent;
        if( offsetParent.offsetTop != 0 ){
          offsetSum += targetElement.offsetTop;
          targetElement = offsetParent;
          targetElementTop =  targetElement.offsetTop + offsetSum; 
          checkPosition()
        }            
      }
      ////////////////////////////////
      scrollToLink();
      function scrollToLink(){        
        var timer;
        var step = 50;   
        if(targetElementTop > scrollPosition){
          window.scrollTo(0, scrollPosition)
          scrollPosition = scrollPosition + step;
          timer = setTimeout(scrollToLink, 10);
          // prevents from shaking
          if( (Math.abs(targetElementTop) - Math.abs(scrollPosition)) <= step ){
            clearTimeout(timer);
            window.scrollTo(0, targetElementTop); // to the target
          }
        }
        else if(targetElementTop < scrollPosition){
          window.scrollTo(0, scrollPosition);
          scrollPosition = scrollPosition - step;
          timer = setTimeout(scrollToLink, 10);
          // prevents from shaking
          if( (Math.abs(scrollPosition) - Math.abs(targetElementTop)) <= step ){
            clearTimeout(timer);
            window.scrollTo(0, targetElementTop); // to the target
          }
        }
      }
    }
  })
}

//////////////////////////////////////////////////////////////////////////////////////////

function timeCounter(){
  var deadline = 'May 01 2018';

  var timer = setTimeout(outputNums , 1000);
  function outputNums(){       
    var timeRemain = Date.parse(deadline) - Date.parse(new Date());
    if(timeRemain){
      var sec = Math.floor( (timeRemain / 1000) % 60 );
      var min = Math.floor( (timeRemain / 1000 / 60 ) % 60 );
      var hours = Math.floor( (timeRemain / 1000 / 60 / 60 ) % 24 );
      var days = Math.floor( (timeRemain / 1000 / 60 / 60 / 24) );

      var strSec = "" + ( sec / 10).toFixed(1)
      var strMin = "" + ( min / 10 ).toFixed(1);
      var strHours = "" + ( hours / 10 ).toFixed(1);
      var strDays = "" + ( days / 10 ).toFixed(1);

      var arrSec = Array.from(strSec);
      arrSec.splice(1,1);
      var outSec = arrSec.join("");

      var arrMin = Array.from(strMin);
      arrMin.splice(1,1);
      var outMin = arrMin.join("");

      var arrHours = Array.from(strHours);
      arrHours.splice(1,1);
      var outHours = arrHours.join("");

      var arrDays = Array.from(strDays);
      arrDays.splice(1,1);
      var outDays = arrDays.join("");
     
      document.querySelector("#days").innerHTML = outDays;
      document.querySelector("#hours").innerHTML = outHours;
      document.querySelector("#min").innerHTML = outMin;
      document.querySelector("#sec").innerHTML = outSec;
     
      timer = setTimeout(outputNums , 1000);
    }
    else{
      clearTimeout(timer);
    }    
  }  
}


