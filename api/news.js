<<<<<<< HEAD
import NewsAPI from 'newsapi';
import dotenv from 'dotenv';

dotenv.config();
const newsapi = new NewsAPI(process.env.NEWS_API);

export default async function handler(req, res) {
  const category = req.query.category;
  const source = req.query.source;
  const q = req.query.q;
  const page = req.query.pageSize;

  try {
    let result;
    if (source) {
      result = await newsapi.v2.topHeadlines({
        sources: source,
        pageSize: page,
      });
    } else if (category) {
      result = await newsapi.v2.topHeadlines({
        category: category,
        pageSize: page,
      })
    }
    else if (q) {
      result = await newsapi.v2.topHeadlines({
        q: q,
        pageSize: page,   
      })
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
=======
import NewsAPI from 'newsapi';
import dotenv from 'dotenv';

dotenv.config();
const newsapi = new NewsAPI(process.env.NEWS_API);

export default async function handler(req, res) {
const category = req.query.category;
  const source = req.query.source;
  const q = req.query.q;
  const page = req.query.pageSize;

  try {
    let result;
    if (source) {
      result = await newsapi.v2.topHeadlines({
        sources: source,
        pageSize: page,
      });
    } else if (category) {
      result = await newsapi.v2.topHeadlines({
        category: category,
        pageSize: page,
      })
    }
    else if (q) {
      result = await newsapi.v2.topHeadlines({
        q: q,
        pageSize: page,   
      })
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
>>>>>>> 62e19712be86fec6cdb8a541160a4b23bb82fbca
