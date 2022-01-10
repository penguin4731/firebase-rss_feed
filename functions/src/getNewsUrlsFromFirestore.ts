const { firestore } = require("./firestore");

export default function getNewsFromFirestore(collection: string, type: string, id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    var db = firestore.collection(collection);

    if (id != "" || id != null) {
      db = db.where("id", "==", type);
    }

    if (type != "" || type != null) {
      db = db.where("type", "==", type);
    }
    db = db.orderBy("date").limit(5);

    db.get()
      .then((snapshot: any) => {
        var data: string[] = [];
        snapshot.forEach((doc: any) => {
          data.push(doc.data().url);
        });
        console.log(data);
        resolve(data);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
}
