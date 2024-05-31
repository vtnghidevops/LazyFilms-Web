// flagStatusLogin = setInterval(()=> {
//     return $show__login.is(":visible")
// },1000)
function checkLoginWhenClickVideo() {
    showModalOneTab($('#required__login'))
}
// setTimeout(() => {
//     checkLoginWhenClickVideo()
// }, 1100);

// report video
let $btnReport = $('.video__control-report');
let $blcReport = $('#report')
let $cancelReport = $('.report__btn__cancel')
let $sendReport = $('.report__btn-send')
let $checkboxes = $('.report__checkbox');
let $blcSuccessReport = $('#required__login')


function showModalOneTab($modalToShow) {
    $modalToShow.fadeIn(300)
}
function closeModalOneTab($modalToHide) {
    $modalToHide.fadeOut(300)
}
$btnReport.click(function () {
    if(!$('.show__login').hasClass('active')) {
        checkLoginWhenClickVideo()
    }else {
        showModalOneTab($blcReport)
        $checkboxes.prop('checked', false);
        $sendReport.removeClass('active__btn')
    }
   
})

$cancelReport.click(function () {
    closeModalOneTab($blcReport)
})

$checkboxes.change(function () {
    if ($checkboxes.is(':checked')) {
        $sendReport.addClass('active__btn');
    } else {
        $sendReport.removeClass('active__btn');
    }
});

// Chọn các phần tử cần thay đổi nội dung
let $reportSucessTitle = $('.container__required-login .required__login-title');
let $reportSucessDesc = $('.container__required-login .required__login');
let $requiredClose = $('.required__content button')
// Cập nhật nội dung của các phần tử
function updateSuccessReportContent() {
    $reportSucessTitle.text('Báo cáo đã được gửi');
    $reportSucessDesc.text('Chân thành cảm ơn sự đóng góp của bạn, điều này sẽ giúp cho LazyFilms tốt hơn');
}

// Sự kiện click của $sendReport
$sendReport.click(function () {
    // Thay đổi nội dung trước khi hiển thị modal
    updateSuccessReportContent();
    // Đóng modal báo cáo
    closeModalOneTab($blcReport);
    // Hiển thị modal thành công
    showModalOneTab($blcSuccessReport);
});

$requiredClose.click(function () {
    closeModalOneTab($blcSuccessReport)
})

// Handle Video
let video = $('.state__video');
let controlSkipBack = $('.video__control-skipBack');
let controlSkipForward = $('.video__control-skipFoward');
let controlVolumeMuted = $('.control__volume-muted');
let controlVolumeOpen = $('.control__volume-open');
// let controlReport = $('.video__control-report');
let controlNext = $('.video__control-next');
let controlSetting = $('.video__control-setting');
let controlFullscreen = $('.video__control-fullscreen');
let btnFollow = $(".right__heading-follow")
// let btnShare = $(".right__heading-share")
let btnCloseShare = $(".share__section-close")

//click button share videos

// $(btnShare).click(function () {
//     $("#shareVD").css('opacity', '1');
//     $("#shareVD").show();
// });

//Click follow 

$(btnFollow).click(function () {
    if(!$('.show__login').hasClass('active')) {
        checkLoginWhenClickVideo()
    }else {
        $("#followHeart").toggleClass("active__btn-follow");
        $('.icon__followed-Heart').toggle();
        const movieId = document.getElementById('favorite').value;
        fetch('/favorite', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieId  })
          })
    }
});


//btn close share video section

$(btnCloseShare).click(function () {
    $("#shareVD").hide();
});


//play/pause video 
let videoElement = $('.state__video').get(0);
function pauseAndPlayVideo(video) {
    if (video.paused) {
        videoElement.play();
        $('#videoPlay').css('display', 'none');
        $('#videoStop').css('display', 'block');
        $('.video__loading').css('display', 'none');
    } else {
        video.pause();
        $('#videoStop').css('display', 'none');
        $('#videoPlay').css('display', 'block');
        $('.video__loading').css('display', 'block');
    }
}
video.click(function () {
    pauseAndPlayVideo(videoElement);
});
$('#videoControl').click(function () {
    pauseAndPlayVideo(videoElement);
});

