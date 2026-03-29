export default function QuoteCard({ quote, settings }) {
  const justify = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end'
  }[settings.alignment];

  const cardStyle = settings.backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(3,7,18,0.35), rgba(3,7,18,0.5)), url(${settings.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: settings.fontFamily
      }
    : {
        backgroundImage: `linear-gradient(135deg, ${settings.gradient.split('|').join(', ')})`,
        fontFamily: settings.fontFamily
      };

  return (
    <article
      className={`glass relative flex min-h-[430px] w-full flex-col ${justify} justify-center overflow-hidden rounded-2xl p-8 transition-all duration-500`}
      style={cardStyle}
    >
      <div className="w-full max-w-2xl space-y-4">
        <p className="text-2xl font-semibold leading-relaxed text-white md:text-4xl">“{quote.text}”</p>
        <p className="text-base text-slate-100 md:text-xl">— {quote.author}</p>
        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wider text-white/90">
          {quote.category}
        </span>
      </div>
      {settings.watermark && (
        <p className="absolute bottom-4 right-5 text-xs text-white/80">{settings.watermark}</p>
      )}
    </article>
  );
}
