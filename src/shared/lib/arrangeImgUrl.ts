export const arrangeImgUrl = (url: string) =>
  url.startsWith('http') ? url : `/${url}`;
