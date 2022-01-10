import * as functions from "firebase-functions";
import getNewsDataFromRss from "./getNewsDataFromRss";
import getRssUrls from "./getRssUrls";

export const helloWorld = functions.https.onRequest((request, response) => {
  // RSSのURLを取得する
  getRssUrls()
    .then((rssUrls) => {
      console.log(rssUrls);
    })
    .catch((err) => {});

  // RSSからデータを取得する

  // データを登録する

  getNewsDataFromRss("http://www.ritsumei.ac.jp/xml.jsp?id=105549", [
    "http://www.ritsumei.ac.jp/data.jsp?database=R500fkcNews&id=1347",
  ])
    .then((data: []) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  response.send("hello world");
});
