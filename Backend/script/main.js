
// Handle Login/Logout
let $clickLogin = $('.btn__login'); // nút DANG NHAP
let $login = $('#login');
let $forgot = $('#forgotPass');
let $register = $('#regiters');
let $btnCloseLogin = $('.login__section-close');
let $btnCloseRegister = $('.register__section-close');
let $btnCloseForgot = $('.forgot__section-close');
let $goRegister = $('.login__modal--group .go__register');
let $backLogin = $('.login__modal--group .back__login');
let $goForgotPass = $('.login__modal--forgotPass');


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

// show 2 tab
function showTwoTab($modalToShow1, $modalToShow2) {
   $modalToShow1.fadeIn(300)
   $modalToShow2.fadeIn(300)
}


/* T
 
         Trạng thái trước Login
 
*/
// Click để login
$clickLogin.click(() => {
   showModalOneTab($login);
});
// Đóng login
$btnCloseLogin.click(() => {
   closeModalOneTab($login);
});

// Click sang register
$goRegister.click(() => {
   toggleShowModal($register, $login);
});

// Close register
$btnCloseRegister.click(() => {
   closeModalOneTab($register);
})

// Click back Login
$backLogin.click(() => {
   toggleShowModal($login, $register)
})

// Click đến forgotPass
$goForgotPass.click(() => {
   showModalOneTab($forgot)
})

// Close forgot
$btnCloseForgot.click(() => {
   closeModalOneTab($forgot)
})

/* Notification */
/* 
 
   Trạng Thái Trước Login
 
*/
// Add and Remove class
function toggleActiveAndRemoveActive($active, $notActive) {
   $active.toggleClass('active')
   $notActive.toggleClass('active')
}
// Handle notification
function toggleNotificationContent($content, $block) {
   // Sự kiện click trên $content để ngăn chặn việc đóng nội dung
   $content.on('click', function (e) {
      e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên các phần tử cha
   });
   $content.toggle(); // between hiding/showing
   $block.toggle();
   toggleActiveAndRemoveActive($bell__activeImg, $bell__NotActiveImg);
}
// Handle click noti in loggin or logout
function handleToggleClickNoti($content, $blockNone, $block) {
   if (flagStatusLogin) { // Nếu đang login thì hiện thị info noti tương ứng
      toggleNotificationContent($content, $block)
   } else {
      toggleNotificationContent($content, $blockNone)
   }
   if ($block === $block__haveNoti) {
      // Đảm bảo $block__haveNoti.find('.header__info-list') trả về một đối tượng jQuery hợp lệ
      $block.find('.header__info-item').scrollTop(0);
   }
}
let $block__noti = $(".header__nav-notification")
let $block__haveNoti = $(".header__nav-notification .logged")
let $block__haventNoti = $(".header__nav-notification .not__logged")
let $bell__activeImg = $(".active__noti")
let $bell__NotActiveImg = $(".non__active-noti")
let $show__contentNoti = $(".header__noti--modal")
let $goLoginFromNoti = $(".header__modal--info strong")
let flagStatusLogin = false // Giả sử không ở trang thái login
let $show__login = $('.header__nav-login .show__login') // block bao menu and profile


// Khi click notification -> bell active -> show notification
// Và bell not active -> none

// Click showing/hiding noti trước login
$block__noti.click(() => {
   flagStatusLogin = $show__login.is(':visible'); // đang login -> flag = true
   handleToggleClickNoti($show__contentNoti, $block__haventNoti, $block__haveNoti)
})
// Click lần nữa để dóng noti trước login
$goLoginFromNoti.click(() => {
   showModalOneTab($login)
   handleToggleClickNoti($show__contentNoti, $block__haventNoti, $block__haveNoti)
})

