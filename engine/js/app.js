var FPS = function (root) {
    this.FPSText = new PIXI.Text("FPS: ", {
        fontFamily: 'Snippet',
        fontSize: 25,
        fill: 'red',
        color: "0xff0000"
    });
    this.FPSText.position.set(670, 30);
    this.FPSText.anchor.set(0, 0.5);
    this.root = root;
    this.root.app.stage.addChild(this.FPSText);

    this.cur = 0;

};

FPS.prototype.update = function () {
    var deltatime = this.root.app.ticker.deltaMS / 1000;
    this.cur += deltatime / 5;
    this.FPSText.text = "FPS: " + Math.floor(this.root.app.ticker.FPS);

    this.root._fps.push(Math.floor(this.root.app.ticker.FPS));
};

var _zip = null;
var resources = {};

var tool = function () {
    this.target = document.body;
    this.app = null;
    this.contain = null;
    this._fps = [];
    this.per = 1;
    this.size = [640 * this.per, 960 * this.per];
    this.checksum = [];
    this.ratio = this.size[0] / this.size[1];
    this.titleText = null;
    this.fps = null;
};

tool.prototype.init = function (propy) {
    if(!propy)
        propy = {};
    
    if(propy.width)
        this.size[0] = propy.width;

    if(propy.height)
        this.size[1] = propy.height;

    this.app = new PIXI.Application({ width: this.size[0], height: this.size[1], antialias: true, backgroundColor: 0x000000, resolution: 1, legacy: true});

    if(propy.target)
        this.target = propy.target;    
    
        (function() {
            var css, rules, webkit, keyframe;
        
            // styleタグを作成
            css = document.createElement('style');
            css.media = 'screen';
            css.type = 'text/css';
        
            // フェードイン
            webkit = `@-webkit-keyframes load5 {
                0%,
                100% {
                  box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
                }
                12.5% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
                }
                25% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                37.5% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                50% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                62.5% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                75% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                87.5% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;
                }
              }
              `
        
            keyframe = `@keyframes load5 {
                0%,
                100% {
                  box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
                }
                12.5% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
                }
                25% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                37.5% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                50% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                62.5% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                75% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
                }
                87.5% {
                  box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;
                }
              }`
            // ルールをstyleタグに追加
            rules = document.createTextNode([webkit,keyframe].join('\n'));
            css.appendChild(rules);
        
            // head内に作成
            document.getElementsByTagName('head')[0].appendChild(css);
        }());

    var loading = document.createElement("div");
    loading.id = "Comima_loading";
    loading.style.display = "none";
    loading.style.zIndex = 999999;
    loading.style.backgroundColor = "black";
    loading.style.opacity = 0.5;
	loading.innerHTML = `<div>
        <div class="loader"></div>
    </div>`;

    var margin = document.createElement("div");
    loading.appendChild(margin);

    var loader = document.createElement("div");
    loader.style.margin = "100px auto";
    loader.style.fontSize = "25px";
    loader.style.width= "1em";
    loader.style.height= "1em";
    loader.style.borderRadius= "50%";
    loader.style.position= "relative";
    loader.style.textIndent= "-9999em";
    loader.style.WebkitAnimation= "load5 1.1s infinite ease";
    loader.style.animation= "load5 1.1s infinite ease";
    loader.style.WebkitTransform= "translateZ(0)";
    loader.style.MsTransform= "translateZ(0)";
    loader.style.transform= "translateZ(0)";

    margin.appendChild(loader);

    this.target.appendChild(loading);
    this.target.appendChild(this.app.view);
    this.app.view.style.border = "solid 5px blue";
    this.app.ticker.maxFPS = 30;
    
    this.app.stage = new PIXI.display.Stage();

    this.app.stage.sortableChildren = true;
    this.app.stage.interactive = true;
    this.app.stage.on('click', function () {
        if(Adv.core.isCW)
        {
            Adv.core.isCW = false;
            AdvTag.tl.play();
        }
    });

    this.titleText = new PIXI.Text("Scenario Title", {
        fontFamily: 'Snippet',
        fontSize: 50,
        fill: 'white',
        align: 'center',
    });
    
    this.titleText.position.set(this.size[0] / 2, this.size[1] / 2);
    this.titleText.anchor.set(0.5, 0.5);
    this.app.stage.addChild(this.titleText);
    
    Adv.core.init(this);

    this.contain = new container(this);
    this.contain.init();

    this.app.ticker.add(function(delta){
        this.fps.update();
    
        if (Adv.core.isActive()) {
            var bg_progress = Adv.core.BgImgMgr.progreess();
            var chara_progress = Adv.core.CharaImgMgr.progreess();
            var sound_progress = Adv.core.SoundMgr.progreess();
            var spine_progress = Adv.core.SpineMgr.progreess();
            var common_progress = Adv.core.CommonImgMgr.progreess();
            var video_progress = Adv.core.VideoMgr.progreess();
    
    
            bg_progress = isNaN(bg_progress) ? 0 : bg_progress;
            chara_progress = isNaN(chara_progress) ? 0 : chara_progress;
            sound_progress = isNaN(sound_progress) ? 0 : sound_progress;
            spine_progress = isNaN(spine_progress) ? 0 : spine_progress;
            common_progress = isNaN(common_progress) ? 0 : common_progress;
            video_progress = isNaN(video_progress) ? 0 : video_progress;
    
            var percent = (bg_progress + chara_progress + sound_progress + spine_progress + common_progress + video_progress) / 6;
            if (Adv.core.isStart) {
                this.titleText.text = "2/2 Loading... " + parseInt(percent) + "%"
            }
    
            else {
                this.titleText.text = "";
            }
        }
    
        var activeInstancesLength = activeInstances.length;
        if (activeInstancesLength) {
            var i = 0;
            while (i < activeInstancesLength) {
                var activeInstance = activeInstances[i];
    
                if (activeInstance === undefined) {
                    i++;
                    continue;
                }
    
                if (!activeInstance.paused) {
                    activeInstance.tick(this.app.ticker.lastTime);
                } else {
                    var instanceIndex = activeInstances.indexOf(activeInstance);
                    if (instanceIndex > -1) {
                        activeInstances.splice(instanceIndex, 1);
                        activeInstancesLength = activeInstances.length;
                    }
                }
                i++;
            }
        }
    
        if (Adv.core.isLoadDone()) {
            var deltatime = this.app.ticker.deltaMS / 1000;
            this.charaAni(deltatime);
            Adv.core.Update(deltatime);
        }
    }.bind(this));

    window.onresize = this.resize.bind(this);
    this.resize();

    this.fps = new FPS(this);
};

