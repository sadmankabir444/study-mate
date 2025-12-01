// client/src/api/partnerApi.js

export async function getTopPartners() {
  const res = await fetch("http://localhost:5000/top-partners");
  const data = await res.json();
  return data;
}
