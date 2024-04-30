// Handle Login-Logout
let btnLogin = document.querySelector('.header__nav-login')
let register = document.getElementById('regiters')
let login = document.getElementById('login')
let forgot = document.getElementById('forgotPass')
let btnCloseLogin = document.querySelector('.login__section-close')
let btnCloseRegister = document.querySelector('.register__section-close')
let btnCloseForgot = document.querySelector('.forgot__section-close')
let goRegister = document.querySelector('.login__modal--group .go__register')
let backLogin = document.querySelector('.login__modal--group .back__login')
let goForgotPass = document.querySelector('.login__modal--forgotPass')
// console.log(login)
// console.log(btnCloseLogin)
// console.log(register)
// console.log(goRegister)
// console.log(backLogin)
// console.log(btnCloseRegister)
// console.log(goForgotPass)
// console.log(btnCloseForgot)
function closePage(btnClose){
  if(btnClose == btnCloseLogin) {
    login.style.opacity = '0';
    setTimeout(() => {
      login.style.display = 'none';
    }, 500); // Chờ cho transition kết thúc
  }else if (btnClose == btnCloseRegister) {
    register.style.opacity = '0';
    setTimeout(() => {
      register.style.display = 'none';
    }, 500); // Chờ cho transition kết thúc
  } else if (btnClose == btnCloseForgot) {
    forgot.style.opacity = '0';
    setTimeout(() => {
      forgot.style.display = 'none';
    }, 500); // Chờ cho transition kết thúc
  }
}

// Nút Login trên trang chủ
btnLogin.addEventListener('click', () => {
  login.style.opacity = '1';
  login.style.display = 'block';
});

// Close trên page login
btnCloseLogin.addEventListener('click', () => {
  closePage(btnCloseLogin)
});

// Close trên page register
btnCloseRegister.addEventListener('click', () => {
  closePage(btnCloseRegister)
});

// Close trên page forgot
btnCloseForgot.addEventListener('click', () => {
  closePage(btnCloseForgot)
});

// Tới page register trên page login 
goRegister.addEventListener('click', () => {
  register.style.display = 'block'
  register.style.opacity = '1';
  login.style.display = 'none';

});

// Tới page forgot pass
goForgotPass.addEventListener('click', () => {
  forgot.style.display = 'block'
  forgot.style.opacity = '1';
  login.style.display = 'none';

});

// Trở về page login
backLogin.addEventListener('click', () => {
  login.style.display = 'block'
  register.style.display = 'none';

});


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



// scroll to top
window.onscroll = function() {
  var button = document.querySelector('.return-to-top');
  // Khi người dùng cuộn trang xuống quá 600px, nút sẽ hiển thị
  if (window.scrollY > 300) {
      button.style.display = 'block';
  } else {
      // Ngược lại, nút sẽ bị ẩn đi
      button.style.display = 'none';
  }
};

document.querySelector('.return-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  
  var scrollDuration = 1000; // thời gian cuộn trong miliseconds
  var cosParameter = window.scrollY / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();
  
  function step (newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    // Khi cuộn đến đầu trang, dừng cuộn
    if (scrollCount >= Math.PI) window.scrollTo(0, 0);
    if (window.scrollY === 0) return;
    // Cuộn trang lên theo hàm cosine, tạo ra hiệu ứng mượt mà
    window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
    oldTimestamp = newTimestamp;
    // Gọi requestAnimationFrame để tạo ra hiệu ứng cuộn mượt mà
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
});

// Open premium
const vip = document.getElementById('premium')
const btnVip = document.querySelector('.header__nav-premium ')
const btnClosePremium = document.querySelector('.premium__section-heading i')
btnVip.addEventListener('click',()=>{
  vip.style.display = "block"
  vip.style.opacity = 1
})

btnClosePremium.addEventListener('click',()=>{
  vip.style.opacity = '0';
  setTimeout(() => {
    vip.style.display = 'none';
  }, 500);
})