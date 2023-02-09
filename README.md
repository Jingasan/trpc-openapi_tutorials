# trpc-openapiのチュートリアルコード

trpcを利用したTODOアプリを実装。OpenAPIでAPI仕様書を作成。

サーバーサイド：Expressを使用／クライアントサイド：Reactを使用

## 動作確認方法

１．APIサーバーを起動する。

```
$ cd server
$ npm install
$ npm run dev
```

２．別ターミナルでフロントエンドのWebサーバーを起動する。

```
$ cd client
$ npm install
$ npm run dev
```

３．ブラウザから以下のURLにアクセスし、TODOアプリを表示する。

```
http://127.0.0.1:5173
```

４．ブラウザから以下のURLにアクセスし、API仕様書を表示する。

```
http://127.0.0.1:3000
```
