const truncate = require("tweet-truncator").truncate;
const contents = {
    title: "tweet-truncate",
    url: "https://github.com/azu/tweet-truncate",
    desc: "Truncate contents to 140 chars. over over over over over over over over over over over over",
    quote: "quote",
    tags: ["twitter", "JavaScript"]
};
const options = {
    defaultPrefix: "See:",
    template: '%desc% "%title%" %url% %tags%'
};
const result = truncate(contents, options);
console.log(result);
