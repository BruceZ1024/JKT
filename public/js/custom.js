(jQuery),function($) {
/*--------------------------
	navbar
---------------------------- */
    var Page = function() {
        this.$topNavbar = $("#navbar-menu"),
        this.$stickyElem = $("#sticky-nav"),
        this.$backToTop = $('#back-to-top'),
        this.$contactForm = $("#contact-form")
    };
    //
    Page.prototype.init = function () {
        var $this = this;
        //Handling the scroll event
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $this.$backToTop.fadeIn();
            } else {
                $this.$backToTop.fadeOut();
            }
        });
        //back-to-top button
        $this.$backToTop.click(function(){
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });
        //init contact app if contact form added in a page
        if(this.$contactForm.length>0)
            $.ContactForm.init();
    },
    //init

$.Page = new Page, $.Page.Constructor = Page
}
/*--------------------------
	use strict
---------------------------- */
(jQuery),
    "use strict"; // Start of use strict
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })
    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })
/*--------------------------
	counter
---------------------------- */
      // custom formatting example
      $('#earth').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });
      // start all the timers
      $('.timer').each(count);
      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }

 /*--------------------------
	map scroll off
---------------------------- */
    $('.maps').click(function () {
        $('.maps iframe').css("pointer-events", "auto");
    });

    $( ".maps" ).mouseleave(function() {
      $('.maps iframe').css("pointer-events", "none");
    });
/*--------------------------
	Preloader
---------------------------- */
	$(window).load(function() {
		$('#loading').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});
