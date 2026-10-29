'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('https://example.com');
  const [out, setOut] = useState('');

  async function go(e: any) {
    e.preventDefault();
    setOut('Chargement...');
    try {
      const r = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const j = await r.json();
      setOut(JSON.stringify(j, null, 2));
    } catch (err: any) {
      setOut('Erreur: ' + err.message);
    }
  }

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>RankPilot OK</h1>
      <p>Test audit SEO</p>
      <form onSubmit={go}>
        <input value={url} onChange={e => setUrl(e.target.value)} style={{ width: '70%', padding: 8 }} />
        <button style={{ padding: 8, marginLeft: 8 }}>Auditer</button>
      </form>
      <pre style={{ marginTop: 20, background: '#111', color: '#0f0', padding: 12 }}>{out}</pre>
    </main>
  );
}
