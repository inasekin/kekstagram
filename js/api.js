import {closePhotoEditing} from './form.js';
import {showModal} from './control-modals.js';

const errorLoadElement = document.querySelector('#load-error').content;
const errorTemplate = document.querySelector('#error').content;
const successModal = document.querySelector('#success').content;

export async function getData(url = '') {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    showModal(errorLoadElement);
  }
}

export async function sendData(url = '', body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body,
    });
    const json = await response.json();
    showModal(successModal);
    closePhotoEditing();
    return json;
  } catch (error) {
    showModal(errorTemplate);
    closePhotoEditing();
  }
}
