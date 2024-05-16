
$(document).ready(function() {
    // Handle Video
    let video = $('.state__video');
    let controlSkipBack = $('.video__control-skipBack');
    let controlSkipForward = $('.video__control-skipFoward');
    let controlVolumeMuted = $('.control__volume-muted');
    let controlVolumeOpen = $('.control__volume-open');
    let controlReport = $('.video__control-report');
    let controlNext = $('.video__control-next');
    let controlSetting = $('.video__control-setting');
    let controlFullscreen = $('.video__control-fullscreen');
    let btnFollow = $(".right__heading-follow")
    let btnShare = $(".right__heading-share")
    let btnCloseShare = $(".share__section-close")

    //click button share videos
    $(document).ready(function(){
        $(btnShare).click(function(){
            $("#shareVD").css('opacity','1');
            $("#shareVD").show();
        });
    });
    //Click follow 
    $(document).ready(function(){
        $(btnFollow).click(function(){
            $("#followHeart").toggleClass("active__btn-follow");
            $('.icon__followed-Heart').toggle();
        });
    });


    //btn close share video section
    $(document).ready(function(){
        $(btnCloseShare).click(function(){
            $("#shareVD").hide();
        });
    });

   //play/pause video 
    $(document).ready(function() {
        $('#videoControl').click(function() {
            let videoElement = $('.state__video').get(0);
            if (videoElement.paused) {
                videoElement.play();
                $('#videoPlay').css('display','none');
                $('#videoStop').css('display', 'block'); 
                $('.video__loading').css('display', 'none');         
            } else {
                videoElement.pause();
                $('#videoStop').css('display', 'none');
                $('#videoPlay').css('display', 'block');
                $('.video__loading').css('display', 'block');
            }
        });

        $('.video__loading').click(function(){
            if (videoElement.paused) {
                videoElement.play();
                $('#videoPlay').css('display','none');
                $('#videoStop').css('display', 'block'); 
                $('.video__loading').css('display', 'none');         
            } else {
                videoElement.pause();
                $('#videoStop').css('display', 'none');
                $('#videoPlay').css('display', 'block');
                $('.video__loading').css('display', 'block');
            }
        });
    });


    // Tua lại/tua tới 10s
    controlSkipBack.on('click', function() {
        video.get(0).currentTime -= 10;
    });
    controlSkipForward.on('click', function() {
        video.get(0).currentTime += 10;
    });

    // Tắt/bật tiếng
    controlVolumeMuted.on('click', function() {
        video.get(0).muted = true;
        $('.control__volume-muted').css('display', 'none');
        $('.control__volume-open').css('display', 'block')
    });
    controlVolumeOpen.on('click', function() {
        video.get(0).muted = false;
        $('.control__volume-open').css('display', 'none')
        $('.control__volume-muted').css('display', 'block');
    });

    // Các tính năng khác
    controlReport.on('click', function() {
        alert('Báo cáo sự cố đã được gửi!');
    });
    controlNext.on('click', function() {
        alert('Tập tiếp theo đang được tải!');
    });
    controlSetting.click( function() {
        $('.video__setting').toggle();
    });

    // Fullscreen mode
    let container = $('#container');
    
    controlFullscreen.on('click', function() {
        if (!document.fullscreenElement) {
            let elem = container.get(0);
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
                $('.video__control-process').addClass('fullscreen')
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
                $('.video__control-process').addClass('fullscreen')
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
                $('.video__control-process').addClass('fullscreen')
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
                $('.video__control-process').addClass('fullscreen')
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                $('.video__control-process').removeClass('fullscreen')
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
                $('.video__control-process').removeClass('fullscreen')
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
                document.webkitExitFullscreen();
                $('.video__control-process').removeClass('fullscreen')
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
                $('.video__control-process').removeClass('fullscreen')
        }
        }

    });

   

    //Next episode
    controlNext.mouseover(function(){
        $(".video__next").show();
    });
    controlNext.mouseout(function(){
        $(".video__next").hide();
    });





    // Comment
// let moreCmt = $('.comment__item-replyOther')
// let btnLikeCmt = $('.item__reply-like')
// $(document).ready(function(){
//     moreCmt.click(function(){
//     $('.comment_showOther_item').toggleClass("comment_showOther_item-show");
//     $('.item__replyOther-title').toggleClass('hidden__reply');
//     });
// });

$(document).ready(function(){
    $('.comment__item-replyOther').each()
});

//like comment
$(document).ready(function(){
    let btnLikeCmt = $('.item__reply-like')
    btnLikeCmt.click(function(){
        // Tìm phần tử cha chung chứa nút được nhấp và các phần tử liên quan
        var parentContainer = $(this).closest('.comment__item-detail');

        // Thay đổi các phần tử liên quan bên trong phần tử cha
        parentContainer.find('.item__reply-like .liked').toggle();
        parentContainer.find('.item__reply-like .unlike').toggle();
    });
});

});

//event lướt qua list tập phim, season, phim liên quan trên điện thoại

$(document).ready(function() {
    var $episodeList = $('.episodes__tabs .episodes__list');
    var hammertime0 = new Hammer($episodeList[0]);
    var hammertime1= new Hammer($episodeList[1]);
    var hammertime2 = new Hammer($episodeList[2]);
    var hammertime3 = new Hammer($episodeList[3]);

    hammertime0.on('swipeleft', function() {
      handleSwipe('left');
    });

    hammertime0.on('swiperight', function() {
      handleSwipe('right');
    });
    hammertime1.on('swipeleft', function() {
        handleSwipe('left');
      });
  
    hammertime1.on('swiperight', function() {
        handleSwipe('right');
      });
      hammertime2.on('swipeleft', function() {
        handleSwipe('left');
      });
  
      hammertime2.on('swiperight', function() {
        handleSwipe('right');
      });
      hammertime3.on('swipeleft', function() {
        handleSwipe('left');
      });
  
      hammertime3.on('swiperight', function() {
        handleSwipe('right');
      });


    function handleSwipe(direction) {
      var currentScrollPosition = $episodeList.scrollLeft();
      var scrollAmount = $episodeList.width(); // Adjust the scroll amount based on your needs

      if (direction === 'left') {
        $episodeList.animate({
          scrollLeft: currentScrollPosition + scrollAmount
        }, 600); // Adjust the duration for smooth scroll
      } else if (direction === 'right') {
        $episodeList.animate({
          scrollLeft: currentScrollPosition - scrollAmount
        }, 600); // Adjust the duration for smooth scroll
      }
    }
  });



 
