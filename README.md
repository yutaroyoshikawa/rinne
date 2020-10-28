# RINNE

## 起動方法

```sh
npm i
npm run dev
```

コマンドを実行して `http://localhost:3000` にアクセスしてください。

## 開発手順

mainブランチにマージされると自動的に本番環境にデプロイされます。

1. 作業内容ごとで新しくブランチを作成（ブランチ名は `feature/**` ）
2. 作成したブランチで作業
3. 実装が完了したらリモートブランチにpush
4. 作業したブランチからPull Requestを作成
5. レビュー開始
6. 修正箇所あれば都度修正
7. Pull Request でレビュワーからapproveをもらえたらmargeボタンを押してmainブランチにマージ
8. タスク完了

## コンポーネント設計

RINNE for webではコンポーネント設計にatomic designを採用しています。

## スタイリング

RINNE for webではCSSでクラス名が他コンポーネントと被らないようにCSS Modulesを採用しています。
スタイルを割り当てる時には、

```vue
<template>
  <div :class="$style.exampleClass">hoge</div>
</template>

<style module lang="scss">
  .exampleClass {
    color: #fff;
  }
</style>
```

のように記述してください。

## eslintの設定

本プロジェクトでは可読性の担保の為にeslintとprettierを設定してコードの書き方を一部統一しています。
ここではvscodeを例に、おすすめの開発環境の設定を紹介します。

### エラー箇所の表示

vscodeには eslint のチェックを行うプラグインがあります。
eslintプラグインをインストールするだけで使えるようになります。

### コードの自動整形

設定されている書き方以外のコードを書くと、eslintからエラーが出る仕組みになっています。
ファイルを保存するときに自動的にコードを整形するように設定することができます。

1. `command + ,` `(Windows: Ctrl + ,)` で設定画面を表示します。
2. 設定画面の検索窓で `eslint` と検索
3. **edit in settings.json** をクリック
4. jsonに 下記項目を追記して保存

```json
"vetur.format.defaultFormatter.js": "none",
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
},
```
