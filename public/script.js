function loadNews(category = 'technology') {
  fetch(`/api/news?category=${category}`)
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
        `;
        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}
const health = document.getElementById('health');
health.addEventListener('click', () => {
  loadNews('health');
})
