$(document).ready(function() {

    $('main, header .sort').hide();
    $('.start').show();
    typeRange = $('input[type=range]');
    typeRange.css({'border-color':'transparent'});
    rangeStyles = function() {
        typeRange.each(function() {
            rangeWidth = $(this).width();
            minVal = $(this).attr('min');
            maxVal = $(this).attr('max');
            diapason = (maxVal - minVal);
            presentVal = $(this).val();
            diaVal = (presentVal - minVal);
            hrWidth = ((rangeWidth / diapason) * diaVal);
            $(this).prev('hr').width(hrWidth);
            $(this).parent().children('p').children('input').val(presentVal);
        });
    };
    openParam = function() {
        $('header #parameters').removeClass('tGrad').addClass('aGrad');
        $('.start, .overlay, .reg').fadeOut(500);
        $('main, header .sort').slideUp(500);
        $('.parameters').slideDown(500);
        $('header .menu > a').removeClass('act');
        setTimeout(function () {
            rangeStyles();
        },100);
        setTimeout(function () {
            $('.parameters > div > div:first, .parameters aside').height($('.parameters > div > div:nth-of-type(2)').height());
            $('.parameters > div > div:first').niceScroll()
        }, 600);
    };
    closeMenu = function () {
        $('header .menu').slideUp(500);
        $('.overlay').hide().css('background-color', '');
        $('header #menu').removeClass('aGrad').addClass('tGrad').css({
            'padding-right': '',
            'right': '',
            'margin-left': ''
        }).children('span').fadeOut(300).css('z-index', '');
        $('header #basket').fadeIn(300);
    };
//start
    $('.startParam').click(function () {
        openParam();
    });
    $('.startReg').click(function () {
        $('.reg').fadeIn(500);
        setTimeout(function () {
            $('.overlay').show();
        },100);
    });
    $('.overlay').click(function () {
        $('.reg').fadeOut(500);
        closeMenu();
    });
//reg
    $('.reg a').click(function () {
        $(this).parent().slideUp(300).siblings('form').slideDown(300);
    });
    $('.reg input[type="submit"]').click(function () {
        openParam();
    });
//header
    $('header div > a:first').click(function () {
        if ($(this).hasClass('tGrad')) {
            openParam();
        }
    });
    $('header #menu').click(function () {
        if ($('header .menu').is(':hidden')) {
            $('header .menu').slideDown(500);
            $('.overlay').css('background-color', 'transparent').show();
            $(this).removeClass('tGrad').addClass('aGrad').css({
                'padding-right': 10,
                'right': 80,
                'margin-left': 100
            })
            .children('span').fadeIn(300).css('z-index', 10);
            $('header #basket').fadeOut(300)
        }
        else {
            closeMenu();
        }
    });
    $('header .menu a').click(function () {
        closeMenu();
    });
    $('header .menu > a').click(function (e) {
        if ($(this).hasClass('act')) {
            e.preventDefault();
        }
        else {
            sectionClass = $(this).attr('class');
            $(this).addClass('act').siblings().removeClass('act');
            if ($('.catalog section').is(':visible')) {
                $('.catalog section').slideUp(500).each(function() {
                    if ($(this).hasClass(sectionClass)) {
                        $(this).slideDown(500);
                    }
                });
            }
            else {
                $('.catalog section').hide().each(function() {
                    if ($('.catalog section').hasClass(sectionClass)) {
                        $('.catalog section').show();
                    }
                });
                $('header #parameters').removeClass('aGrad').addClass('tGrad');
                $('.parameters').slideUp(500);
                $('.catalog, header .sort').slideDown(500);
            }
            $('.catalog aside a').removeClass('act').each(function() {
                if ($(this).hasClass(sectionClass)) {
                    $(this).addClass('act');
                }
            });
        }
    });
    $('header .menu .openPersonal').click(function () {
        $('main, header .sort').slideUp(500);
        $('header #parameters').removeClass('aGrad').addClass('tGrad');
        $('.personal').slideDown(500);
        $('header .menu > a').removeClass('act');
    });
    $('header .menu .openHistory').click(function () {
        $('header #parameters').removeClass('aGrad').addClass('tGrad');
        $('main, header .sort').slideUp(500);
        $('.history').slideDown(500);
        $('header .menu > a').removeClass('act');
    });
    $('header #basket').click(function () {
        $('header #parameters').removeClass('aGrad').addClass('tGrad');
        $('main, header .sort').slideUp(500);
        $('.basket').slideDown(500);
        $('header .menu > a').removeClass('act');
    });
//personal
    $('.personal p .vis').click(function () {
        $(this).hide().siblings('span').text('задать профиль');
    });
//personal
    $('.basket table .del').click(function () {
        $(this).parent().parent().remove();
    });
//parameters
    $(window).resize(function () {
        $('.parameters > div > div:first, .parameters aside').height($('.parameters > div > div:nth-of-type(2)').height());
    });
    $('.parameters aside a').click(function () {
        sectionClass = $(this).attr('class');
        $('.catalog section').hide().each(function() {
            if ($(this).hasClass(sectionClass)) {
                $(this).show();
            }
        });
        $('.catalog aside a, header .menu > a').removeClass('act').each(function() {
            if ($(this).hasClass(sectionClass)) {
                $(this).addClass('act');
            }
        });
        $('header #parameters').removeClass('aGrad').addClass('tGrad');
        $('.parameters').slideUp(500);
        $('.catalog, header .sort').slideDown(500);
    });
    typeRange.on('input mousedown', function() {
        rangeStyles();
    });
    $('.parameters input[type=text]').change(function() {
        $(this).parent().parent().children('input[type=range]').val($(this).val());
        rangeStyles();
    });
//sort
    $('header .sort a:not(:last)').click(function () {
        $(this).addClass('act').siblings().removeClass();
    });
    $('header .sort a:last').click(function () {
        $(this).children('.invis').removeClass('invis').siblings().addClass('invis');
    });
//catalog
    $('.reverse a.home').click(function () {
        openParam();
    });
    $('.catalog aside a').click(function (e) {
        if ($(this).hasClass('act')) {
            e.preventDefault();
        }
        else {
            sectionClass = $(this).attr('class');
            $(this).addClass('act').siblings().removeClass('act');
            $('.catalog section').slideUp(500).each(function() {
                if ($(this).hasClass(sectionClass)) {
                    $(this).slideDown(500);
                }
            });
            $('header .menu > a').removeClass('act').each(function() {
                if ($(this).hasClass(sectionClass)) {
                    $(this).addClass('act');
                }
            });
        }
    });
    $('.catalog section > div').click(function () {
        $('main, header .sort').slideUp(500);
        $('header .menu > a').removeClass('act');
        $('.productCard').slideDown(500);
        setTimeout(function () {
            $('.nsFirst, .nsLast').niceScroll()
        }, 600);
    });
    $('.nsFirst, .nsLast').getNiceScroll().resize();
    $('.catalog > div').css('min-height', $('.catalog > aside').height);
//productCard
    $('.productCard .reverse a:last').click(function () {
        sectionClass = $(this).attr('class');
        $('.catalog section').hide().each(function() {
            if ($(this).hasClass(sectionClass)) {
                $(this).show();
            }
        });
        $('.catalog aside a').removeClass('act').each(function() {
            if ($(this).hasClass(sectionClass)) {
                $(this).addClass('act');
            }
        });
        $('header #parameters').removeClass('aGrad').addClass('tGrad');
        $('.productCard').slideUp(500);
        $('.catalog, header .sort').slideDown(500);
    });
//slider
    $('.slider').on('click touchend', '.slide:last', function(){
        $('.slide:last').css({
            'left': 600,
            'top': 600
        });
        setTimeout(function () {
            imgRem = $('.slide:last').remove();
            $('.slider').prepend(imgRem);
            $('.slide').css({
                'left': '',
                'top': ''
            });
        },400);
    });
});//END