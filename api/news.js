import NewsAPI from 'newsapi';

const newsapi = new NewsAPI('32a810dc939a46b0aa36a50062567064');

export default async function handler(req, res) {
  const category = req.query.category;
  const source = req.query.source;
  const q = req.query.q;

  try {
    let result;
    if (source) {
      result = await newsapi.v2.topHeadlines({
        sources: source,
      });
    } else if (category) {
      result = await newsapi.v2.topHeadlines({
        category: category,
      })
    }
    else if (q) {
      result = await newsapi.v2.topHeadlines({
        q: q,
      })
    }

    res.json(result.articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
