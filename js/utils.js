export const checkMaxStringLength = (checkedString, maxLength) => checkedString.length <= maxLength;

export const checkArrayDuplicates = (array) => (new Set(array)).size !== array.length;

export const isEscapeKey = (key) => key === 'Escape';
