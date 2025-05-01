function loadNews(parmas = {}) {
  let query = "";

  if (parmas.source) {
    query = `source=${parmas.source}`;
  } else if (parmas.category) {
    query = `category=${parmas.category}`;
  } else if (parmas.q) {
    query = `q=${parmas.q}`
  }

  fetch(`http://localhost:3000/news?${query}`)
    .then((res) => res.json())
    .then((articles) => {
      const container = document.getElementById("news-container");
      container.innerHTML = "";
      articles.forEach((article) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${article.title}</h3>
          <img src="${article.urlToImage}" width="300">
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <hr/>
        `;
        container.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
}

/*
function loadEverything(query = 'modi') {
  fetch(`http://localhost:3000/everything?country=us`)
    .then(res => res.json())
    .then(articles => {
      const container = document.getElementById('news-container');
      container.innerHTML = '';
      articles.forEach(article => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3>${article.title}</h3>
          <img src="${article.urlToImage}" width="300">
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <hr/>
          <a href="${article.content}" target="_blank">Read more</a>
          <hr/>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}
*/

const categoryButtons = document.querySelectorAll(".category-btn");
const categoryDropdown = document.querySelector(".category-dropdown");
const headingclick = document.querySelector(".headline-title");

const categories = [
  { name: "Health", vlaue: "health" },
  { name: "Science", value: "science" },
  { name: "Sports", value: "sports" },
  { name: "Technology", value: "technology" },
  { name: "Business", value: "business" },
  { name: "Entertainment", value: "entertainment" },
];

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const Category = button.getAttribute("data-category");
    loadNews({ category: `${Category}` });
  });
});

categoryDropdown.addEventListener("change", () => {
  const Category = categoryDropdown.value;
  if (Category) {
    loadNews({ category: `${Category}` });
  }
});

headingclick.addEventListener("click", () => {
  loadNews({ category: "general" });
});

function updateDropdown() {
  categoryDropdown.innerHTML = '<option value="general">General</option>';
  let hiddenCount = 0;

  categoryButtons.forEach((button) => {
    const rect = button.getBoundingClientRect();
    const isHidden = rect.width === 0 && rect.height === 0;

    if (isHidden) {
      hiddenCount++;
      const category = button.getAttribute("data-category");
      const name = button.textContent;
      const option = document.createElement("option");
      option.value = category;
      option.textContent = name;
      categoryDropdown.appendChild(option);
    }
  });

  if (hiddenCount > 0) {
    categoryDropdown.style.display = "block";
  } else {
    categoryDropdown.style.display = "none";
  }
}

const sources = [
  "abc-news",
  "abc-news-au",
  "aftenposten",
  "al-jazeera-english",
  "ansa",
  "argaam",
  "ars-technica",
  "ary-news",
  "associated-press",
  "australian-financial-review",
  "axios",
  "bbc-news",
  "bbc-sport",
  "bild",
  "blasting-news-br",
  "bleacher-report",
  "bloomberg",
  "breitbart-news",
  "business-insider",
  "buzzfeed",
  "cbc-news",
  "cbs-news",
  "cnn",
  "cnn-es",
  "crypto-coins-news",
  "der-tagesspiegel",
  "die-zeit",
  "el-mundo",
  "engadget",
  "entertainment-weekly",
  "espn",
  "espn-cric-info",
  "financial-post",
  "focus",
  "football-italia",
  "fortune",
  "four-four-two",
  "fox-news",
  "fox-sports",
  "globo",
  "google-news",
  "google-news-ar",
  "google-news-au",
  "google-news-br",
  "google-news-ca",
  "google-news-fr",
  "google-news-in",
  "google-news-is",
  "google-news-it",
  "google-news-ru",
  "google-news-sa",
  "google-news-uk",
  "goteborgs-posten",
  "gruenderszene",
  "hacker-news",
  "handelsblatt",
  "ign",
  "il-sole-24-ore",
  "independent",
  "infobae",
  "info-money",
  "la-gaceta",
  "la-nacion",
  "la-repubblica",
  "le-monde",
  "lenta",
  "lequipe",
  "les-echos",
  "liberation",
  "marca",
  "mashable",
  "medical-news-today",
  "msnbc",
  "mtv-news",
  "mtv-news-uk",
  "national-geographic",
  "national-review",
  "nbc-news",
  "news24",
  "new-scientist",
  "news-com-au",
  "newsweek",
  "new-york-magazine",
  "next-big-future",
  "nfl-news",
  "nhl-news",
  "nrk",
  "politico",
  "polygon",
  "rbc",
  "recode",
  "reddit-r-all",
  "reuters",
  "rt",
  "rte",
  "rtl-nieuws",
  "sabq",
  "spiegel-online",
  "svenska-dagbladet",
  "t3n",
  "talksport",
  "techcrunch",
  "techcrunch-cn",
  "techradar",
  "the-american-conservative",
  "the-globe-and-mail",
  "the-hill",
  "the-hindu",
  "the-huffington-post",
  "the-irish-times",
  "the-jerusalem-post",
  "the-lad-bible",
  "the-next-web",
  "the-sport-bible",
  "the-times-of-india",
  "the-verge",
  "the-wall-street-journal",
  "the-washington-post",
  "the-washington-times",
  "time",
  "usa-today",
  "vice-news",
  "wired",
  "wired-de",
  "wirtschafts-woche",
  "xinhua-net",
  "ynet",
];
const list = document.getElementById('source-list');

sources.forEach(source => {
  const div = document.createElement('div');
  div.textContent = source;
  div.className = 'source-item';
  div.onclick = () => loadNews({source});
  list.appendChild(div);
})

function updateDeviceClass() {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.body.classList.add('mobile');
  } else {
    document.body.classList.add('desktop');
  }
}

const sourceList = document.getElementById('source-list-btn');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

leftBtn.addEventListener('click', () => {
  sourceList.scrollLeft -= 200;
});

rightBtn.addEventListener('click', () => {
  sourceList.scrollLeft += 200;
})

const sourceselect = document.querySelectorAll('.source-btn');
sourceselect.forEach(button => {
  button.addEventListener('click', () => {
    const source = button.getAttribute('data-category');
    loadNews({source});
  })
})

const searchIcon = document.querySelector('.search-icon');
const searchPopup = document.getElementById('search-popup');

searchIcon.addEventListener('click', (e) => {
  searchPopup.style.display = 'flex';
  document.body.classList.add('search-active');
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if (!searchPopup.contains(e.target)) {
    searchPopup.style.display = 'none';
    document.body.classList.remove('search-active');
  }
});

const searchBtn = document.querySelector('.search-btn');
const searchPopBtn = document.querySelector('.popup-search-btn');
const searchInput = document.querySelector('.search-input');
const popupSearchInput = document.querySelector('.popup-search-input');

searchBtn.addEventListener('click', () => {
  const q = searchInput.value.trim();
  if (q) loadNews({ q });
  searchInput.value = '';
});


searchPopBtn.addEventListener('click', () => {
  const q = popupSearchInput.value.trim();
  if (q) loadNews({ q });
  popupSearchInput.value = '';
});


searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && searchInput.value.trim() !== '') {
    e.preventDefault();
    searchBtn.click();
  }
});


popupSearchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && popupSearchInput.value.trim() !== '') {
    e.preventDefault();
    searchPopBtn.click();
  }
});
updateDeviceClass();
loadNews({ category: "general" });
updateDropdown();
window.addEventListener("resize", updateDropdown);
window.addEventListener("resize", updateDeviceClass);
