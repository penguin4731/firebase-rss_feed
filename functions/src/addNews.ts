const { firestore } = require("./firestore");

export default function addNews(
  collection: string,
  type: string,
  id: string,
  data: { title: string; url: string; date: Date }[]
) {
  var db = firestore;
  data.forEach((item) => {
    db.collection(collection).add({
      title: item.title == "" ? "タイトルなし" : item.title,
      url: item.url,
      type: type == "" ? "" : type,
      id: id == "" ? "" : id,
      date: item.date,
    });
  });
}
