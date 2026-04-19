const LIFF_ID = "2009684619-bB9WmZCU";
const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbw2cuKvELQMJNc05dugyKEh-HK00ZFHNF-vYQ3XLtYvxVaL5nJU8uFo0q_hz2MRGukZaw/exec";

async function init() {
  await liff.init({ liffId: LIFF_ID });

  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  document.getElementById("app").innerText = "LIFF Loaded OK";

  const detail = await callGAS("getEventDetail", { event_id: "E0001" });
  document.getElementById("app").innerText = JSON.stringify(detail, null, 2);
}

async function callGAS(action, payload) {
  const res = await fetch(GAS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
  });
  return await res.json();
}

init();
