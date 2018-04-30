# RetainerReport

[FINAL FANTASY XIV The Lodestone](http://jp.finalfantasyxiv.com/lodestone/) サイトで公開されているリテイナー達の販売履歴を一覧化して表示する事ができるツールです。

![RetainerReport](https://sakmas.github.io/RetainerReport/images/screen2.png)

## 説明

リテイナー毎に分かれているアイテム販売履歴ページからデータを収集、一覧にして表示します。

## 使い方

ウェブブラウザ上で実行する Bookmarklet です。下記のスクリプト文字列をブックマークに登録し、Lodestone ページ上で実行します。

    javascript:(function(d){var s=d.createElement('script');s.src='https://sakmas.github.io/RetainerReport/dist/main.bundle.js';s.charset='utf-8';d.body.appendChild(s);})(document);

このようにブックマークバーに追加すると便利です。

![RetainerReport](https://sakmas.github.io/RetainerReport/images/screen1.png)

* Lodestone にログインしている必要があります。
* Lodestone サイト内(URLが jp.finalfantasyxiv.com ではじまるページ)であればどのページからでも実行できます。
* スマートフォン版には対応していませんが、スマートフォンにてPC版ページを表示することで使用できます。
* Lodestone にて公開されているデータ以上のものは取得できません。

## Licence

[MIT](https://github.com/sakmas/RetainerReport/blob/master/LICENSE)