tool.prototype.setSize = function (propy) {

};

tool.prototype.charaAni = function(del) {
    for (var name in Adv.core.animations) {
        Adv.core.animations[name].mouthT += del;

        var limit = 0.4 / 3;
        if (limit < Adv.core.animations[name].mouthT) {
            Adv.core.animations[name].mouthT = 0;

            Adv.core.animations[name].mouthIdx++;

            if (Adv.core.animations[name].mouthIdx === 3) {
                Adv.core.animations[name].mouthIdx = 0;
            }

            else if (Adv.core.animations[name].mouthIdx < 0) {
                Adv.core.animations[name].mouthIdx = 0;
            }

            Adv.core.animations[name].mouth.texture = Adv.core.animations[name].mTexture[Adv.core.animations[name].mouthIdx];
        }

        if (Adv.core.animations[name].eyeIdx !== 0) {
            limit = Adv.core.animations[name].eyeTime[Adv.core.animations[name].eyeIdx] / 3;
            Adv.core.animations[name].eyeT += del;

            if (limit < Adv.core.animations[name].eyeT) {
                Adv.core.animations[name].eyeT = 0;
                Adv.core.animations[name].eyeIdx++;

                if (Adv.core.animations[name].eyeIdx === 3) {
                    Adv.core.animations[name].eyeIdx = 0;

                    if (Adv.core.animations[name].casecade)
                        Adv.core.animations[name].casecade = false;
                    else
                        Adv.core.animations[name].casecade = Math.floor(Math.random() * (10 - 0) + 0) > 7 ? true : false;

                    if (Adv.core.animations[name].casecade)
                        Adv.core.animations[name].interval = 0.1;
                }
            }

            Adv.core.animations[name].eye.texture = Adv.core.animations[name].eTexture[Adv.core.animations[name].eyeIdx];
        }

        else {
            Adv.core.animations[name].intervalCt += del;

            if (Adv.core.animations[name].interval < Adv.core.animations[name].intervalCt) {
                Adv.core.animations[name].intervalCt = 0;
                Adv.core.animations[name].interval = 3;

                Adv.core.animations[name].eyeIdx++;
                Adv.core.animations[name].eye.texture = Adv.core.animations[name].eTexture[Adv.core.animations[name].eyeIdx];
            }
        }
    }
}

