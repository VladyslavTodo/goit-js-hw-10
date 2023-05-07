import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

// fetchCountries('Ukraine').then(data => {
//   console.log(data);
// });

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  const value = event.target.value.trim();
  if (!value) {
    list.innerHTML = '';
    info.innerHTML = '';
    return;
  }

  fetchCountries(value)
    .then(data => {
      console.log(data);
      // list.innerHTML = createMarcupLi(data);
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 2 && data.length < 10) {
        list.innerHTML = createMarcupLi(data);
      } else {
        list.innerHTML = createMarcupCountry(data);
      }

      if (value === 'Russia') {
        alert('Pidary');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createMarcupLi(data) {
  return data
    .map(({ name, flags }) => {
      return `
      <li class='li-flex' class="country-name">
        <img src="${flags.svg}" alt="flag" width="40px" height="30px">
        <p class='name-country-li'>${name.common}</p>
      </li>
    `;
    })
    .join('');
}

function createMarcupCountry(data) {
  console.log(data);
  return data
    .map(({ name, capital, population, flags, languages }) => {
      return `
      <div class="country-flex">
        <img src="${flags.svg}" alt="flag" width="80px" height="60px">
        <h2 class="country-name">${name.common}</h2>
      </div>
			<ul>
      <li><b>Capital:</b> ${capital}</li>
      <li><b>Population:</b> ${population}</li>
      <li><b>Languages:</b> ${Object.values(languages)}</li>
			</ul>
      `;
    })
    .join('');
}
