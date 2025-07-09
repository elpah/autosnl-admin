export const handleScrollToTop = () => {
  if (document.documentElement.scrollTop !== undefined) {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
};
