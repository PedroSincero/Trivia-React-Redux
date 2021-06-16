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

// Atualiza do local storage

// Recebe o value a ser atualizado e o valor retornado do localstorage/
// Cria um novo objeto iterando sobre as keys dos item retornado.
// Dentro do reduce é criado um novo objeto e então é verificado se o valor a ser atualizado já existe no local storage. Se existir então é feito a atualização
// Se não retorna o a chave com o valor já existente, pois não necessita alteração.

const constructNewObject = (value, retrievedItem) => {
  const newObject = Object.keys(retrievedItem)
    .reduce((_, key) => {
      if (retrievedItem[key] && value[key]) {
        return { [key]: { ...retrievedItem[key], ...value[key] } };
      }
      return retrievedItem[key];
    }, {});
  return newObject;
};

// Atualiza algo no localstorage, tem de passar uma chave e o valor que será atualizado.
export const updateLocalStorage = (key, value) => {
  const retrievedItem = getFromLocalStorage(key);
  if (typeof value === 'object') {
    const newItem = constructNewObject(value, retrievedItem);
    const stringfiedItem = JSON.stringify(newItem);
    localStorage.setItem(key, stringfiedItem);
  } else {
    localStorage.setItem(key, value);
  }
};
