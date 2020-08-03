export const isLight = color => {
  if (!color) {
    return true;
  }

  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);

  return 382 > red + green + blue;
};
