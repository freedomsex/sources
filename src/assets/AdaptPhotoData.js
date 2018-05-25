export default (photo) => {
  const {_links: links} = photo;
  if (links.origin.href) {
    return {
      photo: links.origin.href,
      thumb: links.thumb.href,
      alias: photo.alias,
      height: photo.height,
      width: photo.width,
    };
  }
  return null;
};
