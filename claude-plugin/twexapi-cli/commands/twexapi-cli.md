---
description: Use the twexapi skill to install, configure, test, or run twexapi CLI workflows.
---

# twexapi CLI

Use the installed `twexapi-cli` skill for this task.

Prefer this command when the user wants to:

- install or run the `twexapi` CLI
- configure API keys, app profiles, or auth profiles
- inspect request construction with `--dry-run`
- call twexapi endpoints with convenience commands or raw paths

Default behavior:

1. Check whether `twexapi` is available.
2. Use saved app auth or `TWEXAPI_KEY` for read requests.
3. Require a saved profile or explicit cookie for write requests.
4. Prefer convenience commands first.
5. Use `--dry-run` before real write actions unless the user clearly asks to execute them.
