---
name: twexapi-cli
description: Use this skill when working with the twexapi CLI in this repository, including installing it locally, configuring app/profile auth, previewing requests, and running read or write commands against twexapi endpoints.
---

# twexapi-cli

This skill is for tasks that should be done through the `twexapi` command in this repository instead of re-implementing request logic by hand. It is suitable for packaging as a reusable skill because the workflow is mostly command-driven and repeatable.

## When to use

Use this skill when the user wants to:

- install or run this CLI locally
- configure API keys, cookies, or auth tokens
- inspect the generated request with `--dry-run`
- call common twexapi endpoints for users, tweets, search, followers, following, or lists
- perform write actions such as tweeting, liking, bookmarking, retweeting, or following

If the user only wants to edit the CLI source code itself, work in the repository code directly instead of treating the skill as the primary interface.

## Local install

From the repository root:

```bash
npm link
twexapi --help
```

If a global executable is not needed, run it directly:

```bash
node ./bin/twexapi.js --help
```

Requires Node.js 18 or newer.

If `twexapi` is not on `PATH`, use `node ./bin/twexapi.js ...` with the same arguments.

## Core workflow

1. Make sure the CLI is available with `twexapi --help` or `node ./bin/twexapi.js --help`.
2. Add an app config with an API key.
3. Add or select a profile if the operation needs user auth.
4. Use `--dry-run` first for risky or state-changing commands.
5. Run the real command after confirming the path, method, and payload.

## Auth setup

Add an app config:

```bash
twexapi auth apps add --name prod --api-key "twitterx_..."
twexapi auth apps use prod
```

Add a write profile from a cookie:

```bash
twexapi auth profiles add --name founder --cookie "ct0=...; auth_token=..."
twexapi auth profiles use founder
```

Or create a profile from an auth token:

```bash
twexapi auth cookie --auth-token "your_auth_token" --save-as founder
```

Inspect config:

```bash
twexapi config show
twexapi config path
```

Default config location is `~/.twexapi/config.json`.

## Common command patterns

Read examples:

```bash
twexapi --app prod users elonmusk sama
twexapi --app prod about elonmusk
twexapi --app prod search tweets "founder" "ai" --count 20 --sort Latest
twexapi --app prod followers elonmusk --count 100
twexapi --app prod tweet lookup 1900000000000000000
```

Write examples:

```bash
twexapi --app prod --profile founder tweet create --text "hello from cli"
twexapi --app prod --profile founder tweet like 1900000000000000000
twexapi --app prod --profile founder user follow someuser
```

Generic endpoint form:

```bash
twexapi /twitter/elonmusk/about
twexapi -X POST -d '["elonmusk","sama"]' /twitter/users
```

Dry run before sending:

```bash
twexapi --app prod --dry-run users elonmusk sama
twexapi --app prod --profile founder --dry-run tweet create --text "hello"
```

## Operating notes

- Put global options such as `--app`, `--profile`, `--api-key`, and `--dry-run` before the command.
- Prefer the convenience commands when they fit; fall back to `twexapi <path>` for unsupported endpoints.
- The CLI masks secrets in config output and dry-run previews.
- Local media file upload is not implemented; tweet creation currently supports `--media-url`.
- DM commands are not included.
- For local testing, prefer `--config-dir ./.twexapi-local` so test auth state stays isolated from the user's real config.
