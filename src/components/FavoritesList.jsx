export default function FavoritesList({ favorites, onSelect }) {
  if (!favorites.length) {
    return <p className="text-sm text-slate-300">No favorites yet. Save quotes you like for later.</p>;
  }

  return (
    <ul className="space-y-2">
      {favorites.slice(0, 8).map((quote) => (
        <li key={`${quote.text}-${quote.author}`}>
          <button className="w-full text-left" onClick={() => onSelect(quote)}>
            <p className="truncate text-sm text-white">{quote.text}</p>
            <p className="text-xs text-slate-300">— {quote.author}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
