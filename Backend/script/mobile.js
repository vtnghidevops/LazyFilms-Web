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



