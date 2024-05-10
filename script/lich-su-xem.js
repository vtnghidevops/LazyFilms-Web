
function checkListHistoryToAdd() {
  if ($('.history__list').length > 0) {
    $('.history__list').css('display', 'flex')
    $('.history__empty').removeClass('active')
    $('.history__btn-change .button__change').not('.btn__cancel, .btn__del').addClass('active')
    $('.no__more').addClass('active')
    return true;
  } else {
    return false;
  }
}

if (checkListHistoryToAdd()) {
  let $btnCancel = $('.btn__cancel');
  let $btnDel = $('.btn__del');
  let $modal = $('.history__item .modal__item')
  let $btnSelectAll = $('.btn__select-all')
  let $listHistory = $('.history__area')
  var isButtonChangeClicked = false;


  $('.history__btn-change .button__change').not('.btn__cancel, .btn__del').on('click', function () {
    isButtonChangeClicked = true;
    $(this).removeClass('active');
    $listHistory.animate({
      transition: 'all 0.3s ease-in'
    });

    $('.btn__cancel, .btn__del, .history__item .modal__item, .btn__select-all').addClass('active');
  });

  $('.history__item-target').hover(function () {
    if (isButtonChangeClicked == false) {
      $(this).find('.btn__play-history').show();
    }
  }, function () {
    if (isButtonChangeClicked == true) {
      $(this).find('.btn__play-history').hide();
    }
  });


  $btnCancel.on('click', function () {
    $btnCancel.removeClass('active');
    $btnDel.removeClass('active');
    $modal.removeClass('active');
    $btnSelectAll.removeClass('active');
    $('.button__change').not('.btn__cancel, .btn__del').addClass('active');
    isButtonChangeClicked = false;
    $('.mask__check-selected').removeClass('mask__check-selected');

 });

  $modal.on('click', function () {
    if (isButtonChangeClicked) {
      if ($(this).find('.mask__check').hasClass('mask__check-selected')) {
        $(this).find('.mask__check').removeClass('mask__check-selected');
      } else {
        $(this).find('.mask__check').addClass('mask__check-selected');
      }
      updateBtnDelStatus();
      updateSelectAllStatus();
    }
  });

  $('.btn__select-all .mask__check').on('click', function () {
    if ($('.mask__check').not('.mask__check-selected').length > 0) {
      $('.mask__check').addClass('mask__check-selected');
      $btnDel.removeClass('nonActive__btn-del');
    }
    else {
      $('.mask__check').removeClass('mask__check-selected');
      $btnDel.addClass('nonActive__btn-del');
    }
    updateBtnDelStatus();
    updateSelectAllStatus();
  });

  // Khối nào cóa mask__check-selected thì xóa
  $btnDel.on('click', function () {

    $('.history__item').each(function () {
      if ($(this).find('.mask__check-selected').length > 0) {
        // If .mask__check-selected is found, remove the .modal__item
        $(this).remove();
      }
    });

    // After deletion, check if any .modal__item remains
    if ($('.history__item').length === 0) {
      // If no .modal__item remains, show the .history__empty element
      $('.history__empty').show();
      $('.history__btn-change').removeClass('active')
      $('.btn__select-all').removeClass('active')
      $('.no__more').removeClass('active')
    } else {
      // If there are .modal__item elements left, hide the .history__empty element
      $('.history__empty').hide();
    }

    // After deletion, update the UI accordingly
    updateBtnDelStatus(); // Update delete button status
    updateSelectAllStatus(); // Update select all button status
  });



  function updateBtnDelStatus() {
    if ($('.mask__check-selected').length > 0) {
      $btnDel.removeClass('nonActive__btn-del');
    } else {
      $btnDel.addClass('nonActive__btn-del');
    }
  }

  function updateSelectAllStatus() {
    if ($('.history__item .mask__check').not('.history__item .mask__check-selected').length === 0) {
      $('.btn__select-all .mask__check').addClass('mask__check-selected');
    } else {
      $('.btn__select-all .mask__check').removeClass('mask__check-selected');
    }
  }
}else {
  $('.history__empty').addClass('active')
  $('.no__more').removeClass('active')

}
