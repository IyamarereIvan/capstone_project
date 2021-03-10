function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

$(document).ready(function () {
    $('.carousel').carousel({
        interval: 6000
    })
});

// testing
function myMenu(){
    $('.menu-toggle').click(function () {
        $(".nav").toggleClass("mobile-nav");
        $(this).toggleClass("is-active");
    });

}
function mySearch() {
    
    $("#search-icon").click(function () {
        $(".nav").toggleClass("search");
        $(".nav").toggleClass("no-search");
        $(".search-input").toggleClass("search-active");
    });
}
function openmodal_momo() {
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn-1");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    
}
function openmodal_visa() {
    var modal = document.getElementById("myModal-2");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn-2");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-2")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


}
/* upload Js */
// function openCity(evt, cityName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " active";
//     // Get the element with id="defaultOpen" and click on it
    
// }
// document.getElementById('defaultOpen.ClientID ').click();

// onscroll button

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
//show onclick
// var x = document.getElementById("languange");
function mylanguange() {
   
    if (document.getElementById("languange").style.display === "none") {
        document.getElementById("languange").style.display = "block";
        document.getElementById("mycross").style.display ="block"
    } else {
        document.getElementById("languange").style.display = "none";
        document.getElementById("mycross").style.display = "none"
    }
}
function closelanguange() {
    if(document.getElementById("mycross").style.display=="block"){
        document.getElementById("languange").style.display ="none"
        document.getElementById("mycross").style.display ="none"
    }
    
}