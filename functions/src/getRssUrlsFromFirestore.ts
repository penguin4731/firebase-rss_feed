const { firestore } = require("./firestore");

export default function getRssUrlsFromFirestore(): Promise<any> {
  return new Promise((resolve, reject) => {
    var db = firestore;
    db.collection("rss")
      .get()
      .then((snapshot: any) => {
        var data: { url: string; saveField: { collection: string; type: string; id: string } }[] = [];
        snapshot.forEach((doc: any) => {
          data.push({
            url: doc.data().url,
            saveField: {
              collection: doc.data().saveField.collection,
              type: doc.data().saveField.type != null ? doc.data().saveField.type : "",
              id: doc.data().saveField.id != null ? doc.data().saveField.id : "",
            },
          });
        });
        resolve(data);
        return [];
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
}
