const searchInput = document.getElementById('search');
const infoList = document.querySelector('.country-list');

async function getName(valueInput) {
    try {
        const { data } = await fetch(`https://restcountries.com/v3.1/name/${valueInput}`);
        
        if (data.length > 10) {
            infoList.innerHTML = '';
            alert({
                text: "Знайдено занадто багато збігів. Будь ласка, введіть більш конкретний запит!",
                delay: 2000,
            });
            return;
        }

        makeHtml(data);
    } catch (error) {
        console.log(error);
        alert({
            text: "Країна не знайдена. Будь ласка, перевірте ваші дані.",
            delay: 2000,
        });
        infoList.innerHTML = '';
    }
}

function makeHtml(countrys) {
    const markup = countrys.map(country => {
        const population = country.population;
        const languages = country.languages
            ? Object.values(country.languages).join(', ')
            : "Unknown";
        return `<li class="country-list-item">
                    <p class="country-list-item-name"><strong>${country.name.common}</strong></p>
                    <p class="country-list-item-population">Population: ${population}</p>
                    <p class="country-list-item-languages">Languages: ${languages}</p>
                    <img src="${country.flags.png}" class="country-list-item-flag">
                </li>`;
    }).join('');
    infoList.innerHTML = markup;
}

function searchCountry(e) {
    const value = searchInput.value.trim();
    if (value !== '') {
        getName(value);
    } else {
        infoList.innerHTML = '';
    }
}

searchInput.addEventListener('input', _.debounce(searchCountry, 500));