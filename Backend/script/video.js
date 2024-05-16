
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
    showModalOneTab($blcReport)
    $checkboxes.prop('checked', false);
    $sendReport.removeClass('active__btn')
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
let btnShare = $(".right__heading-share")
let btnCloseShare = $(".share__section-close")

//click button share videos

$(btnShare).click(function () {
    $("#shareVD").css('opacity', '1');
    $("#shareVD").show();
});

//Click follow 

$(btnFollow).click(function () {
    $("#followHeart").toggleClass("active__btn-follow");
    $('.icon__followed-Heart').toggle();
});


//btn close share video section

$(btnCloseShare).click(function () {
    $("#shareVD").hide();
});


//play/pause video 

$('#videoControl').click(function () {
    let videoElement = $('.state__video').get(0);
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
            $('.video__control-process').css('width', '90%')
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
            $('.video__control-process').css('width', '90%')
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
            $('.video__control-process').css('width', '90%')
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
            $('.video__control-process').css('width', '90%')
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            $('.video__control-process').css('width', '85%')
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
            $('.video__control-process').css('width', '85%')
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
            $('.video__control-process').css('width', '85%')
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
            $('.video__control-process').css('width', '85%')
        }
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
let moreCmt = $('.comment__item-replyOther')
let btnLikeCmt = $('.item__reply-like')

moreCmt.click(function () {
    $('.comment_showOther_item').toggleClass("comment_showOther_item-show");
    $('.item__replyOther-title').toggleClass('hidden__reply');
});




btnLikeCmt.click(function () {
    // Tìm phần tử cha chung chứa nút được nhấp và các phần tử liên quan
    var parentContainer = $(this).closest('.comment__item-detail');

    // Thay đổi các phần tử liên quan bên trong phần tử cha
    parentContainer.find('.item__reply-like .liked').toggle();
    parentContainer.find('.item__reply-like .unlike').toggle();
});

