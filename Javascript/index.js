$(document).ready(function () {

    animatedCss();

    //scroll down
    function filter(string) {
        return string
            .replace(/^\//, '')
            .replace(/(index|default)\.[a-zA-Z]{3,4}$/, '')
            .replace(/\/$/, '');
    }
    $('[href*="#"]').each(function () {
        if (filter(location.pathname) == filter(this.pathname) &&
            location.hostname == this.hostname &&
            this.hash.replace(/#/, '')) {
            var $targetId = $(this.hash),
                $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
            var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
            if ($target) {
                var targetOffset = $target.offset().top;
                $(this).click(function () {
                    $('html, body').animate({
                        scrollTop: targetOffset
                    }, 1000);
                    return false;
                });
            }
        }
    });

});

//add animateCss to jquery
function animatedCss() {
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
}

//animate socialMedia
$(".fa").on("mouseover", function () {
    $(this).animateCss("rubberBand");
});

//button mouseover animation
$("#homeContainer > .btn").on("mouseover", function () {
     $(this).animateCss("pulse");
});

//button open link
$("#homeContainer > .btn").click(function () {
    if(this.id === "alpha" ){
        window.open("http://pilot.bitjob.io/pages/index.html");
    }
    else{
        window.open("https://drive.google.com/file/d/0B6VVmGzOdFPBeDVpWVE4Y2xubFE/view");
    }
});

//add active to click navabar
$("a").click(function () {
    // remove classes from all
    $("li").removeClass("active");
    // add class to the one we clicked
    $(this).parent().addClass("active");
});

//test

	
	/**
	 * With love.
	 * http://hakim.se/experiments/
	 * http://twitter.com/hakimel
	 */
	
	var SCREEN_WIDTH = $("#home").width();
	var SCREEN_HEIGHT = $("#home").height();
	
	var RADIUS = 110;
	
	var RADIUS_SCALE = 1;
	var RADIUS_SCALE_MIN = 1;
	var RADIUS_SCALE_MAX = 1.5;
	
	// The number of particles that are used to generate the trail
	var QUANTITY = 25;

	var canvas;
	var context;
	var particles;
	
	var mouseX = $("#home").width();
	var mouseY = $("#home").height();
	var mouseIsDown = false;
	
	init();

	function init() {

		canvas = document.getElementById( 'world' );
		
		if (canvas && canvas.getContext) {
			context = canvas.getContext('2d');
			
			// Register event listeners
			document.addEventListener('mousemove', documentMouseMoveHandler, false);
			document.addEventListener('mousedown', documentMouseDownHandler, false);
			document.addEventListener('mouseup', documentMouseUpHandler, false);
			canvas.addEventListener('touchstart', canvasTouchStartHandler, false);
			canvas.addEventListener('touchmove', canvasTouchMoveHandler, false);
			window.addEventListener('resize', windowResizeHandler, false);
			
			createParticles();
			
			windowResizeHandler();
			
			setInterval( loop, 1000 / 60 );
		}
	}

	function createParticles() {
		particles = [];
		
		for (var i = 0; i < QUANTITY; i++) {
			var particle = {
				position: { x: mouseX, y: mouseY },
				shift: { x: mouseX, y: mouseY },
				size: 1,
				angle: 0,
				speed: 0.01+Math.random()*0.04,
				targetSize: 1,
				fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
				orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
			};
			
			particles.push( particle );
		}
	}

	function documentMouseMoveHandler(event) {
		mouseX = event.clientX - ($("#home").width()) * .1;
		mouseY = event.clientY - ($("#home").height()) * .1;
	}
	
	function documentMouseDownHandler(event) {
		mouseIsDown = true;
	}
	
	function documentMouseUpHandler(event) {
		mouseIsDown = false;
	}

	function canvasTouchStartHandler(event) {
		if(event.touches.length == 1) {
			event.preventDefault();

			mouseX = event.touches[0].pageX - ($("#home").width()) * .1;
			mouseY = event.touches[0].pageY - ($("#home").height()) * .1;
		}
	}
	
	function canvasTouchMoveHandler(event) {
		if(event.touches.length == 1) {
			event.preventDefault();

			mouseX = event.touches[0].pageX - ($("#home").width()) * .1;
			mouseY = event.touches[0].pageY - ($("#home").height()) * .1;
		}
	}
	
	function windowResizeHandler() {
		//SCREEN_WIDTH = window.innerWidth;
		//SCREEN_HEIGHT = window.innerHeight;
		
		canvas.width = $("#home").width();
		canvas.height = $("#home").height();
		
		canvas.style.position = 'absoulute';
		canvas.style.left = $("#home").width();
		canvas.style.top = $("#home").height();
	}

	function loop() {
		
		if( mouseIsDown ) {
			// Scale upward to the max scale
			RADIUS_SCALE += ( RADIUS_SCALE_MAX - RADIUS_SCALE ) * (0.02);
		}
		else {
			// Scale downward to the min scale
			RADIUS_SCALE -= ( RADIUS_SCALE - RADIUS_SCALE_MIN ) * (0.02);
		}
		
		RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );
		
		// Fade out the lines slowly by drawing a rectangle over the entire canvas
		context.fillStyle = 'rgba(21,51,84,0.3)';
   		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		
		for (i = 0, len = particles.length; i < len; i++) {
			var particle = particles[i];
			
			var lp = { x: particle.position.x, y: particle.position.y };
			
			// Offset the angle to keep the spin going
			particle.angle += particle.speed;
			
			// Follow mouse with some lag
			particle.shift.x += ( mouseX - particle.shift.x) * (particle.speed);
			particle.shift.y += ( mouseY - particle.shift.y) * (particle.speed);
			
			// Apply position
			particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * (particle.orbit*RADIUS_SCALE);
			particle.position.y = particle.shift.y + Math.sin(i + particle.angle) * (particle.orbit*RADIUS_SCALE);
			
			// Limit to screen bounds
			particle.position.x = Math.max( Math.min( particle.position.x ), 0 );
			particle.position.y = Math.max( Math.min( particle.position.y ), 0 );
			
			particle.size += ( particle.targetSize - particle.size ) * 0.05;
			
			// If we're at the target size, set a new one. Think of it like a regular day at work.
			if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
				particle.targetSize = 1 + Math.random() * 7;
			}
			
			context.beginPath();
			context.fillStyle = particle.fillColor;
			context.strokeStyle = particle.fillColor;
			context.lineWidth = particle.size;
			context.moveTo(lp.x, lp.y);
			context.lineTo(particle.position.x, particle.position.y);
			context.stroke();
			context.arc(particle.position.x, particle.position.y, particle.size/2, 0, Math.PI*2, true);
			context.fill();
		}
	}
	
	