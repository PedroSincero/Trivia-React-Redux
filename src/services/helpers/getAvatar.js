import { MD5 } from 'crypto-js';

// Recebe um email, trata ele com MD5, cria um hash e devolve a url do avatar do usuario
const getAvatar = (email) => {
  const treatedEmail = email.trim().toLowerCase();
  const URL = 'https://www.gravatar.com/avatar/';
  const hash = MD5(treatedEmail);
  return URL + hash;
};

export default getAvatar;
