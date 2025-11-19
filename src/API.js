export async function getTopNews(feedUrl) {
  const response = await fetch(feedUrl);

  const responseJSON = await response.json();

  return responseJSON;
}
