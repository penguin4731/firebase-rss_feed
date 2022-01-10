"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
const RssParser = require("rss-parser");
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    useRss2("http://www.ritsumei.ac.jp/xml.jsp?id=105549", [
        "http://www.ritsumei.ac.jp/data.jsp?database=R500fkcNews&id=1347",
    ])
        .then((data) => {
        console.log(data);
    })
        .catch(() => { });
    // const promise1 = new Promise((resolve, reject) => {
    // 	let data = useRss("http://www.ritsumei.ac.jp/xml.jsp?id=105549", [
    // 		"http://www.ritsumei.ac.jp/data.jsp?database=R500fkcNews&id=1347",
    // 	]);
    // 	resolve(data);
    // });
    // promise1.then((value) => {
    // 	console.log(value);
    // 	response.send(value);
    // });
    response.send("hello world");
});
function useRss2(rssUrl, registeredUrls) {
    return new Promise((resolve, reject) => {
        // データ返却用の変数
        var data = [];
        // URLか確認する
        var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (!rssUrl.match(regex)) {
            functions.logger.error("Use RSS Error: URLが不正な値です。");
            return;
        }
        // RSSからデータを取得する
        const rssParser = new RssParser();
        rssParser
            .parseURL(rssUrl)
            .then((feed) => {
            // RSSから取得したデータを処理する
            for (let i = 0; i < feed.items.length; i++) {
                const item = feed.items[i];
                // すでに登録済みか確認する
                if (registeredUrls.includes(item.link)) {
                    break;
                }
                data.push({
                    title: item.title,
                    url: item.link,
                    date: new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000),
                });
            }
            console.log(data);
            resolve(data);
        })
            .catch((err) => {
            functions.logger.error("Use RSS Error: " + err, {
                structuredData: true,
            });
            reject([]);
        });
    });
}
// function useRss(rssUrl: string, registeredUrls: string[]) {
// 	// データ返却用の変数
// 	var data: { title: string; url: string; date: Date }[] = [];
// 	// URLか確認する
// 	var expression =
// 		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
// 	var regex = new RegExp(expression);
// 	if (!rssUrl.match(regex)) {
// 		functions.logger.error("Use RSS Error: URLが不正な値です。");
// 		return;
// 	}
// 	// RSSからデータを取得する
// 	const rssParser = new RssParser();
// 	rssParser
// 		.parseURL(rssUrl)
// 		.then((feed) => {
// 			// RSSから取得したデータを処理する
// 			for (let i = 0; i < feed.items.length; i++) {
// 				const item = feed.items[i];
// 				// すでに登録済みか確認する
// 				if (registeredUrls.includes(item.link as string)) {
// 					break;
// 				}
// 				data.push({
// 					title: item.title as string,
// 					url: item.link as string,
// 					date: new Date(
// 						Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
// 					),
// 				});
// 			}
// 			console.log(data);
// 			return data;
// 		})
// 		.catch((err) => {
// 			functions.logger.error("Use RSS Error: " + err, { structuredData: true });
// 			return [];
// 		});
// }
//# sourceMappingURL=index.js.map