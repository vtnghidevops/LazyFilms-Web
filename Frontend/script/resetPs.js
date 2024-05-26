function fillValueForgot() {

  if ($('.info__item-passAgain').val().trim().length > 0 && $('.info__item-newPass').val().trim().length > 0) {
    $('#change__password .edit__profile-submit button').addClass('active__btn');
  } else {
    $('#change__password .edit__profile-submit button').removeClass('active__btn');
    console.log("Cóoo2")

  }
}
$('.info__item-newPass, .info__item-passAgain').on('input', function () {
  fillValueForgot();
});

$('.edit__profile-submit').click(function () {
  var newPassword = $('.info__item-newPass').val();
  var confirmPassword = $('.info__item-passAgain').val();

  // Check if the passwords match
  if (newPassword !== confirmPassword) {
    alert("Nhập sai password, vui lòng nhập lại")
    return false;
  } else {
    $('#error-message').hide();
    var parentClass = $(this).parents();
    var textDescSuccess = $('#noti_suc .tel__body-desc')

    if (parentClass.hasClass('container__change-password')) {
      $('#noti_suc').addClass('active')
      $('#change__password').removeClass('active')

      $('#change__password').css('opacity', '0')
      textDescSuccess.text("Tài khoản của quý khách đã đặt lại mật khẩu thành công. Quý khách có thể quay lại và tiếp tục trải nghiệm!")
      $('.submit__back button').text('Quay lại trang chủ')
    }

    $('.info__item-passAgain').val('');
    $('.info__item-newPass').val('');
  }
})

$('.submit__back button').click(function () {
  window.location.href = '../../index.html';
})

