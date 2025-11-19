const API_BASE_URL = "https://gnews.io/api/v4/";
const API_KEY = "c010ad7b97c2e9b11d64507305952d9e";

export async function getTopNews() {
  const url = `${API_BASE_URL}/top-headlines?max=10&apikey=${API_KEY}&lang=de&country=de`;

  const response = await fetch(url);

  const responseJSON = await response.json();

  return responseJSON;
}
