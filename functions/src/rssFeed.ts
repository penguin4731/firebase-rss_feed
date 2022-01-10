import addNews from "./addNews";
import getNewsFromRss from "./getNewsFromRss";
import getNewsUrlsFromFirestore from "./getNewsUrlsFromFirestore";
import getRssUrlsFromFirestore from "./getRssUrlsFromFirestore";

export default function rssFeed() {
  // RSSのURLを取得する
  getRssUrlsFromFirestore().then((rssUrls) => {
    // RSSからデータを取得する
    rssUrls.forEach((rss: { url: string; saveField: { collection: string; type: string; id: string } }) => {
      getNewsUrlsFromFirestore(rss.saveField.collection, rss.saveField.type, rss.saveField.id)
        .then((registeredUrls) => {
          return getNewsFromRss(rss.url, registeredUrls);
        })
        .then((registerUrls) => {
          return addNews(rss.saveField.collection, rss.saveField.type, rss.saveField.id, registerUrls);
        })
        .then(() => {
          console.log("success");
        });
    });
  });
  return null;
}
