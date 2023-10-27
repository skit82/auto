const header = document.querySelector('.header');
const breakpointLg = window.matchMedia('(min-width:1200px)');
const breakpointSm = window.matchMedia('(min-width: 768px)');

let lastScrollTop = 0;

let sibling;
let parent;

const setParentOffset = (element) => {
  const offset = element.offsetHeight;
  parent.style = `padding-top: ${offset}px`;
};

const hasInitialPosition = (element) => {
  if (sibling) {
    return sibling.getBoundingClientRect().bottom >= element.getBoundingClientRect().bottom || parent.getBoundingClientRect().top >= 0;
  }

  return parent.getBoundingClientRect().top >= 0;
};

const onScroll = () => {
  const st = window.pageYOffset || document.documentElement.scrollTop;

  const onMobileScroll = () => {
    if (header.classList.contains('is-fixed')) {
      if (st > lastScrollTop) {
        header.classList.remove('is-scrolled');
      } else {
        header.classList.add('is-scrolled');
        if (hasInitialPosition(header)) {
          setTimeout(() => {
            header.classList.remove('is-animate');
            header.classList.remove('is-fixed');
            header.classList.remove('is-scrolled');
            parent.removeAttribute('style');
          });
        }
      }
    } else {
      const headerOffset = header.getBoundingClientRect().bottom;
      if (headerOffset <= 0) {
        header.classList.add('is-fixed');
        setParentOffset(header);
        setTimeout(() => {
          header.classList.add('is-animate');
        }, 100);
      }
    }
  };

  const onDesktopScroll = () => {
    if (header.classList.contains('is-fixed')) {
      if (hasInitialPosition(header) && st < lastScrollTop) {
        header.classList.remove('is-fixed');
        parent.removeAttribute('style');
      }
      return;
    }

    const headerOffset = header.getBoundingClientRect().top;
    if (headerOffset <= 0) {
      header.classList.add('is-fixed');
      setParentOffset(header);
    }
  };

  if (breakpointLg.matches) {
    onDesktopScroll();
  } else {
    onMobileScroll();
  }

  lastScrollTop = st <= 0 ? 0 : st;
};


export const initBackScroll = () => {
  if (!header) {
    return;
  }
  sibling = header.previousElementSibling;
  parent = header.parentElement;

  breakpointSm.addListener(onScroll);
  window.addEventListener('scroll', onScroll, false);
};
