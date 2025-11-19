// const API_BASE_URL = "https://gnews.io/api/v4/";
// const API_KEY = "c010ad7b97c2e9b11d64507305952d9e";

export async function getTopNews() {
  const url = `https://rss.app/feeds/v1.1/8pn1E3Yx2PUufYkS.json`;

  const response = await fetch(url);

  const responseJSON = await response.json();

  return responseJSON;
}
