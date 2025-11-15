export function startscreen(app) {
  app.innerHTML = `
    <div class="app-start">
        <div class="header">
            <div class="header__search-button"><img src="/public/icons8-search.svg" alt="Lupe zur Suche" width="30" height="30"></div>
            <div class="header__title">Newsly</div>
            <div class="header__settings-button"><img src="/public/icons8-einstellungen.svg" alt="Zahnrad für die Einstellungen" width="30" height="30"></div>  
        </div>
        <div class="categories">
            <div class="categories__child">Schlagzeilen</div>
            <div class="categories__child">Politik</div>
            <div class="categories__child">Wirtschaft</div>
            <div class="categories__child">Lokales</div>
            <div class="categories__child">Unterhaltung</div>
            <div class="categories__child">Sport</div>
        </div>
        <div class="news"></div>
        <div class="footer">
            <span><a target="_blank" href="https://icons8.com/icon/lwZinoeNcL3F/search">Search</a> Icon von <a target="_blank" href="https://icons8.com">Icons8</a></span>
            <span><a target="_blank" href="https://icons8.com/icon/82535/settings">Einstellungen</a> Icon von <a target="_blank" href="https://icons8.com">Icons8</a></span>
        </div>
    </div>`;
}
