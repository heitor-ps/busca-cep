import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import Swal from 'sweetalert2';
import fetchCep from './api';

const goBtn = document.querySelector('#submit-cep');
const input = document.querySelector('#cep');

const log = document.querySelector('#log');
const comp = document.querySelector('#comp');
const neig = document.querySelector('#neig');
const uf = document.querySelector('#uf');
const city = document.querySelector('#city');
const ddd = document.querySelector('#ddd');
const resultContainer = document.querySelector('#search-result-container');

const invalidValue = 'O valor digitado não é válido';

function validateInput(value) {
  if (value.length < 8 && value.length > 9) {
    throw new Error(invalidValue);
  }

  if (value.match(/[A-z]/) !== null) {
    throw new Error(invalidValue);
  }
}

function renderData(data) {
  resultContainer.style.visibility = 'visible';

  log.innerHTML = data.logradouro;
  comp.innerHTML = data.complemento;
  neig.innerHTML = data.bairro;
  uf.innerHTML = data.uf;
  city.innerHTML = data.localidade;
  ddd.innerHTML = data.ddd;
}

goBtn.addEventListener('click', async () => {
  try {
    const typedCep = input.value;
    validateInput(typedCep);
    const response = await fetchCep(typedCep);
    renderData(response);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Request failed',
      text: error.message,
    });
  }
});
