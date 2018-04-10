$(document).ready(function() {
    $('.wrapper, header .sort').hide();
    $('.start').show();
if ($(window).width() > 800) {
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
        $('.wrapper, header .sort').slideUp(500);
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
    $('#parameters').click(function () {
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
            if ($('.catalog').is(':hidden')) {
                $('.wrapper').slideUp(500);
                $('aGrad').removeClass('aGrad').addClass('tGrad');
            }
            sectionClass = $(this).attr('class');
            $(this).addClass('act').siblings().removeClass('act');
            $('.catalog section').slideUp(500).each(function() {
                if ($(this).hasClass(sectionClass)) {
                    $(this).slideDown(500);
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
    });
    $('header .menu .openPersonal').click(function () {
        $('.wrapper, header .sort').slideUp(500);
        $('header #parameters').removeClass('aGrad').addClass('tGrad');
        $('.personal').slideDown(500);
        $('header .menu > a').removeClass('act');
    });
    $('header .menu .openHistory').click(function () {
        $('header #parameters').removeClass('aGrad').addClass('tGrad');
        $('.wrapper, header .sort').slideUp(500);
        $('.history').slideDown(500);
        $('header .menu > a').removeClass('act');
    });
    $('header #basket').click(function () {
        $('header #parameters').removeClass('aGrad').addClass('tGrad');
        $('.wrapper, header .sort').slideUp(500);
        $('.basket').slideDown(500);
        $('header .menu > a').removeClass('act');
    });
//personal
    $('.personal p .vis').click(function () {
        $(this).hide().siblings('span').text('задать профиль');
    });
    $('.basket table .del, .history table .del').click(function () {
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
        $('.wrapper, header .sort').slideUp(500);
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
        $('.catalog aside a, header .menu > a').removeClass('act').each(function() {
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
}
else {
    //<799                   ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
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
        $('#parameters').removeClass().addClass('aGrad');
        $('.start, .overlay, .reg').fadeOut(500);
        $('.wrapper *').css('filter', '');
        $('.wrapper, .sort').slideUp(500);
        $('.parameters').slideDown(500);
        $('header .menu > a').removeClass('act');
        setTimeout(function () {
            rangeStyles();
        },100);
    };
    closeMenu = function () {
        $('header .menu').slideUp(500);
        $('.overlay').fadeOut(500).css('z-index', '');
        $('.wrapper *').css('filter', '');
        $('#menu, #hanger').removeClass();
        setTimeout(function () {
            $('header .menu span').css('display', '');
            $('header .menu > a').css('display', '');
        }, 500);
    };
//start
    blur = 'blur(2px)';
    $('.startParam').click(function () {
        openParam();
    });
    $('.startReg').click(function () {
        $('.reg').fadeIn(500);
        setTimeout(function () {
            $('.overlay').show();
            $('.wrapper *').css('filter', blur);
        },100 );
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
        $('header > div > a').removeClass();
        openParam();
    });
//header
    $('header .menu a').click(function () {
        closeMenu();
    });
    $('header .menu > a').click(function (e) {
        if ($(this).hasClass('act')) {
            e.preventDefault();
        }
        else {
            if ($('.catalog').is(':hidden')) {
                $('.wrapper').slideUp(500);
                $('.aGrad').removeClass();
            }
            sectionClass = $(this).attr('class');
            $(this).addClass('act').siblings().removeClass('act');
            $('.catalog section').slideUp(500).each(function() {
                if ($(this).hasClass(sectionClass)) {
                    $(this).slideDown(500);
                }
            });
            $('header #parameters').removeClass('aGrad').addClass('tGrad');
            $('.parameters').slideUp(500);
            $('.catalog, .sort').slideDown(500);
        }
        $('.catalog aside a').removeClass('act').each(function() {
            if ($(this).hasClass(sectionClass)) {
                $(this).addClass('act');
            }
        });
    });
    $('#menu').click(function () {
        if ($(this).hasClass('aGrad')) {
            closeMenu();
        }
        else if ($('#hanger').hasClass('aGrad')) {
            closeMenu();
            setTimeout(function () {
                $('header .menu span').css('display', 'block');
                $('header .menu').slideDown(500);
                $('.overlay').css('z-index', '1').fadeIn(500);
                $('.wrapper *').css('filter', blur);
                $('#menu').addClass('aGrad');
            },600 );
        }
        else {
            $('header .menu span').css('display', 'block');
            $('header .menu').slideDown(500);
            $('.overlay').css('z-index', '1').fadeIn(500);
            $('.wrapper *').css('filter', blur);
            $(this).addClass('aGrad');
        }
    });
    $('#hanger').click(function () {
        if ($(this).hasClass('aGrad')) {
            closeMenu();
        }
        else if ($('#menu').hasClass('aGrad')) {
            closeMenu();
            setTimeout(function () {
                $('header .menu > a').css('display', 'block');
                $('header .menu').slideDown(500);
                $('.overlay').css('z-index', '1').fadeIn(500);
                $('.wrapper *').css('filter', blur);
                $('#hanger').addClass('aGrad');
            },600 );
        }
        else {
            $('header .menu > a').css('display', 'block');
            $('header .menu').slideDown(500);
            $('.overlay').css('z-index', '1').fadeIn(500);
            $('.wrapper *').css('filter', blur);
            $(this).addClass('aGrad');
        }
    });
    $('#parameters').click(function () {
        closeMenu();
        if ($('.parameters').is(':hidden')) {
            $('#basket').removeClass();
            openParam();
        }
    });
    $('#basket').click(function () {
        closeMenu();
        if ($('.basket').is(':hidden')) {
            $('#parameters').removeClass();
            $('.wrapper, .sort').slideUp(500);
            $('.basket').slideDown(500);
            $('header .menu > a').removeClass('act');
            $(this).addClass('aGrad');
        }
    });
    $('header .menu .startReg').click(function () {
        $('.overlay').fadeIn(500);
        $('.wrapper *').css('filter', blur);
    });
    $('header .menu .openPersonal').click(function () {
        $('.wrapper, .sort').slideUp(500);
        $('header > div > a').removeClass();
        $('.personal').slideDown(500);
        $('header .menu > a').removeClass('act');
    });
    $('header .menu .openHistory').click(function () {
        $('header > div > a').removeClass();
        $('.wrapper, .sort').slideUp(500);
        $('.history').slideDown(500);
        $('header .menu > a').removeClass('act');
    });
    //sort
    $('header .sort a:not(:last)').click(function () {
        $(this).addClass('act').siblings().removeClass();
    });
    $('header .sort a:last').click(function () {
        $(this).children('.invis').removeClass('invis').siblings().addClass('invis');
    });
//personal
    $('.reverse a.home').html('<span class="fa">&#xf060;&#8195;</span>');
//parameters
//    h2repl = $('.parameters h2').remove();
//    $('.parameters > div').prepend(h2repl);
    typeRange.on('input mousedown', function() {
        rangeStyles();
    });
    $('.parameters input[type=text]').change(function() {
        $(this).parent().parent().children('input[type=range]').val($(this).val());
        rangeStyles();
    });
//catalog
    $('.reverse a.home').click(function () {
        openParam();
    });
    $('.catalog section > div').click(function () {
        $('.wrapper, header .sort').slideUp(500);
        $('header .menu > a').removeClass('act');
        $('.productCard').slideDown(500);
    });
//productCard
    reverse = $('.productCard .reverse').remove();
    $('.productCard > div > div:nth-of-type(2)').prepend(reverse);
    $('.productCard .reverse a.home').click(function () {
        openParam();
    });
    $('.productCard .reverse a:last').click(function () {
        sectionClass = $(this).attr('class');
        $('.catalog section').hide().each(function() {
            if ($(this).hasClass(sectionClass)) {
                $(this).show();
            }
        });
        $('header .menu > a').removeClass('act').each(function() {
            if ($(this).hasClass(sectionClass)) {
                $(this).addClass('act');
            }
        });
        $('.productCard').slideUp(500);
        $('.catalog').slideDown(500);
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
    $('#good').click(function () {
        if ($(this).siblings().is(':hidden')) {
            $(this).siblings().slideDown(300);
            $('.productCard').height($(this).parent().height() + 300);
        }
        else {
            $(this).siblings().slideUp(300);
        }
    });
//    basket
    basketDiv = $('.basket > div > div').remove();
    $('.basket > div .reverse').after(basketDiv);
    $('.basket table .del, .history table .del').click(function () {
        $(this).parent().parent().remove();
    });
}
});//END