const truncate = require("tweet-truncator").truncate;
const contents = {
    title: "tweet-truncate",
    url: "https://github.com/azu/tweet-truncate",
    desc:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.",
    quote: "quote",
    tags: ["twitter", "JavaScript"]
};
const options = {
    defaultPrefix: "See:",
    template: '%desc% "%title%" %url% %tags%'
};
const result = truncate(contents, options);
console.log(result);
