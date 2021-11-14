import {
  SCALE_STEP_HIDDEN,
  SCALE_STEP,
  DEFAULT_SCALE_VALUE,
  DEFAULT_SCALE_HIDDEN_VALUE,
  REDUCE_SCALE_VALUE,
  VALUE_OF_DECIMAL_NUMBER_SYSTEM
} from './data.js';

export const formImg = document.querySelector('.img-upload__preview img');

const scale = document.querySelector('.scale');
const scalePlus = document.querySelector('.scale__control--bigger');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const scaleHidden = document.querySelector('#hidden-scale');

export const setDefaultScale = () => {
  scaleValue.value = DEFAULT_SCALE_VALUE;
  scaleHidden.value = DEFAULT_SCALE_HIDDEN_VALUE;
  formImg.style.transform = `scale(${scaleHidden.value})`;
};

const reduceScale = () => {
  if (scaleHidden.value !== REDUCE_SCALE_VALUE) {
    scaleValue.value = `${parseInt(scaleValue.value, VALUE_OF_DECIMAL_NUMBER_SYSTEM) - SCALE_STEP}%`;
    scaleHidden.value  = `${Number(scaleHidden.value) - SCALE_STEP_HIDDEN}`;
    formImg.style.transform = `scale(${scaleHidden.value})`;
  }
};

const addScale = () => {
  if (scaleHidden.value !== DEFAULT_SCALE_HIDDEN_VALUE) {
    scaleValue.value = `${parseInt(scaleValue.value, VALUE_OF_DECIMAL_NUMBER_SYSTEM) + SCALE_STEP}%`;
    scaleHidden.value = `${Number(scaleHidden.value) + SCALE_STEP_HIDDEN}`;
    formImg.style.transform = `scale(${scaleHidden.value})`;
  }
};

scale.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target === scalePlus) {
    addScale();
  }
  if (evt.target === scaleMinus) {
    reduceScale();
  }
});
