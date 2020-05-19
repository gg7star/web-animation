<!DOCTYPE html>
<html lang="ja">
<head>

<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no, initial-scale=1" />
	
<style>

body
{

	 margin:0;
	 background-color: #000000;
}
	
	h1{
 font:normal 40pt Arial;
 color:#ABF200;
 text-shadow: 0 1px 0 #ccc,
 0 2px 0 #c9c9c9,
 0 3px 0 #bbb,
 0 4px 0 #b9b9b9,
 0 5px 0 #aaa,
 0 6px 1px rgba(0,0,0,.1),
 0 0 5px rgba(0,0,0,.1),
 0 1px 3px rgba(0,0,0,.3),
 0 3px 5px rgba(0,0,0,.2),
 0 5px 10px rgba(0,0,0,.25),
 0 10px 10px rgba(0,0,0,.2),
 0 20px 20px rgba(0,0,0,.15)
}

</style>

<title>シナリオエディター</title>
<link rel="stylesheet" href="./css/font.css">
</head>
<body style="overflow-y:hidden;">

<div id="pixiview">
	
</div>

<script type="text/javascript" src="./js/lib/jszip-utils.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script type="text/javascript" src="./js/lib/jszip.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script type="text/javascript" src="./js/lib/jquery-2.1.3.min.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script type="text/javascript" src="./js/lib/anime.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script type="text/javascript" src="./js/lib/howler.core.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script type="text/javascript" src="./js/lib/jungle.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script type="text/javascript" src="./js/lib/pixi.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script type="text/javascript" src="./js/lib/pixi-layers.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script type="text/javascript" src="./js/lib/pixi-spine.js?ver=<?php echo date("YmdHis"); ?>"></script>
<script src="./js/lib/sha256.js?ver=<?php echo date("YmdHis"); ?>"></script>
<!--
<script type="text/javascript" src="./js/all.js?ver="></script>
-->



<script type="text/javascript" src="./js/Adv/lib/container.js?ver="></script>
<script type="text/javascript" src="./js/Adv/lib/SpineManager.js?ver="></script>
<script type="text/javascript" src="./js/Adv/lib/ImageManager.js?ver="></script>
<script type="text/javascript" src="./js/Adv/lib/SoundManager.js?ver="></script>
<script type="text/javascript" src="./js/Adv/lib/VideoManager.js?ver="></script>
<script type="text/javascript" src="./js/Adv/Rain.js?ver="></script>
<script type="text/javascript" src="./js/Adv/Blossoms.js?ver="></script>
<script type="text/javascript" src="./js/Adv/Snow.js?ver="></script>
<script type="text/javascript" src="./js/Adv/Advlib.js?ver="></script>
<script type="text/javascript" src="./js/Adv/AdvTag.js?ver="></script>
<script type="text/javascript" src="./js/Adv/AdvModule.js?ver="></script>
<script type="text/javascript" src="./js/Adv/AdvCore.js?ver="></script>

<script type="text/javascript" src="./js/yure.js?ver="></script>
<script type="text/javascript" src="./js/app.js?ver="></script>

<script>
	Comima.init({target: document.getElementById("pixiview")});
	Comima.packageLoad("./resource/yure.data");
</script>
</body>
</html>

