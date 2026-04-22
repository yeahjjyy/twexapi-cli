# twexapi-cli

A command-line client for Twitter/X twexapi APIs.

## What it supports

- Generic HTTP-style requests to twexapi paths
- Saved app configs for API keys and base URLs
- Saved profiles for cookies or `auth_token` values
- Convenience commands for Twitter/X users, about, search, followers/following, lists, tweets, articles, dms, profile, timeline, and follow/unfollow
- Modular code layout under `src/` so config, parsing, requests, and commands evolve independently

## Install

Install globally from npm:

```bash
npm install -g twexapi-cli
twexapi --help
```

Requires Node.js 18 or newer.

## Use as a skill

Install from a GitHub skill installer:

```bash
npx skills add yeahjjyy/twexapi-cli
```

Install from ClawHub:

```bash
npx clawhub@latest install twexapi-cli
```

Install as a Claude Code marketplace:

```text
/plugin marketplace add yeahjjyy/twexapi-cli
/plugin install twexapi-cli@twexapi-cli
```

For manual Claude Code installs, this repository also includes:

```text
.claude/skills/twexapi-cli/
```

Then install the CLI:

```bash
npm install -g twexapi-cli
```

In skills-enabled environments:

- use `/twexapi-cli` after installing the Claude plugin command
- use `$twexapi-cli` in Codex/OpenClaw-style environments
- or ask the agent to use twexapi for installation, auth setup, dry-run previews, or endpoint calls

## Quick start

Get your API key from the twexapi dashboard:

[twexapi dashboard](https://twexapi.io/dashboard)

Save an app config and make a first request:

```bash
twexapi auth apps add --name prod --api-key "twitterx_..."
twexapi auth apps use prod
twexapi --app prod about elonmusk
```

If you are developing from this repository, use:

```bash
cd /Users/jiangyong/code/twexapi-cli
node ./bin/twexapi.js --help
```

If you want a local executable command while developing from source:

```bash
npm link
twexapi --help
```

## Config management

When a request is missing an API key, the CLI will include that URL in the error output.

## Security notes

- The CLI reads `TWEXAPI_KEY`, `TWEXAPI_BASE_URL`, and `TWEXAPI_CONFIG_DIR` from the environment.
- The CLI reads and writes persistent config in `~/.twexapi/config.json` by default, or in the directory set by `--config-dir` or `TWEXAPI_CONFIG_DIR`.
- Saved app configs may contain API keys, and saved profiles may contain cookies, `auth_token`, or `ct0` in plain JSON on disk.
- Avoid storing long-lived credentials on shared machines or CI runners. Prefer an isolated config directory when testing.
- `auth cookie` builds a request path containing the `auth_token`, so treat logs, traces, and network boundaries accordingly.

Save an app config:

```bash
twexapi auth apps add --name prod --api-key "twitterx_..."
twexapi auth apps list
twexapi auth apps use prod
```

Save a write profile:

```bash
twexapi auth profiles add --name founder --cookie "ct0=...; auth_token=..."
twexapi auth profiles use founder
```

Create a profile from `auth_token` via the documented cookie endpoint:

```bash
twexapi auth cookie --auth-token "your_auth_token" --save-as founder
```

Inspect config:

```bash
twexapi config show
twexapi config path
```

By default config is stored in `~/.twexapi/config.json`. For testing, you can isolate it:

```bash
twexapi --config-dir ./.twexapi-local config show
```

## Request examples

Query an endpoint directly:

```bash
twexapi /twitter/elonmusk/about
```

Send a JSON body with a POST:

```bash
twexapi -X POST -d '["elonmusk","sama"]' /twitter/users
```

Preview a request without sending it:

```bash
twexapi --app prod --dry-run users elonmusk sama
twexapi --app prod --profile founder --dry-run tweet create --text "hello"
```

## Convenience commands

Read commands:
 
```bash
# Twitter/X User and Search
twexapi --app prod users elonmusk sama           # Lookup user profiles
twexapi --app prod about elonmusk                # Fetch detailed user info
twexapi --app prod search tweets "founder" "ai"  # Search for tweets
twexapi --app prod search users "openai"         # Search for users
twexapi --app prod followers elonmusk            # List user followers
twexapi --app prod following elonmusk            # List user following
 
# Twitter/X Lists
twexapi --app prod list search --query "ai"      # Search for public lists
twexapi --app prod list members 123456789        # List members of a list
twexapi --app prod list subscribers 123456789    # List subscribers of a list
 
# Twitter/X Articles & DMs
twexapi --app prod article markdown 123          # Get x article as Markdown
twexapi --app prod article lookup 123 456        # Batch lookup x articles
twexapi --app prod dm history elonmusk           # Show Direct Message history
twexapi --app prod dm send elonmusk --text "hi"  # Send a DM to a user
 
# Twitter/X Profile & Timeline
twexapi --app prod timeline user elonmusk        # Fetch user timeline page
twexapi --app prod profile update --name "Name"  # Update your own profile
 
# Twitter/X Tweets
twexapi --app prod tweet lookup 123 --summary    # Batch tweet lookup (id:bool)
twexapi --app prod tweet replies 123             # Get replies for a tweet
```

Write commands:

```bash
twexapi --app prod --profile founder tweet create --text "hello from cli"
twexapi --app prod --profile founder tweet create --text "hello with image" --media-url "https://example.com/a.jpg"
twexapi --app prod --profile founder tweet quote --text "worth reading" --quote-url "https://x.com/user/status/123"
twexapi --app prod --profile founder tweet like 1900000000000000000
twexapi --app prod --profile founder tweet unlike 1900000000000000000
twexapi --app prod --profile founder tweet bookmark 1900000000000000000
twexapi --app prod --profile founder tweet unbookmark 1900000000000000000
twexapi --app prod --profile founder tweet retweet 1900000000000000000
twexapi --app prod --profile founder tweet unretweet 1900000000000000000
twexapi --app prod --profile founder list create --name "AI Builders" --description "Interesting builders" --private
twexapi --app prod --profile founder user follow someuser
twexapi --app prod --profile founder user unfollow someuser
```

## Project layout

```text
bin/twexapi.js         # thin executable entrypoint
src/index.js           # main boot flow
src/parser.js          # global option parsing
src/config.js          # config load/save and auth profile helpers
src/request.js         # HTTP execution and dry-run preview
src/commands.js        # command routing and endpoint mapping
src/help.js            # help text
src/constants.js       # defaults and option metadata
src/utils.js           # shared helpers
```

## Notes

- Global options such as `--app`, `--profile`, `--api-key`, and `--dry-run` should be placed before the command.
- For unsupported endpoints, use the generic `twexapi <path>` form.
- The CLI masks secrets in config output and dry-run previews.
- Direct local file upload for media is not included yet; the current CLI supports `--media-url` for tweet creation.
