const getPlaceholderImg = (width: number, height: number, text?: string) => {
  return `https://placehold.co/600x400?text=${text ? text : `${width} X ${height}`}`;
};

export default getPlaceholderImg;
