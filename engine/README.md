使用しているライブラリ
pixi.js (描画ライブラリ）
anime.js（アニメイトライブラリ 主にタイムライン使用）
jszip.js（zipライブラリ）
sha256.js（sha256変換ライブラリ）
howler.js（音声再生ライブラリ）

リソースの構造
resource/　（リソース）
	/bg/
	/character/
	/common/effect/
	/common/select/
	/sound/bgm/
	/sound/se/
	/sound/voice/
	/spine/
	/videos/
	/regexp.json
script/		（配列のデータ）
info.json	（再生する際に必要なデータ、分割ファイルの場合次にロードするファイル名など）


サンプルでSTKが入っています。
現状、再生するターゲットのシナリオ固定（STKのmainシナリオ）
今後info.jsonにターゲットのシナリオ名を渡し、そのシナリオを再生する予定