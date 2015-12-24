var truncate = require("tweet-truncator").truncate;
var contents = {
    title: "tweet-truncate",
    url: "https://github.com/azu/tweet-truncate",
    desc: "Truncate contents to 140 chars.",
    quote: "quote",
    tags: ["twitter", "JavaScript"]
};
var options = {
    defaultPrefix: "See:",
    template: '%desc% "%title%" %url% %tags%',
    // maxLength: 140 // default is 140
};
var result = truncate(contents, options);
console.log(result);