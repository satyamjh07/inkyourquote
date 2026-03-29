import localQuotes from '../data/quotes.json';

const FALLBACK_API = 'https://api.quotable.io/random';

export async function fetchApiQuote() {
  try {
    const response = await fetch(FALLBACK_API, { cache: 'no-store' });
    if (!response.ok) return null;

    const payload = await response.json();
    return {
      id: `api-${payload._id}`,
      text: payload.content,
      author: payload.author,
      category: payload.tags?.[0] || 'Inspiration',
      fromApi: true
    };
  } catch {
    return null;
  }
}

export function getAllQuotes() {
  return localQuotes;
}

export function getCategories() {
  return ['All', ...new Set(localQuotes.map((quote) => quote.category))];
}

export function getRandomLocalQuote(category = 'All') {
  const source = category === 'All' ? localQuotes : localQuotes.filter((quote) => quote.category === category);
  const usable = source.length ? source : localQuotes;
  return usable[Math.floor(Math.random() * usable.length)];
}
