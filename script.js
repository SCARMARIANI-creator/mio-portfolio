/* =================================
   ART BY SCAR
   Main JavaScript
================================= */


/* ================================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(".reveal");


function revealOnScroll(){

    revealElements.forEach(element => {

        const position =
        element.getBoundingClientRect().top;

        const windowHeight =
        window.innerHeight;


        if(position < windowHeight - 100){

            element.classList.add("active");

        }

    });

}


window.addEventListener(
"scroll",
revealOnScroll
);


revealOnScroll();



/* ================================
   PAGE TRANSITION
================================ */


document.addEventListener(
"DOMContentLoaded",
()=>{

document.body.classList.add("loaded");

});



/* ================================
   LIGHTBOX
================================ */


const images =
document.querySelectorAll(".art-card img");


const lightbox =
document.querySelector(".lightbox");


const lightboxImage =
document.querySelector(".lightbox img");



images.forEach(image=>{


image.addEventListener(
"click",
()=>{

if(!lightbox) return;


lightboxImage.src =
image.src;


lightbox.classList.add(
"active"
);


});


});



if(lightbox){

lightbox.addEventListener(
"click",
()=>{

lightbox.classList.remove(
"active"
);

});


}



/* ================================
   CMS READY LOADER
================================ */


async function loadCMSContent(
type,
container
){


try {


const response =
await fetch(
`content/${type}.json`
);



const data =
await response.json();



const target =
document.querySelector(
container
);



if(!target) return;



target.innerHTML = "";



data.forEach(item=>{


target.innerHTML += `

<article class="art-card reveal">

<img src="${item.image}"
alt="${item.title}">


<div class="art-info">

<h3>${item.title}</h3>

<p>
${item.description || ""}
</p>

</div>

</article>

`;


});



revealOnScroll();



}

catch(error){

console.log(
"CMS loading:",
error
);

}


}



/* ================================
   MOBILE MENU
================================ */


const menuButton =
document.querySelector(
".menu-button"
);


const navigation =
document.querySelector(
"nav"
);



if(menuButton){


menuButton.onclick =
()=>{

navigation.classList.toggle(
"open"
);

};


}