/* Vào trạng thái Login */
let $btnBlockLogin = $('#login .login__modal--group .login__button')
let $btnShowOptionPersonal = $('.wrap__profile')
let $menuOption = $('.profile__menu')
let $block__watching = $('.carousel__film-watching')
// console.log($btnBlockLogin)
// console.log($show__login)
// console.log($btnShowOptionPersonal)
// console.log($menuOption)

// Đăng nhập
$btnBlockLogin.click(() => {
   closeModalOneTab($login)
   // toggleActiveAndRemoveActive($show__login, $clickLogin)
   $block__watching.addClass('active')
})

// Show Option của personal
$btnShowOptionPersonal.click(() => {
   $menuOption.toggle()
})



// Handle slider
const $sld_list = $('.slider__list');
const $sld_items = $('.slider__list-item');
const $nextBtn = $('.slider__button-next');
const $prevBtn = $('.slider__button-prev');
const $dots = $('.slider__dots li');
const lenItems = $sld_items.length;
let curIndex = 0;
let width = $sld_items.eq(0).outerWidth(); // Lấy width
let sliderChange;



function updatePositionSlider(position) {
   if (position === 'next' || position == '') {
      curIndex = (curIndex + 1) % lenItems; // Sử dụng toán tử % để đảm bảo curIndex luôn nằm trong phạm vi
      $sld_list.css('transform', `translateX(${width * -curIndex}px)`);
   } else if (position === 'prev') {
      curIndex = (curIndex - 1 + lenItems) % lenItems; // Sử dụng toán tử % để đảm bảo curIndex luôn nằm trong phạm vi
      $sld_list.css('transform', `translateX(${width * -curIndex}px)`);
   }
   updateActiveDot();
}

function updateActiveDot() {
   $dots.removeClass('active__dots');
   $dots.eq(curIndex).addClass('active__dots'); // Cập nhật dot active dựa trên curIndex
}

// Function to start automatic sliding
function startAutoSliding() {
   clearInterval(sliderChange); // Clear any existing interval
   sliderChange = setInterval(() => {
      updatePositionSlider('');
   }, 5000);
}

// Start automatic sliding initially
startAutoSliding();

$nextBtn.on('click', () => {
   clearInterval(sliderChange); // Stop the automatic sliding
   updatePositionSlider('next');
   startAutoSliding(); // Resume automatic sliding
});

$prevBtn.on('click', () => {
   clearInterval(sliderChange); // Stop the automatic sliding
   updatePositionSlider('prev');
   startAutoSliding(); // Resume automatic sliding
});

// Đảm bảo dot active được cập nhật khi trang tải lần đầu
updateActiveDot();


// handle scroll to top
$(window).scroll(function () {
   var button = $('.return-to-top');
   // Khi người dùng cuộn trang xuống quá 300px, nút sẽ hiển thị
   if ($(this).scrollTop() > 300) {
      button.fadeIn();
   } else {
      // Ngược lại, nút sẽ bị ẩn đi
      button.fadeOut();
   }
});

$('.return-to-top').click(function (e) {
   e.preventDefault();

   var scrollDuration = 1000; // thời gian cuộn trong miliseconds
   var cosParameter = $(window).scrollTop() / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();

   function step(newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      // Khi cuộn đến đầu trang, dừng cuộn
      if (scrollCount >= Math.PI) window.scrollTo(0, 0);
      if ($(window).scrollTop() === 0) return;
      // Cuộn trang lên theo hàm cosine, tạo ra hiệu ứng mượt mà
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
      oldTimestamp = newTimestamp;
      // Gọi requestAnimationFrame để tạo ra hiệu ứng cuộn mượt mà
      window.requestAnimationFrame(step);
   }
   window.requestAnimationFrame(step);
});


