// LICENSE : MIT
"use strict";
import twttr from 'twitter-text';
import ObjectAssign from "object-assign";

const joinText = (array, separator) => {
    const isNotEmpty = (string) => {
        return string.length > 0;
    };
    return array.filter(isNotEmpty).join(separator);
};
const defaultOptions = {
    defaultPrefix: "",
    template: `%desc% "%title%" %url% %tags%`,
    truncatedOrder: [
        "tags",
        "title",
        "quote",
        "desc",
        "url"
    ]

};
export default class TweetTruncator {
    constructor(options = {}) {
        this.template = options.template || defaultOptions.template;
        this.defaultPrefix = options.defaultPrefix || defaultOptions.defaultPrefix;
        this.truncatedOrder = options.truncatedOrder || defaultOptions.truncatedOrder
    }

    getTweetLength(str) {
        return twttr.getTweetLength(str, this.OPTIONS);
    }

    joinContents(contents) {
        let template = this.template;
        let {desc, quote, title, url, tags} = contents;
        let prefix = desc ? '' : this.defaultPrefix;

        return template ?
               this.extractTemplate(prefix, template, contents) :
               joinText([prefix, desc, quote, title, url, ...tags], ' ');
    }

    extractTemplate(prefix, template, contents) {
        contents.usage = {};

        let fixedTemplate = template.replace(
            /%(desc|quote|title|url|tags|br)%/g,
            (match, name) => {
                if (name === 'br') {
                    return '\n';
                }

                contents.usage[name] = true;

                return contents[name].length ? match : '';
            }
        ).trim().replace(/^ +| +$/mg, '').replace(/ +/g, ' ');

        return joinText([prefix, ...(fixedTemplate.split(' '))].map(content =>
            content.replace(
                /%(desc|quote|title|url|tags)%/g,
                (match, name) => name === 'tags' ?
                                 contents.tags.join(' ') :
                                 contents[name]
            )
        ), ' ');
    }

    truncateStatus(contents, overLength = 0) {
        let over = overLength;
        let copiedContents = ObjectAssign({}, contents);
        const getTweetLength = this.getTweetLength.bind(this);
        const truncateContent = this.truncateContent.bind(this);
        let truncators = {
            tags: array => {
                let arr = array.slice();

                copiedContents.tags = arr = arr.reverse().filter(tag => {
                    if (over <= 0) {
                        return true;
                    }

                    over -= tag.length + 1;
                }).reverse();

                if (arr.length || over <= 0) {
                    return true;
                }
            },
            title: string => {
                let str = truncateContent(string, over);

                if (str) {
                    copiedContents.title = str + '…';
                } else {
                    over -= getTweetLength(string) + 1;
                    copiedContents.title = str;
                    if (over > 0) {
                        return false;
                    }
                }

                return true;
            },
            quote: string => {
                let str = truncateContent(string.slice(1, -1), over);

                if (str) {
                    copiedContents.quote = `"${str}…"`;
                } else {
                    over -= getTweetLength(string) + 1;
                    copiedContents.quote = str;

                    if (over > 0) {
                        return false;
                    }
                }

                return true;
            },
            desc: string => {
                copiedContents.desc = truncateContent(string, over) + '…';
            },
            url: string => {
                // no change
                return true;
            }
        };
        for (var i = 0; i < this.truncatedOrder.length - 1; i++) {
            if (over <= 0) {
                break;
            }
            const truncatorName = this.truncatedOrder[i];
            if (copiedContents.usage && !copiedContents.usage[truncatorName]) {
                copiedContents[truncatorName] = truncatorName === 'tags' ? [] : '';
            }
            const content = copiedContents[truncatorName];
            const truncate = truncators[truncatorName];
            if (content.length && truncate(content)) {
                break;
            }
        }

        return this.joinContents(copiedContents);
    }

    truncateContent(content, overLength) {
        // for surrogate pair
        let strArr = [...content],
            urls = twttr.extractUrlsWithIndices(content).reverse(),
            twLen = this.getTweetLength(content),
            over = overLength;

        if (!urls.length || twLen <= over + 1) {
            return strArr.slice(0, -(over + 1)).join('');
        }


        for (var i = 0; i < urls.length; i++) {
            const indices = urls[i];
            const start = indices[0];
            const end = indices[1];
            let len = strArr.length;

            if (over < len - end) {
                break;
            }

            strArr = strArr.slice(0, start - (len === end ? end : len));
            over -= twLen - this.getTweetLength(strArr.join(''));

            if (over < 0) {
                break;
            }

            twLen = this.getTweetLength(strArr.join(''));
        }

        if (over >= 0) {
            strArr = strArr.slice(0, -(over + 1));
        }

        return strArr.join('');
    }
}