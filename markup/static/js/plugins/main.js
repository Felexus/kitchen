document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})

$(document).ready(function () {
	$("body").css({'visibility': "visible", "opacity": "1"});





	SmoothScroll({
		// Время скролла 400 = 0.4 секунды
		animationTime: 500,
		// Размер шага в пикселях 
		stepSize: 100,
	
		// Дополнительные настройки:
	
		// Ускорение 
		accelerationDelta: 30,
		// Максимальное ускорение
		accelerationMax: 2,
	
		// Поддержка клавиатуры
		keyboardSupport: true,
		// Шаг скролла стрелками на клавиатуре в пикселях
		arrowScroll: 50,
	
		// Pulse (less tweakable)
		// ratio of "tail" to "acceleration"
		pulseAlgorithm: true,
		pulseScale: 4,
		pulseNormalize: 1,
	
		// Поддержка тачпада
		touchpadSupport: true,
	  });
	
	

	
	
	new WOW().init();


	$('body').on('click','[data-popup]',function(e) { //Вызов попапов
    	e.preventDefault();
    	var popup = $(this).data('popup');
    	var width = $('.blur').prop('scrollWidth');
    	$('html').addClass('no-scroll');
    	$('body').css('width',width);
    	$('.blur').addClass('active');
		$('.popup').removeClass('active');
    	$('.popup-'+popup).addClass('active');
    	$('.popup-'+popup).find('[data-src]').each(function() {
			var src = $(this).attr("data-src");
			$(this).attr("src", src);
			
			$(".m-bg-cont").each(function() {
				var img = $(this).find("img:first-of-type").attr("src");
				$(this).css("background-image", "url(" + img + ")");
			});
		})
    });
    $('body').on('mousedown','.blur',function(e) { //Закрытие попапов по .blur
    	if (this == e.target) {
    		$('.popup').removeClass('active');
    		$('html').removeClass('no-scroll');
    		$('body').css('width','auto');
			$('.blur').removeClass('active');
			$('.popup').each(function() {
				$(this).find('input[type=text],input[type=mail],textarea').val('');
				$(this).find('input[type=checkbox]').prop('checked', false);
				$(this).find('.active').removeClass('active');
			});
			$('html').removeClass('no-scroll');
			$('.blur').removeClass('active');
			$('.header__menu').removeClass('active');
    	}
	});


    $('body').on('click','.popup__close',function(e) { //Закрытие попапов по .popup__close
		$('.popup').removeClass('active');
		$('html').removeClass('no-scroll');
		$('body').css('width','auto');
		$('.blur').removeClass('active');
		$('.popup').each(function() {
			$(this).find('input[type=text],input[type=mail],textarea').val('');
			$(this).find('input[type=checkbox]').prop('checked', false);
			$(this).find('.active').removeClass('active');
		});
	});


	$('.header__top-menu').click(function() {
    	$('html').addClass('no-scroll');
    	$('.blur').addClass('active');
    	$('.header__menu').addClass('active');
	})
	$('.header__menu-close').click(function() {
    	$('html').removeClass('no-scroll');
    	$('.blur').removeClass('active');
    	$('.header__menu').removeClass('active');
	})
	$('.header__menu-cont a').click(function() {
    	$('html').removeClass('no-scroll');
    	$('.blur').removeClass('active');
    	$('.header__menu').removeClass('active');
	})
	$('.header__menu-call').click(function() {
    	$('html').removeClass('no-scroll');
    	$('.blur').removeClass('active');
    	$('.header__menu').removeClass('active');
	})

	$(".m-bg-cont").each(function() {
		var img = $(this).find("img:first-of-type").attr("src");
		$(this).css("background-image", "url(" + img + ")");
	});
	
	var swiper = new Swiper(".work__container-swiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
		loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
	});

	
	var swiper = new Swiper(".dis__swiper", {
        spaceBetween: 30,
		loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".dis__swiper-next",
          prevEl: ".dis__swiper-prev",
        },
      });


	$('label').click(function() {
		$(this).closest('.que__container-quest-item').find('label').removeClass('active')
		$(this).addClass('active')
	})

	$('.que__container-quest-item-form-btns-back').click(function() {
		var actitem = $('.que__container-quest-item.act')
		actitem.prev('.que__container-quest-item').removeClass('hide')
		actitem.prev('.que__container-quest-item').addClass('act')
		actitem.addClass('hide')
		actitem.removeClass('act')
	})
	$('.inp-with-inp').click(function() {
		$('input[type=text]').focus()
	})
	
	
	$('.que-start').click(function() {
		$('.que__container-quest-item').removeClass('act')
		$('.que__container-quest-item').addClass('hide')
		$('#que1').removeClass('hide')
		$('#que1').addClass('act')
	})

	  
	$('#qform1').each(function() {
        var it = $(this);
         it.validate({
			rules: {
				q1: {
					required: true,
				}
			},

			errorPlacement: function (error, element) {
			},

			submitHandler: function() {
				var q1 = $('#q1:checked').val()
				$('#q1-val').val(q1)
				$('#que1').addClass('hide')
				$('#que1').removeClass('act')
				$('#que2').removeClass('hide')
				$('#que2').addClass('act')
			},  
         });
	});
	$('#qform2').each(function() {
		var it = $(this);
		it.validate({
			rules: {
				q2: {
					required: true,
				}
			},

			errorPlacement: function (error, element) {
			},

			submitHandler: function() {
				var q2 = $('#q2:checked').val()
				$('#q2-val').val(q2)
				$('#que2').addClass('hide')
				$('#que2').removeClass('act')
				$('#que3').removeClass('hide')
				$('#que3').addClass('act')
			},  
		});
	});
	$('#qform3').each(function() {
		var it = $(this);
		it.validate({
			rules: {
				q3: {
					required: true,
				}
			},

			errorPlacement: function (error, element) {
			},

			submitHandler: function() {
				var q3 = $('#q3:checked').val()
				$('#q3-val').val(q3)
				$('#que3').addClass('hide')
				$('#que3').removeClass('act')
				$('#que4').removeClass('hide')
				$('#que4').addClass('act')
			},  
		});
	});
	$('#qform4').each(function() {
		var it = $(this);
		it.validate({
			rules: {
				q4: {
					required: true,
				}
			},

			errorPlacement: function (error, element) {
			},

			submitHandler: function() {
				var q4 = $('#q4:checked').val()
				var more4 = $('#more4').val()
				$('#q4-val').val(q4 + " (" + more4 + " м.)")
				$('#que4').addClass('hide')
				$('#que4').removeClass('act')
				$('#que5').removeClass('hide')
				$('#que5').addClass('act')
				console.log(more4);
			},  
		});
	});
	$('#qform5').each(function() {
		var it = $(this);
		it.validate({
			rules: {
				q5: {
					required: true,
				}
			},

			errorPlacement: function (error, element) {
			},

			submitHandler: function() {
				var q5 = $('#q5:checked').val()
				$('#q5-val').val(q5)
				var more5 = $('#more5').val()
				$('#q5-val').val(q5 + " (" + more5 + " руб.)")
				$('#que5').addClass('hide')
				$('#que5').removeClass('act')
				$('#que6').removeClass('hide')
				$('#que6').addClass('act')
			},  
		});
	});
	$('#qform6').each(function() {
		var it = $(this);
		it.validate({
			rules: {
				name: {
					required: true,
				},
				phone: {
					required: true,
				}
			},

			errorPlacement: function (error, element) {
			},

			submitHandler: function() {
				console.log(it.serialize());
				$.ajax({
					url: "email.php",
					method: "POST",
					data: it.serialize(),
					success: function(){
						$('#que6').addClass('hide')
						$('#que6').removeClass('act')
						$('#que7').removeClass('hide')
						$('#que7').addClass('act')
					}
				});
			},  
		});
	});


	
	var swiper = new Swiper(".com__container-swiper", {
        slidesPerView: 'auto',
        spaceBetween: 56,
        freeMode: true,
      });

	  
	var swiper = new Swiper(".otz__container-swiper", {
        slidesPerView: 'auto',
        spaceBetween: 48,
        freeMode: true,
      });

	  
	var swiper = new Swiper(".otz__container-vid", {
        slidesPerView: 'auto',
        spaceBetween: 41 ,
        freeMode: true,
      });

	  


	
	$(".ymap").each(function(e){
        var ya = this;
        var myMap;
        ymaps.ready(
            function() {
                var x = $(ya).attr("data-x");
                var y = $(ya).attr("data-y");
                    myMap = new ymaps.Map($(ya)[0], {
                        center: [x , y],
                        zoom: 17,
						controls: ['fullscreenControl']						
                    }, {
                        searchControlProvider: 'yandex#search'
                    });
            
                    var myPlacemark = new ymaps.Placemark([x, y], {},
                { iconLayout: 'default#image',
                iconImageHref: 'static/img/content/marker.svg',
                iconImageSize: [37, 37], });    
            
				myMap.geoObjects.add(myPlacemark);

				var ctrlKey = false;
				var ctrlMessVisible = false;
				var timer;
				myMap.behaviors.disable('scrollZoom');
				// myMap.behaviors.disable('scrollZoom');
				myMap.events.add(['wheel', 'mousedown'], function(e) {
					if (e.get('type') == 'wheel') {
						if (!ctrlKey) { // Ctrl не нажат, показываем уведомление
							$('#ymap_ctrl_display').fadeIn(300);
							ctrlMessVisible = true;
							clearTimeout(timer); // Очищаем таймер, чтобы продолжать показывать уведомление
							timer = setTimeout(function() {
								$('#ymap_ctrl_display').fadeOut(300);
								ctrlMessVisible = false;
							}, 1500);
						}
						else { // Ctrl нажат, скрываем сообщение
							$('#ymap_ctrl_display').fadeOut(100);
						}
					}
					if (e.get('type') == 'mousedown' && ctrlMessVisible) { // Скрываем уведомление при клике на карте
						$('#ymap_ctrl_display').fadeOut(100);
					}
				});
				// Обрабатываем нажатие на Ctrl
				$(document).keydown(function(e) {
					if (e.which === 17 && !ctrlKey) { // Ctrl нажат: включаем масштабирование мышью
						ctrlKey = true;
						myMap.behaviors.enable('scrollZoom');
					}
				});
				$(document).keyup(function(e) { // Ctrl не нажат: выключаем масштабирование мышью
					if (e.which === 17) {
						ctrlKey = false;
						myMap.behaviors.disable('scrollZoom');
					}
				});
            }
        );
		
	})

	var lastScrollTop = 0;
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		if (st > lastScrollTop){
			$('.header__scroll').addClass('active')
		} else {
			$('.header__scroll').removeClass('active')
		}
		lastScrollTop = st;
	});
	
	
	$('.modal__form').each(function() {
		var it = $(this);
		it.validate({
		rules: {
			name: {
				required: true,
			},
			phone: {
				required: true,
			}
		},

		errorPlacement: function (error, element) {
		},

		submitHandler: function() {
			$.ajax({
				url: "email_call.php",
				method: "POST",
				data: it.serialize(),
				success: function(){
					window.open("thanx.html");
				}
			});
		},  
		});
	});

	var swiper = new Swiper(".dis__swiper-mob", {
        navigation: {
          nextEl: ".dis__swiper-mob-next",
          prevEl: ".dis__swiper-mob-prev",
        },
	});

	$('a[href*="#"]:not([href="#"])').click(function() {
		var offset = -200; // <-- change the value here
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top + offset
				}, 1);
				return false;
			}
		}
	});

	$('.galler__container-more').click(function() {
		$(this).remove()
		$('.galler__container-item').removeClass('hide')
		$('.galler__container-more').removeClass('hide')
	})	
	$('.gcm').click(function() {
		$(this).remove()
		$('.galler__container-item').removeClass('hide1')
	})	


	
	var ppgth1 = new Swiper(".ppg-swiper1-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg1 = new Swiper(".ppg-swiper1", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth1,
		},
	});

	var ppgth2 = new Swiper(".ppg-swiper2-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg2 = new Swiper(".ppg-swiper2", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth2,
		},
	});
	
	var ppgth3 = new Swiper(".ppg-swiper3-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg3 = new Swiper(".ppg-swiper3", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth3,
		},
	});

	var ppgth4 = new Swiper(".ppg-swiper4-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg4 = new Swiper(".ppg-swiper4", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth4,
		},
	});
	
	var ppgth5 = new Swiper(".ppg-swiper5-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg5 = new Swiper(".ppg-swiper5", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth5,
		},
	});

	var ppgth6 = new Swiper(".ppg-swiper6-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg6 = new Swiper(".ppg-swiper6", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth6,
		},
	});
	
	var ppgth7 = new Swiper(".ppg-swiper7-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg7 = new Swiper(".ppg-swiper7", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth7,
		},
	});
	
	var ppgth8 = new Swiper(".ppg-swiper8-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg8 = new Swiper(".ppg-swiper8", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth8,
		},
	});
	
	var ppgth9 = new Swiper(".ppg-swiper9-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg9 = new Swiper(".ppg-swiper9", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth9,
		},
	});
	
	var ppgth10 = new Swiper(".ppg-swiper10-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg10 = new Swiper(".ppg-swiper10", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth10,
		},
	});
	
	var ppgth11 = new Swiper(".ppg-swiper11-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg11 = new Swiper(".ppg-swiper11", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth11,
		},
	});
	
	var ppgth12 = new Swiper(".ppg-swiper12-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg12 = new Swiper(".ppg-swiper12", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth12,
		},
	});
	
	var ppgth13 = new Swiper(".ppg-swiper13-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg13 = new Swiper(".ppg-swiper13", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth13,
		},
	});
	
	var ppgth14 = new Swiper(".ppg-swiper14-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg14 = new Swiper(".ppg-swiper14", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth14,
		},
	});
	
	var ppgth15 = new Swiper(".ppg-swiper15-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg15 = new Swiper(".ppg-swiper15", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth15,
		},
	});
	
	var ppgth16 = new Swiper(".ppg-swiper16-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg16 = new Swiper(".ppg-swiper16", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth16,
		},
	});
	
	var ppgth17 = new Swiper(".ppg-swiper17-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg17 = new Swiper(".ppg-swiper17", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth17,
		},
	});
	
	var ppgth18 = new Swiper(".ppg-swiper18-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg18 = new Swiper(".ppg-swiper18", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth18,
		},
	});
	
	var ppgth19 = new Swiper(".ppg-swiper19-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg19 = new Swiper(".ppg-swiper19", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth19,
		},
	});
	
	var ppgth20 = new Swiper(".ppg-swiper20-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg20 = new Swiper(".ppg-swiper20", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth20,
		},
	});
	
	var ppgth21 = new Swiper(".ppg-swiper21-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg21 = new Swiper(".ppg-swiper21", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth21,
		},
	});
	
	var ppgth22 = new Swiper(".ppg-swiper22-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg22 = new Swiper(".ppg-swiper22", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth22,
		},
	});
	
	var ppgth23 = new Swiper(".ppg-swiper23-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg23 = new Swiper(".ppg-swiper23", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth23,
		},
	});
	
	var ppgth24 = new Swiper(".ppg-swiper24-th", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var ppg24 = new Swiper(".ppg-swiper24", {
		spaceBetween: 10,
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		thumbs: {
		swiper: ppgth24,
		},
	});

	$('.ppg-swiper .swiper-slide video').parent('a').addClass('videobtn')
	



	if (document.querySelector(".lazy")) {
		var lazyLoadInstance = new LazyLoad({
			elements_selector: ".lazy"
		});
	}

})