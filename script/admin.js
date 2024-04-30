let btnAddFilm = document.querySelector('.carousel_content-addFilm-btn');
let addFilm = document.getElementById('addFilm');
let btnCloseAddFilm = document.querySelector('.addFilm__section-close');
let btnCloseLogin = document.querySelector('.login__section-close');
let btnCloseRegister = document.querySelector('.register__section-close');
let btnCloseForgot = document.querySelector('.forgot__section-close');

btnAddFilm.addEventListener('click', () => {
    addFilm.style.opacity = '1';
    addFilm.style.display = 'block';
});

function closePage(btnClose){
    if(btnClose == btnCloseLogin) {
      login.style.opacity = '0';
      setTimeout(() => {
        login.style.display = 'none';
      }, 500); // Chờ cho transition kết thúc
    } else if (btnClose == btnCloseRegister) {
      register.style.opacity = '0';
      setTimeout(() => {
        register.style.display = 'none';
      }, 500); // Chờ cho transition kết thúc
    } else if (btnClose == btnCloseForgot) {
      forgot.style.opacity = '0';
      setTimeout(() => {
        forgot.style.display = 'none';
      }, 500); // Chờ cho transition kết thúc
    } else if (btnClose == btnCloseAddFilm) {
        addFilm.style.opacity = '0';
        setTimeout(() => {
          addFilm.style.display = 'none';
        }, 500); // Chờ cho transition kết thúc
    }
}

btnCloseAddFilm.addEventListener('click', () => {
    closePage(btnCloseAddFilm);
});
