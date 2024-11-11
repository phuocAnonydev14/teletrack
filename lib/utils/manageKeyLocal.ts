import { EKeyLocal } from '@/common/enums/keysLocal';
export const addKeyLocal = (key: EKeyLocal, addVal: string) => {
  const keyLocal = window.localStorage.getItem(key);
  if (!keyLocal) {
    localStorage.setItem(key, JSON.stringify([addVal]));
    return;
  }
  const keyLocalParsed: string[] = JSON.parse(keyLocal);
  if (keyLocalParsed.length >= 5) {
    keyLocalParsed.shift();
  }
  keyLocalParsed.filter((item) => item !== addVal);
  keyLocalParsed.push(addVal);
  localStorage.setItem(key, JSON.stringify(keyLocalParsed));
};

export const getKeyLocal = (key: EKeyLocal) => {
  const keyLocal = window.localStorage.getItem(key);
  if (!keyLocal) {
    return [];
  }
  return JSON.parse(keyLocal);
};

export const removeKeyLocal = (key: EKeyLocal, removeVal: string) => {
  const keyLocal = window.localStorage.getItem(key);
  if (!keyLocal) {
    return;
  }
  const keyLocalParsed = JSON.parse(keyLocal);
  const index = keyLocalParsed.indexOf(removeVal);
  if (index > -1) {
    keyLocalParsed.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(keyLocalParsed));
  }
};
