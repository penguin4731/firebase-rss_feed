import * as functions from "firebase-functions";
import rssFeed from "./rssFeed";

exports.scheduledFunction = functions.pubsub
  .schedule("every 30 minutes")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    rssFeed();
    return null;
  });
