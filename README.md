# SlangLane Dictionary — Remote MCP Server, 100% SFW ESL Teacher Kit & Open Dataset

[![Official MCP Registry](https://img.shields.io/badge/MCP_Registry-com.slanglane%2Fdictionary-172e24)](https://registry.modelcontextprotocol.io/v0.1/servers/com.slanglane%2Fdictionary/versions/latest)
[![Glama MCP](https://img.shields.io/badge/Glama-Healthy-2ea44f)](https://glama.ai/mcp/connectors/com.slanglane/dictionary)
[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](LICENSE)
[![Data: CC BY 4.0](https://img.shields.io/badge/Dataset-CC_BY_4.0-orange.svg)](https://slanglane.com/data)

**[SlangLane](https://slanglane.com)** is a context-first dictionary of contemporary internet English, texting shorthand, US/UK/Irish regional expressions, and clearly labeled non-graphic adult vocabulary.

![SlangLane Visual Context Card](https://slanglane.com/media/787865ec304344a00ab7e644ce918662/slide-01.jpg)

---

## 1. Classroom & ESL Teacher Kit (100% SFW Edition)

Built for B1–C2 ESL/EFL instructors, linguistics courses, curriculum designers, and language learners:
- **Live Interactive ESL Kit:** [https://slanglane.com/esl](https://slanglane.com/esl)
- **45-Minute Lesson Plan & Printable Worksheet:** [`esl/lesson-plan-45min.md`](esl/lesson-plan-45min.md)
- **Classroom-Safe SFW CSV (for Anki / Quizlet / Kahoot):** [`data/slanglane-sfw-classroom.csv`](data/slanglane-sfw-classroom.csv) (live endpoint: `https://slanglane.com/api/dataset.csv?mature=false`)
- **5-Word Daily Slang Sprint (SFW Quiz):** [https://slanglane.com/daily](https://slanglane.com/daily)

---

## 2. Remote Streamable HTTP MCP Server (Zero Auth)

Endpoint: `https://slanglane.com/mcp` (stateless Streamable HTTP, JSON responses, no API key required).

```json
{
  "mcpServers": {
    "slanglane": {
      "type": "http",
      "url": "https://slanglane.com/mcp"
    }
  }
}
```

Or via `npx` stdio bridge:
```json
{
  "mcpServers": {
    "slanglane": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://slanglane.com/mcp"]
    }
  }
}
```

### Six Read-Only Tools
- `lookup_term` — exact term, slug, or documented alias with sources, register, and examples.
- `search_terms` — lexical search with `include_mature: false` option for classroom/SFW use.
- `decode_phrase` — scans a sentence (up to 1,000 chars) for documented slang.
- `compare_usage` — documented US/UK/Irish regional and register notes.
- `get_related_terms` — related expressions.
- `get_recent_terms` — newest published dictionary summaries.

---

## 3. Open Dataset (CC BY 4.0) for NLP & Research

- **Full CSV:** `https://slanglane.com/api/dataset.csv`
- **SFW Classroom CSV:** `https://slanglane.com/api/dataset.csv?mature=false`
- **JSONL (Hugging Face / pandas):** `https://slanglane.com/api/dataset.jsonl` (also in [`data/slanglane-dataset.jsonl`](data/slanglane-dataset.jsonl))
- **Frictionless Data Package:** `https://slanglane.com/datapackage.json`

```python
import pandas as pd
df = pd.read_csv("https://slanglane.com/api/dataset.csv?mature=false")
print(df[["term", "register", "summary"]].head())
```
