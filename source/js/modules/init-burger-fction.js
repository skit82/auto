import '../utils/scroll-lock';

const burgerBtn = document.querySelector('[data-mob-menu="menu-toggle"]');
const burgerModElems = document.querySelectorAll('[data-mob-menu="burger-mod"]');
const breakpointLg = window.matchMedia('(min-width:1260px)');

const openMenu = () => {
  burgerBtn.ariaPressed = 'true';
  burgerBtn.classList.add('is-menu-open');
  burgerBtn.classList.add('no-pointer');
  burgerModElems.forEach((elem) => {
    elem.classList.add('is-menu-open');
  });
  window.scrollLock.disableScrolling();
  setTimeout(() => {
    burgerBtn.classList.remove('no-pointer');
  }, 600);
};

const closeMenu = () => {
  burgerModElems.forEach((elem) => {
    elem.classList.remove('is-menu-open');
  });
  burgerBtn.ariaPressed = 'false';
  burgerBtn.classList.add('no-pointer');
  burgerBtn.classList.remove('is-menu-open');
  window.scrollLock.enableScrolling();
  setTimeout(() => {
    burgerBtn.classList.remove('no-pointer');
  }, 500);
};

const closeMenuOnResize = () => {
  closeMenu();
};

const initBurgerAction = () => {
  if (burgerBtn) {
    breakpointLg.addListener(closeMenuOnResize);
    burgerBtn.addEventListener('click', () => {
      if (burgerBtn.ariaPressed === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
};

export {initBurgerAction, closeMenu};
