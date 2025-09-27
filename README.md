# cloud_requests.gs

> scratchattach cloud requests in goboscript

This is a implementation of the scratchattach cloud request framework as of August 2025 which is built for [goboscript](https://github.com/aspizu/goboscript).
It is designed to be used with [inflator](https://github.com/inflated-goboscript/inflator) and [scratchattach](https://github.com/timMcCool/scratchattach/)

There are 2 broadcasts that are called by the cloud request api.
- `sa_on_server_response` when a server response to a request arrives
- `sa_on_server_message` when the server sends a message to the client

There is a variable and a list for accessing the data provided on a request or server message:

- To access response data, use the `sa_response` list
- The request status code is stored in the `sa_request_status`, and will be a member of the `SAStatuses` enum.

## Credits

- Timmccool for scratchattach

## Installation

Make sure you have inflator installed. It's available on the gtp.

`inflate install cloud_requests`

add cloud_requests to your `inflator.toml` config:
```toml
[dependencies]
# ...
cloud_requests = "cloud_requests"
```

## Development

use `inflate install -e .`:

1. clone the respository: `git clone https://github.com/inflated-goboscript/cloud_requests`
2. `cd cloud_requests`
3. `inflate install -e .`
4. `cd test`
5. `inflate`
6. `goboscript build`
7. open `test.sb3`