$('.video__loading').click(function () {
    if (videoElement.paused) {
        videoElement.play();
        $('#videoPlay').css('display', 'none');
        $('#videoStop').css('display', 'block');
        $('.video__loading').css('display', 'none');
    } else {
        videoElement.pause();
        $('#videoStop').css('display', 'none');
        $('#videoPlay').css('display', 'block');
        $('.video__loading').css('display', 'block');
    }
});



// Tua lại/tua tới 10s
controlSkipBack.on('click', function () {
    video.get(0).currentTime -= 10;
});
controlSkipForward.on('click', function () {
    video.get(0).currentTime += 10;
});

// Tắt/bật tiếng
controlVolumeMuted.on('click', function () {
    video.get(0).muted = true;
    $('.control__volume-muted').css('display', 'none');
    $('.control__volume-open').css('display', 'block')
});
controlVolumeOpen.on('click', function () {
    video.get(0).muted = false;
    $('.control__volume-open').css('display', 'none')
    $('.control__volume-muted').css('display', 'block');
});

// Các tính năng khác
// controlReport.on('click', function () {
//     alert('Báo cáo sự cố đã được gửi!');
// });
// controlNext.on('click', function () {
//     alert('Tập tiếp theo đang được tải!');
// });
controlSetting.click(function () {
    $('.video__setting').toggle();
});

// Fullscreen mode
let container = $('#container');
controlFullscreen.on('click', function () {
    if (!document.fullscreenElement) {
        let elem = container.get(0);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
            $('.video__control-process').css('width', '88%')
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
            $('.video__control-process').css('width', '88%')
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
            $('.video__control-process').css('width', '88%')
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
            $('.video__control-process').css('width', '88%')
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            $('.video__control-process').css('width', '83%')
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
            $('.video__control-process').css('width', '83%')
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
            $('.video__control-process').css('width', '83%')
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
            $('.video__control-process').css('width', '83%')
        }
    }

});
$(document).on('keydown', function(e) {
    if ($('.comment__list-item textarea:focus').length > 0) {
        isTypingInTextarea = true;
    }
    if (isTypingInTextarea) {
        isTypingInTextarea = false;
        return;
    }

    if (e.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) {
            let elem = container.get(0);
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
                $('.video__control-process').css('width', '88%');
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
                $('.video__control-process').css('width', '88%');
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
                $('.video__control-process').css('width', '88%');
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
                $('.video__control-process').css('width', '88%');
            }
        } else {
            // Nếu đang ở chế độ toàn màn hình, thoát khỏi chế độ toàn màn hình
            if (document.exitFullscreen) {
                document.exitFullscreen();
                $('.video__control-process').css('width', '85%');
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
                $('.video__control-process').css('width', '85%');
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
                document.webkitExitFullscreen();
                $('.video__control-process').css('width', '85%');
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
                $('.video__control-process').css('width', '85%');
            }
        }
        // Ngăn chặn hành vi mặc định của phím F
        e.preventDefault();
    }
});


//Next episode
controlNext.mouseover(function () {
    $(".video__next").show();
});
controlNext.mouseout(function () {
    $(".video__next").hide();
});





//Comment
let moreCmt = $('.item__replyOther-title')
let btnLikeCmt = $('.item__reply-like')
let requireLogin = $('.required__login')
let userCmt = $('.comment__input')
let loginInUser = $('.text__login')





loginInUser.click(function () {
    showModalOneTab($login)
    closeModalOneTab($('#required__login'))
})

moreCmt.click(function () {
    $('.comment_showOther_item ').toggleClass("flex");
    $('.item__replyOther-title').toggleClass('hidden__reply');
});

