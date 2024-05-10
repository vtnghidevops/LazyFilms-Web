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
$btnReport.click(function(){
  showModalOneTab($blcReport)
  $checkboxes.prop('checked', false);
  $sendReport.removeClass('active__btn')
})

$cancelReport.click(function(){
  closeModalOneTab($blcReport)
})

$checkboxes.change(function() {
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
$sendReport.click(function(){
  // Thay đổi nội dung trước khi hiển thị modal
  updateSuccessReportContent();
  // Đóng modal báo cáo
  closeModalOneTab($blcReport);
  // Hiển thị modal thành công
  showModalOneTab($blcSuccessReport);
});

$requiredClose.click(function(){
  closeModalOneTab($blcSuccessReport)
})