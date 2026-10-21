chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'slanglane-decode',
    title: 'Decode slang with SlangLane: "%s"',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'slanglane-decode' || !info.selectionText || !tab?.id) return;
  const text = info.selectionText.trim().slice(0, 500);
  const res = await fetch('https://slanglane.com/api/decode?text=' + encodeURIComponent(text));
  const data = await res.json();
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (payload, query) => {
      const old = document.getElementById('slanglane-tooltip-host');
      if (old) old.remove();
      const host = document.createElement('div');
      host.id = 'slanglane-tooltip-host';
      host.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:2147483647;max-width:400px;width:92vw;font-family:system-ui,-apple-system,sans-serif';
      const shadow = host.attachShadow({ mode: 'open' });
      const matches = payload.matches || [];
      const itemsHtml = matches.length
        ? matches.slice(0, 4).map((m) => '<div style="margin:8px 0;padding-bottom:8px;border-bottom:1px solid #e2e6dc"><a href="https://slanglane.com/terms/' + m.term.slug + '?utm_source=extension" target="_blank" rel="noopener" style="color:#172e24;font-weight:800;font-size:16px;text-decoration:none">' + m.term.term + ' ↗</a> <span style="font-size:11px;background:#daef8b;padding:2px 6px;border-radius:99px">' + m.term.register + '</span><div style="font-size:13px;margin-top:4px;color:#243b31">' + m.term.summary + '</div></div>').join('')
        : '<div style="font-size:13px;margin:8px 0">No documented slang found in selection. <a href="https://slanglane.com/search?q=' + encodeURIComponent(query) + '" target="_blank" style="color:#172e24;font-weight:700">Search on SlangLane ↗</a></div>';
      shadow.innerHTML = '<div style="background:#fff;color:#172e24;border:2px solid #172e24;border-radius:14px;padding:14px 16px;box-shadow:0 10px 28px rgba(0,0,0,.22)"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#4a6356">SLANGLANE DECODER</span><button id="sl-close" style="border:0;background:none;font-size:18px;cursor:pointer;color:#172e24">×</button></div>' + itemsHtml + '<div style="display:flex;justify-content:space-between;font-size:12px;margin-top:8px"><a href="https://slanglane.com/roast?text=' + encodeURIComponent(query) + '" target="_blank" style="color:#172e24;font-weight:700">Corporate ↔ Gen Z ↗</a><a href="https://slanglane.com/esl?utm_source=extension" target="_blank" style="color:#172e24;font-weight:700">ESL Teacher Kit ↗</a></div></div>';
      document.body.appendChild(host);
      shadow.getElementById('sl-close').onclick = () => host.remove();
    },
    args: [data, text],
  });
});
