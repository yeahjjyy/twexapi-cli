export function printHelp() {
  console.log(`twexapi - command-line client for Twitter/X twexapi APIs

Usage:
  twexapi [global options] <path>                                         # Raw API request

  # Twitter/X User and Search
  twexapi [global options] users <username...>                            # Multi-user lookup
  twexapi [global options] about <screen_name>                            # User profile details
  twexapi [global options] search tweets <term...> [--count <n>]          # Search Twitter/X tweets
  twexapi [global options] search users <keyword> [--count <n>]           # Search Twitter/X users
  twexapi [global options] followers <screen_name> [--count <n>]           # List user followers
  twexapi [global options] following <screen_name> [--count <n>]           # List users followed

  # Twitter/X Lists
  twexapi [global options] list search --query <text> [--count <n>]       # Search for lists
  twexapi [global options] list create --name <n> --desc <t> [--private]  # Create a new list
  twexapi [global options] list members <list_id> [--count <n>]           # List members in a list
  twexapi [global options] list subscribers <list_id> [--count <n>]       # List list subscribers

  # Twitter/X Articles and DMs
  twexapi [global options] article markdown <tweet_id>                    # Fetch article as Markdown
  twexapi [global options] article lookup <tweet_id...>                   # Batch article details
  twexapi [global options] dm history <username> [--max-id <id>]          # Fetch DM history
  twexapi [global options] dm send <username> --text <content>            # Send a Direct Message

  # Twitter/X Profile and Timeline
  twexapi [global options] profile update [--name <n>] [--desc <t>] ...   # Update your profile info
  twexapi [global options] timeline user <screen_name> [--cursor <c>]     # Fetch user timeline page

  # Twitter/X Tweets
  twexapi [global options] tweet create --text <c> [--media-url <u>]      # Create a new tweet
  twexapi [global options] tweet quote --text <c> --quote-url <u>         # Quote a tweet
  twexapi [global options] tweet lookup <tweet_id...> [--summary]         # Batch tweet lookup
  twexapi [global options] tweet replies <tweet_id> [--count <n>]         # Fetch tweet replies
  twexapi [global options] tweet like <tweet_id>                          # Like a tweet
  twexapi [global options] tweet bookmark <tweet_id>                      # Bookmark a tweet
  twexapi [global options] tweet retweet <tweet_id>                       # Retweet a tweet

  # Twitter/X Actions
  twexapi [global options] user follow <username>                         # Follow a user
  twexapi [global options] user unfollow <username>                       # Unfollow a user

  # Config and Auth
  twexapi [global options] auth apps add --name <n> --api-key <k>         # Add an app config
  twexapi [global options] auth profiles add --name <n> [--cookie <v>]    # Add an auth profile
  twexapi [global options] auth cookie --auth-token <t> [--save-as <p>]   # Create profile from token
  twexapi [global options] config show                                    # Show current config

Examples:
  twexapi --app prod users elonmusk sama
  twexapi --profile founder tweet create --text "hello world" --media-url "https://example.com/image.jpg"
  twexapi --profile founder tweet like 1900000000000000000
  twexapi --app prod -X POST -d '["1900000000000000000"]' /twitter/tweets/lookup # Twitter/X tweet lookup
  twexapi auth apps add --name prod --api-key "twitterx_..."
  twexapi auth profiles add --name founder --cookie "ct0=...; auth_token=..."
  twexapi auth cookie --auth-token "<auth_token>" --save-as founder
  twexapi config show

Global options:
  -X, --method <METHOD>       HTTP method for generic path requests, default GET
  -d, --data <JSON>           JSON body for generic path requests
  -H, --header <K:V>          Extra header for generic path requests, can be repeated
  --app <NAME>                Use a saved app config
  --profile <NAME>            Use a saved profile config
  --api-key <KEY>             Override API key for this request
  --base-url <URL>            Override base URL for this request
  --config-dir <DIR>          Override config directory, default ~/.twexapi
  --dry-run                   Print the request payload without sending it
  --raw                       Print response body without pretty JSON formatting
  -h, --help                  Show help

Notes:
  Global options should be placed before the command.
  Saved apps store API keys and base URLs.
  Saved profiles store cookies or auth_token values for write actions.
  Get API keys from https://twexapi.io/dashboard.
  Copy the API key from the dashboard and save it with auth apps add.
`);
}
