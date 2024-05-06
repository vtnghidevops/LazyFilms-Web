let btn_follow = document.getElementsByClassName("right__heading-follow")
let btn_share = document.getElementsByClassName("right__heading-share")
let btn_closeShare = document.getElementsByClassName("share__section-close")



//click button share videos
$(document).ready(function(){
    $(btn_share).click(function(){
        $("#shareVD").css('opacity','1');
        $("#shareVD").show();
    });
});
//click button follow
// $(document).ready(function(){
//     $(btn_follow).click(function(){
//         $("#followHeart").toggleClass("active__btn-follow")
//     });
// });
$(document).ready(function(){
    $(btn_follow).click(function(){
        $("#followHeart").toggleClass("active__btn-follow");
        $('.icon__followed-Heart').toggle();
    });
});


//btn close share video section
$(document).ready(function(){
    $(btn_closeShare).click(function(){
        $("#shareVD").hide();
    });
});





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
    controlFullscreen.on('click', function() {
        let elem = video.get(0);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    });
});







