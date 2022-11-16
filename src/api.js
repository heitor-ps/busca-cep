const CEP_API = 'https://viacep.com.br/ws';

export default async function fetchCep(cep) {
  const fetchedCep = await fetch(`${CEP_API}/${cep}/json`);
  const data = await fetchedCep.json();

  if (data.erro) throw new Error('Request has failed');

  return data;
}
