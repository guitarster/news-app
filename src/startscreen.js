import { getTopNews } from "./API";
import { activatePanel } from "./menu";

const app = document.getElementById("app");

async function loadNews() {
  const news = await getTopNews();
  const topNews = news.items;

  return topNews;
}

export async function renderStartscreen() {
  renderApp();
  const appStart = document.querySelector(".app-start");
  renderHeader(appStart);
  renderCategories(appStart);
  renderNews(appStart);
  const news = document.querySelector(".news");
  const loadedNewsAll = await loadNews();
  for (let element of loadedNewsAll) {
    renderCard(news, element);
  }
  renderMenu(appStart);
  renderInfoPanel(appStart);
  activatePanel();
}

function renderApp() {
  app.innerHTML = `
    <div class="app-start"></div>`;
}

function renderHeader(appStart) {
  appStart.innerHTML += `
    <div class="header">
        <div class="header__search-button"><svg fill="#f1f1f2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
        </div>
        <div class="header__title">Newsly</div>
        <div class="menu__info"><svg fill="#f1f1f2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
            </svg>
        </div>
    </div>`;
}

function renderCategories(appStart) {
  appStart.innerHTML += `
    <div class="categories">
        <div class="categories__child"><svg fill="#f1f1f2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
            <path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"></path>
            </svg>
        </div>
        <div class="categories__child">Schlagzeilen</div>
        <div class="categories__child">Politik</div>
        <div class="categories__child">Wirtschaft</div>
        <div class="categories__child">Lokales</div>
        <div class="categories__child">Unterhaltung</div>
        <div class="categories__child">Sport</div>
    </div>`;
}

function renderNews(appStart) {
  appStart.innerHTML += `<div class="news"></div>`;
}

function renderCard(news, loadedNews) {
  const dateStamp = new Date(loadedNews.date_published);
  const dateStampParsed = Date.parse(dateStamp);
  const currentTime = Date.now();
  const durationSincePublishing = currentTime - dateStampParsed;

  news.innerHTML += `
    <div class="card">
        <a href="${loadedNews.url}">
            <div class="card__wrapper-for-link">
                <div class="card__image"><img width="320" src="${
                  loadedNews.image
                }"/></div>
                <div class="card__source">${loadedNews.authors[0].name}</div>
                <div class="card__title">${loadedNews.title}</div>
                <div class="card__text">${loadedNews.content_text}</div>
            </div>
        </a>
            <div class="card__date-bookmark">
                <div class="card__date-bookmark__date">Vor ${Math.round(
                  (durationSincePublishing / (1000 * 60 * 60)) % 24
                )} h veröffentlicht</div>
                <div class="card__date-bookmark__bookmark"><svg fill="#1995ad" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"></path>
                    </svg>
                </div>
            </div>
    </div>`;
}

function renderMenu(appStart) {
  appStart.innerHTML += `
    `;
}

function renderInfoPanel(appStart) {
  appStart.innerHTML += `
    <div id="infoPanel" class="panel">
        <h2>Impressum</h2>
        <p>David-Benjamin Rohrer<br>
        Musterstraße 1<br>
        12345 Musterstadt<br>
        <br>
        Telefon: 01234 / 5678900<br>
        E-Mail: mustername@email.com            
        </p><br>
        <button id="closeInfo">Schließen</button>
    </div>`;
}
