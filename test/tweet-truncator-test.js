import assert from "assert";
import { truncate, TweetTruncator } from "../src/index";

describe("twitter-truncate", function () {
    // https://github.com/azu/tweet-truncator/issues/3
    context("undefined value", () => {
        it("should fill empty string if property is nullish", () => {
            const contents = {
                title: undefined,
                url: undefined,
                desc: undefined,
                quote: undefined,
                tags: undefined
            };
            const result = truncate(contents, {
                template: "%title%%url%%desc%%quote%%tags%"
            });
            assert.strictEqual(result, "");
        });
    });
    context("options.prefix", () => {
        it("should change order for truncating", () => {
            const truncator = new TweetTruncator({
                defaultPrefix: "See:"
            });
            const contents = {
                title: "TITLE",
                url: "https://github.com/twitter/twitter-text",
                desc: "",
                quote: "quote",
                tags: []
            };
            var result = truncator.truncateStatus(contents, 0);
            assert(result.indexOf("See:") === 0);
            assert(result.indexOf(contents.title));
            assert(result.indexOf(contents.url));
            assert(result.indexOf(contents.quote));
        });
    });
    context("options.template", () => {
        it("should change order for truncating", () => {
            const truncator = new TweetTruncator({
                template: "%url% %tags%"
            });
            const contents = {
                title: "TITLE",
                url: "https://github.com/twitter/twitter-text",
                desc: "description",
                quote: "quote",
                tags: ["tags", "test"]
            };
            var result = truncator.truncateStatus(contents, 0);
            assert(result.includes(contents.url));
            assert(!result.includes(contents.title));
            assert(!result.includes(contents.desc));
            assert(!result.includes(contents.quote));
        });
    });
    context("options.truncatedOrder", () => {
        it("should change order for truncating", () => {
            const truncator = new TweetTruncator({
                truncatedOrder: ["desc", "title"]
            });
            const contents = {
                title: "TITLE",
                url: "https://github.com/twitter/twitter-text",
                desc: "description",
                quote: "quote",
                tags: ["tags"]
            };
            var result = truncator.truncateStatus(contents, contents.desc.length);
            assert(!result.includes(contents.desc));
            assert(result.includes(contents.title));
        });
    });
    describe("contents is over 280", () => {
        const contents = {
            title: "!title!",
            url: "https://github.com/twitter/twitter-text",
            desc:
                "This repo is a collection of libraries and conformance tests to standardize parsing of tweet text. It synchronizes development, testing, creating issues, and pull requests for twitter-text's implementations and specification.This repo is a collection of libraries and conformance tests to standardize parsing of tweet text. It synchronizes development, testing, creating issues, and pull requests for twitter-text's implementations and specification.",
            quote: "quote",
            tags: ["tags"]
        };
        it("should truncate title", () => {
            var result = truncate(contents);
            assert(!result.includes(contents.title));
        });
        it("should truncate desc", () => {
            var result = truncate(contents);
            assert(!result.includes(contents.desc.substring(0, 280)));
        });
        it("should truncate quote", () => {
            var result = truncate(contents);
            assert(!result.includes(contents.quote));
        });
        it("should truncate tags", () => {
            var result = truncate(contents);
            assert(!result.includes(contents.tags[0]));
        });
        it("should not truncate url", () => {
            var result = truncate(contents);
            assert(result.includes(contents.url));
        });
    });
});
