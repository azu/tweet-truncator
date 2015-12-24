var truncate = require("tweet-truncate");
const truncator = new TweetTruncator({
    prefix: "See:",
    template: '%desc% "%title%" %url% %tags'
});
const contents = {
    title: "TITLE",
    url: "https://github.com/twitter/twitter-text",
    desc: "description",
    quote: "quote",
    tags: []
};
var result = truncate(contents);
console.log(result);