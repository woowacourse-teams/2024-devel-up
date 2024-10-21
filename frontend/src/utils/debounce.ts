export const debounce = (action: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action();
    }, delay);
  };
};