tool.prototype.packageLoad = function (path) {
    if(path === "" || path == null)
        return;
   
    this.isload = true;
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer";
    xhr.open("GET", path);
    xhr.onload = function (e) {

        that.isload = false;

        JSZip.loadAsync(xhr.response).then(function (zip) {
            _zip = zip;

            for (var name in zip.files) {
                if (zip.files[name].dir)
                    continue;

                resources[name] = null;
            }

            _zip.folder("").forEach(function (relativePath, file) {
                if (file.dir)
                    return;

                var type = "arraybuffer";

                if(relativePath.indexOf(".ssk") !== -1 || relativePath.indexOf(".json") !== -1 || relativePath.indexOf(".atlas") !== -1)
                    type = "text";
                
                file.async(type).then(function (content) {
                    resources[relativePath] = content;

                    var isReady = true;
                    for (var name in resources) {
                        if (resources[name] === null)
                            isReady = false;
                    }

                    if (isReady) {
                        if(!window.Comima.isinit)
                            init();
                        else
                            resourceLoad();
                    }
                });
            });
        });
    };

    xhr.onprogress = function (e) {
        var progress = (e.loaded / e.total) * 100;
        that.titleText.text = "1/2 Loading... " + parseInt(progress) + "%"
    };

    xhr.send();
};

function resourceLoad()
{
    Adv.core.SoundLoad = false;
    Adv.core.BgImgLoad = false;
    Adv.core.CharaImgLoad = false;
    Adv.core.VideoLoad = false;
    Adv.core.animationLoad = false;
    Adv.core.CommonImgLoad = false;

    Adv.core.SoundMgr.load("resource/sound/", function () { 
        Adv.core.SoundLoad = true; 
    
        if(Adv.core.SoundLoad && Adv.core.BgImgLoad && Adv.core.CharaImgLoad && Adv.core.VideoLoad && Adv.core.animationLoad && Adv.core.CommonImgLoad)
            Adv.core.exec.play();
    });
    Adv.core.BgImgMgr.load("resource/bg/", function () { Adv.core.BgImgLoad = true; 
        if(Adv.core.SoundLoad && Adv.core.BgImgLoad && Adv.core.CharaImgLoad && Adv.core.VideoLoad && Adv.core.animationLoad && Adv.core.CommonImgLoad)
            Adv.core.exec.play();
    });
    Adv.core.CommonImgMgr.load("resource/common/", function () { Adv.core.CommonImgLoad = true; 
        if(Adv.core.SoundLoad && Adv.core.BgImgLoad && Adv.core.CharaImgLoad && Adv.core.VideoLoad && Adv.core.animationLoad && Adv.core.CommonImgLoad)
            Adv.core.exec.play();
    });

    Adv.core.CharaImgMgr.load("resource/character/", function () { Adv.core.CharaImgLoad = true; 
        if(Adv.core.SoundLoad && Adv.core.BgImgLoad && Adv.core.CharaImgLoad && Adv.core.VideoLoad && Adv.core.animationLoad && Adv.core.CommonImgLoad)
            Adv.core.exec.play();
    });
    
    Adv.core.VideoMgr.load("resource/video/", function () { Adv.core.VideoLoad = true; 
        if(Adv.core.SoundLoad && Adv.core.BgImgLoad && Adv.core.CharaImgLoad && Adv.core.VideoLoad && Adv.core.animationLoad && Adv.core.CommonImgLoad)
            Adv.core.exec.play();
    });

    Adv.core.SpineMgr.load("resource/spine/",function () { Adv.core.animationLoad = true; 
        if(Adv.core.SoundLoad && Adv.core.BgImgLoad && Adv.core.CharaImgLoad && Adv.core.VideoLoad && Adv.core.animationLoad && Adv.core.CommonImgLoad)
            Adv.core.exec.play();
    });
    
}

