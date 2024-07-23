const getPlaceholderImg = (width: number, height: number, text?: string) => {
  return `https://placehold.co/${width}x${height}?text=${text ? text : `${width} X ${height}`}`;
};

export default getPlaceholderImg;
