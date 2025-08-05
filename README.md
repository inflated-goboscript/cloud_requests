# cloud_requests.gs

> scratchattach cloud requests in goboscript

This is a cloud request library which is built for [goboscript](https://github.com/aspizu/goboscript).
It is designed to be used with [inflator](https://github.com/faretek1/inflator) and [scratchattach](https://github.com/timMcCool/scratchattach/)

> [!WARNING]
> This is in very early development. I do not reccomend using this.

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

## Development

use `inflate install -e .`:

1. clone the respository: `git clone https://github.com/FAReTek1/cloud_requests`
2. `cd cloud_requests`
3. `inflate install -e .`
4. `cd test`
5. `inflate`
6. `goboscript build`
7. open `test.sb3`
