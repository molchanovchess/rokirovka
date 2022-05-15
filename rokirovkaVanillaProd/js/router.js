function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}
//	carousel-start
let timerId;
var slideIndex = 0;
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    

    slides[slideIndex-1].style.display = "block";  
	timerId = setTimeout(showSlides, 5000); // Change image every 2 seconds
}
// carousel-end


// Gallery start

var slideIndexG = 1;

// Next/previous controls
function plusSlidesG(n) {
  showSlidesG(slideIndexG += n);
}

// Thumbnail image controls
function currentSlideG(n) {
  showSlidesG(slideIndexG = n);
}

function showSlidesG(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides-g");
  var dots = document.getElementsByClassName("demo-g");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndexG = 1}
  if (n < 1) {slideIndexG = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexG-1].style.display = "block";
  dots[slideIndexG-1].className += " active";
  captionText.innerHTML = dots[slideIndexG-1].alt;
} 

// Gallery end



Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        let r = this.routes;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) { 
            let url = 'views/' + htmlName;
                let xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;	
					
					//здесь меняются адреса

					if (htmlName === 'home.html') {
						clearTimeout(timerId);
						showSlides();
						console.log('we are inside if');
					} else {
						console.log('2');
						clearTimeout(timerId);
					}

					if (htmlName === 'gallery.html') {
						console.log('were in gallery');
						showSlidesG(slideIndexG);
					}
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();


        })(this);
    }
	

};