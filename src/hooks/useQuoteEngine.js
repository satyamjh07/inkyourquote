import { useEffect, useMemo, useState } from 'react';
import { fetchApiQuote, getCategories, getRandomLocalQuote } from '../services/quotesService';
import { readFavorites, readSettings, saveFavorites, saveSettings } from '../services/storage';

const defaultSettings = {
  category: 'All',
  fontFamily: 'Inter',
  gradient: '#4f46e5|#0ea5e9|#22d3ee',
  backgroundImage: '',
  alignment: 'center',
  watermark: ''
};

export function useQuoteEngine() {
  const [settings, setSettings] = useState(() => readSettings(defaultSettings));
  const [currentQuote, setCurrentQuote] = useState(() => getRandomLocalQuote(settings.category));
  const [favorites, setFavorites] = useState(() => readFavorites());
  const [loading, setLoading] = useState(false);

  const categories = useMemo(() => getCategories(), []);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const isFavorite = favorites.some((fav) => fav.text === currentQuote?.text);

  async function nextQuote() {
    setLoading(true);
    const local = getRandomLocalQuote(settings.category);
    setCurrentQuote(local);

    const apiQuote = await fetchApiQuote();
    if (apiQuote && settings.category === 'All') {
      setCurrentQuote(apiQuote);
    }
    setLoading(false);
  }

  function toggleFavorite() {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.text === currentQuote.text);
      if (exists) return prev.filter((fav) => fav.text !== currentQuote.text);
      return [currentQuote, ...prev].slice(0, 100);
    });
  }

  function updateSettings(patch) {
    setSettings((prev) => ({ ...prev, ...patch }));
  }

  useEffect(() => {
    setCurrentQuote(getRandomLocalQuote(settings.category));
  }, [settings.category]);

  function selectQuote(quote) {
    setCurrentQuote(quote);
  }

  return {
    currentQuote,
    settings,
    favorites,
    categories,
    isFavorite,
    loading,
    nextQuote,
    toggleFavorite,
    updateSettings,
    selectQuote
  };
}
