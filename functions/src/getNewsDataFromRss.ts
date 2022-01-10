import * as functions from "firebase-functions";
import RssParser = require("rss-parser");

export default function getNewsDataFromRss(rssUrl: string, registeredUrls: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    // データ返却用の変数
    var data: { title: string; url: string; date: Date }[] = [];

    // URLか確認する
    var expression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
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
          if (registeredUrls.includes(item.link as string)) {
            break;
          }
          data.push({
            title: item.title as string,
            url: item.link as string,
            date: new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000),
          });
        }
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