// Open premium
let $vip = $('#premium');
let $sectionVip = $('.premium__section')
let $btnVip = $('.header__nav-premium');
let $btnClosePremium = $('.premium__section-heading i');
let $packageItems = $('.detail__package-item');
let $privilege = $('.extend__privilege'); // Quyền lợi thành viên
let $privilegeIcon = $('.extend__privilege-icon i');
let $detailPrivilege = $('.privilage__list');
let $payItem = $('.pay__with-item');
let $btnAppPrCode = $('.pay__btn-discount .btn__non-active');
let $inputPrCode = $('.input__promotion-code');
let $btnPayment = $('.btn__payment');
let $qr_vnpay = $('#QR_VNPAY');
let $btnCloseQr = $('.qr__section-close')
let $timeoutQr = $('.qr__timeout b')

// Show Premium
$btnVip.click(() => {
   showModalOneTab($vip)
   $sectionVip.scrollTop(0)
});

// Đóng Premium
$btnClosePremium.click(() => {
   closeModalOneTab($vip)
});

// Chọn các loại gói
$packageItems.click(function () {
   // Khi click vào detail__package-item
   $('.detail__package-item').on('click', function () {
      // Thêm class package__item-selected cho phần tử được click
      $(this).addClass('package__item-selected');

      // Tìm khối chứa package__item-selected và remove class này
      $('.package__item-selected').not(this).removeClass('package__item-selected');

      // Lưu giá trị của origin__price và good__price
      var originPrice = $(this).find('.origin__price').text();
      var goodPrice = $(this).find('.good__price').text();

      // Cập nhật info__package-name dựa trên class của khối chứa package__item-selected
      var packageTimeInfo = $('.package__time .info__package-name');
      if ($('.package__item-selected').hasClass('month')) {
         packageTimeInfo.text('1 tháng');
      } else if ($('.package__item-selected').hasClass('quarter')) {
         packageTimeInfo.text('3 tháng');
      } else if ($('.package__item-selected').hasClass('year')) {
         packageTimeInfo.text('12 tháng');
      }

      // Cập nhật extend__title với text = origin__price, và cập nhật khung thành toán = goodPrice
      $('.pay__info-price .info__package-name').text(goodPrice)
      $('.pay__info-total .info__package-name').text(goodPrice)
      $('.extend__title').text(`Sau khi khuyến mãi kết thúc tiếp tục gia hạn với ${originPrice}. Tự động gia hạn 1 tháng khi hết hạn. Hủy bỏ bất cứ lúc nào.`);
   });

});

// Xem chi tiết quyền lợi
$privilege.click(() => {
   if ($detailPrivilege.css('display') === 'flex') {
      $detailPrivilege.css('display', 'none');
   } else {
      $detailPrivilege.css('display', 'flex');
   }
   $privilegeIcon.toggleClass('active');
});

// Phương thức thanh toán
$payItem.click(function () {
   $(this).addClass('pay__select-item');
   $payItem.not(this).removeClass('pay__select-item');

   $(this).find('.check__box').addClass('active__selected');
   $payItem.not(this).find('.check__box').removeClass('active__selected');
});

// Input mã khuyến mãi
$inputPrCode.on('input', function () {
   var inputPrCodeValue = $(this).val();
   if (inputPrCodeValue.length > 0) {
      $btnAppPrCode.addClass('active__btn');
   } else {
      $btnAppPrCode.removeClass('active__btn');
   }
});

// Xử lí thanh toán
$btnPayment.click(function () {
   var selectedItem = $('.pay__select-item');
   // Kiểm tra xem khối này có class pay__item-banking hay không
   if (selectedItem.find('.pay__item-banking').length > 0) {
      toggleShowModal($qr_vnpay, $vip)
      startCountdown();
   } else {
      // Mở web thanh toán momo
      // Thực hiện mã để mở web thanh toán momo
   }
});
function startCountdown() {
   var countdownTime = 600; // 
   $timeoutQr.text('10:00')
   var countdownElement = $timeoutQr

   var countDownInterval = setInterval(() => {
      countdownTime--;
      var mimutes = Math.floor(countdownTime / 60);
      var seconds = countdownTime % 60;
      countdownElement.text(mimutes + ':' + seconds)

      if (countdownTime == 595) {
         if ($qr_vnpay.is(':visible')) {
            alert("QR hết hạn, Vui lòng thử lại")
            toggleShowModal($vip, $qr_vnpay)
         }
         clearInterval(countDownInterval)
      }
   }, 1000)
}

