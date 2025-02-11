const BASE_URL = "https://api.fr.stg.shipglobal.in/api/v1/orders/";
const API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMDggMTY6NTM6MzQuOTI4NjA0IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMCAxNjo1MzozNC45Mjg2MDciLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjM1MWM1NDBhLWY4YTEtNDhjMy1hNWIyLTk5MmM2MDg1OGY4NSIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.hFbb_XIYMSl_APZF0SdTwYkrnMJDOphtkerCyk2LF5s";

export async function fetchAPI(
  endpoint: string,
  method: string = "POST",
  body?: object
) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}
