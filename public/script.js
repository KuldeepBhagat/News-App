function loadNews(category) {
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

const  categoryButtons = document.querySelectorAll('.category-btn');
const categoryDropdown = document.querySelector('.category-dropdown');

const categories = [
  { name: 'Health', vlaue: 'health' },
  { name: 'Science', value: 'science' },
  { name: 'Sports', value: 'sports' },
  { name: 'Technology', value: 'technology' },
  { name: 'Business', value: 'business' },
  { name: 'Entertainment', value: 'entertainment' }
];

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const  category = button.getAttribute('data-category');
    loadNews(category);
  })
})

categoryDropdown.addEventListener('change', () => {
  const category = categoryDropdown.value;
  if (category) {
    loadNews(category);
  }
});

function updateDropdown() {
  categoryDropdown.innerHTML = '<option value="">Category</option>';
  let hiddenCount = 0;

  categoryButtons.forEach(button => {
    const rect = button.getBoundingClientRect();
    const isHidden = rect.width === 0 && rect.height === 0;

    if (isHidden) {
      hiddenCount++;
      const category = button.getAttribute('data-category');
      const name = button.textContent;
      const  option = document.createElement('option');
      option.value = category;
      option.textContent = name;
      categoryDropdown.appendChild(option);
    }
  });
  
  if (hiddenCount > 0) {
    categoryDropdown.style.display = 'block';
  } else {
    categoryDropdown.style.display = 'none';
  }
}

loadNews('general');
updateDropdown();
window.addEventListener('resize', updateDropdown);


