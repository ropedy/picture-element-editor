let id = 1;

export const getId = () => id++;

export const paintCanvas = (context, pixels, width, factor) => {
  for (const pixel of pixels) {
    if (pixel.color) {
      const idx = pixels.indexOf(pixel);
      const x = idx % width;
      const y = Math.floor(idx / width);

      context.fillStyle = pixel.color;
      context.fillRect(x * factor, y * factor, factor, factor);
    }
  }
};
