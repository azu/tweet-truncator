// LICENSE : MIT
"use strict";
import TweetTruncator, { TweetTruncatorContents, TweetTruncatorOptions } from "./tweet-truncator";
// export class
export { TweetTruncator };
// export type
export type { TweetTruncatorContents, TweetTruncatorOptions };

/**
 * truncate contents object with maxLength.
 * @param {{
 *   desc?: string,
 *   quote?: string,
 *   title?: string,
 *   url?: string,
 *   tags?: string[]
 * }} contents
 * @param {object} options
 * @returns {string}
 */
export function truncate(
    contents: Partial<TweetTruncatorContents>,
    options: TweetTruncatorOptions & { maxLength?: number } = {}
) {
    const maxLength = options.maxLength || 280; // default: 280
    const twitterTr = new TweetTruncator(options);
    const fixedContents = {
        desc: contents.desc ?? "",
        quote: contents.quote ?? "",
        title: contents.title ?? "",
        url: contents.url ?? "",
        tags: (contents.tags ?? []).map((tag) => `#${tag}`)
    };
    const status = twitterTr.joinContents(fixedContents);
    let over = twitterTr.getTweetLength(status) - maxLength;
    if (over > 0) {
        return twitterTr.truncateStatus(fixedContents, over);
    }
    return status;
}
