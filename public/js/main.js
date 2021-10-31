jQuery(document).ready(function ($) {
    var slidesWrapper = $('.cd-hero-slider');

    //check if a .cd-hero-slider exists in the DOM
    if (slidesWrapper.length > 0) {
        var primaryNav = $('.cd-primary-nav'),
            sliderNav = $('.cd-slider-nav'),
            navigationMarker = $('.cd-marker'),
            slidesNumber = slidesWrapper.children('li').length,
            visibleSlidePosition = 0,
            autoPlayId,
            autoPlayDelay = 5000;

        //upload videos (if not on mobile devices)
        uploadVideo(slidesWrapper);

        //autoplay slider
        setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

        //on mobile - open/close primary navigation clicking/tapping the menu icon
        primaryNav.on('click', function (event) {
            if ($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
        });

        //change visible slide
        sliderNav.on('click', 'li', function (event) {
            event.preventDefault();
            var selectedItem = $(this);
            if (!selectedItem.hasClass('selected')) {
                // if it's not already selected
                var selectedPosition = selectedItem.index(),
                    activePosition = slidesWrapper.find('li.selected').index();

                if (activePosition < selectedPosition) {
                    nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
                } else {
                    prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
                }

                //this is used for the autoplay
                visibleSlidePosition = selectedPosition;

                updateSliderNavigation(sliderNav, selectedPosition);
                updateNavigationMarker(navigationMarker, selectedPosition + 1);
                //reset autoplay
                setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
            }
        });
    }

    function nextSlide(visibleSlide, container, pagination, n) {
        visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            visibleSlide.removeClass('is-moving');
        });

        container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
        checkVideo(visibleSlide, container, n);
    }

    function prevSlide(visibleSlide, container, pagination, n) {
        visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            visibleSlide.removeClass('is-moving');
        });

        container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
        checkVideo(visibleSlide, container, n);
    }

    function updateSliderNavigation(pagination, n) {
        var navigationDot = pagination.find('.selected');
        navigationDot.removeClass('selected');
        pagination.find('li').eq(n).addClass('selected');
    }

    function setAutoplay(wrapper, length, delay) {
        if (wrapper.hasClass('autoplay')) {
            clearInterval(autoPlayId);
            autoPlayId = window.setInterval(function () {
                autoplaySlider(length)
            }, delay);
        }
    }

    function autoplaySlider(length) {
        if (visibleSlidePosition < length - 1) {
            nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
            visibleSlidePosition += 1;
        } else {
            prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
            visibleSlidePosition = 0;
        }
        updateNavigationMarker(navigationMarker, visibleSlidePosition + 1);
        updateSliderNavigation(sliderNav, visibleSlidePosition);
    }

    function uploadVideo(container) {
        container.find('.cd-bg-video-wrapper').each(function () {
            var videoWrapper = $(this);
            if (videoWrapper.is(':visible')) {
                // if visible - we are not on a mobile device
                var videoUrl = videoWrapper.data('video'),
                    video = $('<video loop><source src="' + videoUrl + '.mp4" type="video/mp4" /><source src="' + videoUrl + '.webm" type="video/webm" /></video>');
                video.appendTo(videoWrapper);
                // play video if first slide
                if (videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();
            }
        });
    }

    function checkVideo(hiddenSlide, container, n) {
        //check if a video outside the viewport is playing - if yes, pause it
        var hiddenVideo = hiddenSlide.find('video');
        if (hiddenVideo.length > 0) hiddenVideo.get(0).pause();

        //check if the select slide contains a video element - if yes, play the video
        var visibleVideo = container.children('li').eq(n).find('video');
        if (visibleVideo.length > 0) visibleVideo.get(0).play();
    }

    function updateNavigationMarker(marker, n) {
        marker.removeClassPrefix('item').addClass('item-' + n);
    }

    $.fn.removeClassPrefix = function (prefix) {
        //remove all classes starting with 'prefix'
        this.each(function (i, el) {
            var classes = el.className.split(" ").filter(function (c) {
                return c.lastIndexOf(prefix, 0) !== 0;
            });
            el.className = $.trim(classes.join(" "));
        });
        return this;
    };
});

// Function that takes the href value of links in the navbar and then scrolls
//the div on the page whose ID matches said value. This only works if you use
//a consistent naming scheme for the navbar anchors and div IDs

var gotoByScroll = function () {

    $(".m_nav_item a").on("click", function (e) {

        e.preventDefault();

        $('html,body').animate({
            scrollTop: $($(this).attr("href")).offset().top - 50
        }, "slow");

    });
}
$(document).ready(function () {
    gotoByScroll();
    var chartDom = document.getElementById('jktchart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: [
                '{a|TOTAL TOKEN ISSUANCE}',
                '{b|1,000,000,000 JKT}',
                '{c|50% DeFi mining | 40% in-game mining\n' +
                '|10% Technical team, investors & makreting fees}'
            ].join('\n'),

            left: 'center',
            top: 'middle',
            textStyle: {
                rich: {
                    a: {
                        color: '#CD2A16',
                        lineHeight: 15,
                        height: 20,
                        padding: [10, 10],
                        fontFamily: 'Open Sans',
                    },
                    b: {
                        color: '#FFFFFF',
                        fontSize: 18,
                        fontWeight: 'bold',
                        padding: 10,
                        fontFamily: 'Open Sans',
                    },
                    c: {
                        color: '#979797',
                        fontSize: 14,
                        padding: 10,
                        fontFamily: 'Open Sans',
                    }
                }
            }
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'JKT',
                type: 'pie',
                radius: ['55%', '70%'],
                data: [
                    {value: 50, name: 'DeFi'},
                    {value: 40, name: 'GameFi'},
                    {value: 3, name: 'Marketing Promotion'},
                    {value: 4, name: 'Early Investor'},
                    {value: 2, name: 'Technical Team'},
                    {value: 1, name: 'Pre-sale before launch'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                labelLine: {
                    length: 70,
                    length2: 50

                },
                clockwise: true,
                startAngle: 270,
                label: {
                    formatter: '{name|{b}: {c}%}',
                    rich: {
                        name: {
                            fontSize: 18,
                            color: 'white'
                        }
                    }
                },
                color: ['#CD2A16', '#5759627F', '#575962', '#9D9D9D', '#D8D8D8', '#FFFFFF', '#fc8452', '#9a60b4', '#ea7ccc']
            }
        ]
    };

    option && myChart.setOption(option);
});

function copyContract() {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.setAttribute('value', '0x7f73f70a32394807C9cC06dAA33e6D25084B66Ea');
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('copy success');
    }
    document.body.removeChild(input);

    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function onHover() {
    document.getElementById("launchapp").innerText = "Coming Soon";
}

function offHover() {
    document.getElementById("launchapp").innerText = "Launch App";
}