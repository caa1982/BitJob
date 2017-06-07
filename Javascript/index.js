$(document).ready(function () {

    animatedCss();

    //add active to click navabar
    $(function () {
        $("a").click(function () {
            // remove classes from all
            $("li").removeClass("active");
            // add class to the one we clicked
            $(this).parent().addClass("active");
        });
    });

    //add animation
    $(function () {
        $("a").on("click", function () {
            $(this).animateCss("bounce");
        });
    });

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