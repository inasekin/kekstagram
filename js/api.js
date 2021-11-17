import {openFullSizePictureModal, closeFullSizePictureModal} from './fullsize-photo.js';

const errorLoadElement = document.querySelector('#load-error').content;
const errorTemplate = document.querySelector('#error').content;
const successModal = document.querySelector('#success').content;

export async function getData(url = '') {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    openFullSizePictureModal(errorLoadElement);
  }
}

export async function sendData(url = '', body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body,
    });
    const json = await response.json();
    openFullSizePictureModal(successModal);
    closeFullSizePictureModal();
    return json;
  } catch (error) {
    openFullSizePictureModal(errorTemplate);
  }
}
