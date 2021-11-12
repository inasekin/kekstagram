import {SCALE_STEP_HIDDEN} from './data.js';
import {SCALE_STEP} from './data.js';

export const formImg = document.querySelector('.img-upload__preview img');

const scale = document.querySelector('.scale');
const scalePlus = document.querySelector('.scale__control--bigger');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const scaleHidden = document.querySelector('#hidden-scale');


export const setDefaultScale = () => {
  scaleValue.value = '100%';
  scaleHidden.value = '1';
  formImg.style.transform = `scale(${scaleHidden.value})`;
};

const reduceScale = () => {
  if (scaleHidden.value !== '0.25') {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - SCALE_STEP}%`;
    scaleHidden.value  = `${Number(scaleHidden.value) - SCALE_STEP_HIDDEN}`;
    formImg.style.transform = `scale(${scaleHidden.value})`;
  }
};

const addScale = () => {
  if (scaleHidden.value !== '1') {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + SCALE_STEP}%`;
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
