// Mở sidebar
// show 1 tab
function showModalOneTab($modalToShow) {
  $modalToShow.fadeIn(300)
}


// Close and show 
function toggleShowModal($modalToShow, $modalToHide) {
  $modalToShow.fadeIn(300)
  $modalToHide.fadeOut(300)
}

// close 1 tab
function closeModalOneTab($modalToHide) {
  $modalToHide.fadeOut(300)
}

let $bar = $('.bars__mobile')
let $blcSideBar = $('.sidebar__mobile')
let $modalSideBar = $('.modal__sidebar-mobile')
let $movie__genre = $('.movie__genre')
let $subMenu__type = $('.submenu__type')
$(document).click(function(event) {

 // Kiểm tra xem sự kiện nhấp chuột có xảy ra ngoài cả hai phần tử sidebar và modal hay không
 if (!$blcSideBar.is(event.target) && $('.modal__sidebar-mobile').is(event.target)) {
  closeModalOneTab($blcSideBar);
}
});

$bar.click(function() {
  showModalOneTab($blcSideBar);
  // showModalOneTab($modalSideBar);
});

$movie__genre.click(function(){
  if ($subMenu__type.is(":visible")) {
    closeModalOneTab($subMenu__type)
  }else {
    showModalOneTab($subMenu__type)

  }
})

// Handle Login/Logout
let $clickLoginMobile = $('.btn__login-mobile'); // nút DANG NHAP
let $loginMobile = $('#login');

// Click để login
$clickLoginMobile.click(() => {
  showModalOneTab($loginMobile);
});


// Video
var $episodeList = $('.episodes__tabs .episodes__list');
var hammertime0 = new Hammer($episodeList[0]);
var hammertime1 = new Hammer($episodeList[1]);
var hammertime2 = new Hammer($episodeList[2]);
var hammertime3 = new Hammer($episodeList[3]);

hammertime0.on('swipeleft', function () {
    handleSwipe('left');
});

hammertime0.on('swiperight', function () {
    handleSwipe('right');
});
hammertime1.on('swipeleft', function () {
    handleSwipe('left');
});

hammertime1.on('swiperight', function () {
    handleSwipe('right');
});
hammertime2.on('swipeleft', function () {
    handleSwipe('left');
});

hammertime2.on('swiperight', function () {
    handleSwipe('right');
});
hammertime3.on('swipeleft', function () {
    handleSwipe('left');
});

hammertime3.on('swiperight', function () {
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

