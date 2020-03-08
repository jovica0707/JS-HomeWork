// [Data] ///////////////////////////////////////
let countries = [];
let globalName = 1;
let globalArea = 1;
let globalPop = 1;
const url = "https://restcountries.eu/rest/v2/name";

// [Selectors] //////////////////////////////////
let nameSearch = document.querySelector("#nameSearch");
let tableBody = document.querySelector("#tableBody");
let SearchButton = document.querySelector("#SearchButton");
let sortNameBtn = document.querySelector("#sort-name");
let sortAreaBtn = document.querySelector("#sort-area");
let sortPopBtn = document.querySelector("#sort-pop");
let loader = document.querySelector("#loader");
// [Functions] //////////////////////////////////

const mapper = array => {
  return array.map(element => element.name);
};

const render = array => {
  let inner = "";
  array.forEach(element => {
    let {
      flag,
      name,
      population,
      capital,
      area,
      currencies,
      languages
    } = element;
    inner += `
    <tr>
        <td> <img src="${flag}" alt="" height="15px" width="20px"></td>
        <td>${name}</td>
        <td>${population}</td>
        <td>${capital}</td>
        <td>${area}</td>
        <td>${mapper(languages)}</td>
        <td>${mapper(currencies)}</td>
    </tr>
    `;
  });
  loader.classList.add("d-none");
  tableBody.innerHTML = inner;
};
const getCountries = async name => {
  loader.classList.remove("d-none");
  let result = await fetch(`${url}/${name}`);
  countries = await result.json();
  render(countries);
};
// [Event Listeners] ////////////////////////////
SearchButton.addEventListener("click", function(e) {
  e.preventDefault();
  let name = nameSearch.value;
  if (name) {
    getCountries(name);
  }
});

sortNameBtn.addEventListener("click", function(e) {
  e.preventDefault();
  if (globalName === 1) {
    let sorted = countries.sort((f, s) => {
      if (f.name < s.name) {
        return -1;
      }
      if (f.name > s.name) {
        return 1;
      }
      return 0;
    });
    globalName = 0;
    render(sorted);
  } else if (globalName === 0) {
    let sorted = countries.sort((f, s) => {
      if (f.name < s.name) {
        return 1;
      }
      if (f.name > s.name) {
        return -1;
      }
      return 0;
    });
    globalName = 1;
    render(sorted);
  }
});

sortAreaBtn.addEventListener("click", function(e) {
  e.preventDefault();
  if (globalArea === 1) {
    let sorted = countries.sort((f, s) => {
      if (f.area < s.area) {
        return -1;
      }
      if (f.area > s.area) {
        return 1;
      }
      return 0;
    });
    globalArea = 0;
    render(sorted);
  } else if (globalArea === 0) {
    let sorted = countries.sort((f, s) => {
      if (f.area > s.area) {
        return -1;
      }
      if (f.area < s.area) {
        return 1;
      }
      return 0;
    });
    globalArea = 1;
    render(sorted);
  }
});
sortPopBtn.addEventListener("click", function(e) {
  e.preventDefault();
  if (globalPop === 1) {
    let sorted = countries.sort((f, s) => {
      if (f.population < s.population) {
        return -1;
      }
      if (f.population > s.population) {
        return 1;
      }
      return 0;
    });
    globalPop = 0;
    render(sorted);
  } else if (globalPop === 0) {
    let sorted = countries.sort((f, s) => {
      if (f.population > s.population) {
        return -1;
      }
      if (f.population < s.population) {
        return 1;
      }
      return 0;
    });
    globalPop = 1;
    render(sorted);
  }
});
// [Init] ///////////////////////////////////////