function init() {
    var query = QueryString.parse(location.search.substr(1));
    var filename = "/script/main.ssk";

    Adv.core.regexp = ["「", "」", "『", "』", "【", "】", "―", "ー", "…", "：", ":"];
    window.Comima.isinit = true;
    window.Comima.packageLoad("./resource/" + JSON.parse(resources["info.json"]).next);

    var scripts = {};
    var list = [];
    for (var name in resources) {
        if (name.indexOf("script/") !== -1) {
            var last = name.lastIndexOf("/");
            var filename = name.substr(last + 1, name.length).replace(".ssk", "");
            scripts[filename] = resources[name];
        }
    }

    Adv.core.StartAdvTest(scripts);
    window.Comima.balance();
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function uintToString(uintArray) {
    var encodedString = large_buffer_to_string(uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

function buffer_to_string(buf) {
    return String.fromCharCode.apply("", new Uint16Array(buf))
  }
  
  // ただし、文字列が長すぎる場合は RangeError: Maximum call stack size exceeded. が発生してしまう。
  // 以下は1024バイト単位に分割して処理する場合
  
  function large_buffer_to_string(buf) {
    var tmp = [];
    var len = 1024;
    for (var p = 0; p < buf.byteLength; p += len) {
      tmp.push(buffer_to_string(buf.slice(p, p + len)));
    }
    return tmp.join("");
  }

tool.prototype.balance = function () {
    var sum = 0;
    for (var i = 0; i < this._fps.length; i++) {
        sum += this._fps[i];
    }

    var avg = sum / this._fps.length;

    if (avg < 15) {
        this.per -= 0.1;
        this.size = [640 * this.per, 960 * this.per];
        this.ratio = this.size[0] / this.size[1];

        this.resize();
        this.contain.root.scale.set(this.per, this.per);
        //this.contain.containers.bg.scale.set(this.per, this.per);
        this.app.renderer.resize(this.size[0], this.size[1]);
        this.checksum.push(1);
    }

    else if (avg > 24 && this.checksum.length !== 0) {
        this.per += 0.1;

        if (this.per > 1) {
            this.per = 1;
        }

        this.size = [640 * this.per, 960 * this.per];
        this.ratio = this.size[0] / this.size[1];

        this.resize();
        this.contain.root.scale.set(this.per, this.per);
        //this.contain.containers.bg.scale.set(this.per, this.per);
        this.app.renderer.resize(this.size[0], this.size[1]);
        this.checksum.pop();
    }

    this._fps = [];
    setTimeout(this.balance.bind(this), 500);
};

tool.prototype.resize = function(){
    if (window.innerWidth / window.innerHeight >= this.ratio) {
        var w = window.innerHeight * this.ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / this.ratio;
    }
    this.app.view.style.width = (w - 10) + 'px';
    this.app.view.style.height = (h - 10) + 'px';

    this.app.view.style.position = "absolute";
    this.app.view.style.left = ((window.innerWidth / 2) - (w / 2)) + "px";
    this.app.view.style.top = ((window.innerHeight / 2) - (h / 2)) + "px";

    var loading = document.getElementById("Comima_loading");
    
    if(loading)
    {
        loading.style.width = (w) + 'px';
        loading.style.height = (h) + 'px';
    
        loading.style.position = "absolute";
        loading.style.left = ((window.innerWidth / 2) - (w / 2)) + "px";
        loading.style.top = ((window.innerHeight / 2) - (h / 2)) + "px";

        loading.firstElementChild.style.marginTop = (h / 2) + 'px';
    }
    
}

tool.prototype.lerp = function(start, end, amt) {
    return start + (end - start) * amt;
};

var QueryString = {
    parse: function (text, sep, eq, isDecode) {
        text = text || location.search.substr(1);
        sep = sep || '&';
        eq = eq || '=';
        var decode = (isDecode) ? decodeURIComponent : function (a) { return a; };
        return text.split(sep).reduce(function (obj, v) {
            var pair = v.split(eq);
            obj[pair[0]] = decode(pair[1]);
            return obj;
        }, {});
    },
    stringify: function (value, sep, eq, isEncode) {
        sep = sep || '&';
        eq = eq || '=';
        var encode = (isEncode) ? encodeURIComponent : function (a) { return a; };
        return Object.keys(value).map(function (key) {
            return key + eq + encode(value[key]);
        }).join(sep);
    },
};

window.engine = (function () {
    function play() {

    }
    return play;
})();

window.raf = 1;
window.Comima = new tool();