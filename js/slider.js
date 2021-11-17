import { formImg, resetImage } from './fullsize-photo.js';

export const slider = document.querySelector('.effect-level__slider');
const effectButtons = document.querySelectorAll('.effects__radio');
const effectList = document.querySelector('.effects__list');
const effectLevel= document.querySelector('.effect-level__value');

const defaultParametersForNoUiSlider = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};

let imageFilter = 'none';

const photoFilterEffects = {
  none: {style: 'none', min: 0, max: 1, step: 0.1},
  chrome: {style: 'grayscale', min: 0, max: 1, step: 0.1},
  sepia: {style: 'sepia', min: 0, max: 1, step: 0.1},
  marvin: {style: 'invert', min: 0, max: 100, step: 1},
  phobos: {style: 'blur', min: 0, max: 3, step: 0.1},
  heat: {style: 'brightness', min: 1, max: 3, step: 0.1},
};

noUiSlider.create(slider, defaultParametersForNoUiSlider);

const setFilter = (evt) => {
  slider.style.display = evt.target.id === 'effect-none' ? 'none' : 'block';
  imageFilter = evt.target.value;
  formImg.className = `effects__preview--${imageFilter}`;
  slider.noUiSlider.updateOptions({
    range: {
      min: photoFilterEffects[imageFilter].min,
      max: photoFilterEffects[imageFilter].max,
    },
    start: photoFilterEffects[imageFilter].start,
    step: photoFilterEffects[imageFilter].step,
  });
};

slider.noUiSlider.on('update', (___, handle, values) => {
  const photoFilter = photoFilterEffects[imageFilter].style;
  effectLevel.values = values[handle];

  switch(imageFilter) {
    case 'chrome':
    case 'sepia':
    case 'heat':
      formImg.style.filter = `${photoFilter}(${values[handle]})`;
      break;
    case 'marvin':
      formImg.style.filter = `${photoFilter}(${values[handle]}%)`;
      break;
    case 'phobos':
      formImg.style.filter = `${photoFilter}(${values[handle]}px)`;
      break;
    default:
      formImg.style.filter = '';
      effectLevel.value = '';
  }
});

effectList.addEventListener('change', (evt) => {
  evt.preventDefault();
  slider.noUiSlider.updateOptions(defaultParametersForNoUiSlider);
  setFilter(evt);
});

export const setDefaultFilter = () => {
  effectButtons.forEach((button) => {
    if (button.id === 'effect-none') {
      button.checked = true;
    }

    slider.style.display = 'none';
    resetImage();
    slider.noUiSlider.updateOptions(defaultParametersForNoUiSlider);
  });
};

