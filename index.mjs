#!/usr/bin/env node
import { createInterface } from 'node:readline';
const ENDPOINT = process.env.SLANG_LANE_MCP_URL || 'https://slanglane.com/mcp';
const rl = createInterface({ input: process.stdin, terminal: false });
rl.on('line', async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
      body: trimmed,
    });
    const text = await res.text();
    if (text.trim()) process.stdout.write(text.trim() + '\n');
  } catch (err) {
    try {
      const req = JSON.parse(trimmed);
      if (req.id !== undefined) process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: req.id, error: { code: -32603, message: err.message } }) + '\n');
    } catch {}
  }
});
