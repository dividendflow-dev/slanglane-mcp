document.getElementById('go').addEventListener('click', async () => {
  const q = document.getElementById('q').value.trim();
  const out = document.getElementById('out');
  if (!q) return;
  out.textContent = 'Checking SlangLane…';
  try {
    const r = await fetch('https://slanglane.com/api/decode?text=' + encodeURIComponent(q));
    const d = await r.json();
    if (!d.matches || !d.matches.length) {
      out.innerHTML = 'No documented slang match. <a href="https://slanglane.com/search?q=' + encodeURIComponent(q) + '" target="_blank">Search dictionary ↗</a>';
      return;
    }
    out.innerHTML = d.matches.map((m) => '<div style="margin:6px 0;padding:6px;background:#fff;border:1px solid #172e24;border-radius:8px"><b><a href="https://slanglane.com/terms/' + m.term.slug + '" target="_blank" style="color:#172e24">' + m.term.term + ' ↗</a></b> (' + m.term.register + ')<br>' + m.term.summary + '</div>').join('');
  } catch (e) {
    out.textContent = 'Error connecting to SlangLane.';
  }
});
