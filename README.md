# cloud_requests.gs

> scratchattach cloud requests in goboscript

This is a implementation of the scratchattach cloud request framework as of August 2025 which is built for [goboscript](https://github.com/aspizu/goboscript).
It is designed to be used with [inflator](https://github.com/faretek1/inflator) and [scratchattach](https://github.com/timMcCool/scratchattach/)

There are 2 broadcasts that are called by the cloud request api.
- `sa_on_server_response` when a server response to a request arrives
- `sa_on_server_message` when the server sends a message to the client

There is a variable and a list for accessing the data provided on a request or server message:

- To access response data, use the `sa_response` list
- The request status code is stored in the `sa_request_status`, and will be a member of the `SAStatuses` enum.

## Credits

- Timmccool for scratchattach

## Installation

Make sure you have inflator installed

`inflate install https://github.com/FAReTek1/cloud_requests`

add cloud_requests to your `inflator.toml` config:
```toml
[dependencies]
# ...
cloud_requests = "https://github.com/FAReTek1/cloud_requests"
```

> [!IMPORTANT]
> You will need to %include the inflate/time, inflate/char, and inflate/string modules before %including inflate/cloud_requests. This is due to a strange goboscript bug. If conditional compilation is added to these libraries, this might be resolved

## Development

use `inflate install -e .`:

1. clone the respository: `git clone https://github.com/FAReTek1/cloud_requests`
2. `cd cloud_requests`
3. `inflate install -e .`
4. `cd test`
5. `inflate`
6. `goboscript build`
7. open `test.sb3`
