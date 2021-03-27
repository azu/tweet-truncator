// LICENSE : MIT
"use strict";
import assert from "assert";
import { truncate } from "../src/index";
import twttr from "twitter-text";

describe("example-test", function () {
    it("should", () => {
        const contents = {
            title: "Release 2.0.0 - 2015.12.24 · zloirock/core-js",
            url: "https://github.com/zloirock/core-js/releases/tag/v2.0.0",
            desc:
                "core-js 2.0.0リリース。 Typed Arrayの実装追加、`System.global`、`Error.isError`、MathのProposal実装を追加。 Promiseの仕様追従、`String#{padStart, padEnd}`へリネーム。 NodeListなどをIterableとする再定義の追加するなど",
            tags: [],
            relatedItems: []
        };
        const result = truncate(contents);
        assert.strictEqual(
            result,
            'core-js 2.0.0リリース。 Typed Arrayの実装追加、`System.global`、`Error.isError`、MathのProposal実装を追加。 Promiseの仕様追従、`String#{padStart, padEnd}`へリネーム。 NodeListなどをIterableとする再定義の追加するなど "Release 2.0.0 - 2015.12.24…" https://github.com/zloirock/core-js/releases/tag/v2.0.0'
        );
        assert.strictEqual(twttr.getTweetLength(result), 280);
    });
});
