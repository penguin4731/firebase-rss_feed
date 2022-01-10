import * as functions from "firebase-functions";
import getNewsDataFromRss from "./rss";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  getNewsDataFromRss("http://www.ritsumei.ac.jp/xml.jsp?id=105549", [
    "http://www.ritsumei.ac.jp/data.jsp?database=R500fkcNews&id=1347",
  ])
    .then((data: []) => {
      console.log(data);
    })
    .catch(() => {});

  response.send("hello world");
});
