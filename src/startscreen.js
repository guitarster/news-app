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

  const headerTitleEl = document.querySelector(".header__title");
  headerTitleEl.addEventListener("click", () =>
    loadNews("https://rss.app/feeds/v1.1/8pn1E3Yx2PUufYkS.json")
  );

  const menuEl = document.querySelector(".header__menu");
  const categoriesEl = document.querySelector(".categories");

  menuEl.addEventListener("click", () => {
    categoriesEl.classList.toggle("categories-display");
  });

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
}

function renderApp() {
  app.innerHTML = `
    <div class="app-start"></div>`;
}

function renderHeader(appStart) {
  appStart.innerHTML += `
    <div class="header">
        <div class="header__title">Newsly</div>
        <div class="header__menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#f1f1f2" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
            </svg>
        </div>
    </div>`;
}

function renderCategories(appStart) {
  appStart.innerHTML += `
    <div class="categories">
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
            </div>
    </div>`;
}
