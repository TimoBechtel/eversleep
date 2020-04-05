import './snackbar.scss';

let element;

export const snack = (text) => {
  if (!element) {
    element = document.createElement('div');
    element.id = 'snackbar';
    document.body.appendChild(element);
  }
  element.innerHTML = text;
  element.className = 'show';
  setTimeout(() => {
    element.className = element.className.replace('show', '');
  }, 2800);
};