// Xử lý sự kiện click cho qr__section-close để đóng QRVNPAY
$btnCloseQr.click(function () {
   closeModalOneTab($qr_vnpay);
});

// Định nghĩa các biến
const $listFilms = $('.carousel__listFilms')
// const $listItems = $('.carousel__listFilms li')
const $nextButton = $('.carousel__button-next');
const $prevButton = $('.carousel__button-prev');
const $items = [
   ('.carousel__listFilms-update li'), // L
   ('.carousel__watching-list li'), // S
   ('.longChap__listFilms li'), // M
   ('.movieTheater__listFilms li'), // M
   ('.carousel__listFilms-anime li'), // L
   ('.carousel__trending-list li'), // S
   ('.commingSoon__listFilms li'), // M
   ('.VN-listFilms li'), // M
   ('.carousel__category-list li'), // S
   ('.SVIP__listFilms li') // M
];
const $fullBtn = $('.carousel__button-prev, .carousel__button-next')
let itemWidth = 0;
let sliderStates = {}; // trạng thái của slider


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
   for (let i = 0; i < $items.length; i++) {
      if ($items[i].includes(listSlider)) {
         classCurItemSlider = $items[i];
         break;
      }
   }
   itemWidth = $(`${classCurItemSlider}`).width(); // width của thẻ li 
   // var parentClassItemCur = $(`.${listSlider}`); // ul
   var parentClassItemCur = sliderStates[listSlider];
   var lenLi = $(`.${listSlider} .carousel__listFilms-item`).length; // Các item li của thẻ ul -> lấy length


   if (position === 'next') {
      if (parentClassItemCur.currentIndex < lenLi) {
         if (parentClassItemCur.currentIndex >= parentClassItemCur.maxIndex) {
            parentClassItemCur.translateSlider = itemWidth * -parentClassItemCur.maxIndex - itemWidth;
            btnNext.fadeOut()
            btnPrev.fadeIn('slow')

         } else {
            parentClassItemCur.currentIndex += 2;
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
         parentClassItemCur.currentIndex -= 2;
         parentClassItemCur.translateSlider = itemWidth * -parentClassItemCur.currentIndex;
         // btnPrev.fadeIn('slow')
         btnNext.fadeIn('slow')
      }

      $(`.${listSlider}`).css('transform', `translateX(${parentClassItemCur.translateSlider}px)`);
   }


}
// Hàm get maxIndex
function maxIndexSlider(listSlider) {
   if (listSlider === 'carousel__listFilms-update' || listSlider === 'carousel__listFilms-anime') {
      return 6;
   } else if (listSlider === 'longChap__listFilms' || listSlider === 'movieTheater__listFilms'
      || listSlider === 'commingSoon__listFilms' || listSlider === 'VN-listFilms'
      || listSlider === 'SVIP__listFilms') {
      return 4;
   } else {
      return 5;
   }
}

//Hàm tìm 2 nút next và prev khi có ul
function findButtonCarousel(listSlider, typeClassButton) {
   var siblingParent = $(`.${listSlider}`).parent().siblings(typeClassButton)
   return siblingParent;
}

$fullBtn.each(function () {
   $(this).hover(
      function () {
         $(this).css('opacity', '1');
      },
      function () {
         $(this).css('opacity', '0');
      }
   );
});

// Sự kiện click cho nút next và prev
$nextButton.on('click', function () {
   const curClass = findCurClassActiveBtn($(this));
   updateCarouselPosition('next', curClass)
   // console.log(parentClass);
});

$prevButton.on('click', function () {
   const curClass = findCurClassActiveBtn($(this));
   updateCarouselPosition('prev', curClass)
   // console.log(parentClass);

});

