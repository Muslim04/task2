$(window).bind('scroll', function (e) {
    parallaxScroll();
});

function parallaxScroll() {
    var scrolled = $(window).scrollTop();


    $('.layer-1').css('top', (0 - (scrolled * .25)) + 'px');
    $('.layer-2').css('top', (0 - (scrolled * .5)) + 'px');
    $('.layer-3').css('top', (0 - (scrolled * .75)) + 'px');
    $('.layer-4').css('top', (0 - (scrolled * .15)) + 'px');
    $('.layer-5').css('top', (0 - (scrolled * .08)) + 'px');
    $('.layer-6').css('top', (0 - (scrolled * .12)) + 'px');
    $('.moon').css('top', (12 + (scrolled * .03)) + '%');


    $('.rock-1').css('top', (400 - (scrolled * .8)) + 'px');
    $('.rock-2').css('top', (200 - (scrolled * .6)) + 'px');
    $('.rock-3').css('top', (500 - (scrolled * .4)) + 'px');
    $('.rock-4').css('top', (600 - (scrolled * .5)) + 'px');
    $('.rock-5').css('top', (600 - (scrolled * .7)) + 'px');
    $('.rock-6').css('top', (400 - (scrolled * .7)) + 'px');
    $('.rock-7').css('top', (600 - (scrolled * .5)) + 'px');
    $('.rock-8').css('top', (200 - (scrolled * .2)) + 'px');
    $('.rock-9').css('top', (200 - (scrolled * .4)) + 'px');


    var hs = $('.hs-container');
    var track = $('.hs-track');
    if (hs.length && track.length) {
        var start = hs.offset().top;
        var end = start + hs.outerHeight() - $(window).height();
        var clamped = Math.min(Math.max(scrolled - start, 0), end - start);
        var targetProgress = (end - start) > 0 ? clamped / (end - start) : 0;


        window.__hsProgress = window.__hsProgress || 0;
        var current = window.__hsProgress;
        var eased = current + (targetProgress - current) * 0.12;
        window.__hsProgress = eased;

        var panels = $('.hs-panel').length;
        var totalWidth = (panels - 1) * $(window).width();
        var translateX = -eased * totalWidth;
        track.css('transform', 'translateX(' + translateX + 'px)');


        $('.hs-panel').each(function (index) {
            var panelLeft = index * $(window).width();
            var viewLeft = eased * totalWidth;
            var local = (viewLeft - panelLeft) / $(window).width();

            var localProgress = Math.min(1, Math.max(0, (local + 0.2) / 1.4));


            var caption = $(this).find('.hs-caption');
            caption.css('transform', 'translateY(' + (-localProgress * 40) + 'px) translateX(' + (localProgress * 20) + 'px)');

            var panelType = $(this).attr('data-panel');

            if (panelType === 'alpine') {

                $(this).find('.flake').each(function () {
                    var depth = parseFloat($(this).attr('data-depth')) || 0.08;
                    var dx = -localProgress * depth * 80;
                    var dy = localProgress * depth * 140;
                    $(this).css('transform', 'translate(' + dx + 'px,' + dy + 'px)');
                });
            } else if (panelType === 'sea') {

                $(this).find('.bubble').each(function () {
                    var depth = parseFloat($(this).attr('data-depth')) || 0.12;
                    var dx = -localProgress * depth * 90;
                    var dy = -localProgress * depth * 160;
                    $(this).css('transform', 'translate(' + dx + 'px,' + dy + 'px)');
                });
            } else if (panelType === 'city') {

                $(this).find('.line').each(function () {
                    var depth = parseFloat($(this).attr('data-depth')) || 0.15;
                    var dy = localProgress * depth * 220;
                    $(this).css('transform', 'translateY(' + dy + 'px)');
                });
            } else if (panelType === 'desert') {

                var sun = $(this).find('.sun');
                sun.css('transform', 'translateY(' + (-localProgress * 60) + 'px)');
                $(this).find('.grain').each(function () {
                    var depth = parseFloat($(this).attr('data-depth')) || 0.1;
                    var dx = -localProgress * depth * 140;
                    var dy = -localProgress * depth * 20;
                    $(this).css('transform', 'translate(' + dx + 'px,' + dy + 'px)');
                });
            }


            var bg = $(this).find('.hs-bg');
            var scale = 1 + localProgress * 0.08;
            bg.css('transform', 'scale(' + scale + ')');
        });


        var dots = $('.hs-dots');
        var panelsCount = panels;
        if (dots.children().length !== panelsCount) {
            dots.empty();
            for (var i = 0; i < panelsCount; i++) {
                dots.append('<button aria-label="Go to panel ' + (i + 1) + '" role="tab"></button>');
            }
        }
        var activeIndex = Math.round(eased * (panelsCount - 1));
        dots.children().removeClass('active').eq(activeIndex).addClass('active');


        dots.off('click', 'button').on('click', 'button', function () {
            var index = $(this).index();
            var target = panelsCount > 1 ? (index / (panelsCount - 1)) : 0;
            var startY = hs.offset().top;
            var endY = startY + hs.outerHeight() - $(window).height();
            var y = startY + target * (endY - startY);
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    }


    $('.v-section').each(function () {
        var sectionTop = $(this).offset().top;
        var sectionH = $(this).outerHeight();
        var winH = $(window).height();
        var midpoint = scrolled + winH * 0.6;
        var progress = Math.min(1, Math.max(0, (midpoint - sectionTop) / sectionH));
        $(this).find('.v-content').css('transform', 'translateY(' + (24 - progress * 24) + 'px)')
            .css('opacity', 0.5 + progress * 0.5);
    });
}


$(window).on('scroll', function () {
    var scrolled = $(window).scrollTop();
    if (scrolled > 40) {
        $('.scroll-indicator').fadeOut(300);
    } else {
        $('.scroll-indicator').fadeIn(300);
    }
});


$(window).on('mousemove', function (e) {
    var w = $(window).width();
    var h = $(window).height();
    var offsetX = (e.clientX - w / 2) / (w / 2);
    var offsetY = (e.clientY - h / 2) / (h / 2);

    $('.rock-1').css('transform', 'translate(' + (offsetX * 6) + 'px,' + (offsetY * 4) + 'px)');
    $('.rock-2').css('transform', 'translate(' + (offsetX * 4) + 'px,' + (offsetY * 3) + 'px)');
    $('.rock-3').css('transform', 'translate(' + (offsetX * 3) + 'px,' + (offsetY * 2) + 'px)');
    $('.rock-4').css('transform', 'translate(' + (offsetX * 2) + 'px,' + (offsetY * 2) + 'px)');
    $('.rock-5').css('transform', 'translate(' + (offsetX * 5) + 'px,' + (offsetY * 3) + 'px) scaleX(-1)');
    $('.rock-6').css('transform', 'translate(' + (offsetX * 2) + 'px,' + (offsetY * 2) + 'px)');
    $('.rock-7').css('transform', 'translate(' + (offsetX * 2) + 'px,' + (offsetY * 2) + 'px) scaleX(-1)');
    $('.rock-8').css('transform', 'translate(' + (offsetX * 1) + 'px,' + (offsetY * 1) + 'px) scaleX(-1)');
    $('.rock-9').css('transform', 'translate(' + (offsetX * 1.5) + 'px,' + (offsetY * 1.5) + 'px)');
});


$(document).ready(function () {

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if (target.length > 1) {
            var targetSection = $(target);
            if (targetSection.length) {
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 80
                }, 800);
            }
        }
    });


    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 100) {
            $('.main-nav').css('background', 'rgba(0, 0, 0, 0.95)');
        } else {
            $('.main-nav').css('background', 'rgba(0, 0, 0, 0.9)');
        }
    });


    var statsAnimated = false;
    $(window).on('scroll', function () {
        var statsSection = $('.gear-stats');
        if (statsSection.length) {
            var statsTop = statsSection.offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > statsTop + 100 && !statsAnimated) {
                statsAnimated = true;
                $('.stat-number').each(function () {
                    var $this = $(this);
                    var finalNumber = $this.text();
                    var isPlus = finalNumber.includes('+');
                    var isSlash = finalNumber.includes('/');
                    var cleanNumber = parseInt(finalNumber.replace(/[^0-9]/g, ''));

                    if (!isNaN(cleanNumber)) {
                        $this.text('0');
                        $({ Counter: 0 }).animate({ Counter: cleanNumber }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function () {
                                var num = Math.ceil(this.Counter);
                                if (isSlash) {
                                    $this.text(num + '/7');
                                } else if (isPlus) {
                                    $this.text(num + 'K+');
                                } else {
                                    $this.text(num);
                                }
                            }
                        });
                    }
                });
            }
        }
    });


    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        var gearSection = $('.gear-showcase');
        if (gearSection.length) {
            var sectionTop = gearSection.offset().top;
            var sectionHeight = gearSection.outerHeight();
            var windowHeight = $(window).height();

            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                var parallaxSpeed = (scrolled - sectionTop + windowHeight) * 0.5;
                gearSection.css('background-position', 'center ' + parallaxSpeed + 'px');
            }
        }
    });


    $(window).on('scroll', function () {
        $('.story-card').each(function () {
            var cardTop = $(this).offset().top;
            var cardHeight = $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > cardTop + cardHeight * 0.2) {
                $(this).addClass('animated');
            }
        });
    });


    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        var windowHeight = $(window).height();

        $('.v-section').each(function (index) {
            var sectionTop = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();
            var sectionBottom = sectionTop + sectionHeight;
            var viewportTop = scrolled;
            var viewportBottom = scrolled + windowHeight;


            if (viewportBottom >= sectionTop && viewportTop <= sectionBottom) {

                var visibleTop = Math.max(viewportTop, sectionTop);
                var visibleBottom = Math.min(viewportBottom, sectionBottom);
                var visibleHeight = visibleBottom - visibleTop;
                var visibilityRatio = visibleHeight / windowHeight;


                var parallaxOffset = (scrolled - sectionTop) * 0.3;
                $(this).css('background-position', 'center ' + (50 + parallaxOffset * 0.01) + '%');


                if (visibilityRatio > 0.3) {
                    $(this).addClass('section-active');
                } else {
                    $(this).removeClass('section-active');
                }
            } else {
                $(this).removeClass('section-active');
            }
        });
    });
});

