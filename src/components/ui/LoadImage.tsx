export const loadImage = (setImageDimensions: any, imageUrl: string) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImageDimensions({
      height: img.height,
      width: img.width,
    });
  };
  img.onerror = (err) => {
    console.log("img error");
    console.error(err);
  };
};
