



// export const BASE_URL = 'http://127.0.0.1:5001/api/smart-clock';
// export const BASE_URL = 'https://hutpi.local:5001/api/smart-clock';
export const BASE_URL = 'https://ahut.site:8080/api/smart-clock';


export const API_PATHS = {
  tempInfo: '/temperature-humidity',
  tempHistory: '/temperature-humidity/history',
  surroundingsHistory: '/surroundings/history',
};

export async function fetchTempInfo() {
  const response = await fetch(`${BASE_URL}${API_PATHS.tempInfo}`);
  if (!response.ok) throw new Error('网络响应不正常');
  return response.json();
}

export async function fetchTempHistory() {
  const response = await fetch(`${BASE_URL}${API_PATHS.tempHistory}`);
  if (!response.ok) throw new Error('网络响应不正常');
  return response.json();
}