import NewsAPI from 'newsapi';

const newsapi = new NewsAPI('32a810dc939a46b0aa36a50062567064');

export default async function handler(req, res) {
  const category = req.query.category || 'technology';

  try {
    const result = await newsapi.v2.topHeadlines({
      language: 'en',
      country: 'us',
      category,
    });

    res.status(200).json(result.articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