// Chỉnh index = 0 thì hover k thấy prev
function initSliderState(listSlider) {
   return {
      currentIndex: 0,
      translateSlider: 0,
      maxIndex: maxIndexSlider(listSlider) // maxIndex dựa trên danh sách item
   };
}

$items.forEach($item => {
   let listSlider = $item.replace(' li', ''); // Loại bỏ phần 'li' để lấy tên danh sách
   listSlider = listSlider.replace('.', ''); // Loại bỏ phần 'li' để lấy tên danh sách

   sliderStates[listSlider] = initSliderState(listSlider);
});

console.log("Trang thái list slider sau khi init ", sliderStates)

$prevButton.hover(
   function() {
       var curClass = findCurClassActiveBtn($(this));
       var btnPrev = findButtonCarousel(curClass,'.carousel__button-prev');
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
   const classes = ['carousel__listFilms-update', 'carousel__watching-list', 'longChap__listFilms', 'movieTheater__listFilms', 'carousel__listFilms-anime', 'carousel__trending-list', 'commingSoon__listFilms', 'VN-listFilms', 'carousel__category-list', 'SVIP__listFilms'];
   let curClass = null;
   // Tìm thẻ anh em có class 'carousel__tvHome-listFilms'
   var sibling = $button.siblings(".carousel__tvHome-listFilms");
   // console.log("anh em tìm được:" , sibling);
   // Lấy phần tử đầu tiên trong danh sách các thẻ con của thẻ anh em
   const firstChild = sibling.children().first();
   curClass = classes.find(className => firstChild.hasClass(className))
   return curClass;
   // trả về dạng class ( VD: carousel)
}


// Share and Tym
let shareBanner = $('.banner__action-share')
let blcShare = $('#shareVD')
let closeShare = $('.share__section-close')
let copyShare = $('.share__copy-text')
let iconHeartLight = $('.banner__action-heart .fa-light')
let iconHeartSolid = $('.banner__action-heart .fa-solid')
let listBannerLink = $('.slider__list-item')
let currentShareBanner; // Biến để lưu trữ shareBanner hiện tại

shareBanner.click(function(e){
   e.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
   currentShareBanner = $(this); // Lưu trữ shareBanner hiện tại
   showModalOneTab(blcShare);

   // Gán giá trị href cho copyShare khi shareBanner được click
   let currentListBannerLink = currentShareBanner.closest('.slider__list-item'); // Tìm kiếm listBannerLink chứa shareBanner
   let hrefValue = currentListBannerLink.attr('href'); 
   let cleanedHrefValue = hrefValue.replace('./', '');
  copyShare.val(`https://lazyfilms.vn/${cleanedHrefValue}`); 
})

closeShare.click(function() {
   closeModalOneTab(blcShare)
})

iconHeartLight.click(function(e){
   e.preventDefault();
   toggleActiveAndRemoveActive(iconHeartLight,iconHeartSolid)
}) 

iconHeartSolid.click(function(e){
   e.preventDefault();
   toggleActiveAndRemoveActive(iconHeartSolid,iconHeartLight)
}) 

// Copy 
$('.share__copy-btn').click(function(e) {
   e.preventDefault();
   // Sử dụng phương thức copyToClipboard để sao chép giá trị của copyShare vào clipboard
   copyShare.select();
   copyToClipboard(copyShare.val());
});

function copyToClipboard(text) {
   // Tạo một phần tử textarea mới
   var tempInput = document.createElement("input");
   tempInput.value = text;
   // Thêm phần tử textarea vào DOM
   document.body.appendChild(tempInput);
   // Sao chép giá trị của textarea vào clipboard
   // copyShare.select();
   // Sử dụng document.execCommand("copy") để sao chép
   document.execCommand("copy");
   // Xóa phần tử textarea khỏi DOM
   document.body.removeChild(tempInput);
}