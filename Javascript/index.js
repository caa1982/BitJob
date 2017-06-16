$(document).ready(function () {
    //set height of of image for PC-Pilote animation
    $('.alphaPreviewNext').attr("style", "height:" + $('.alphaPreview').height() + "px");
    $(".flip").flip();
    animatedCss();
    scrollDown();
});

//scroll down
function scrollDown() {
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
}

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


//Scroll change color and active link
var flag = false;
$(document).scroll(function () {
    var white = [$('#whitepaper').position().top, $('#crowdfund').position().top, $('#team').position().top, $('#learnMore').position().top];
    white = white.map(function(el){return Math.floor(el)});
    var blue = [$('#home').position().top, $('#platform').position().top, $('#roadmap').position().top];
    blue = blue.map(function(el){return Math.floor(el)});
    var scroll_start = $(this).scrollTop()+1;
    console.log(scroll_start);
    console.log(blue);
    var settings = function (set) {
        if (set === "white") {
            $(".nav-link").attr('style', 'color:white !important');
            $(".navbar").attr('style', 'background:#153354 !important');;
            $(".faNav").attr('style', 'color:white !important');
            $(".dropdown-item").attr('style', 'color:white !important');
            $("#navbarLogo").attr('src', 'img/Bitjob_logo_transparant.png');
        }
        else {
            $(".nav-link").attr('style', 'color:#153354 !important');
            $(".navbar").attr('style', 'background:white !important');
            $(".faNav").attr('style', 'color:#153354 !important');
            $(".dropdown-item").attr('style', 'color:#153354 !important');
            $("#navbarLogo").attr('src', 'img/Bitjob_logo.png');
        }
    };
    if (scroll_start >= blue[0] && scroll_start < white[3]) {
        $(".nav-link").attr('style', 'color:white !important');
        $(".navbar").attr('style', 'background:url("img/3dBackground.webp")no-repeat cover fixed');
        $(".faNav").attr('style', 'color:white !important');
        $(".dropdown-item").attr('style', 'color:white !important');
        $("#navbarLogo").attr('src', 'img/Bitjob_logo_transparant.png');
        $("li").removeClass("active");
        $($('a[href="#home"]')).parent().addClass("active");
    } else if (scroll_start >= blue[0] && scroll_start < white[0]) {
        settings("");
    } else if (scroll_start >= white[0] && scroll_start < blue[1]) {
        settings("");
        $("li").removeClass("active");
        $($('a[href="#whitepaper"]')).parent().addClass("active");
    } else if (scroll_start >= blue[1] && scroll_start < white[1]) {
        settings("white");
        $("li").removeClass("active");
        $($('a[href="#platform"]')).parent().addClass("active");
    } else if (scroll_start >= white[1] && scroll_start < blue[2]) {
        settings("");
        $("li").removeClass("active");
        $($('a[href="#crowdfund"]')).parent().addClass("active");
    } else if (scroll_start >= blue[2] && scroll_start < white[2]) {
        settings("white");
        $("li").removeClass("active");
        $($('a[href="#roadmap"]')).parent().addClass("active");
    } else {
        settings("");
        $("li").removeClass("active");
        $($('a[href="#team"]')).parent().addClass("active");
    }



    if (scroll_start < white[3] + (white[3] / 2) && flag === true) {
        $('.alphaPreview').animate({top: blue[0]}, 1000, "linear");
        flag=false;
    } else if (scroll_start > white[3] + (white[3] / 2) && flag === false) {
        $('.alphaPreview').animate({top: white[3]}, 1000, "linear");
        flag=true;
    }

});




//hover navbar
$("a > span").hover(function () {
    $(this).addClass("hoverColor")
}, function () {
    $(this).removeClass("hoverColor")
}
);

//animate socialMedia
$(".faNav").on("mouseover", function () {
    $(this).animateCss("rubberBand");
});

//button open link
$("#homeContainer > .homeButton").click(function () {
    if (this.id === "alpha") {
        window.open("http://pilot.bitjob.io/pages/index.html");
    }
});

//on click collapse navbar
$('.collapse1').on('click', function () {
    $('#collapsingNavbar2').collapse('hide');
});

//add box on selected team and show team
$('.teamSelect').on('click', function () {
    $('.teamSelect').removeClass('box');
    $(this).addClass('box');
    $("#cardContainer").children().addClass("hidden");
    $("." + this.id).removeClass("hidden");
});

//TimeCircles

$("#CountDownTimer").TimeCircles(); 

$(window).resize(function(){
    $("#CountDownTimer").TimeCircles().rebuild();
});

