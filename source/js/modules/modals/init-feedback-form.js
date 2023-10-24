const initFeedbackForm = () => {
  const formItems = document.querySelectorAll('[data-form="input"], [data-form="textarea"]');
  const textAreas = document.querySelectorAll('[data-form="textarea"]');

  if (!formItems) {
    return;
  }

  formItems.forEach((item) => {
    const itemParent = item.parentNode;
    const itemLabel = itemParent.querySelector('[data-form="label"]');

    const checkValueLength = () => {
      if (item.value.length > 0) {
        itemLabel.classList.add('on-focus');
      } else {
        itemLabel.classList.remove('on-focus');
      }
    };

    checkValueLength();

    item.addEventListener('focus', () => {
      itemLabel.classList.add('on-focus');
      itemParent.classList.add('is-focus');
    });

    item.addEventListener('blur', () => {
      checkValueLength();
      itemParent.classList.remove('is-focus');
    });

    item.addEventListener('change', () => {
      checkValueLength();
    });
  });

  if (!textAreas) {
    return;
  }

  textAreas.forEach((item) => {
    const itemParent = item.parentNode;
    const itemCounter = itemParent.querySelector('[data-form="counter"]');

    if (itemCounter) {
      itemCounter.textContent = `${item.maxLength - item.value.length}`;

      item.addEventListener('input', () => {
        itemCounter.textContent = `${item.maxLength - item.value.length}`;
      });
    }
  });
};

export {initFeedbackForm};
