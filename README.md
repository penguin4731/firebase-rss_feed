# firebase-rss_feed

Firebase Firestoreと連携したRSSをよみとってくれるものです。

## 使い方

FirestoreにRSSのURLを以下のように配置してください。
```
rss ── id(random) 
        ├── url: RSSのURL
        └── saveField
             ├──　collection: 保存先のcollection名
             ├──　id: 識別子（任意）
             └──　type: 識別子（任意）
                   
```

そうすると、指定したCollectionに対してニュースが保存されます。
