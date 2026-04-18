const LIFF_ID = "2009684619-bB9WmZCU"; // あなたの LIFF ID
const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwWFhsZW4mSpGBNNiDqBP2zWYq282ViJvtcnXj_qRVNYYvuqGyZgJorCfeMSCZvQCNYHA/exec"; // 新しい exec URL に置き換え

async function init() {
  try {
    await liff.init({ liffId: LIFF_ID });

    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }

    document.getElementById("app").innerText = "LIFF Loaded OK";

    const context = liff.getContext();
    const urlParams = new URLSearchParams(location.search);
    const eventId = urlParams.get("event_id") || "E0001";

    // 例：イベント詳細を取得して表示
    const detail = await callGAS("getEventDetail", { event_id: eventId });
    document.getElementById("app").innerText =
      `${detail.title}\n${detail.date}\n${detail.place}`;
  } catch (e) {
    console.error(e);
    document.getElementById("app").innerText = "Error: " + e.message;
  }
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
