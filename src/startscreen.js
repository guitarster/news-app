import { getTopNews } from "./API";

const app = document.getElementById("app");

async function loadNews(url) {
  const news = await getTopNews(url);
  const topNews = news.items;

  const newsEl = document.querySelector(".news");
  newsEl.innerHTML = "";

  for (let element of topNews) {
    renderCard(newsEl, element);
  }
}

export async function renderStartscreen() {
  renderApp();
  const appStart = document.querySelector(".app-start");
  renderHeader(appStart);
  renderCategories(appStart);
  renderNews(appStart);
  await loadNews("https://rss.app/feeds/v1.1/8pn1E3Yx2PUufYkS.json");

  const schlagzeilenEl = document.getElementById("schlagzeilen");
  schlagzeilenEl.addEventListener("click", () =>
    loadNews("https://rss.app/feeds/v1.1/8pn1E3Yx2PUufYkS.json")
  );

  const politikEl = document.getElementById("politik");
  politikEl.addEventListener("click", () =>
    loadNews("https://rss.app/feeds/v1.1/HnoRe3cN6mPMSxwx.json")
  );

  const wirtschaftEl = document.getElementById("wirtschaft");
  wirtschaftEl.addEventListener("click", () =>
    loadNews("https://rss.app/feeds/v1.1/XbvbFcmJ0guXftbu.json")
  );

  const unterhaltungEl = document.getElementById("unterhaltung");
  unterhaltungEl.addEventListener("click", () =>
    loadNews("https://rss.app/feeds/v1.1/gOIOUp0WdpTbP7Mr.json")
  );

  const sportEl = document.getElementById("sport");
  sportEl.addEventListener("click", () =>
    loadNews("https://rss.app/feeds/v1.1/tv9nw7FZOVEFCRqy.json")
  );

  const bookmarkEl = document.getElementsByClassName(
    "card__date-bookmark__bookmark"
  );
  for (let element of bookmarkEl) {
    element.addEventListener("click", () => saveBookmark(element));
  }
}

function saveBookmark(element) {
  element.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
            <g fill="#1da9af">
                <g transform="scale(10.66667,10.66667)">
                <path d="M19,20.6l-7,-2.6l-7,2.6v-16.6c0,-0.5 0.4,-1 1,-1h12c0.6,0 1,0.4 1,1z"></path>
                <path d="M4,22v-18c0,-1.1 0.9,-2 2,-2h12c1.1,0 2,0.9 2,2v18l-8,-3zM12,16.9l6,2.3v-15.2h-12v15.1z"></path>
                </g>
            </g>
        </svg>
`;
}

function renderApp() {
  app.innerHTML = `
    <div class="app-start"></div>`;
}

function renderHeader(appStart) {
  appStart.innerHTML += `
    <div class="header">
        <div class="header__title">Newsly</div>
        <div class="header__search-button"><svg fill="#f1f1f2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
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
        <div class="categories__child" id="schlagzeilen">Schlagzeilen</div>
        <div class="categories__child" id="politik">Politik</div>
        <div class="categories__child" id="wirtschaft">Wirtschaft</div>
        <div class="categories__child" id="unterhaltung">Unterhaltung</div>
        <div class="categories__child" id="sport">Sport</div>
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
    <div class="card" data-id="${loadedNews.id}">
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
                <div class="card__date-bookmark__bookmark"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                    <g fill="#1da9af" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M6.00977,2c-1.09545,0 -2,0.9026 -2,1.99805l-0.00977,18.00195l8,-3l8,3v-1.44336v-16.55664c0,-1.09306 -0.90694,-2 -2,-2zM6.00977,4h11.99023v15.11328l-6,-2.25l-5.99805,2.25z"></path></g></g>
                    </svg>
                </div>
            </div>
    </div>`;
}
