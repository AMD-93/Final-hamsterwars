function fixUrl(url: string): string {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:1337" + url;
  } else {
    return url;
  }
}
export { fixUrl };

function hamsterPics(imgName: string) {
  if (imgName.startsWith("https")) {
    return imgName;
  } else {
    return fixUrl(`/hamsters/${imgName}`);
  }
}
export { hamsterPics };
