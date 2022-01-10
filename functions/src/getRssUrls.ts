import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

export default function getNewsDataFromRss(): Promise<any> {
  return new Promise((resolve, reject) => {
    var db = admin.firestore();
    db.collection("rss")
      .get()
      .then((snapshot: any) => {
        var data: { url: string; saveField: { collection: string; type: string } }[] = [];
        snapshot.forEach((doc: any) => {
          data.push({
            url: doc.data().url,
            saveField: {
              collection: doc.data().saveField.collection,
              type: doc.data().saveField.type != null ? doc.data().saveField.type : "none",
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
