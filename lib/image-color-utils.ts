export function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export function isTooLight(r: number, g: number, b: number) {
  return (r + g + b) / 3 > 238;
}

export function isTooDark(r: number, g: number, b: number) {
  return (r + g + b) / 3 < 18;
}

export function groupSimilarColors(r: number, g: number, b: number) {
  const bucket = 32;
  return rgbToHex(
    Math.round(r / bucket) * bucket,
    Math.round(g / bucket) * bucket,
    Math.round(b / bucket) * bucket
  );
}

export function getDominantColors(data: Uint8ClampedArray, maxColors = 8) {
  const counts = new Map<string, number>();
  for (let i = 0; i < data.length; i += 24) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 180 || isTooLight(r, g, b) || isTooDark(r, g, b)) continue;
    const grouped = groupSimilarColors(r, g, b);
    counts.set(grouped, (counts.get(grouped) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => color)
    .slice(0, maxColors);
}

export async function extractColorsFromImage(file: File): Promise<{ colors: string[]; previewUrl: string }> {
  const previewUrl = URL.createObjectURL(file);
  const image = new Image();
  image.crossOrigin = "anonymous";

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = previewUrl;
  });

  const canvas = document.createElement("canvas");
  const maxSize = 220;
  const ratio = Math.min(maxSize / image.width, maxSize / image.height, 1);
  canvas.width = Math.max(1, Math.round(image.width * ratio));
  canvas.height = Math.max(1, Math.round(image.height * ratio));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available.");

  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  return { colors: getDominantColors(imageData.data), previewUrl };
}
