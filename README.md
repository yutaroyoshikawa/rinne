# RINNE

## 起動方法

```sh
$ npm i
$ npm run dev
```
コマンドを実行して `http://localhost:3000` にアクセスしてください。

## 開発手順

mainリポジトリにマージされると自動的に本番環境にデプロイされます。

1. 作業内容ごとで新しくブランチを作成（ブランチ名は `feature/**` ）
2. 作成したリポジトリで作業
3. 実装が完了したらリモートリポジトリにpush
4. 作業したブランチからPull Requestを作成
5. レビュー開始
6. 修正箇所あれば都度修正
7. Pull Request でレビュワーからapprove をもらえたらmargeボタンを押して main リポジトリにマージ
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
    color: #FFF;
  }
</style>
```

のように記述してください。
