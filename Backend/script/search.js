let $inputSearch = $('.container__search--input')
let $btnSearch =  $('.btn__search')

$inputSearch.on('input',function(){
  if($inputSearch.val().length > 0) {
    $btnSearch.addClass('active__btn')
  }else {
    $btnSearch.removeClass('active__btn')
  }
})