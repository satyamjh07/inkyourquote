const gradients = [
  { label: 'Ocean', value: '#4f46e5|#0ea5e9|#22d3ee' },
  { label: 'Sunset', value: '#f97316|#ef4444|#ec4899' },
  { label: 'Forest', value: '#14532d|#16a34a|#84cc16' },
  { label: 'Midnight', value: '#020617|#1e293b|#334155' }
];

const fonts = ['Inter', 'Poppins', 'Merriweather', 'Playfair Display', 'Space Grotesk'];

export default function ControlsPanel({ settings, categories, onChange, onUpload }) {
  return (
    <section className="glass grid gap-4 rounded-2xl p-4 md:grid-cols-2">
      <label className="flex flex-col gap-1">
        Category
        <select value={settings.category} onChange={(e) => onChange({ category: e.target.value })}>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-slate-900">
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        Font
        <select value={settings.fontFamily} onChange={(e) => onChange({ fontFamily: e.target.value })}>
          {fonts.map((font) => (
            <option key={font} value={font} className="bg-slate-900">
              {font}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        Background gradient
        <select
          value={settings.gradient}
          onChange={(e) => onChange({ gradient: e.target.value, backgroundImage: '' })}
        >
          {gradients.map((gradient) => (
            <option key={gradient.value} value={gradient.value} className="bg-slate-900">
              {gradient.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        Background image
        <input type="file" accept="image/*" onChange={onUpload} />
      </label>

      <label className="flex flex-col gap-1">
        Vertical align
        <select value={settings.alignment} onChange={(e) => onChange({ alignment: e.target.value })}>
          <option className="bg-slate-900" value="top">
            Top
          </option>
          <option className="bg-slate-900" value="center">
            Center
          </option>
          <option className="bg-slate-900" value="bottom">
            Bottom
          </option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        Watermark
        <input
          type="text"
          maxLength={50}
          value={settings.watermark}
          onChange={(e) => onChange({ watermark: e.target.value })}
          placeholder="@yourhandle"
        />
      </label>
    </section>
  );
}
