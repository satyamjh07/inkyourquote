export async function downloadCardAsPng({ quote, style }) {
  const width = 1080;
  const height = 1080;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  if (style.backgroundImage) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = style.backgroundImage;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    context.drawImage(img, 0, 0, width, height);
    context.fillStyle = 'rgba(0,0,0,0.35)';
    context.fillRect(0, 0, width, height);
  } else {
    const gradient = context.createLinearGradient(0, 0, width, height);
    style.gradient.split('|').forEach((color, idx, arr) => {
      gradient.addColorStop(idx / Math.max(arr.length - 1, 1), color);
    });
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  context.fillStyle = 'rgba(255,255,255,0.15)';
  context.fillRect(40, 40, width - 80, height - 80);

  context.fillStyle = 'white';
  context.font = `700 58px ${style.fontFamily}`;
  context.textAlign = 'left';

  const maxTextWidth = width - 180;
  const wrappedLines = wrapText(context, `“${quote.text}”`, maxTextWidth);

  let startY = 260;
  if (style.alignment === 'center') startY = (height - wrappedLines.length * 74) / 2;
  if (style.alignment === 'bottom') startY = height - wrappedLines.length * 74 - 260;

  wrappedLines.forEach((line, i) => {
    context.fillText(line, 90, startY + i * 74);
  });

  context.font = `500 42px ${style.fontFamily}`;
  context.fillStyle = 'rgba(255,255,255,0.95)';
  context.fillText(`— ${quote.author}`, 90, startY + wrappedLines.length * 74 + 70);

  if (style.watermark?.trim()) {
    context.font = `500 30px ${style.fontFamily}`;
    context.fillStyle = 'rgba(255,255,255,0.7)';
    context.textAlign = 'right';
    context.fillText(style.watermark, width - 70, height - 60);
  }

  const link = document.createElement('a');
  link.download = `quote-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function wrapText(context, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i += 1) {
    const candidate = `${currentLine} ${words[i]}`;
    if (context.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}
