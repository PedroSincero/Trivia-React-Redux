// Retorna algo persistido no localstorage buscando pela sua chave "key" !!Tem de ser String!!
export const getFromLocalStorage = (key) => {
  const storedItem = localStorage.getItem(key);
  return JSON.parse(storedItem);
};

// Persiste algo no localstorage, tem de passar uma chave e o valor que será parseado para string.
export const setOnLocalStorage = (key, value) => {
  let itemToBeStored = value;
  if (typeof value === 'object') itemToBeStored = JSON.stringify(value);
  localStorage.setItem(key, itemToBeStored);
};

// Atualiza algo no localstorage, tem de passar uma chave e o valor que será atualizado.
export const updateLocalStorage = (key, value) => {
  const retrievedItem = getFromLocalStorage(key);
  if (typeof value === 'object') {
    const newItem = { ...retrievedItem, ...value };
    const stringfiedItem = JSON.stringify(newItem);
    localStorage.setItem(key, stringfiedItem);
  } else {
    localStorage.setItem(key, value);
  }
};
