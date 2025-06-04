function loadNews(parmas = {}) {
  let query = "";
  if (parmas.source) {
    query = `source=${parmas.source}`;
  } else if (parmas.category) {
    query = `category=${parmas.category}`;
  } else if (parmas.q) {
    query = `q=${parmas.q}`;
  }

  fetch(`/api/news?${query}&pageSize=30`)
    .then((res) => res.json())
    .then((result) => {
      const container = document.getElementById("news-container");
      container.scrollTop = 0;
      container.innerHTML = "";
      const Articles = result.articles;
      Articles.forEach((article) => {
        const div = document.createElement("div");
        div.className = "news-items";
        div.innerHTML = `
          <h1>${article.title}</h1>
          <p class='author'>Author: <b>${article.author}</b></p>
          <p> Published At: ${new Date(
            article.publishedAt
          ).toLocaleString()}</p>
          <p class='description'>${article.description}</p>
          <img src="${article.urlToImage}" class='news-image'>
          <p class='news-content'>${article.content}</p> 
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

function loadNewsLayout() {
  fetch(`/api/news?source=news24&pageSize=30`) // main Thumbnail
    .then((res) => res.json())
    .then((result) => {
      const newsthumbnail = document.getElementById("main-thumbnail");
      const Articles = result.articles;
      let i = 0;
      for (i = 0; i < 5; i++) {
        if (Articles[i].urlToImage) {
          break;
        }
        console.log("image not found");
      }
      newsthumbnail.innerHTML = `
      <img src="${Articles[i].urlToImage}" class='news-image'>
      <a href="${Articles[i].url}" target="_blank"><h2>${Articles[i].title}</h2></a>`;
    });

  fetch(`/api/news?source=the-times-of-india&pageSize=30`) // right next to main thumbnail
    .then((res) => res.json())
    .then((result) => {
      const seactionBlock2 = document.getElementById("section1-block2");
      const MobileseactionBlock2 = document.getElementById(
        "mobile-section1-block2"
      );
      const Articles = result.articles;

      Articles.forEach((article) => {
        const div = document.createElement("div");
        div.classList.add("sectionBlock2-content");
        div.innerHTML = `
                <a href=${article.url} target='_blank'><h2>${article.title}</h2></a>
                <p>${article.description}`;
        seactionBlock2.appendChild(div);
      });
      Articles.forEach((article) => {
        const div = document.createElement("div");
        div.classList.add("mobilesectionBlock2-content");
        div.innerHTML = `
                <a href=${article.url} target='_blank'><h2>${article.title}</h2></a>
                <p>${article.description}`;
        MobileseactionBlock2.appendChild(div);
      });
    });
  fetch(`/api/news?source=cnn&pageSize=30`)
    .then((res) => res.json())
    .then((result) => {
      const thumbnailFooter = document.getElementById("main-thumbnail-footer");
      const Articles = result.articles;

      Articles.forEach((article) => {
        const div = document.createElement("div");
        div.classList.add("thumbnai-footer");
        div.innerHTML = `
                <img src = "${article.urlToImage}">
                <div><a href=${article.url} target='_blank'><h2>${article.title}</h2></a>
                </div>`;
        thumbnailFooter.appendChild(div);
      });
    });
}

function updateDeviceClass() {
  /*Different classes for mobile and pc */
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.add("desktop");
  }
}

const slider = document.getElementById("options"); /* slide menu */
const menu = document.getElementById("slide-menu");
const close = document.getElementById("slide-menu-close");
const overlay = document.getElementById("overlay");
slider.addEventListener("click", () => {
  menu.classList.add("active");
  overlay.classList.add("dim");
});
close.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("dim");
});

const signInPage = document.getElementById("sign-in-page"); // mobile sign In page
const signInBtn = document.getElementById("sign-in");
const signInClose = document.getElementById("close-sign-in");
signInBtn.addEventListener("click", () => {
  signInPage.classList.add("active");
});
signInClose.addEventListener("click", () => {
  signInPage.classList.remove("active");
});

const pcsignin = document.getElementById("signinpc");
pcsignin.addEventListener("click", () => {
  signInPage.classList.add("active");
});

const searchIcon = document.getElementById("search-icon"); //Search option
const searchIconPc = document.getElementById("pc-search-icon");
const searchbar = document.getElementById("searchbar");
const searchbarclose = document.getElementById("searchbar-close");
const inputbtn = document.getElementById("input-box");
searchIcon.addEventListener("click", () => {
  searchbar.classList.add("show");
  document.getElementById("input-box").focus();
});
searchIconPc.addEventListener("click", () => {
  searchbar.classList.add("show");
  document.getElementById("input-box").focus();
});
searchbarclose.addEventListener("click", () => {
  inputbtn.value = "";
  searchbar.classList.remove("show");
});

inputbtn.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    const keyword = inputbtn.value.trim();
    if (keyword) {
      const encodedKey = encodeURIComponent(keyword);
      window.location.href = `headline.html?q=${encodedKey}`;
    }
  }
});

function getAmPm(time) {
  time = time % 24;
  const hours = time % 12 || 12;
  const period = time >= 12 ? "PM" : "AM";
  return { hours: hours, period: period };
}
const D = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const fulldate = `${days[D.getDay()]}, ${
  months[D.getMonth()]
} ${D.getDate()} ${D.getFullYear()}
                   | ${getAmPm(D.getHours()).hours}:${D.getMinutes()}${
  getAmPm(D.getHours()).period
} IST`;
const datePc = document.getElementById("date");
const dateMobile = document.getElementById("date-mobile");
const p = document.createElement("p");
p.innerHTML = fulldate;
datePc.appendChild(p);
dateMobile.appendChild(p.cloneNode(true));

const trendingNews = [
  "India-Pak Tensions Persist",
  "India on Pak Nukes at UN",
  "Terrorists Killed in J&K",
  "S. Asian Political Shifts",
  "Asian Economic Trends",
  "China-Japan Island Dispute",
  "New Aus Govt Settles",
  "Regional Security Concerns",
  "Asian Domestic Politics",
  "Asia's Tech & Economy",
  "Monsoon Season Approaches South Asia",
  "Heatwave Concerns in Parts of India",
  "Sri Lanka Economic Recovery Efforts",
  "Bangladesh Infrastructure Projects Advance",
  "Nepal Focuses on Tourism Revival",
  "Developments in Afghanistan Peace Talks",
  "South Korea Tech Sector Growth",
  "Japan's Economic Policies in Focus",
  "Southeast Asia Trade Agreements",
  "Cybersecurity Concerns Across Asia",
];

const trendingNewsContainer = document.getElementById(
  "trending-news-container"
); // Trending News
trendingNews.forEach((value) => {
  const p = document.createElement("p");
  p.innerHTML = value;
  trendingNewsContainer.appendChild(p);
});
const trendingLeft = document.getElementById("trending-btn-left");
const trendingRight = document.getElementById("trending-btn-right");

trendingLeft.addEventListener("click", () => {
  trendingNewsContainer.scrollLeft -= 200;
});
trendingRight.addEventListener("click", () => {
  trendingNewsContainer.scrollLeft += 200;
});

const sourceScrollLeft = document.getElementById("news-source-scrollbtn-left"); // News Source
const sourceScrollRight = document.getElementById(
  "news-source-scrollbtn-right"
);
const NewsSourceContainer = document.getElementById("news-source-container");

function ScrollUpdate() {                                                               // News source scroll function
 
  const left = NewsSourceContainer.scrollLeft;
  const leftOver =
    NewsSourceContainer.scrollWidth - NewsSourceContainer.clientWidth;

  if (left <= 0) {
    sourceScrollLeft.classList.add("disable");
  } else {
    sourceScrollLeft.classList.remove("disable");
  }

  if (left >= leftOver - 1) {
    sourceScrollRight.classList.add("disable");
  } else {
    sourceScrollRight.classList.remove("disable");
  }
}

sourceScrollLeft.addEventListener("click", () => {
  NewsSourceContainer.scrollBy({ left: -500 });
});
sourceScrollRight.addEventListener("click", () => {
  NewsSourceContainer.scrollBy({ left: 500 });
});
NewsSourceContainer.addEventListener("scroll", ScrollUpdate);
ScrollUpdate();

const embed = {
  frame1: `<iframe
              allowfullscreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              frameborder="Yes"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              width="800"
              height="450"
              src="https://video-api.wsj.com/api-video/player/v3/iframe.html?guid=0CAAA434-A15F-4EAB-8AAC-159C082A85E3"
            ></iframe>`,

  frame2: `<iframe allowfullscreen="true"
  webkitallowfullscreen="true"
  mozallowfullscreen="true"
  frameborder="0"
  scrolling="no"
  marginheight="0"
  marginwidth="0"
  width="800"
  height="450"
  src="https://video-api.wsj.com/api-video/player/v3/iframe.html?guid=72235A31-5BCF-473A-B0BD-29A5D7163709"></iframe>`,

  frame3: `<iframe allowfullscreen="true"
  webkitallowfullscreen="true"
  mozallowfullscreen="true"
  frameborder="0"
  scrolling="no"
  marginheight="0"
  marginwidth="0"
  width="800"
  height="450"
  src="https://video-api.wsj.com/api-video/player/v3/iframe.html?guid=DC2FFC8C-AEB4-41E2-A68A-061796406AC9"></iframe>`,
};
const highlight = {
  frame1: "translateX(0px)", // Video Embed functions
  frame2: "translateX(280px)",
  frame3: "translateX(550px)",
};
const embedContainer = document.getElementById("video-embed-main");
const embedBtn = document.querySelectorAll(".video-embed-footer h4");
const highlighter = document.querySelector(".embed-highlighter");
embedBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    highlighter.style.transform = `${highlight[value]}`;
    embedContainer.innerHTML = embed[value];
  });
});

const sportsbtn = document.querySelectorAll(".sports-content-header button"); // Sports section
sportsbtn.forEach((button) => {
  button.addEventListener("click", () => {
    sportsbtn.forEach((btn) => btn.classList.remove("active-option"));
    button.classList.add("active-option");
    const fetchData = button.dataset.value;
    fetch(`/api/sports?option=${fetchData}`)
      .then((res) => res.json())
      .then((data) => {
        const left = data.leftContent;
        const right = data.rightContent;
        const footer = data.footer;
        const leftdiv = document.getElementById("sports-main-content-left");
        const rightdiv = document.getElementById("sports-main-content-right");
        const htmlfooter = document.getElementById("sports-content-footer");
        leftdiv.innerHTML = left;
        rightdiv.innerHTML = right;
        htmlfooter.innerHTML = footer;
      })
      .catch((err) => console.error("Error:", err));
  });
});

let index = null;
let Story_data = {};
async function loadWebstorydata(id, field) {                                                  //Webstory section
  const res = await fetch(
    `/api/webstory?id=${id}&field=${field}`
  );
  const data = await res.json();
  const meta_data = data.meta_data;

  async function processStory(meta_data) {
    const webstory = document.getElementById("webstories-content-container");
    for (const story of meta_data) {
      const res = await fetch(`/api/webstory?id=${story}`);
      const data = await res.json();
      Story_data[story] = data;

      const div = document.createElement("div");
      div.classList.add("webstories-content");
      div.dataset.value = `${story}`;
      div.innerHTML = `
                      <img src="${data.image_1.url}" class="webstory-background-image" alt="Background" draggable="false" />
                      <div class="webstory-foreground-image">
                        <img src="${data.image_1.url}" alt="Foreground" draggable="false" />
                        <h2>${data.story_description}</h2>
                      </div>
                      <div class="webstory-active-image">
                        <button class="webstory_btn_left">‹</button>
                        <div>
                           <div class="progress-bar"></div>
                           <img src="${data.image_1.url}" alt="Foreground" draggable="false" />
                           <div class="foreground-description">
                             <h3>${data.image_1.title}</h3>
                             <h5>${data.image_1.description}</h5>
                           </div>
                        </div>
                        <button class="webstory_btn_right">›</button>
                      </div>`;
      webstory.appendChild(div);
    }
  }
  await processStory(meta_data);
  WebstoryScrollUpdate()

  const webstory = document.querySelectorAll(
    ".webstories-content-container .webstories-content"
  ); 
  const webstory_close = document.getElementById("webstories-content-close");

  webstory.forEach((content) => {
    const webstory_background = content.querySelector(
        ".webstory-background-image"
      );
    const frontend = content.querySelector(".webstory-active-image");
    const webstoryBtnLeft = content.querySelector('.webstory_btn_left');
    const webstoryBtnRight = content.querySelector('.webstory_btn_right');
    const imageElement = frontend.querySelector('div img');
    const headingElement = frontend.querySelector('div h3');
    const descriptionElement = frontend.querySelector('div h5');
    const FrontendDescription = content.querySelector('.foreground-description');
    const progressBar = content.querySelector('.progress-bar')
    const id = content.dataset.value
    const story_count = parseInt(Story_data[id][`story_count`]);
    for(let bar = 1; bar <= story_count; bar++) {
      const div = document.createElement('div');
      div.dataset.value = `${bar}`;
      progressBar.appendChild(div);
    }
    content.addEventListener("click", () => {
      const FirstActiveBar = progressBar.querySelector('div')
      webstory_background.classList.add("active");
      frontend.classList.add("active");
      webstory_close.classList.add("active");
      FrontendDescription.offsetHeight;
      FrontendDescription.classList.add("active");
      FirstActiveBar.classList.add('active')
      document.body.style.overflow = "hidden";
    });
    webstory_close.addEventListener('click', () => {
      const FirstActiveBar = progressBar.querySelector('div')
      webstory_background.classList.remove('active');
      frontend.classList.remove('active');
      webstory_close.classList.remove('active')
      FrontendDescription.classList.remove("active");
      FirstActiveBar.classList.remove('active')
      document.body.style.overflow = "visible";
      index = null;
      const id = content.dataset.value;
      const imageData = Story_data[id][`image_1`];
      const headingData = Story_data[id][`image_1`];
      const descriptionData = Story_data[id][`image_1`];
      imageElement.src = imageData.url;
      headingElement.innerHTML = headingData.title;
      descriptionElement.innerHTML = descriptionData.description;
    })
    webstoryBtnRight.addEventListener('click', (e) => {
      e.stopPropagation();
      if(index === null) {
        index = 2;
      }else if(index < 5) {
        index += 1;
      }else if(i == 5) {
        return;
      }

      const allbars = progressBar.querySelectorAll('div');
      allbars.forEach(bar => bar.classList.remove('active'));
      
      const CurrentBar = progressBar.querySelector(`div[data-value="${index}"]`);
      if(CurrentBar) {
        CurrentBar.classList.add('active')
      }

      const imageData = Story_data[id][`image_${index}`];
      const headingData = Story_data[id][`image_${index}`];
      const descriptionData = Story_data[id][`image_${index}`];

      imageElement.src = imageData.url;
      headingElement.innerHTML = headingData.title;
      descriptionElement.innerHTML = descriptionData.description;

      FrontendDescription.classList.remove('active');
      void FrontendDescription.offsetHeight; 
      FrontendDescription.classList.add('active');
    })
    webstoryBtnLeft.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = content.dataset.value;
      if(index > 1) {
        index -= 1;
      }else if(index < 1) {
        return;
      }

      const allbars = progressBar.querySelectorAll('div');
      allbars.forEach(bar => bar.classList.remove('active'));

      const CurrentBar = progressBar.querySelector(`div[data-value="${index}"]`);
      if(CurrentBar) {
        CurrentBar.classList.add('active')
      }

      const imageData = Story_data[id][`image_${index}`];
      const headingData = Story_data[id][`image_${index}`];
      const descriptionData = Story_data[id][`image_${index}`];

      imageElement.src = imageData.url;
      headingElement.innerHTML = headingData.title;
      descriptionElement.innerHTML = descriptionData.description;

      FrontendDescription.classList.remove('active');
      void FrontendDescription.offsetHeight; 
      FrontendDescription.classList.add('active');
    })
  });
}
loadWebstorydata("meta", "meta_data");

const Webstory = document.getElementById('webstories-content-container');
const WebstoryBtnRight = document.getElementById('webstory-scroll-right')
const WebstoryBtnLeft = document.getElementById('webstory-scroll-left')

function WebstoryScrollUpdate() {                                                               // News source scroll function
 
  const left = Webstory.scrollLeft;
  const leftOver =
    Webstory.scrollWidth - Webstory.clientWidth;

  if (left <= 0) {
    WebstoryBtnLeft.classList.add("disable");
  } else {
    WebstoryBtnLeft.classList.remove("disable");
  }

  if (left >= leftOver - 1) {
    WebstoryBtnRight.classList.add("disable");
  } else {
    WebstoryBtnRight.classList.remove("disable");
  }
}

WebstoryBtnLeft.addEventListener("click", () => {
  Webstory.scrollBy({ left: -400 });
});
WebstoryBtnRight.addEventListener("click", () => {
  Webstory.scrollBy({ left: 400 });
});
Webstory.addEventListener("scroll", WebstoryScrollUpdate);
WebstoryScrollUpdate()

document.addEventListener("DOMContentLoaded", updateDeviceClass);
loadNewsLayout();
loadNews({ q: "india" });

