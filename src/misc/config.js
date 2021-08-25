const API_BASE_URL = 'https://api.tvmaze.com';
// DEFINE HERE
export async function apiGet(queryString) {
  const response = await fetch(`${API_BASE_URL}${queryString}`).then(r =>
    r.json()
  );

  return response;
}
//wrapper around this fetch
