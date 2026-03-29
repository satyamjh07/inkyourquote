import { useEffect } from 'react';
import ControlsPanel from './components/ControlsPanel';
import FavoritesList from './components/FavoritesList';
import QuoteCard from './components/QuoteCard';
import { useQuoteEngine } from './hooks/useQuoteEngine';
import { downloadCardAsPng } from './services/exportService';

const fontHref = (font) =>
  `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font).replaceAll('%20', '+')}:wght@400;500;700&display=swap`;

export default function App() {
  const {
    currentQuote,
    settings,
    categories,
    favorites,
    isFavorite,
    loading,
    nextQuote,
    toggleFavorite,
    updateSettings,
    selectQuote
  } = useQuoteEngine();

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontHref(settings.fontFamily);
    document.head.append(link);
    return () => document.head.removeChild(link);
  }, [settings.fontFamily]);

  function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateSettings({ backgroundImage: reader.result || '' });
    reader.readAsDataURL(file);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-white md:text-5xl">InkyourQuote</h1>
        <p className="text-slate-200">Generate, style, save, and export quote cards — even offline.</p>
      </header>

      <ControlsPanel settings={settings} categories={categories} onChange={updateSettings} onUpload={handleUpload} />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="space-y-4">
          <QuoteCard quote={currentQuote} settings={settings} />
          <div className="flex flex-wrap gap-2">
            <button className="bg-indigo-500" onClick={nextQuote} disabled={loading}>
              {loading ? 'Loading…' : 'New Quote'}
            </button>
            <button className="bg-emerald-600" onClick={toggleFavorite}>
              {isFavorite ? 'Remove Favorite' : 'Save Favorite'}
            </button>
            <button className="bg-cyan-600" onClick={() => downloadCardAsPng({ quote: currentQuote, style: settings })}>
              Download PNG
            </button>
          </div>
        </section>

        <aside className="glass rounded-2xl p-4">
          <h2 className="mb-3 text-lg font-semibold">Favorites</h2>
          <FavoritesList favorites={favorites} onSelect={selectQuote} />
        </aside>
      </div>
    </main>
  );
}
