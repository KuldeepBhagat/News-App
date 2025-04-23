import express from 'express';
import cors from 'cors';
import NewsAPI from 'newsapi';

const app = express();
const port = 3000;

const newsapi = new NewsAPI('32a810dc939a46b0aa36a50062567064');

app.use(cors());

app.get('/news', async (req, res) => {
  const category = req.query.category || 'technology'; // default is 'technology'

  try {
    const result = await newsapi.v2.topHeadlines({
      language: 'en',
      country: 'us',
      category: category,
    });
    res.json(result.articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
