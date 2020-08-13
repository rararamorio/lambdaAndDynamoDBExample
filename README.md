# Lambda と DynamoDB の Example プロジェクト

## 前提条件

- [挑戦！ AWS Lambda ～ SAM を用いた環境構築編～](https://qiita.com/morio1101/items/0f98c987332e16b74a58)
  - 上記でまとめた環境構築の流れで作成したプロジェクトを用いています
- [ AWS CLI バージョン 2 のインストール](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2-windows.html)
  - aws config で環境と整えるのにインストールしました

## 動きを確認するための事前準備

DynamoDB で以下のようなテーブルを作成して、IAM を作成しておく必要があります
※ また作成した IAM を使用出来るよう、実行環境で aws の設定を行っておきましょう

```
ExampleTest
* UserId
* Comment
* EntryDate
* Point
```

次に、dynamo-get 配下に移動して以下のコマンドでパッケージをインストールします

```bash
npm install
```

完了したら、以下のコマンドで動作することを確認しましょう
（動作しなければ何かしら作業が足りていないです）

```bash
npm test
```

## ローカル環境で Lambda の動きを確認する方法

一番上のディレクトリに移動した後は以下のコマンドを実行して、ローカル環境で Lambda を動作させてみましょう

```bash
sam build
sam local start-api
```

http://127.0.0.1:3000/demo-get にアクセスしレスポンス例のような結果が返ってくれば動作しています

レスポンス例

```json
{
  "message": {
    "Comment": "テスト",
    "UserId": 1,
    "EntryDate": 20200809,
    "Point": 10
  }
}
```

TODO： 後の流れはまだ未実施

```bash
sam build
sam deploy --guided
```
