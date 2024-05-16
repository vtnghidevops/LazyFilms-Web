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

    
