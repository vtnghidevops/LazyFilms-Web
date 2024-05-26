function showModalOneTab($modalToShow) {
  $modalToShow.fadeIn(300);
}

// Close and show 
function toggleShowModal($modalToShow, $modalToHide) {
  $modalToShow.fadeIn(300);
  $modalToHide.fadeOut(300);
}

// Close one tab
function closeModalOneTab($modalToHide) {
  $modalToHide.fadeOut(300);
}

// Sub premium
let $showPremium = $('#premium');
let $subPreBtn = $('.vip__banner-joinVip');

$subPreBtn.click(() => {
  showModalOneTab($showPremium);
});

// Open block of edit
let $btnChange = $('.button__change');
let $closePages = $('.forgot__section-close')

// Thay đổi thông tin
$btnChange.click(function () {

  var parentBlock = $(this).parents();
  if (parentBlock.hasClass('personal__profile')) {
    showModalOneTab($('#edit__profile'));
  } else if (parentBlock.hasClass('personal__change-tel')) {
    showModalOneTab($('#change__tel'));
  } else if (parentBlock.hasClass('personal__change-pwd')) {
    showModalOneTab($('#send__OTP')); // Removed extra space
  }
});

$closePages.click(function () {
  $(this).closest('div[id]').fadeOut(300);
  resetInputsInfoBlock();
});

// edit profile
let $btnSubmitInfo = $('.edit__profile-submit button');
let $blcSuccess = $('#noti_suc');
let $backBtn = $('.submit__back')
let $changeAvata = $('#icon__upload-avata');
let $btnUpdateProfile = $('.edit__profile-submit')

// Kiểm tra khi có sự thay đổi trong các trường nhập liệu
$('.info__item-name, #sex__code, .info__item-day, .info__item-enterPass, .info__item-passAgain, .info__item, .info__item-email, .info__item-tel,.OTP__number').on('input', function () {
  checkInputsInfoBlock();
});

// Upload img
$('#icon__upload-avata').on('click', function () {
  $('#avatarInput').click();
});

$('#avatarInput').on('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      $('.update__avata').css('background-image', `url(${e.target.result})`);
      $('.profile__main-img img').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Change all info before update 



let $assignName = $('.info__block-name')
let $assignSex = $('.info__sex')
let $assignDob = $('.info__dob')

function assignInfoProfile() {
  let $name = $('.info__item-name').val()
  let $sex = $('#sex__code').find('option:selected').text();
  let $dob = $('.info__item-dob').val();
  $assignName.text($name)
  $assignSex.text($sex)
  $assignDob.text($dob)
}



// submit edit info
$btnUpdateProfile.click(function () {

  var parentClass = $(this).parents();
  var textDescSuccess = $('#noti_suc .tel__body-desc')

  if (parentClass.hasClass('container__edit-profile')) {
    toggleShowModal($blcSuccess, $('#edit__profile'));
    textDescSuccess.text("Tài khoản của quý khách đã được cập nhật hồ sơ thành công. Quý khách có thể quay lại và tiếp tục trải nghiệm!")
    assignInfoProfile();

  } else if (parentClass.hasClass('container__change-password')) {
    toggleShowModal($blcSuccess, $('#change__password'));
    textDescSuccess.text("Tài khoản của quý khách đã thay đổi mật khẩu thành công. Quý khách có thể quay lại và tiếp tục trải nghiệm!")

  } else if (parentClass.hasClass('container__change-tel')) {
    toggleShowModal($blcSuccess, $('#change__tel'));
    textDescSuccess.text("Tài khoản của quý khách đã được cập nhật số điện thoại thành công. Quý khách có thể quay lại và tiếp tục trải nghiệm!")
    var telChange = $('.info__item-tel').val();
    $('.personal__change-tel .info__account').html(`&nbsp;&nbsp;${telChange}`);

  }else if (parentClass.hasClass('container__send-OTP')){
    toggleShowModal($('#change__password'),$('#send__OTP'))
  }
  resetInputsInfoBlock();
})

//Trở về 
$backBtn.click(() => {
  closeModalOneTab($blcSuccess)
})

function checkInputsInfoBlock() {
  // Check if all OTP input fields are filled
  var otpFilled = $('.OTP__number').length === $('.OTP__number').filter(function() {
    return $(this).val().trim().length === 1;
 }).length;


  var nameFilled = $('.info__item-name').val().trim().length > 0;
  console.log(nameFilled)
  var genderSelected = $('#sex__code').val().trim().length > 0;
 

  var dateFilled = $('.info__item-day').val().trim().length > 0;
  var oldPass = $('.info__item-enterPass').val().trim().length > 0;
  var oldPassAgain = $('.info__item-passAgain').val().trim().length > 0;
  var newPass = $('.info__item-newPass').val().trim().length > 0;
  var updateTel = $('.info__item-tel').val().trim().length > 0;


  // Vì gender có default value
  if ((nameFilled  || dateFilled || oldPass || oldPassAgain || newPass || updateTel || otpFilled) && genderSelected ) {
    $btnSubmitInfo.addClass('active__btn').css('cursor', 'pointer');
  } else {
    if ($(this).parent().hasClass('submit__back')) {
      $(this).addClass('active__btn')
    } else {
      $(this).removeClass('active__btn')
    }
  }
}

function resetInputsInfoBlock() {
  $('.info__item-name').val('');
  $('#sex__code').val('1');
  $('.info__item-day').val('');
  $('.info__item-enterPass').val('');
  $('.info__item-passAgain').val('');
  $('.info__item-newPass').val('');
  $('.info__item-tel').val('')
  $('.form__item-OTP input').val('')


  $btnSubmitInfo.removeClass('active__btn');
  $backBtn.children().addClass('active__btn')
}

// Logout profile
let $logoutProfile = $('.logout__profile')
let $logoutCancel = $('.logout__btn-exit')
let $logoutAccept = $('.logout__btn-accepct')
console.log($logoutProfile)

$logoutProfile.click(() => {
  showModalOneTab($('#logout_acc'))
})

$logoutCancel.click(() => {
  closeModalOneTab($('#logout_acc'))
})

$logoutAccept.click(() => {
  window.location.href = '../../index.html';
})

// Tùy biến OTP ( gmail )
let $descOTP = $('#send__OTP .tel__body-desc')
let $gmailToDesc = $('.info__email')
$descOTP.text(`Vui lòng nhập mã được gửi qua gmail đến${$gmailToDesc.text()}`)

// focus input nào thì active 
$('.OTP__number').on('focus', function () {
  $('.OTP__number').removeClass('active__OTP');
  $(this).addClass('active__OTP');
});

// Full 1 input thì next
$('.OTP__number').on('input', function () {
  if ($(this).val().length === 1) {
    // Nếu đã đủ, chuyển đến input tiếp theo
    $(this).parent().next('.form__item-OTP').find('.OTP__number').focus().select();
  }
});

function resetOTPInputs() {
  $('.OTP__number').val('');
  $('.OTP__number').removeClass('active__OTP');
  $('.form__item-OTP:first-child .OTP__number').addClass('active__OTP');
}

$('#send__OTP .forgot__section-close').on('click', function () {
  resetOTPInputs();
});

$('.OTP__number').on("change", function(){
  console.log($('.OTP__number').val())
})
