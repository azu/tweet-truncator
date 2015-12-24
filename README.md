# tweet-truncate [![Build Status](https://travis-ci.org/azu/tweet-truncate.svg?branch=master)](https://travis-ci.org/azu/tweet-truncate)

Truncate contents to 140 chars.

## Installation

    npm install tweet-truncate

## Usage

### truncate(content, [options])

```js
var truncate = require("tweet-truncate").truncate;
var contents = {
    title: "tweet-truncate",
    url: "https://github.com/azu/tweet-truncate",
    desc: "Truncate contents to 140 chars.",
    quote: "quote",
    tags: ["#twitter", "JavaScript"]
};
var options = {
    defaultPrefix: "See:",
    template: '%desc% "%title%" %url% %tags%',
    // maxLength: 140 // default is 140
};
var result = truncate(contents, options);
console.log(result);
/*
Truncate contents to 140 chars. "tweet-truncate" https://github.com/azu/tweet-truncate ##twitter #JavaScript
*/
```

See [example/](example/)

#### [TweetTruncator](src/tweet-truncator.js)

TweetTruncator is a core class of tweet-truncator.

```js
const truncator = new TweetTruncator({
    defaultPrefix: "See:",
    template: `%desc% "%title%" %url% %tags%`
});
const contents = {
    title: "TITLE",
    url: "https://github.com/twitter/twitter-text",
    desc: "",
    quote: "quote",
    tags: []
};
const overLength = 10;// it means that remove 10 chars from contents.
var result = truncator.truncateStatus(contents, overLength);
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

Thanks to [Tombfix](https://github.com/tombfix/core "Tombfix").