btnLikeCmt.on('click', function () {
    var $this = $(this);
    var $likedIcon = $this.find('.fa-thumbs-up.liked');
    var $unlikeIcon = $this.find('.fa-thumbs-up.unlike');
    var $countLike = $this.find('.count__like');

    if ($likedIcon.hasClass('active')) {
        // Nếu đã thích, chuyển sang unlike
        $likedIcon.removeClass('active');
        $unlikeIcon.addClass('active');
        $countLike.text(parseInt($countLike.text()) - 1);
    } else {
        // Nếu chưa thích, chuyển sang thích
        $likedIcon.addClass('active');
        $unlikeIcon.removeClass('active');
        $countLike.text(parseInt($countLike.text()) + 1);
    }
});


// Active send cmt
$('.comment__list-item textarea').on('keyup', function () {
    if ($(this).val()) {
        $('.send__cmt').addClass('active')
    } else {
        $('.send__cmt').removeClass('active')
    }
});

$('.comment__list-item textarea').on('focus', function() {
    isTypingInTextarea = true; // Đặt trạng thái khi bắt đầu nhập
}).on('blur', function() {
    isTypingInTextarea = false; // Đặt trạng thái trở lại khi rời khỏi textarea
});
// Sort
$('.commment__heading-filter').click(function () {
    $(".comment__filter-option").toggleClass('active')
})

$('.comment__option-item a').click(function (e) {
    e.preventDefault();
    $('.comment__option-item a').removeClass('active-option')
    $(this).addClass('active-option')
})

