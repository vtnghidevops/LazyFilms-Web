// Handle Login-Logout


// Handle slider
const sld_list = document.querySelector('.slider__list')
const sld_items = document.querySelectorAll('.slider__list-item')
const nextBtn = document.querySelector('.slider__button-next')
const prevBtn = document.querySelector('.slider__button-prev')
const dots = document.querySelectorAll('.slider__dots li')
const lenItems = sld_items.length
let curIndex = 0
let width = sld_items[0].offsetWidth // Lấy width


function UpdatePositionSlider(position){
  if (position === 'next' || position == '') {
    if(curIndex < lenItems - 1){
      curIndex+=1;
    }else{
      curIndex = 0; // Đặt lại curIndex về 0 để quay lại slide đầu tiên
    }
    sld_list.style.transform = `translateX(${width * -curIndex}px)`;

  }else if (position === 'prev') {
    if (curIndex == 0) {
      curIndex = lenItems - 1
    } else {
      curIndex -= 1
    }
    sld_list.style.transform = `translateX(${width * -curIndex}px)`
  }
  // remove and add active dot
  let lastActiveDot = document.querySelector('.slider__dots .active__dots')
  lastActiveDot.classList.remove('active__dots')
  dots[Math.abs(curIndex+2)].classList.add('active__dots')
}

// Slide chuyển động liên tục mỗi 4s
let sliderChange = setInterval(()=> {
  UpdatePositionSlider('')
},4000)

nextBtn.addEventListener('click', () => {
  clearInterval(sliderChange)
  UpdatePositionSlider('next')
  sliderChange = setInterval(() => {
    UpdatePositionSlider()
    console.log(curIndex)
  }, 4000)
})

prevBtn.addEventListener('click',() => {
  clearInterval(sliderChange)
  UpdatePositionSlider('prev')
  // sld_list.style.transform = `translateX(${width * -curIndex}px)`
  sliderChange = setInterval(() => {
    UpdatePositionSlider()
  }, 4000)
})



// // Handle button carousel
let buttons = document.querySelectorAll('.carousel__button-prev, .carousel__button-next')
// let prevBtnCarousel = document.querySelectorAll('.carousel__listFilms .carousel__button-prev')
// let nextBtnCarousel = document.querySelectorAll('.carousel__listFilms .carousel__button-next')
// let listFilms = document.querySelector('.carousel__listFilms')
// let itemFilms = document.querySelectorAll('.carousel__listFilms .carousel__listFilms-item')
// console.log(itemFilms[0])
// console.log(itemFilms[9])
// console.log(itemFilms[10])
// console.log(itemFilms[19])
// console.log(itemFilms[20])
// let index = 2
// // Số lẻ là next, số chẵn là prev
// function changePositionVideo(){
  
// }
// // Xử lý hiển thị button khi hover
// prevBtnCarousel.forEach(button => {
//   button.addEventListener('mouseover', function() {
//     // Nếu index chia hết cho 10 -> là index đầu tiên, ẩn button prev
//     if(index % 10 == 0){
//       button.style.display = 'none';
//     }else {
//       // Ngược lại, hiển thị button
//       button.style.opacity = 1;
//     }
//   });
//   button.addEventListener('mouseout', function() {
//         button.style.opacity = 0;
//   });
// });

// nextBtnCarousel.forEach(button => {
//   button.addEventListener('mouseover', function() {
//     // Luôn hiển thị button next khi hover
//     button.style.opacity = 1;
//   });
//   button.addEventListener('mouseout', function() {
//     button.style.opacity = 0;
//   });
// });

// // Xử lý chuyển đổi items khi click button
// prevBtnCarousel.forEach(button => {
//   button.addEventListener('click', function() {
//     // Giảm index và chuyển đến item trước
//     if(index > 0){
//       index--;
//       listFilms.style.transform = 'translateX(' + (-index * itemFilms[index].offsetWidth) + 'px)';
//     }
//   });
// });

// nextBtnCarousel.forEach(button => {
//   button.addEventListener('click', function() {
//     // Tăng index và chuyển đến item kế tiếp
//     if(index < itemFilms.length - 1){
//       index++;
//       listFilms.style.transform = 'translateX(' + (-index * itemFilms[index].offsetWidth) + 'px)';
//     }
//   });
// });
// Hàm xử lý chung cho carousel
// function handleCarousel(carousel) {
//   let prevBtn = carousel.querySelector('.carousel__button-prev');
//   let nextBtn = carousel.querySelector('.carousel__button-next');
//   let listFilms = carousel.querySelector('.carousel__listFilms');
//   let itemFilms = carousel.querySelectorAll('.carousel__listFilms-item');
//   let index = 0; // Index ban đầu cho mỗi carousel

//   // Xử lý hiển thị button khi hover
//   prevBtn.addEventListener('mouseover', function() {
//     if(index === 0){
//       this.style.display = 'none';
//     } else {
//       this.style.opacity = 1;
//     }
//   });

//   prevBtn.addEventListener('mouseout', function() {
//     this.style.opacity = 0;
//   });

//   nextBtn.addEventListener('mouseover', function() {
//     this.style.opacity = 1;
//   });

//   nextBtn.addEventListener('mouseout', function() {
//     this.style.opacity = 0;
//   });

//   // Xử lý chuyển đổi items khi click button
//   prevBtn.addEventListener('click', function() {
//     if(index > 0){
//       index--;
//       listFilms.style.transform = 'translateX(' + (-index * itemFilms[0].offsetWidth) + 'px)';
//     }
//   });

//   nextBtn.addEventListener('click', function() {
//     if(index < itemFilms.length - 1){
//       index++;
//       listFilms.style.transform = 'translateX(' + (-index * itemFilms[0].offsetWidth) + 'px)';
//     }
//   });
// }

// // Lấy tất cả các carousel và áp dụng hàm xử lý
// document.querySelectorAll('.carousel').forEach(handleCarousel);

buttons.forEach(button => {
  button.addEventListener('mouseover', function() {
      button.style.opacity = 1;
  });

  button.addEventListener('mouseout', function() {
    button.style.opacity = 0;
  });
});

//Handle Show/Off Aside
let aside = document.querySelector('.aside')
let btnAside = document.querySelector('.aside .show__trending')

btnAside.addEventListener('click',()=>{
  
})