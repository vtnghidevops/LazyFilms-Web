let $inputSearch = $('.container__search--input')
let $btnSearch =  $('.btn__search')
let $respondSearch = $('.container__respond-search')
$inputSearch.on('input',function(){
  if($inputSearch.val().length > 0) {
    $btnSearch.addClass('active__btn')
    $respondSearch.addClass('active')
  }else {
    $btnSearch.removeClass('active__btn')
    $respondSearch.removeClass('active')

  }
})

// Click item respond thì auto submit value của nó
 $('.respond__item-content').on('click', function() {
  // Lấy value ổ respond và cập nhật value cho ổ search
  var searchTextValue = $(this).find('.respond__search-text').text();
  $('.container__search--input').val(searchTextValue);

  // auto click
  $('.btn__search').trigger('click');
});
