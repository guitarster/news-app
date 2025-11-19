import { getTopNews } from "./API";

const app = document.getElementById("app");

async function loadNews() {
  const news = await getTopNews(
    "https://rss.app/feeds/v1.1/8pn1E3Yx2PUufYkS.json"
  );
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
    </div>`;
}

function renderCategories(appStart) {
  appStart.innerHTML += `
    <div class="categories">
        <div class="categories__child"><svg fill="#f1f1f2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
            <path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"></path>
            </svg>
        </div>
        <div class="categories__child" id="schlagzeilen">Schlagzeilen</div>
        <div class="categories__child" id="politik">Politik</div>
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
        <a href="${loadedNews.url}" target="blank">
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