// send cmt
// Gắn sự kiện click cho các phần tử hiện có và tương lai
$('.send__cmt').on('click', function(e){
    e.preventDefault(); 

    const movieId = document.getElementById('HiddenId').value;
    const username = document.getElementById('Hidden_username').value;
    var commentText = $(this).siblings('textarea').val()

    const dataToSend = {
        movieId: movieId,
        comment: commentText,
        username: username
    };
    
    fetch('/submit-comment', {  // Replace '/your-api-endpoint-here' with your actual API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })

    var avatarSrc = $(this).parent('.comment__list-item').siblings('.comment__input-avata').children('img').attr('src')

    var newCommentHTML = `
    <!-- item cmt-->
    <div class="comment__item">
      <div class="comment__item-avata">
        <img src="${avatarSrc}" alt="">
      </div>
      <!-- main comment -->
      <div class="comment__item-detail">
        <div class="comment__detail-area">
          <div class="detail__area-main">
            <!-- heading -->
            <div class="area__main-title">
              <span class="area__title-name">${username}</span>
              <div class="area__dot"></div>
              <span class="area__tilte-time">Vừa xong</span>
            </div>
            <!-- Detail comment -->
            <div class="area__main-detail">
              <span>${commentText}</span>
            </div>
          </div>

          <!-- Like , reply comment -->
          <div class="comment__item-reply">
            <div class="item__reply-like">
              <span>
                <i class="fa-solid fa-thumbs-up liked"></i>
                <i class="fa-regular fa-thumbs-up unlike active"></i>
                <span class="count__like">0</span>
              </span>
            </div>

            <div class="item__reply-message">
              <span>
                <i class="fa-light fa-message-dots"></i>
                <span class="count__cmt">0</span>
              </span>
            </div>

          </div>
          <!-- Thêm other ở đây -->
        </div>

      </div>

      <!-- btn tải thêm bình luận -->

    </div>
    `;

    // Add the new comment to the beginning of the comments list
    $('.comment__list').prepend(newCommentHTML);

    $('.item__reply-like').on('click', function () {
        var $this = $(this);
        var $likedIcon = $this.find('.fa-thumbs-up.liked');
        var $unlikeIcon = $this.find('.fa-thumbs-up.unlike');
        var $countLike = $this.find('.count__like');
    
        if ($likedIcon.hasClass('active')) {
            // Nếu đã thích, chuyển sang unlike
            $likedIcon.removeClass('active');
            $unlikeIcon.addClass('active');
            $countLike.text(parseInt($countLike.text()) - 1);
        } else {
            // Nếu chưa thích, chuyển sang thích
            $likedIcon.addClass('active');
            $unlikeIcon.removeClass('active');
            $countLike.text(parseInt($countLike.text()) + 1);
        }
    });
});



// Process bar
var progressBar = $('.item__bar-percent'); // Lấy thanh tiến trình
var presentText = $('.watch__present'); // Lấy phần trăm thời gian đã xem
var timeDisplay = $('.control__time-display'); // Lấy phần tử hiển thị thời gian hiện tại
var durationDisplay = $('.control__duration-display'); // Lấy phần tử hiển thị tổng thời gian
var lastSeekTime = 0; // Biến lưu trữ thời điểm tua cuối cùng
var isInteracting =  false;

// Hàm chuyển đổi thời gian từ giây sang phút giây
function formatTime(seconds, displayFormat) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    
    if (displayFormat === 'HH:mm:ss') {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Hàm cập nhật trạng thái UI
function updateUI(currentTime, duration) {
    const percentWatched = (currentTime / duration) * 100;
    presentText.text(`Đã xem ${Math.round(percentWatched)}%`);
    progressBar.css('width', percentWatched + '%');

    const displayFormat = duration >= 3600? 'HH:mm:ss' : 'mm:ss';
    const formattedCurrentTime = formatTime(currentTime, displayFormat);
    const formattedDuration = formatTime(duration, displayFormat);
    timeDisplay.text(formattedCurrentTime);
    durationDisplay.text(formattedDuration);
}

// Sự kiện 'timeupdate' và 'seeked' của video
video[0].addEventListener('timeupdate', function () {
    updateUI(this.currentTime, this.duration);
});
video[0].addEventListener('seeked', function () {
    updateUI(this.currentTime, this.duration);
});

// Xử lý sự kiện click trên thanh tiến trình
$('.video__control-process').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    isInteracting = true;
    const rect = this.getBoundingClientRect();
    const width = rect.right - rect.left;
    const percentClicked = (e.clientX - rect.left) / width * 100;
    const seekTime = percentClicked / 100 * video[0].duration;
    video[0].currentTime = seekTime;
    updateUI(seekTime, video[0].duration);
});
var timeoutControlBar = function timeoutControlBar() {
    timeoutId = setTimeout(() => $('.video__control-bar').fadeOut("slow"), 5000);
}

timeoutControlBar();

function showAndHideControlBar() {
    clearTimeout(timeoutId);
    isInteracting = true;
    $('.video__control-bar').fadeIn("slow");
    timeoutControlBar();
}



video.on('mouseenter', showAndHideControlBar);
video.on('mouseleave', () => {
    if (!isInteracting) {
        timeoutControlBar();
        setTimeout(() => $('.video__control-bar').fadeOut("slow"), 3000);
    }
});
video.on('mousemove', showAndHideControlBar);


// Định nghĩa các biến
// const $listFilms = $('.carousel__listFilms')
// // const $listItems = $('.carousel__listFilms li')
// const $nextButton = $('.carousel__button-next');
// const $prevButton = $('.carousel__button-prev');
const $itemsVideo = [
    ('.episodes__list li'),
    ('.actor__list li'),
    ('.season__list li'),
    ('.trailer__list li'),
    ('.connection__list li'),
];

// Hàm cập nhật vị trí của carousel
function updateCarouselPosition(position, listSlider) {
   // Hai btn để xử lý ẩn hiện khi đạt ngưỡng
   var btnNext = findButtonCarousel(listSlider, '.carousel__button-next')
   var btnPrev = findButtonCarousel(listSlider, '.carousel__button-prev')


   // listSlider là ul
   // Kiểm tra xem carousel này đã được khởi tạo trạng thái chưa
   if (!sliderStates[listSlider]) {
      sliderStates[listSlider] = {
         currentIndex: 0,
         translateSlider: 0,
         maxIndex: maxIndexSlider(listSlider) // đại diện khi tới khoảng đó tức là còn 1 ele chưa hiện 
      };
   }

   //   console.log(listSlider)
   //   console.log('sliderStates:' , sliderStates)

   var classCurItemSlider; // thẻ li đầu tiên của ul
   // Mục đích lấy li đầu tiên -> width
   for (let i = 0; i < $itemsVideo.length; i++) {
      if ($itemsVideo[i].includes(listSlider)) {
         classCurItemSlider = $itemsVideo[i];
         break;
      }
   }
   itemWidth = $(`${classCurItemSlider}`).width(); // width của thẻ li 
   // var parentClassItemCur = $(`.${listSlider}`); // ul
   var parentClassItemCur = sliderStates[listSlider];
   console.log(parentClassItemCur)
   var lenLi = 0;
   if(listSlider === 'actor__list') {
        lenLi = $(`.${listSlider} .actor__list-item`).length;
   }else {
        lenLi = $(".episodes__list .episodes__list-item").length; // Các item li của thẻ ul -> lấy length
   }

   if (position === 'next') {
      if (parentClassItemCur.currentIndex < lenLi) {
         if (parentClassItemCur.currentIndex >= parentClassItemCur.maxIndex) {
            parentClassItemCur.translateSlider = itemWidth * -parentClassItemCur.maxIndex - itemWidth;
            btnNext.fadeOut()
            btnPrev.fadeIn('slow')

         } else {
            parentClassItemCur.currentIndex += 0.5;
            parentClassItemCur.translateSlider = itemWidth * -parentClassItemCur.currentIndex;
            btnPrev.fadeIn('slow')
         }
         $(`.${listSlider}`).css('transform', `translateX(${parentClassItemCur.translateSlider}px)`);

      }
   } else if (position === 'prev') {
      if (parentClassItemCur.currentIndex == 0) {
         btnPrev.fadeOut()
         btnNext.fadeIn('slow')
      }
      else {
         parentClassItemCur.currentIndex -= 0.5;
         parentClassItemCur.translateSlider = itemWidth * -parentClassItemCur.currentIndex;
         // btnPrev.fadeIn('slow')
         btnNext.fadeIn('slow')
      }

      $(`.${listSlider}`).css('transform', `translateX(${parentClassItemCur.translateSlider}px)`);
   }


}
// Hàm get maxIndex
function maxIndexSlider(listSlider) {
   if (listSlider === 'actor__list') {
      return 1.5;
   }else {
    return 3;
   }
}


// Sự kiện click cho nút next và prev
$nextButton.on('click', function () {
   const curClass = findCurClassActiveBtn($(this));
   updateCarouselPosition('next', curClass)
//    console.log(curClass);
});

$prevButton.on('click', function () {
   const curClass = findCurClassActiveBtn($(this));
   updateCarouselPosition('prev', curClass)
//    console.log(curClass);

});

// Chỉnh index = 0 thì hover k thấy prev
function initSliderState(listSlider) {
   return {
      currentIndex: 0,
      translateSlider: 0,
      maxIndex: maxIndexSlider(listSlider) // maxIndex dựa trên danh sách item
   };
}

$itemsVideo.forEach($itemsVideo => {
   let listSlider = $itemsVideo.replace(' li', ''); // Loại bỏ phần 'li' để lấy tên danh sách
   listSlider = listSlider.replace('.', ''); // Loại bỏ phần 'li' để lấy tên danh sách

   sliderStates[listSlider] = initSliderState(listSlider);
});

$prevButton.hover(
   function() {
        console.log('có run')
       var curClass = findCurClassActiveBtn($(this));
       var btnPrev = $(this)
      //  console.log(sliderStates[curClass].curIndex)
       if (sliderStates[curClass].currentIndex == 0) {
           btnPrev.fadeOut('fast');
       } else {
           btnPrev.fadeIn('slow');
       }
   },
   function() {
       $(this).css('opacity', '0');
   }
);


function findCurClassActiveBtn($button) {
    const classes = ['episodes__list', 'actor__list', 'connection__list', 'trailer__list', 'season__list'];
    for (let i = 0; i < classes.length; i++) {
        if ($button.siblings('.' + classes[i]).length > 0) {
            return classes[i]
        }
    }
    return null;
}


//event swipe ngang để hiển thị danh sách phim
function setupListScrolling($list) {
    const $listItems = $list.find('li');
    let posX = 0;
    let lastPosX = 0;
    const containerWidth = $list.closest('.episodes__tag').width();
    let listWidth = 0;
    let endOfListPosition = 0;

    // Calculate list width based on list items
    $listItems.each(function() {
        listWidth += $(this).outerWidth(true); // Include padding and margin
    });

    // Calculate the end position of the list
    endOfListPosition = containerWidth - listWidth;

    const hammer = new Hammer($list[0]);
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on('panstart', function(e) {
        lastPosX = posX;
        $list.css('transition', 'none'); // Disable transition during pan
    });

    hammer.on('panmove', function(e) {
        posX = lastPosX + (e.deltaX * 2);  // Increase speed by adjusting deltaX multiplier

        // Prevent scrolling beyond left boundary
        if (posX > 0) {
            posX = 0;
        }

        // Prevent scrolling beyond right boundary
        if (posX < endOfListPosition) {
            posX = endOfListPosition;
            e.preventDefault(); // Prevent further scrolling if at the end
            e.stopImmediatePropagation(); // Stop immediate propagation of the event
        }

        $list.css('transform', `translateX(${posX}px)`);
    });

    hammer.on('panend', function(e) {
        // Enable smooth transition after pan
        $list.css('transition', 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)'); // Adjusted transition time for faster scroll
        $list.css('transform', `translateX(${posX}px)`);
    });
}

// Setup scrolling for each list
$('.episodes__list, .season__list, .trailer__list, .connection__list').each(function() {
    setupListScrolling($(this));
});

//swipe diễn viên
$('.actor__list').each(function() {
    const $actorList = $(this);
    let posX = 0;
    let lastPosX = 0;

    const hammer = new Hammer($actorList[0]);
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on('panstart', function(e) {
      lastPosX = posX;
      $actorList.css('transition', 'none'); // Disable transition during pan
    });

    hammer.on('panmove', function(e) {
      const containerWidth = $actorList.parent().width();
      const listWidth = $actorList[0].scrollWidth;

      posX = lastPosX + (e.deltaX * 2);  // Increase speed by adjusting deltaX multiplier

      // Prevent scrolling beyond left boundary
      if (posX > 0) {
        posX = 0;
      }

      // Prevent scrolling beyond right boundary
      const maxScrollX = containerWidth - listWidth;  // Maximum scroll position to keep the last item at the right edge
      if (posX < maxScrollX) {
        posX = maxScrollX;
      }

      $actorList.css('transform', `translateX(${posX}px)`);
    });

    hammer.on('panend', function(e) {
      const containerWidth = $actorList.parent().width();
      const listWidth = $actorList[0].scrollWidth;

      // Prevent scrolling beyond left boundary
      if (posX > 0) {
        posX = 0;
      }

      // Prevent scrolling beyond right boundary
      const maxScrollX = containerWidth - listWidth;  // Maximum scroll position to keep the last item at the right edge
      if (posX < maxScrollX) {
        posX = maxScrollX;
      }

      // Enable smooth transition after pan
      $actorList.css('transition', 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)'); // Adjusted transition time for faster scroll
      $actorList.css('transform', `translateX(${posX}px)`);
    });
  });



  $('#toggleDiv').click(function(){
    var $this = $(this);
    var onMode = $this.find('.turn__on-mode');
    var offMode = $this.find('.turn__off-mode');
    var lightText = $this.find('#lightText');
    var overlay = $('.overlay__mode');

    if (onMode.hasClass('active')) {
        offMode.addClass('active');
        lightText.text("Turn off light");
        onMode.removeClass('active');
        overlay.addClass('active');
    } else {
        onMode.addClass('active');
        lightText.text("Turn on light");
        offMode.removeClass('active');
        overlay.removeClass('active');

    }
});