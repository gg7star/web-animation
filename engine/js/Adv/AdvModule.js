AdvTag.tl = null;
AdvTag.timelines = [];
AdvTag.labels = {};
AdvTag.exit = {};

AdvTag.plugin.tag = {};

function test()
{
    AdvTag.tl = null;
    AdvTag.timelines = [];
    
    var breakpoint = 0;

    AdvTag.tl = anime.timeline({
        autoplay: false,
        update: function (instance) {
            for (var i = 0; i < AdvTag.timelines.length; i++) {
                AdvTag.timelines[i].seek(instance.currentTime);
            }

            var controler = document.getElementById("test_controler");
            if (controler) {
                controler.value = (instance.currentTime / AdvTag.tl.duration) * 100;
                var viewer = document.getElementById("test_secViewer");

                if (viewer)
                    viewer.value = (parseInt(AdvTag.tl.duration * (controler.value / 100)) / 1000) + "秒";
            }
        }
    });

    var duplication = {
        chara: {}
    };

    for (var i = 0; i < list.length; i++) {
        if (Array.isArray(list[i])) {
            for (var j = 0; j < list[i].length; j++) {
                if (AdvTag.plugin.tag[list[i][j].tagname]) {
                    switch (list[i][j].tagname) {
                        case "chara_show":
                            var name = "";
                            var isArray = Array.isArray(list[i][j].data);

                            if (isArray) {
                                name = list[i][j].data[0].pm.name.value.substring(list[i][j].data[0].pm.name.value.lastIndexOf("/") + 1);
                            }

                            else {
                                name = list[i][j].data.pm.name.value.substring(list[i][j].data.pm.name.value.lastIndexOf("/") + 1);
                            }

                            if (name in duplication.chara) {
                                console.log("duplication");
                                if (isArray)
                                    list[i][j].data[0].pm.duplication = duplication.chara[name];
                                else
                                    list[i][j].data.pm.duplication = duplication.chara[name];
                                duplication.chara[name]++;
                            }

                            else
                                duplication.chara[name] = 0;
                            break;
                    }
                }
            }
        }

        else {
            switch (list[i].tagname) {
                case "chara_show":
                    var name = "";
                    var isArray = Array.isArray(list[i].data);
                    if (isArray) {
                        name = list[i].data[0].pm.name.value.substring(list[i].data[0].pm.name.value.lastIndexOf("/") + 1);
                    }

                    else {
                        name = list[i].data.pm.name.value.substring(list[i].data.pm.name.value.lastIndexOf("/") + 1);
                    }

                    if (name in duplication.chara) {
                        console.log("duplication");

                        if (isArray)
                            list[i].data[0].pm.duplication = duplication.chara[name];
                        else
                            list[i].data.pm.duplication = duplication.chara[name];

                        duplication.chara[name]++;
                    }

                    else
                        duplication.chara[name] = 0;
                    break;
            }
        }
    }

    for (var i = 0; i < list.length; i++) {
        if (Array.isArray(list[i])) {
            for (var j = 0; j < list[i].length; j++) {
                if (AdvTag.plugin.tag[list[i][j].tagname]) {
                    switch (list[i][j].tagname) {
                        case "label":
                            if (AdvTag.plugin.tag[list[i][j].tagname])
                                AdvTag.plugin.tag[list[i][j].tagname].init(list[i]);
                            else
                                console.log(list[i][j].tagname);
                            break;

                        default:
                            if (AdvTag.plugin.tag[list[i][j].tagname])
                                AdvTag.plugin.tag[list[i][j].tagname].init(list[i][j].data);
                            else
                                console.log(list[i][j].tagname);
                            break;
                    }
                }

                if (Array.isArray(list[i][j].data)) {
                    for (var k = 0; k < list[i][j].data.length; k++) {
                        if (list[i][j].data[k].pm.breakpoint)
                            breakpoint = list[i][j].data[k].start;
                    }
                }

                else {
                    if (list[i][j].data.pm.breakpoint) {
                        breakpoint = list[i][j].data.start;
                    }
                }
            }
        }

        else {
            switch (list[i].tagname) {
                default:
                    if (AdvTag.plugin.tag[list[i].tagname])
                        AdvTag.plugin.tag[list[i].tagname].init(list[i].data);
                    else
                        console.log(list[i].tagname);
                    break;
            }

            if (Array.isArray(list[i].data)) {
                for (var j = 0; j < list[i].data.length; j++) {
                    if (list[i].data[j].pm.breakpoint)
                        breakpoint = list[i].data[j].start;
                }
            }

            else {
                if (list[i].data.pm.breakpoint) {
                    breakpoint = list[i].data.start;
                }
            }
        }
    }

    for(var i=0; i<list.length; i++)
    {
        if (Array.isArray(list[i])) {
            var j = list[i].length - 1;

            if (Array.isArray(list[i][j].data)) {
                var k = list[i][j].data.length - 1;
                AdvTag.tl.duration = Math.max(AdvTag.tl.duration, list[i][j].data[k].start + parseFloat(list[i][j].data[k].pm.time.value) + 1);
            }

            else {
                if(list[i][j].data.pm.time === undefined)
                    list[i][j].data.pm.time = {value: 0};

                AdvTag.tl.duration = Math.max(AdvTag.tl.duration, list[i][j].data.start + parseFloat(list[i][j].data.pm.time.value) + 1);
            }
        }

        else {
            if (Array.isArray(list[i].data)) {
                var k = list[i].data.length - 1;
                ///AdvTag.tl.duration = list[i].data[k].start + parseFloat(list[i].data[k].pm.time.value);

                if(list[i].data[k].time === undefined)
                {
                    list[i].data[k].time = list[i].data[k].pm.time;
                }

                if(list[i].data[k].time.value)
                    AdvTag.tl.duration = Math.max(AdvTag.tl.duration, list[i].data[k].start + parseFloat(list[i].data[k].time.value) + 1);
                else
                    AdvTag.tl.duration = Math.max(AdvTag.tl.duration,list[i].data[k].start + parseFloat(list[i].data[k].time) + 1);
                    
            }

            else {
                if (list[i].data.pm.time == null) {
                    list[i].data.pm.time = { value: 0 };
                }

                else if(list[i].data.pm.time.value == null)
                {
                    list[i].data.pm.time = { value: list[i].data.pm.time };
                }

                AdvTag.tl.duration = Math.max(AdvTag.tl.duration, list[i].data.start + parseFloat(list[i].data.pm.time.value) + 1);
            }
        }

        console.log("i: " + i + " duration: " + AdvTag.tl.duration);
    }
    
    AdvTag.tl.seek(breakpoint);
}

AdvTag.plugin.exec = {
    array_tag: [],
    master_tag: {},
    current_order_index: -1,
    isStop: true,
    isInit: false,
    init: function () {
        for (var order_type in AdvTag.plugin.tag) {
            this.master_tag[order_type] = object(AdvTag.plugin.tag[order_type]);
            this.master_tag[order_type].parent = this.parent
        }

        this.parent.variable.tf["system"] = {};
        this.parent.variable.tf["system"]["backlog"] = [];

        var breakpoint = 0;

        AdvTag.tl = anime.timeline({
            autoplay: false,
            update: function (instance) {
                for (var i = 0; i < AdvTag.timelines.length; i++) {
                    AdvTag.timelines[i].seek(instance.currentTime);
                }

                var controler = document.getElementById("test_controler");
                if (controler) {
                    controler.value = (instance.currentTime / AdvTag.tl.duration) * 100;
                    var viewer = document.getElementById("test_secViewer");

                    if (viewer)
                        viewer.value = (parseInt(AdvTag.tl.duration * (controler.value / 100)) / 1000) + "秒";
                }
            }
        });

        var duplication = {
            chara: {}
        };

        for (var i = 0; i < Adv.core.scenario.length; i++) {
            if (Array.isArray(Adv.core.scenario[i])) {
                for (var j = 0; j < Adv.core.scenario[i].length; j++) {
                    if (AdvTag.plugin.tag[Adv.core.scenario[i][j].tagname]) {
                        switch (Adv.core.scenario[i][j].tagname) {
                            case "chara_show":
                                var name = "";
                                var isArray = Array.isArray(Adv.core.scenario[i][j].data);

                                if (isArray) {
                                    name = Adv.core.scenario[i][j].data[0].pm.name.value.substring(Adv.core.scenario[i][j].data[0].pm.name.value.lastIndexOf("/") + 1);
                                }

                                else {
                                    name = Adv.core.scenario[i][j].data.pm.name.value.substring(Adv.core.scenario[i][j].data.pm.name.value.lastIndexOf("/") + 1);
                                }

                                if (name in duplication.chara) {
                                    console.log("duplication");
                                    if (isArray)
                                        Adv.core.scenario[i][j].data[0].pm.duplication = duplication.chara[name];
                                    else
                                        Adv.core.scenario[i][j].data.pm.duplication = duplication.chara[name];
                                    duplication.chara[name]++;
                                }

                                else
                                    duplication.chara[name] = 0;
                                break;
                        }
                    }
                }
            }

            else {
                switch (Adv.core.scenario[i].tagname) {
                    case "chara_show":
                        var name = "";
                        var isArray = Array.isArray(Adv.core.scenario[i].data);
                        if (isArray) {
                            name = Adv.core.scenario[i].data[0].pm.name.value.substring(Adv.core.scenario[i].data[0].pm.name.value.lastIndexOf("/") + 1);
                        }

                        else {
                            name = Adv.core.scenario[i].data.pm.name.value.substring(Adv.core.scenario[i].data.pm.name.value.lastIndexOf("/") + 1);
                        }

                        if (name in duplication.chara) {
                            console.log("duplication");

                            if (isArray)
                                Adv.core.scenario[i].data[0].pm.duplication = duplication.chara[name];
                            else
                                Adv.core.scenario[i].data.pm.duplication = duplication.chara[name];

                            duplication.chara[name]++;
                        }

                        else
                            duplication.chara[name] = 0;
                        break;
                }
            }
        }

        for (var i = 0; i < Adv.core.scenario.length; i++) {
            if (Array.isArray(Adv.core.scenario[i])) {
                for (var j = 0; j < Adv.core.scenario[i].length; j++) {
                    if (AdvTag.plugin.tag[Adv.core.scenario[i][j].tagname]) {
                        switch (Adv.core.scenario[i][j].tagname) {
                            case "label":
                                if (AdvTag.plugin.tag[Adv.core.scenario[i][j].tagname])
                                    AdvTag.plugin.tag[Adv.core.scenario[i][j].tagname].init(Adv.core.scenario[i]);
                                else
                                    console.log(Adv.core.scenario[i][j].tagname);
                                break;

                            default:
                                if (AdvTag.plugin.tag[Adv.core.scenario[i][j].tagname])
                                    AdvTag.plugin.tag[Adv.core.scenario[i][j].tagname].init(Adv.core.scenario[i][j].data);
                                else
                                    console.log(Adv.core.scenario[i][j].tagname);
                                break;
                        }
                    }

                    if (Array.isArray(Adv.core.scenario[i][j].data)) {
                        for (var k = 0; k < Adv.core.scenario[i][j].data.length; k++) {
                            if (Adv.core.scenario[i][j].data[k].pm.breakpoint)
                                breakpoint = Adv.core.scenario[i][j].data[k].start;
                        }
                    }

                    else {
                        if (Adv.core.scenario[i][j].data.pm.breakpoint) {
                            breakpoint = Adv.core.scenario[i][j].data.start;
                        }
                    }
                }
            }

            else {
                switch (Adv.core.scenario[i].tagname) {
                    default:
                        if (AdvTag.plugin.tag[Adv.core.scenario[i].tagname])
                            AdvTag.plugin.tag[Adv.core.scenario[i].tagname].init(Adv.core.scenario[i].data);
                        else
                            console.log(Adv.core.scenario[i].tagname);
                        break;
                }

                if (Array.isArray(Adv.core.scenario[i].data)) {
                    for (var j = 0; j < Adv.core.scenario[i].data.length; j++) {
                        if (Adv.core.scenario[i].data[j].pm.breakpoint)
                            breakpoint = Adv.core.scenario[i].data[j].start;
                    }
                }

                else {
                    if (Adv.core.scenario[i].data.pm.breakpoint) {
                        breakpoint = Adv.core.scenario[i].data.start;
                    }
                }
            }
        }

        for(var i=0; i<Adv.core.scenario.length; i++)
        {
            if (Array.isArray(Adv.core.scenario[i])) {
                var j = Adv.core.scenario[i].length - 1;
    
                if (Array.isArray(Adv.core.scenario[i][j].data)) {
                    var k = Adv.core.scenario[i][j].data.length - 1;
                    AdvTag.tl.duration = Math.max(AdvTag.tl.duration, Adv.core.scenario[i][j].data[k].start + parseFloat(Adv.core.scenario[i][j].data[k].pm.time.value) + 1);
                }
    
                else {
                    if(Adv.core.scenario[i][j].data.pm.time === undefined)
                        Adv.core.scenario[i][j].data.pm.time = {value: 0};

                    AdvTag.tl.duration = Math.max(AdvTag.tl.duration, Adv.core.scenario[i][j].data.start + parseFloat(Adv.core.scenario[i][j].data.pm.time.value) + 1);
                }
            }
    
            else {
                if (Array.isArray(Adv.core.scenario[i].data)) {
                    var k = Adv.core.scenario[i].data.length - 1;
                    ///AdvTag.tl.duration = Adv.core.scenario[i].data[k].start + parseFloat(Adv.core.scenario[i].data[k].pm.time.value);

                    if(Adv.core.scenario[i].data[k].time === undefined)
                    {
                        Adv.core.scenario[i].data[k].time = Adv.core.scenario[i].data[k].pm.time;
                    }
    
                    if(Adv.core.scenario[i].data[k].time.value)
                        AdvTag.tl.duration = Math.max(AdvTag.tl.duration, Adv.core.scenario[i].data[k].start + parseFloat(Adv.core.scenario[i].data[k].time.value) + 1);
                    else
                        AdvTag.tl.duration = Math.max(AdvTag.tl.duration,Adv.core.scenario[i].data[k].start + parseFloat(Adv.core.scenario[i].data[k].time) + 1);
                        
                }
    
                else {
                    if (Adv.core.scenario[i].data.pm.time == null) {
                        Adv.core.scenario[i].data.pm.time = { value: 0 };
                    }

                    else if(Adv.core.scenario[i].data.pm.time.value == null)
                    {
                        Adv.core.scenario[i].data.pm.time = { value: Adv.core.scenario[i].data.pm.time };
                    }
    
                    AdvTag.tl.duration = Math.max(AdvTag.tl.duration, Adv.core.scenario[i].data.start + parseFloat(Adv.core.scenario[i].data.pm.time.value) + 1);
                }
            }

            console.log("i: " + i + " duration: " + AdvTag.tl.duration);
        }
        
        AdvTag.tl.seek(breakpoint);
    },

    stop: function () {
        if (!this.isStop) {
            this.isStop = true;
            this.current_order_index--;

            var loading = document.getElementById("Comima_loading");
            if (loading) {
                loading.style.display = "";
            }
        }
    },
    play: function () {
        if (this.isStop) {
            this.isStop = false;
            this.nextOrder();

            var loading = document.getElementById("Comima_loading");
            if (loading) {
                loading.style.display = "none";
            }

            this.init();

            for(var i=0; i<Adv.core.scenario.length; i++)
            {
                if(Array.isArray(Adv.core.scenario[i]))
                {
                    if(Adv.core.scenario[i][0].tagname === "label")
                    {
                        if(Adv.core.scenario[i][1].tagname !== "chara_show")
                            continue;

                        var pm = {};

                        for(var name in Adv.core.scenario[i][1].data[0].pm)
                        {
                            pm[name] = Adv.core.scenario[i][1].data[0].pm[name].value === undefined ? Adv.core.scenario[i][1].data[0].pm[name] : Adv.core.scenario[i][1].data[0].pm[name].value;
                        }

                        if(Adv.core.scenario[i][1].data[0].pm.tagname === "chara_show")
                        {
                            pm.name = pm.name.substring(pm.name.lastIndexOf("/") + 1);
                            Adv.core.exec.master_tag["prev_chara"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i][1].data[0].pm.tagname].pm), pm));
                        }

                        else if(Adv.core.scenario[i][1].data[0].pm.tagname === "text_show")
                        {
                            Adv.core.exec.master_tag["prev_text"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i][1].data[0].pm.tagname].pm), pm));
                        }

                        else if(Adv.core.scenario[i][1].data[0].pm.tagname === "spine")
                        {
                            Adv.core.exec.master_tag["prev_spine"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i][1].data[0].pm.tagname].pm), pm));
                        }

                        else if(Adv.core.scenario[i][1].data[0].pm.tagname === "effects")
                        {
                            Adv.core.exec.master_tag["prev_effects"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i][1].data[0].pm.tagname].pm), pm));
                        }

                        continue;
                    }

                    if(Adv.core.scenario[i][0].tagname !== "chara_show")
                        continue;

                    var pm = {};

                    for(var name in Adv.core.scenario[i][0].data[0].pm)
                    {
                        pm[name] = Adv.core.scenario[i][0].data[0].pm[name].value === undefined ? Adv.core.scenario[i][0].data[0].pm[name] : Adv.core.scenario[i][0].data[0].pm[name].value;
                    }

                    if(Adv.core.scenario[i][0].data[0].pm.tagname === "chara_show")
                    {
                        pm.name = pm.name.substring(pm.name.lastIndexOf("/") + 1);
                        Adv.core.exec.master_tag["prev_chara"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i][0].data[0].pm.tagname].pm), pm));
                    }

                    else if(Adv.core.scenario[i][0].data[0].pm.tagname === "text_show")
                    {
                        Adv.core.exec.master_tag["prev_text"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i][0].data[0].pm.tagname].pm), pm));
                    }

                    else if(Adv.core.scenario[i][0].data[0].pm.tagname === "spine")
                    {
                        Adv.core.exec.master_tag["prev_spine"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i][0].data[0].pm.tagname].pm), pm));
                    }

                    else if(Adv.core.scenario[i].data[0].pm.tagname === "bg_show")
                    {
                        Adv.core.exec.master_tag["prev_bg"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i].data[0].pm.tagname].pm), pm));
                    }

                    else if(Adv.core.scenario[i].data[0].pm.tagname === "effects")
                    {
                        Adv.core.exec.master_tag["prev_effects"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i].data[0].pm.tagname].pm), pm));
                    }
                }

                else
                {
                    if(Adv.core.scenario[i].tagname === "select")
                    {
                        if(Adv.core.selects === undefined)
                            Adv.core.selects = {};

                        var name = Adv.core.scenario[i].data.pm.image.value.substring(Adv.core.scenario[i].data.pm.image.value.lastIndexOf("/") + 1);

                        Adv.core.selects[Adv.core.scenario[i].data.pm.label.value] = new PIXI.Sprite(Adv.core.CommonImgMgr.getTexture(name));
                        Adv.core.selects[Adv.core.scenario[i].data.pm.label.value].alpha = 0;
                        Adv.core.selects[Adv.core.scenario[i].data.pm.label.value].anchor.set(0.5, 0.5);

                        var text = new PIXI.Text(Adv.core.scenario[i].data.pm.text.value, new PIXI.TextStyle({
                            fill: ['#ffffff'], // gradient
                        }));

                        text.anchor.set(0.5, 0.5);
                
                        Adv.core.selects[Adv.core.scenario[i].data.pm.label.value].addChild(text);

                        Adv.core.selects[Adv.core.scenario[i].data.pm.label.value].interactive = true;
                        Adv.core.selects[Adv.core.scenario[i].data.pm.label.value].buttonMode = true;

                        Adv.core.selects[Adv.core.scenario[i].data.pm.label.value].on('pointerdown', function(){
                            Comima.contain.selectActivate(false);
                            for(var name in Adv.core.selects)
                            {
                                Adv.core.selects[name].alpha = 0;
                            }

                            if(AdvTag.labels[this.target.value])
                            {
                                AdvTag.tl.seek(AdvTag.labels[this.target.value]);
                                AdvTag.tl.play();
                            }
                        }.bind(Adv.core.scenario[i].data.pm));
                        Comima.contain.addChild(Adv.core.selects[Adv.core.scenario[i].data.pm.label.value], "select");
                    }

                    switch(Adv.core.scenario[i].tagname)
                    {
                        case "chara_show":
                        case "text_show":
                        case "spine":
                        case "bg_show":
                        case "effects":
                        break;

                        default:
                            continue;
                    }

                    var pm = {};

                    if(Array.isArray(Adv.core.scenario[i].data))
                    {
                        for(var name in Adv.core.scenario[i].data[0].pm)
                        {
                            pm[name] = Adv.core.scenario[i].data[0].pm[name].value === undefined ? Adv.core.scenario[i].data[0].pm[name] : Adv.core.scenario[i].data[0].pm[name].value;
                        }
        
                        if(Adv.core.scenario[i].data[0].pm.tagname === "chara_show")
                        {
                            pm.name = pm.name.substring(pm.name.lastIndexOf("/") + 1);
                            Adv.core.exec.master_tag["prev_chara"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i].data[0].pm.tagname].pm), pm));
                        }
        
                        else if(Adv.core.scenario[i].data[0].pm.tagname === "text_show")
                        {
                            Adv.core.exec.master_tag["prev_text"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i].data[0].pm.tagname].pm), pm));
                        }
        
                        else if(Adv.core.scenario[i].data[0].pm.tagname === "spine")
                        {
                            Adv.core.exec.master_tag["prev_spine"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i].data[0].pm.tagname].pm), pm));
                        }

                        else if(Adv.core.scenario[i].data[0].pm.tagname === "effects")
                        {
                            Adv.core.exec.master_tag["prev_effects"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i].data[0].pm.tagname].pm), pm));
                        }
                    }
                    
                    else 
                    {
                        for(var name in Adv.core.scenario[i].data.pm)
                        {
                            pm[name] = Adv.core.scenario[i].data.pm[name].value === undefined ? Adv.core.scenario[i].data.pm[name] : Adv.core.scenario[i].data.pm[name].value;
                        }

                        if(Adv.core.scenario[i].tagname === "bg_show")
                            Adv.core.exec.master_tag["prev_bg"].start($.extend(true, $.cloneObject(Adv.core.exec.master_tag[Adv.core.scenario[i].data.pm.tagname].pm), pm));
                    }
                }
            }

            AdvTag.tl.play();
        }
    },
    
    buildTag: function (array_tag, label_name) {

    },
    buildTagIndex: function (array_tag, index, auto_next) {

    },
    completeTrans: function () {

    },
    hideNextImg: function () {

    },
    showNextImg: function () {

    },
    nextOrder: function () {

    },
    checkCw: function (tag) {

    },
    nextOrderWithTag: function (target_tags) {

    },
    convertEntity: function (pm) {

    },
    checkVital: function (tag) {

    },
    checkCond: function (tag) {

    },
    startTag: function (name, pm) {

    },
    nextOrderWithLabel: function (label_name, scenario_file) {

    },
    nextOrderWithIndex: function (index, scenario_file, flag, insert, auto_next) {

    },

    CreateChara: function (pm) {

    },

    pushBackLog: function (str, type) {

    }
};

AdvTag.plugin.tag.s = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                AdvTag.tl.pause();
                Comima.contain.selectActivate(true);
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.label = {
    init: function (list) {
        if (Array.isArray(list)) {
            var max = 0;
            var min = 10000000000;
            for (var k = 1; k < list.length; k++) {
                if (Array.isArray(list[k].data)) {
                    for (var p = 0; p < list[k].data.length; p++) {
                        var duration = list[k].data[p].time === undefined ? 1 : (parseInt(list[k].data[p].time) === 0 ? 1 : parseInt(list[k].data[p].time));
                        max = Math.max(max, list[k].data[p].start + duration);
                        min = Math.min(min, list[k].data[p].start);
                    }
                }
            }

            AdvTag.labels[list[0].data.pm.text.value] = min;
        }

        else {
            AdvTag.labels[list.pm.text.value] = list.start;
        }
    }
};

AdvTag.plugin.tag.chara_show = {
    init: function (data) {
        var tl = null;
        tl = anime.timeline({
            autoplay: false,
            easing: 'linear',
            direction: 'alternate',
            targets: {
                rotate: parseInt(data[0].pm.rotate.value),
                blur: parseInt(data[0].pm.blur.value),
                posx: parseInt(data[0].pm.posx.value),
                posy: parseInt(data[0].pm.posy.value),
                scale: parseInt(data[0].pm.scale.value),
                opacity: 0,
                cross: 0,
                index: 0,
                anchorx: parseFloat(data[0].pm.anchorx.value),
                anchory: parseFloat(data[0].pm.anchory.value),
            }
        });

        var duration = data[0].pm.time === undefined ? 1 : (parseInt(data[0].pm.time.value) === 0 ? 1 : parseInt(data[0].pm.time.value));

        var instance = {
            opacity: parseInt(data[0].after.opacity),
            name: data[0].pm.name.value,
            easing: 'linear',
            duration: duration
        };

        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        data[0].pm.idx = 0;

        for (var event_i = 0; event_i < event.length; event_i++) {
            instance[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);
                if (this.duplication !== undefined) {
                    name = this.duplication + "_" + name;
                }

                Adv.core.sprites[name].anchor.set(that.anchorx, that.anchory);
                Adv.core.sprites[name].alpha = parseInt(that.opacity) / 100;
                Adv.core.sprites[name].position.set(parseFloat(that.posx), parseFloat(that.posy));
                Adv.core.sprites[name].rotation = that.rotate * (Math.PI / 180);
                Adv.core.sprites[name].scale.set((that.scale / 100), (that.scale / 100))
                Adv.core.sprites[name].filters[0].blur = that.blur;
            }.bind(data[0].pm)
        }

        var temp = tl.add(instance, parseInt(data[0].start));

        var isDuplication = false;

        if (data[0].pm.duplication !== undefined) {
            isDuplication = true;
        }

        var mod_idx = 0;
        for (var i = 1; i < data.length; i++) {
            if (isDuplication) {
                data[i].pm.duplication = data[0].pm.duplication;
            }

            data[i].pm.idx = i;

            if (AdvTag.plugin.tag[data[i].pm.tagname]) {
                AdvTag.plugin.tag[data[i].pm.tagname].init(temp, data[i], mod_idx);

                if (data[i].pm.tagname === "chara_mod")
                    mod_idx++;
            }
        }

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.chara_mod = {
    init: function (tl, data, index) {
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];
        var property = {};

        if (data.pm.cross.value) {
            data.pm.sa = JSON.parse(JSON.stringify(data.after.alpha));
        }

        data.pm.index = index + 1;

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance, eventname) {
                var that = instance.animatables[0].target;
                var index = Math.ceil(that.index);

                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);
                var face = this.face.value.substring(this.face.value.lastIndexOf("/") + 1);
                var prev = this.prev.value.substring(this.prev.value.lastIndexOf("/") + 1);
                var opacity = instance.progress;

                if (this.duplication !== undefined) {
                    name = this.duplication + "_" + name;
                }

                if (instance.reversePlayback) {
                    if (this.index === index || index === 0)
                        Adv.core.sprites[name].texture = Adv.core.CharaImgMgr.getTexture(name);
                }

                else {
                    if (this.index === index) {
                        Adv.core.sprites[name].texture = Adv.core.CharaImgMgr.getTexture(face);

                        if (this.cross.value)
                            Adv.core.crossfades[name].texture = Adv.core.CharaImgMgr.getTexture(prev);

                        if (this.cross.value) {
                            Adv.core.crossfades[name].position.set(Adv.core.sprites[name].position.x, Adv.core.sprites[name].position.y);
                            Adv.core.crossfades[name].anchor.set(Adv.core.sprites[name].anchor.x, Adv.core.sprites[name].anchor.y);
                            Adv.core.crossfades[name].scale.set(Adv.core.sprites[name].scale.x, Adv.core.sprites[name].scale.y);

                            if (instance.reversePlayback) {
                                Adv.core.crossfades[name].alpha = opacity / 100;
                                Adv.core.sprites[name].alpha = (this.sa - opacity) / 100;
                            }

                            else {
                                Adv.core.crossfades[name].alpha = (this.sa - opacity) / 100;
                                Adv.core.sprites[name].alpha = opacity / 100;
                            }

                        }

                        else {
                            Adv.core.sprites[name].alpha = opacity / 100;
                        }
                    }
                }
            }.bind(data.pm);
        }

        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));

        property.index = index + 1;
        property.opacity = data.after.alpha * (i + 1);
        property.cross = data.after.alpha * (i + 1);
        property.duration = duration;

        if (!data.pm.cross.value)
            property.round = 1;

        tl.add(property, parseInt(data.start) + 1);
    }
};

AdvTag.plugin.tag.chara_move = {
    init: function (tl, data) {
        var property = Object.assign({}, data.after);
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.pm.name.value.substring(this.pm.name.value.lastIndexOf("/") + 1);

                if (this.pm.duplication !== undefined) {
                    name = this.pm.duplication + "_" + name;
                }

                Adv.core.sprites[name].anchor.set(that.anchorx, that.anchory);
                Adv.core.sprites[name].alpha = parseInt(that.opacity) / 100;
                Adv.core.sprites[name].position.set(parseFloat(that.posx), parseFloat(that.posy));
                Adv.core.sprites[name].rotation = that.rotate * (Math.PI / 180);
                Adv.core.sprites[name].scale.set((that.scale / 100), (that.scale / 100))
                Adv.core.sprites[name].filters[0].blur = that.blur;
            }.bind(data);
        }
        var loop = parseInt(data.pm.again.value);
        loop = loop === 1 ? false : loop;

        property.loop = loop;
        
        tl.add(property, parseInt(data.start) + 1);
        return tl;  
    }
};

AdvTag.plugin.tag.chara_hide = {
    init: function (tl, data) {
        var property = Object.assign({}, data.after);
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.pm.name.value.substring(this.pm.name.value.lastIndexOf("/") + 1);

                if (this.pm.duplication !== undefined) {
                    name = this.pm.duplication + "_" + name;
                }

                var alpha = Comima.lerp(data.before.opacity, data.after.opacity, instance.progress / 100);
                Adv.core.sprites[name].anchor.set(that.anchorx, that.anchory);
                Adv.core.sprites[name].alpha = alpha / 100;
                Adv.core.sprites[name].position.set(parseFloat(that.posx), parseFloat(that.posy));
                Adv.core.sprites[name].rotation = that.rotate * (Math.PI / 180);
                Adv.core.sprites[name].scale.set((that.scale / 100), (that.scale / 100))
                Adv.core.sprites[name].filters[0].blur = that.blur;
            }.bind(data);
        }

        return tl.add(property, parseInt(data.start) + 1);
    }
};

AdvTag.plugin.tag.text_show = {
    init: function (data) {
        var tl = anime.timeline({
            autoplay: false,
            targets: {
                alpha: 0,
                posx: parseInt(data[0].pm.posx.value),
                posy: parseInt(data[0].pm.posy.value),
                rotation: 0,
                scale: 100
            }
        });

        var duration = data[0].pm.time === undefined ? 1 : (parseInt(data[0].pm.time.value) === 0 ? 1 : parseInt(data[0].pm.time.value));

        var instance = {
            alpha: parseInt(data[0].after.alpha),
            easing: 'linear',
            duration: duration
        };

        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            instance[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var sha = new jsSHA("SHA-256", "TEXT");
                sha.update(this.text.value);
                var key = sha.getHash("B64");

                Adv.core.texts[key].alpha = parseInt(that.alpha) / 100;
                Adv.core.texts[key].position.set(parseInt(this.posx.value), parseInt(this.posy.value))
            }.bind(data[0].pm);
        }

        temp = tl.add(instance, parseInt(data[0].start));

        for (var i = 1; i < data.length; i++) {
            if (AdvTag.plugin.tag[data[i].pm.tagname])
                AdvTag.plugin.tag[data[i].pm.tagname].init(temp, data[i]);
        }

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.text_move = {
    init: function (tl, data) {
        var property = Object.assign({}, data.after);
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var sha = new jsSHA("SHA-256", "TEXT");
                sha.update(this.text.value);
                var key = sha.getHash("B64");

                Adv.core.texts[key].alpha = parseInt(that.alpha) / 100;
                Adv.core.texts[key].scale.set(parseInt(that.scale) / 100, parseInt(that.scale) / 100);
                Adv.core.texts[key].position.set(parseInt(that.posx), parseInt(that.posy));
            }.bind(data.pm);
        }

        return tl.add(property, parseInt(data.start) + 1);
    }
};

AdvTag.plugin.tag.text_hide = {
    init: function (tl, data) {
        var property = Object.assign({}, data.after);
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var sha = new jsSHA("SHA-256", "TEXT");
                sha.update(this.text.value);
                var key = sha.getHash("B64");

                Adv.core.texts[key].alpha = parseInt(that.alpha) / 100;
                Adv.core.texts[key].position.set(parseInt(that.posx), parseInt(that.posy));
            }.bind(data.pm);
        }

        return tl.add(property, parseInt(data.start) + 1);
    }
};

AdvTag.plugin.tag.spine = {
    init: function (data) {
        var tl = anime.timeline({
            autoplay: false,
            targets: {
                blur: parseInt(data[0].pm.blur.value),
                posx: parseInt(data[0].pm.posx.value),
                posy: parseInt(data[0].pm.posy.value),
                scale: parseInt(data[0].pm.scale.value),
                opacity: 0,
                time: 0,
            }
        });

        var instance = {
            opacity: 100,
            name: data[0].pm.name.value,
            easing: 'linear',
            duration: 1
        };

        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            instance[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);

                Adv.core.sprites[name].alpha = parseInt(that.opacity) / 100;
                Adv.core.sprites[name].position.set(parseInt(that.posx), parseInt(that.posy));
                Adv.core.sprites[name].scale.set((that.scale / 100), (that.scale / 100))
                Adv.core.sprites[name].filters[0].blur = that.blur;

                if(this.speed !== undefined)
                    Adv.core.sprites[name].state.tracks[0].timeScale = parseFloat(this.speed.value)
            }.bind(data[0].pm);
        }

        temp = tl.add(instance, parseInt(data[0].start));

        var _instance = {
            time: data[0].pm.time.value,
            name: data[0].pm.name.value,
            duration: parseFloat(data[0].pm.time.value) / 2,
            easing: 'linear',
        }

        for (var event_i = 0; event_i < event.length; event_i++) {
            _instance[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);

                if(!JSON.parse(this.loop.value))
                    Adv.core.sprites[name].state.tracks[0].trackTime = that.time / 1000;

                if(this.speed !== undefined)
                    Adv.core.sprites[name].state.tracks[0].timeScale = parseFloat(this.speed.value);
            }.bind(data[0].pm);
        }

        temp = tl.add(_instance, data[0].start + 1);

        for (var i = 1; i < data.length; i++) {
            if (AdvTag.plugin.tag[data[i].pm.tagname])
                AdvTag.plugin.tag[data[i].pm.tagname].init(temp, data[i]);
        }

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.spine_move = {
    init: function (tl, data) {
        var property = Object.assign({}, data.after);
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);

                Adv.core.sprites[name].alpha = parseInt(that.opacity) / 100;
                Adv.core.sprites[name].position.set(parseInt(that.posx), parseInt(that.posy));
                Adv.core.sprites[name].scale.set((that.scale / 100), (that.scale / 100))
                Adv.core.sprites[name].filters[0].blur = that.blur;

                if(this.speed !== undefined)
                    Adv.core.sprites[name].state.tracks[0].timeScale = parseFloat(this.speed.value);

            }.bind(data.pm);
        }

        return tl.add(property, data.start + 1);
    }
};

AdvTag.plugin.tag.spine_mod = {
    init: function (tl, data) {
        var property = {};
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);

                var temp = Adv.core.sprites[name].state.tracks[0].trackTime;
                Adv.core.sprites[name].state.setAnimation(0, this.animation.value, this.loop.value);
                Adv.core.sprites[name].state.tracks[0].trackTime = temp;

                if(this.speed !== undefined)
                    Adv.core.sprites[name].state.tracks[0].timeScale = parseFloat(this.speed.value);
            }.bind(data.pm);
        }

        return tl.add(property, data.start + 1);
    }
};

AdvTag.plugin.tag.spine_speed = {
    init: function (tl, data) {
        var property = {};
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);

                if(this.speed !== undefined)
                    Adv.core.sprites[name].state.tracks[0].timeScale = parseFloat(this.speed.value);
            }.bind(data.pm);
        }

        return tl.add(property, data.start + 1);
    }
};

AdvTag.plugin.tag.spine_hide = {
    init: function (tl, data) {
        var property = Object.assign({}, data.after);
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);

                Adv.core.sprites[name].alpha = parseInt(that.opacity) / 100;
                Adv.core.sprites[name].position.set(parseInt(that.posx), parseInt(that.posy));
                Adv.core.sprites[name].scale.set((that.scale / 100), (that.scale / 100))
                Adv.core.sprites[name].filters[0].blur = that.blur;
            }.bind(data.pm);
        }

        return tl.add(property, data.start + 1);
    }
};

AdvTag.plugin.tag.select = {
    init: function (data) {
        var tl = anime.timeline({
            autoplay: false,
            targets: {
                posx: parseInt(data.pm.posx.value),
                posy: parseInt(data.pm.posy.value),
                opacity: 0,
            }
        });

        var property = Object.assign({}, data.after);
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.opacity = 100;
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.label.value;

                Adv.core.selects[name].alpha = parseInt(that.opacity) / 100;
                Adv.core.selects[name].position.set(parseInt(that.posx), parseInt(that.posy));
            }.bind(data.pm);
        }

        tl.add(property, data.start);
        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.select_hide = {
    init: function (data) {
        var tl = anime.timeline({
            autoplay: false,
            targets: {
                opacity: 100,
            }
        });

        var property = Object.assign({}, data.after);
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time) === 0 ? 1 : parseInt(data.pm.time));
        property.opacity = 0;
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                if (AdvTag.tl.paused)
                    return;

                var that = instance.animatables[0].target;
                var name = this.label.value;

                Adv.core.selects[name].alpha = parseInt(that.opacity) / 100;
            }.bind(data.pm);
        }

        tl.add(property, data.start + 1);
        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.playbgm = {
    init: function (data) {
        Adv.core.prevBGM = data.pm.name.value.substring(data.pm.name.value.lastIndexOf("/") + 1);;

        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                Adv.core.SoundMgr.Stop(Adv.core.prevBGM);
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);
                //Adv.core.SoundMgr.Play(name, this.loop.value, parseInt(this.volume.value) / 100);
                Adv.core.prevBGM = name;
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.playse = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);
                //Adv.core.SoundMgr.Play(name, this.loop.value, parseInt(this.volume.value) / 100);
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.playvoice = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);
                //Adv.core.SoundMgr.Play(name, this.loop.value, parseInt(this.volume.value) / 100);
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.stopbgm = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                var name = Adv.core.prevBGM;
                Adv.core.SoundMgr.Stop(name);
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.stopse = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);
                Adv.core.SoundMgr.Stop(name);
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.stopvoice = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                var name = this.name.value.substring(this.name.value.lastIndexOf("/") + 1);
                Adv.core.SoundMgr.Stop(name);
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.quake = {
    init: function (data) {
        var tl = anime.timeline({
            autoplay: false,
            targets: {
                x: 0,
                y: 0
            }
        });

        var property = {
            easing: 'linear',
            duration: parseInt(data.pm.time.value),
            x: data.after.x,
            y: data.after.y
        }

        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                Comima.contain.root.position.x = that.x;
                Comima.contain.root.position.y = that.y;
            }.bind(data.pm);
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.sfade = {
    init: function (data) {
        var tl = anime.timeline({
            autoplay: false,
            targets: {
                color: data.before.rgb,
                alpha: data.before.alpha
            }
        });

        var property = {
            easing: 'linear',
            duration: parseInt(data.pm.time.value),
            color: data.after.rgb,
            alpha: data.after.alpha
        }

        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                if (instance.progress === 0)
                    return;

                var that = instance.animatables[0].target;

                var rgb = that.color.replace("rgba(", "");
                rgb = rgb.replace(")", "")
                rgb = rgb.split(",");

                var red = Number(rgb[0]).toString(16);
                if (red.length === 1) {
                    red = "0" + red;
                }

                var green = Number(rgb[1]).toString(16);
                if (green.length === 1) {
                    green = "0" + green;
                }

                var blue = Number(rgb[2]).toString(16);
                if (blue.length === 1) {
                    blue = "0" + blue;
                }

                Comima.contain.containers["fader"].children[0].clear();
                Comima.contain.containers["fader"].children[0].beginFill(parseInt("0x" + red + green + blue), that.alpha / 100);
                Comima.contain.containers["fader"].children[0].drawRect(0, 0, Comima.app.screen.width, Comima.app.screen.height);
                Comima.contain.containers["fader"].children[0].endFill();
            }.bind(data.pm);
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.defaultColor = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false,
            targets: {
                color: "#000000"
            }
        });

        var property = {
            duration: 1,
            color: data.after.color.replace("0x", "#"),
            complete: function (instance) {
                var that = instance.animatables[0].target;

                var rgb = that.color.replace("rgba(", "");
                rgb = rgb.replace(")", "")
                rgb = rgb.split(",");

                var red = Number(rgb[0]).toString(16);
                if (red.length === 1) {
                    red = "0" + red;
                }

                var green = Number(rgb[1]).toString(16);
                if (green.length === 1) {
                    green = "0" + green;
                }

                var blue = Number(rgb[2]).toString(16);
                if (blue.length === 1) {
                    blue = "0" + blue;
                }

                Comima.app.renderer.backgroundColor = parseInt("0x" + red + green + blue);
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.bg_show = {
    init: function (data) {
        var tl = anime.timeline({
            autoplay: false,
            targets: {
                opacity: 0,
            }
        });

        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));

        var instance = {
            opacity: parseInt(data.after.opacity),
            name: data.pm.name.value,
            easing: 'linear',
            duration: duration
        };

        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            instance[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;

                if (Adv.core.sprites.bg)
                    Adv.core.sprites.bg.alpha = parseInt(that.opacity) / 100;
            }.bind(data.pm)
        }

        tl.add(instance, parseInt(data.start));
        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.p = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                Adv.core.isCW = true;
                AdvTag.tl.pause();
            }.bind(data.pm)
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.end = {
    init: function (data) {
        var tl = anime.timeline({
            easing: 'linear',
            autoplay: false
        });

        var property = {
            duration: 1,
            complete: function (instance) {
                var length = Adv.core.SoundMgr._buffers.length;

                for (var i = 0; i < length; i++) {
                    var volume = Adv.core.SoundMgr._buffers[i]._volume;
                    Adv.core.SoundMgr._buffers[i].fade(volume, 0, 500);
                }
            }
        }

        tl.add(property, data.start);

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.effects = {
    init: function (data) {
        var tl = null;
        tl = anime.timeline({
            autoplay: false,
            easing: 'linear',
            direction: 'alternate',
            targets: {
                opacity: 0
            }
        });

        var duration = data[0].pm.time === undefined ? 1 : (parseInt(data[0].pm.time.value) === 0 ? 1 : parseInt(data[0].pm.time.value));

        var instance = {
            opacity: parseInt(data[0].pm.alpha.value),
            name: data[0].pm.label.value,
            easing: 'linear',
            duration: duration
        };

        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        data[0].pm.idx = 0;

        for (var event_i = 0; event_i < event.length; event_i++) {
            instance[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.label.value.substring(this.label.value.lastIndexOf("/") + 1);

                Adv.core.effects[name].parent.alpha = parseInt(that.opacity) / 100;
            }.bind(data[0].pm)
        }

        var temp = tl.add(instance, parseInt(data[0].start));

        for (var i = 1; i < data.length; i++) {
            if (AdvTag.plugin.tag[data[i].pm.tagname]) {
                AdvTag.plugin.tag[data[i].pm.tagname].init(temp, data[i]);
            }
        }

        AdvTag.timelines.push(tl);
    }
};

AdvTag.plugin.tag.effects_stop = {
    init: function (tl, data) {
        var property = { opacity: 0 };
        var duration = data.pm.time === undefined ? 1 : (parseInt(data.pm.time.value) === 0 ? 1 : parseInt(data.pm.time.value));
        property.duration = duration;
        property.easing = 'linear';
        var event = ["begin", "loopBegin", "changeBegin", "change", "changeComplete", "update", "loopComplete", "complete"];

        for (var event_i = 0; event_i < event.length; event_i++) {
            property[event[event_i]] = function (instance) {
                var that = instance.animatables[0].target;
                var name = this.pm.label.value.substring(this.pm.label.value.lastIndexOf("/") + 1);

                Adv.core.effects[name].parent.alpha = parseInt(that.opacity) / 100;
            }.bind(data);
        }

        return tl.add(property, parseInt(data.start));
    }
};


AdvTag.plugin.tag.prev_chara = {
    vital: ["name"],
    pm: {
        name: "",
        page: "fore",
        layer: "0",
        wait: "true",
        left: "0",
        top: "0",
        width: "",
        height: "",
        zindex: "1",
        reflect: "",
        face: "",
        storage: "",
        scale: "100%",
        time: 100,
        eye: "true",
        mouth: "true",
        focus: "false",
        posX: "default",
        posY: "0",
        anchorX: "0.5",
        anchorY: "0",
        opacity: "100%",
        rotate: "0",
        quakeX: "0",
        quakeY: "0",
        quakeT: "300",
        blur: "0",
        zindex: "default",
        mask: "false"
    },
    start: function (pm) {
        var filename = pm.name === undefined ? this.parent.charaAni[pm.name][pm.face].sprite : pm.name;
        var key = pm.name;
        if (this.parent.sprites[pm.name]) {
            if (pm.duplication === undefined)
                return;
            else
                key = pm.duplication + "_" + key;
        }

        console.log(pm.name);

        var sprite = new PIXI.Sprite(this.parent.CharaImgMgr.getTexture(filename));
        var anchor = {
            x: parseFloat(pm.anchorX),
            y: parseFloat(pm.anchorY),
        };

        var position = {
            x: parseInt(pm.posX),
            y: parseInt(pm.posY),
        };

        var scale = {
            x: parseInt(pm.scale) / 100,
            y: parseInt(pm.scale) / 100
        };

        sprite.position.set(position.x, position.y);
        sprite.anchor.set(anchor.x, anchor.y);
        sprite.scale.set(scale.x, scale.y);
        sprite.rotation = parseInt(pm.rotate) * (Math.PI / 180);
        sprite.alpha = 0;
        Comima.contain.addChild(sprite, "Chara");

        var cross = new PIXI.Sprite(this.parent.CharaImgMgr.getTexture(filename));
        cross.alpha = 0;
        Comima.contain.addChild(cross, "Chara");

        var blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = parseFloat(pm.blur);
        sprite.filters = [blurFilter];
        sprite.tint = 0xffffff;

        this.parent.sprites[key] = sprite;
        this.parent.crossfades[key] = cross;
    }
}

AdvTag.plugin.tag.prev_text = {
    vital: ["text"],
    pm: {
        text: "",
        time: "1000",
        wait: "false",
        posX: "0",
        posY: "0",
        size: "50",
        strokeThickness: "5",
        stroke: "0xffffff",
        fill: "0x000000",
        alpha: "100",
    },
    start: function (pm) {
        var sha = new jsSHA("SHA-256", "TEXT");
        sha.update(pm.text);

        var key = sha.getHash("B64");

        if (this.parent.texts[key])
            return;

        var message = pm.text.replace(/\\n/g, "\n");
        var messages = [];
        var temp = message.split("\n");
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].length !== 0)
                messages.push(temp[i]);
        }

        var size = parseInt(pm.size);
        var texts = [];

        var parent = new PIXI.Sprite(null);
        parent.anchor.x = 0.5;
        parent.anchor.y = 0.5;
        var padding = size * 0.15;

        var width = 0;
        var height = 0;
        for (var i = 0; i < messages.length; i++) {
            texts[i] = [];

            for (var j = 0; j < messages[i].length; j++) {
                texts[i][j] = new PIXI.Text(messages[i][j], {
                    strokeThickness: parseFloat(pm.strokethickness),
                    stroke: parseInt(pm.stroke),
                    fontSize: size,
                    fill: parseInt(pm.fill),
                    fontFamily: "Yu Mincho"
                });

                texts[i][j].anchor.x = 0.5;
                texts[i][j].anchor.y = 0.5;
                texts[i][j].position.x = -(i * size) - (padding * i);
                texts[i][j].position.y = j * size;

                parent.addChild(texts[i][j]);

                if (messages[i][j] === "。" || messages[i][j] === "、") {
                    texts[i][j].anchor.set(0, 1)
                }

                else if (Adv.core.regexp.indexOf(messages[i][j]) !== -1) {
                    texts[i][j].rotation = 90 * (Math.PI / 180);
                }

                width = Math.max(width, Math.abs(texts[i][j].position.x) + texts[0][0].width);
                height = Math.max(height, Math.abs(texts[i][j].position.y) + texts[0][0].height);
            }
        }

        for (var i = 0; i < messages.length; i++) {
            for (var j = 0; j < messages[i].length; j++) {
                texts[i][j].position.x += (width / 2) - (texts[0][0].width / 2);
                texts[i][j].position.y -= (height / 2) - (texts[0][0].height / 2);
            }
        }

        var paddingX = 10;
        var paddingY = 10;
        //var rect = drawRectPath(width, height, paddingX, paddingY, 0,0,120);
        //var rect = { sprite: new PIXI.Sprite(null), offset: { x: 0, y: 0 } };

        //var rect = { sprite: mokoDraw(width, height), offset: { x: 0, y: 0 } };
        //var rect = mokoDraw(width, height, pm.hukidasi, parseInt(pm.angle));
        var rect = mokoDraw({ size: size, lineWidth: parseInt(pm.line_width) }, width, height, pm.hukidasi, parseInt(pm.angle));
        rect.sprite.position.set(parseInt(pm.posX), parseInt(pm.posY));
        rect.sprite.alpha = 1;
        //var rect = Rect({w: width, h: height}, 90, parent);
        Comima.contain.addChild(rect.sprite, "fader");
        rect.sprite.addChild(parent);
        /*
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFEEB77, 1);
        graphics.beginFill(0x650A5A);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();

        var test = new PIXI.Sprite(app.renderer.generateTexture(graphics));
        test.anchor.set(0.5, 0.5);
        test.addChild(parent);
        rect.sprite.addChild(test);
        */

        var blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = 0;

        rect.sprite.filters = [blurFilter];
        Adv.core.texts[key] = rect.sprite;

        parent.position.x = rect.offset.x;
        parent.position.y = rect.offset.y;
        rect.sprite.position.x = -1000;
        rect.sprite.position.y = -1000;
    }
};

AdvTag.plugin.tag.prev_spine = {
    pm: {
        name: "",
        animation: "",
        posX: "0",
        posY: "0",
        scale: "100",
        time: "1000",
        opacity: "0",
        posX: "0",
        posY: "0",
        anchorX: "0.5",
        anchorY: "0",
        opacity: "100%",
        mask: "false",
        blur: "0",
        wait: "true",
        loop: "false",
        laterTime: "0",
        aniLaterTime: "0",
        wait: "false"
    },

    start: function (pm) {
        var that = this;
        
        var sprite = new PIXI.spine.Spine(this.parent.SpineMgr.getData(pm.name));
        this.parent.sprites[pm.name] = sprite;

        sprite.state.setAnimation(0, pm.animation, JSON.parse(pm.loop));
        Comima.contain.addChild(sprite, "Chara");

        var scale = parseInt(pm.scale) / 100;

        sprite.scale.set(scale, scale);

        if (pm.posx !== "default")
            sprite.position.x = parseInt(pm.posx);

        sprite.position.y = parseInt(pm.posy);

        var blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = parseFloat(pm.blur);

        sprite.filters = [blurFilter];

        var Active = 0xffffff;
        var Passive = 0x808080;

        //var mask = JSON.parse(pm.mask) ? Passive : Active;
        sprite.tint = Active;
        sprite.alpha = 0;

        this.parent.sprites[pm.name] = sprite;
    }
};

AdvTag.plugin.tag.prev_bg = {
    pm: {
        name: "",
        animation: "",
        posX: "0",
        posY: "0",
        scale: "100",
        time: "1000",
        opacity: "0",
        posX: "0",
        posY: "0",
        anchorX: "0",
        anchorY: "0",
        opacity: "100%",
        mask: "false",
        blur: "0",
        wait: "true",
        loop: "false",
        laterTime: "0",
        aniLaterTime: "0",
        wait: "false"
    },

    start: function (pm) {
        var that = this;
        var sprite = new PIXI.Sprite(this.parent.BgImgMgr.getTexture(pm.name));
        Comima.contain.addChild(sprite, "BG");

        var pos = {
            x: parseInt(pm.posX),
            y: parseInt(pm.posY),
        };

        var anchor = {
            x: parseFloat(pm.anchorX),
            y: parseFloat(pm.anchorY),
        };

        sprite.position.set(pos.x, pos.y);
        sprite.anchor.set(anchor.x, anchor.y);
        sprite.alpha = 0;

        this.parent.sprites["bg"] = sprite;

        var blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = parseFloat(pm.blur);

        sprite.filters = [blurFilter];
    }
};

AdvTag.plugin.tag.prev_effects = {
    vital: ["effect", "label"],
    pm: {
        label: "",
        effect: "",
        time: "1000",
        wait: "false",
        color: "0xffffff",
        alpha: "100",
    },
    start: function (pm) {
        var effect = null;

        //switch(pm.effect)
        switch (pm.effect) {
            case "sakura":
                effect = new Blossoms(this.parent.CharaImgMgr.getTexture("sakura"), function () { console.log("test") });

                for (var i = 0; i < effect.m_img.length; i++) {
                    effect.m_img[i].tint = parseInt(pm.color);
                    effect.m_img[i].alpha = parseInt(pm.alpha) / 100;
                }
                break;

            case "snow":
                effect = new Snow(function () { console.log("test") });

                for (var i = 0; i < effect.m_img.length; i++) {
                    effect.m_img[i].tint = parseInt(pm.color);
                    effect.m_img[i].alpha = parseInt(pm.alpha) / 100;
                }
                break;

            case "rain":
                effect = new Rain(function () { console.log("test") });
                effect.color = parseInt(pm.color);
                effect.alpha = (parseInt(pm.alpha) / 100);
                break;
        }

        Comima.contain.addChild(effect.parent, "Chara");
        Adv.core.effects[pm.label] = effect;
        effect.parent.alpha = 0;
    }
};

/**
 * ランダムな整数を返す
 * Math.round（四捨五入）に変更したので、max,minはそれぞれその値を含む
 * @param max 最大値
 * @param min 最小値
 * @return min ~ max
 */
var getRandomInt = function (max, min) {
    return Math.round(Math.random() * (max - min)) + min;
};

/**
 * 円周上の座標を返す
 * @param d 角度
 * @param r 半径
 * @param cx, cy 中心座標
 */
var getCircumPos = {
    // x座標
    x: function (d, r, cx) {
        return Math.cos(Math.PI / 180 * d) * r + cx;
    },
    // y座標
    y: function (d, r, cy) {
        return Math.sin(Math.PI / 180 * d) * r + cy;
    }
};


/**
 * 光の吹き出しを作成する
 * @param {number} radiusX: 横半径
 * @param {number} radiusY: 縦半径
 * @param {number} num   : 角数
 * @param {number} cx    : 円の中心座標X
 * @param {number} cy    : 円の中心座標Y
 * @param {number} innerRadiusX: 中の円横半径
 * @param {number} innerRadiusY: 中の円縦半径
 * @param {number} outerLineLimit: 外側の線のはみ出す上限
 * @param {number} innerLineLimit: 内側の線のはみ出す上限
 * @param {color}  strokeStyle   : 線の色
 * @param {color}  fillStyle     : 塗りつぶしの色
 */

var createLightFukidashi = function (args) {
    var ctx = args.ctx;
    var deg = 0;
    var outerRandom;
    var innerRandom;

    // 塗りつぶしの円を描く
    // 楕円の計算が面倒なので普通に円を書いてscaleで曲げる
    // xを基準とする
    var ratio = args.innerRadiusY / args.innerRadiusX;

    ctx.scale.set(1, ratio);
    //ctx.beginPath();
    ctx.arc(args.cx, args.cy / ratio, args.innerRadiusX, 0, Math.PI * 180, true);
    //ctx.fillStyle = args.fillStyle;
    //ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.beginFill(args.fillStyle);
    ctx.lineStyle(args.lineWidth, args.strokeStyle, 1);

    // メインの線を描く
    //ctx.beginPath();

    for (var i = 0; i < args.num; i++) {
        deg += 360 / args.num;
        outerRandom = getRandomInt(args.addOuterLine, 0);
        innerRandom = getRandomInt(args.addInnerLine, 0);

        ctx.moveTo(
            getCircumPos.x(deg, args.radiusX + outerRandom, args.cx),
            getCircumPos.y(deg, args.radiusY + outerRandom, args.cy)
        );
        ctx.lineTo(
            getCircumPos.x(deg, args.innerRadiusX - innerRandom, args.cx),
            getCircumPos.y(deg, args.innerRadiusY - innerRandom, args.cy)
        );
    }
    ctx.endFill();
};

/**
 * 激しい吹き出しを作成する
 * @param {obj}    ctx    : canvas context
 * @param {number} radiusX: 縦半径
 * @param {number} radiusY: 横半径
 * @param {number} num    : 角数
 * @param {number} cx     : 円の中心座標X
 * @param {number} cy     : 円の中心座標Y
 * @param {number} punkLineMax : パンクの最大の高さ
 * @param {number} punkLineMin : パンクの最小の高さ
 * @param {color}  fillStyle   : 塗りつぶしの色
 * @param {color}  strokeStyle : 線の色
 * @param {number} lineWidth   : 線の太さ
 */

var createPunkFukidashi = function (args) {
    var ctx = args.ctx;
    var deg = 0;
    var addDeg = 360 / args.num;
    var random;
    var beginX, beginY, endX, endY;
    var cp1x, cp2x, cp1y, cp2y;

    // 共通設定
    //ctx.beginPath();
    //ctx.lineJoin = 'round';
    //ctx.lineCap = 'round';
    //ctx.fillStyle = args.fillStyle;
    //ctx.strokeStyle = args.strokeStyle;
    //ctx.lineWidth = args.lineWidth;
    ctx.beginFill(args.fillStyle);
    ctx.lineStyle(args.lineWidth, args.strokeStyle, 1);

    for (var i = 0; i < args.num; i++) {
        deg += addDeg;
        random = args.randoms[i];

        // 始点・終点
        beginX = getCircumPos.x(deg, args.radiusX, args.cx);
        beginY = getCircumPos.y(deg, args.radiusY, args.cy);
        endX = getCircumPos.x(deg + addDeg, args.radiusX, args.cx);
        endY = getCircumPos.y(deg + addDeg, args.radiusY, args.cy);

        // 制御値
        cp1x = getCircumPos.x(deg, args.radiusX - random, args.cx);
        cp1y = getCircumPos.y(deg, args.radiusY - random, args.cy);
        cp2x = getCircumPos.x(deg + addDeg, args.radiusX - random, args.cx);
        cp2y = getCircumPos.y(deg + addDeg, args.radiusY - random, args.cy);

        // 開始点と最終点のズレを調整する
        if (i === 0) {
            ctx.arcTo(beginX, beginY, endX, endY, args.punkLineMax);
        }

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    }

    //ctx.fill();
    ctx.endFill()
};

/**
 * モコモコな吹き出しを作成する
 * @param {number} radiusX: 縦半径
 * @param {number} radiusY: 横半径
 * @param {number} num    : 角数
 * @param {number} cx     : 円の中心座標X
 * @param {number} cy     : 円の中心座標Y
 * @param {number} pankLineMax : パンクの最大の高さ
 * @param {number} pankLineMin : パンクの最小の高さ
 * @param {color}  fillStyle   : 塗りつぶしの色
 * @param {color}  strokeStyle : 線の色
 * @param {number} lineWidth   : 線の太さ
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var createMokomokoFukidashi = function (args) {
    var ctx = args.ctx;
    var deg = 0;
    var addDeg = args.addDeg;
    var randoms = args.randoms === undefined ? [] : args.randoms;
    args.num = 8;

    if(addDeg === undefined)
    {
        var sum = 0;
        var rand = [];
        var i = 0;
        while (true) {
            rand[i] = getRandomArbitrary(5, 10) / 100;
            sum += rand[i];

            if (sum > 1)
                break;

            i++;
        }

        var diff = sum - 1;
        rand[i] -= diff

        var addDeg = [];

        for (var i = 0; i < rand.length; i++) {
            addDeg[i] = 360 * rand[i];
        }
    
        addDeg.push(getRandomArbitrary(5, 10) / 100);
    }
    

    var random;
    var beginX, beginY, endX, endY;
    var cp1x, cp2x, cp1y, cp2y;

    // 共通設定

    ctx.beginFill(args.fillStyle);
    ctx.lineStyle(args.lineWidth, args.strokeStyle, 1);

    var temp = { x: 0, y: 0 };

    if(args.randoms === undefined)
    {
        random = getRandomArbitrary(20, 30);
        randoms.push(random);
    }

    else
    {
        random = randoms[0];
    }
    

    beginX = getCircumPos.x(deg, args.radiusX, args.cx);
    beginY = getCircumPos.y(deg, args.radiusY, args.cy);
    endX = getCircumPos.x(deg + addDeg[1], args.radiusX, args.cx);
    endY = -getCircumPos.y(deg + addDeg[1], args.radiusY, args.cy);

    cp1x = getCircumPos.x(deg, args.radiusX + random, args.cx);
    cp1y = -getCircumPos.y(deg, args.radiusY + random, args.cy);
    cp2x = getCircumPos.x(deg + addDeg[1], args.radiusX + random, args.cx);
    cp2y = -getCircumPos.y(deg + addDeg[1], args.radiusY + random, args.cy);

    ctx.moveTo(beginX, beginY);
    console.log("ctx.moveTo(" + beginX + ", " + beginY + ")");
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);

    temp.x = beginX;
    temp.y = beginY;
    
    for (var i = 0; i < addDeg.length; i++) {
        deg += addDeg[i];
        if(args.randoms === undefined)
        {
            random = getRandomArbitrary(20, 30);
            randoms.push(random);
        }

        else
        {
            random = randoms[0];
        }

        // 始点・終点
        beginX = getCircumPos.x(deg, args.radiusX, args.cx);
        beginY = -getCircumPos.y(deg, args.radiusY, args.cy);
        endX = getCircumPos.x(deg + addDeg[i + 1], args.radiusX, args.cx);
        endY = -getCircumPos.y(deg + addDeg[i + 1], args.radiusY, args.cy);

        // 制御値
        cp1x = getCircumPos.x(deg, args.radiusX + random, args.cx);
        cp1y = -getCircumPos.y(deg, args.radiusY + random, args.cy);
        cp2x = getCircumPos.x(deg + addDeg[i + 1], args.radiusX + random, args.cx);
        cp2y = -getCircumPos.y(deg + addDeg[i + 1], args.radiusY + random, args.cy);


        if (i === addDeg.length - 1) {
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        }

        else {
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        }

        //console.log("ctx.bezierCurveTo(" + cp1x + ", " + cp1y + ", " + cp2x + ", " + cp2y + ", " + endX + ", " + endY + ")");
    }   
    
    ctx.endFill();

    return {
        addDeg: addDeg,
        randoms: randoms
    }
};


// wには文字の大体の横幅を入れる
var createText = function (ctx, text, color, x, y, w) {
    //ctx.fillStyle = color;
    ctx.font = "bold 24px 'ＭＳ Ｐゴシック'";
    //ctx.fillText(text, x - (w/2), y + 10 );  // yには文字の高さの半分を加える
};

// 
var createCircle = function (ctx, fillStyle, strokeStyle, lineWidth, x, y, r) {
    ctx.beginFill(fillStyle);
    ctx.lineStyle(lineWidth, strokeStyle, 1);
    ctx.arc(x, y, r, 0, Math.PI * 180, true);
    ctx.endFill();
};

var mokoDraw = function (size, x, y, type, deg) {

    if (type === "moko") {
        var ctx = new PIXI.Graphics();
        var temp_ctx = new PIXI.Graphics();
        var tail_ctx = new PIXI.Graphics();
        // 引数の詳細はcreateMokomokoFukidashi()のコメントアウトを参照

        /*
        if (x > y) {
            y = x * (1 / 1.5);
        }

        else {
            x = y * (1.5);
        }
        */

        var radiusX = (x / 2) + (size.size * 2) + 10;
        var radiusY = (y / 2) + (size.size * 2) + 10;

        var max = Math.max(radiusX, radiusY);
        var min = Math.min(radiusX, radiusY);

        var num = 18;
        var randoms = [];
        var pankLineMax = max * 0.4;
        var pankLineMin = max * 0.5;
        for (var i = 0; i < num; i++)
            randoms.push(getRandomInt(pankLineMax, pankLineMin));

        var config = {
            ctx: ctx,
            radiusX: radiusX,
            radiusY: radiusY,
            num: 18,
            cx: 0,
            cy: 0,
            fillStyle: 0xffffff,
            strokeStyle: 0x000000,
            lineWidth: size.lineWidth,
            pankLineMax: pankLineMax
        };

        var temp_config = {
            ctx: temp_ctx,
            radiusX: radiusX,
            radiusY: radiusY,
            num: 18,
            cx: 0,
            cy: 0,
            fillStyle: 0xffffff,
            strokeStyle: 0x000000,
            lineWidth: size.lineWidth,
            pankLineMax: pankLineMax
        };

        var data = createMokomokoFukidashi(config);

        temp_config.randoms = data.randoms;
        temp_config.addDeg = data.addDeg;
        
        createMokomokoFukidashi(temp_config);

        var points = [];

        for (var i = 0; i < temp_ctx.graphicsData[0].shape.points.length; i += 2) {
            points.push(new PIXI.Point(temp_ctx.graphicsData[0].shape.points[i], temp_ctx.graphicsData[0].shape.points[i + 1]));
        }

        var temp = new PIXI.Sprite(Comima.app.renderer.generateTexture(temp_ctx));
        temp.anchor.set(0.5, 0.5);
        temp.position.set(320, 480);

        var min = 361;
        var prev_min = min;
        var idx = -1;
        for (var i = 0; i < points.length; i++) {
            var _dgree = getDgree(0, 0, points[i].x, -points[i].y);

            min = Math.min(min, Math.abs(_dgree - deg));
            if (prev_min !== min)
                idx = i;

            prev_min = min;
        }

        var length = 3;
        var start = 5 * length;
        var prev = start / 2;

        for (var i = 0; i < 3; i++) {
            var r = start - (i * 5);
            var lineWidth = r < 10 ? 0.1 : 1;
            var padding = 2 * i;
            createCircle(tail_ctx, 0xffffff, 0x000000, lineWidth, prev, 0, r);
            prev += (r * 2) + padding;
        }

        var sprite = new PIXI.Sprite(Comima.app.renderer.generateTexture(ctx));
        sprite.anchor.set(0.5, 0.5);

        var tail = new PIXI.Sprite(Comima.app.renderer.generateTexture(tail_ctx));
        tail.position.set(points[idx].x, -points[idx].y);
        tail.rotation = deg * Math.PI / 180;

        if (points[idx].x < 0) {
            tail.position.x += -start;
        }

        else {
            tail.position.x += start;
        }

        if (-points[idx].y < 0) {
            tail.position.y += -start;
        }

        else {
            tail.position.y += start;
        }

        sprite.addChild(tail);

        return { offset: { x: temp.width - sprite.width, y: (temp.height - sprite.height) / 2 }, sprite: sprite };
    }

    else if (type === "punk") {
        var ctx = new PIXI.Graphics();
        var temp_ctx = new PIXI.Graphics();

        if (x > y) {
            y = x * (1 / 1.5);
        }

        else {
            x = y * (1.5);
        }

        var num = 18;
        var randoms = [];
        var pankLineMax = 30;
        var pankLineMin = 10;
        for (var i = 0; i < num; i++)
            randoms.push(getRandomInt(pankLineMax, pankLineMin));

        var config = {
            ctx: ctx,
            radiusX: x,
            radiusY: y,
            cx: 0,
            cy: 0,
            randoms: randoms,
            fillStyle: 0xffffff,
            strokeStyle: 0x000000,
            num: 18,
            lineWidth: size.lineWidth
        };

        var temp_config = {
            ctx: temp_ctx,
            radiusX: x,
            radiusY: y,
            cx: 0,
            cy: 0,
            randoms: randoms,
            fillStyle: 0xffffff,
            strokeStyle: 0x000000,
            num: 18,
            lineWidth: size.lineWidth
        };

        createPunkFukidashi(config);
        createPunkFukidashi(temp_config);

        var temp = new PIXI.Sprite(Comima.app.renderer.generateTexture(temp_ctx));
        temp.anchor.set(0.5, 0.5);
        temp.position.set(320, 480);

        var sprite = new PIXI.Sprite(Comima.app.renderer.generateTexture(ctx));
        sprite.anchor.set(0.5, 0.5);

        return { offset: { x: temp.width - sprite.width, y: (temp.height - sprite.height) / 2 }, sprite: sprite };
    }

    else if (type === "light") {
        var ctx = new PIXI.Graphics();

        var num = 18;
        var pankLineMax = 30;
        var pankLineMin = 10;
        var addOuterLine = 10;
        var addInnerLine = 0;

        var outerRandom = [];
        var innerRandom = [];
        for (var i = 0; i < num; i++) {
            outerRandom.push(getRandomInt(addOuterLine, 0));
            innerRandom.push(getRandomInt(addInnerLine, 0));
        }


        if (x > y) {
            y = x * (1.6);
        }

        else {
            x = y * (1 / 1.6);
        }

        var config = {
            ctx: ctx,
            radiusX: x + 20,
            radiusY: y + 20,
            num: 150,
            cx: 0,
            cy: 0,
            innerRadiusX: x,
            innerRadiusY: y,
            addOuterLine: 10,
            addInnerLine: 0,
            strokeStyle: 0xffffff,
            fillStyle: 0x000000,
            lineWidth: size.lineWidth
        };

        createLightFukidashi(config);

        var sprite = new PIXI.Sprite(Comima.app.renderer.generateTexture(ctx));
        sprite.anchor.set(0.5, 0.5);

        return { offset: { x: 0, y: 0 }, sprite: sprite };
    }

    else if (type === "round_square") {
        var ctx = new PIXI.Graphics();
        ctx.lineStyle(size.lineWidth, 0x00000, 1);
        ctx.beginFill(0xffffff);

        var distance = 100;
        var radius = 20;
        var padding = x * 0.3;
        var r = x + padding;
        var b = y + padding;

        var size = (r - (radius)) * 0.1;
        var length = 50;

        var direct = ""

        var handle = {};
        var t = deg;

        if (t === 45) {
            direct = "right";
        }

        else if (t === 135) {
            direct = "top";
        }

        else if (t === 225) {
            direct = "left";
        }

        else if (t === 315) {
            direct = "bottom";
        }

        else {
            if (t > 45 && t < 135) {
                direct = "top";
            }

            else if (t > 135 && t < 225) {
                direct = "left";
            }

            else if (t > 225 && t < 315) {
                direct = "bottom";
            }

            else if (t > 315 || t < 45) {
                direct = "right";
            }
        }

        switch (direct) {
            case "top":
                var per = 1 - ((t - 45) / 90);
                var min = (size / 2) / (r - (radius * 2));
                var max = ((r - (radius * 2)) - (size / 2)) / (r - (radius * 2));

                if (per < min) {
                    per = min;
                }

                else if (per > max) {
                    per = max;
                }

                var add = ((r - (radius * 2)) * per) - (size / 2);

                handle = {
                    x1: add + radius,
                    y1: 0,
                    x2: add + radius + size / 2,
                    y2: -length,
                    x3: add + radius + size,
                    y3: 0,
                }

                ctx.moveTo(radius, 0);
                ctx.lineTo(handle.x1, handle.y1);
                ctx.lineTo(handle.x2, handle.y2);
                ctx.lineTo(handle.x3, handle.y3);

                ctx.lineTo(r - radius, 0);
                ctx.quadraticCurveTo(r, 0, r, radius);
                ctx.lineTo(r, b - radius);
                ctx.quadraticCurveTo(r, b, r - radius, b);
                ctx.lineTo(radius, b);
                ctx.quadraticCurveTo(0, b, 0, b - radius);
                ctx.lineTo(0, radius);
                ctx.quadraticCurveTo(0, 0, radius, 0);
                break;

            case "left":
                var per = 1 - ((t - 135) / 90);
                var min = (size / 2) / (b - (radius * 2));
                var max = ((b - (radius * 2)) - (size / 2)) / (b - (radius * 2));

                if (per < min) {
                    per = min;
                }

                else if (per > max) {
                    per = max;
                }

                var add = ((b - (radius * 2)) * per) - (size / 2);

                handle = {
                    x1: 0,
                    y1: 0,
                    x2: -length,
                    y2: size / 2,
                    x3: 0,
                    y3: size
                }

                handle = {
                    x1: 0,
                    y1: b - (add + radius),
                    x2: -length,
                    y2: b - (add + radius + size / 2),
                    x3: 0,
                    y3: b - (add + radius + size),
                }

                ctx.moveTo(0, b - radius);
                ctx.lineTo(handle.x1, handle.y1);
                ctx.lineTo(handle.x2, handle.y2);
                ctx.lineTo(handle.x3, handle.y3);

                ctx.lineTo(0, radius);
                ctx.quadraticCurveTo(0, 0, radius, 0);
                ctx.lineTo(r - radius, 0);
                ctx.quadraticCurveTo(r, 0, r, radius);
                ctx.lineTo(r, b - radius);
                ctx.quadraticCurveTo(r, b, r - radius, b);
                ctx.lineTo(radius, b);
                ctx.quadraticCurveTo(0, b, 0, b - radius);
                break;

            case "bottom":
                var per = 1 - ((t - 225) / 90);
                var min = (size / 2) / (r - (radius * 2));
                var max = ((r - (radius * 2)) - (size / 2)) / (r - (radius * 2));

                if (per < min) {
                    per = min;
                }

                else if (per > max) {
                    per = max;
                }

                var add = ((r - (radius * 2)) * per) - (size / 2);

                handle = {
                    x1: r - (add + radius),
                    y1: b,
                    x2: r - (add + radius + size / 2),
                    y2: b + length,
                    x3: r - (add + radius + size),
                    y3: b,
                }

                ctx.moveTo(r - radius, b);
                ctx.lineTo(handle.x1, handle.y1);
                ctx.lineTo(handle.x2, handle.y2);
                ctx.lineTo(handle.x3, handle.y3);

                ctx.lineTo(radius, b);
                ctx.quadraticCurveTo(0, b, 0, b - radius);
                ctx.lineTo(0, radius);
                ctx.quadraticCurveTo(0, 0, radius, 0);
                ctx.lineTo(r - radius, 0);
                ctx.quadraticCurveTo(r, 0, r, radius);
                ctx.lineTo(r, b - radius);
                ctx.quadraticCurveTo(r, b, r - radius, b);
                break;

            case "right":
                t = t > 45 ? 405 - t : t - 45
                var per = t / 90;
                var min = (size / 2) / (b - (radius * 2));
                var max = ((b - (radius * 2)) - (size / 2)) / (b - (radius * 2));

                if (per < min) {
                    per = min;
                }

                else if (per > max) {
                    per = max;
                }

                var add = ((b - (radius * 2)) * per) - (size / 2);

                handle = {
                    x1: r,
                    y1: add + radius,
                    x2: r + length,
                    y2: add + radius + size / 2,
                    x3: r,
                    y3: add + radius + size,
                }

                ctx.moveTo(r, radius);
                ctx.lineTo(handle.x1, handle.y1);
                ctx.lineTo(handle.x2, handle.y2);
                ctx.lineTo(handle.x3, handle.y3);

                ctx.lineTo(r, b - radius);
                ctx.quadraticCurveTo(r, b, r - radius, b);
                ctx.lineTo(radius, b);
                ctx.quadraticCurveTo(0, b, 0, b - radius);
                ctx.lineTo(0, radius);
                ctx.quadraticCurveTo(0, 0, radius, 0);
                ctx.lineTo(r - radius, 0);
                ctx.quadraticCurveTo(r, 0, r, radius);
                break;
        }

        ctx.endFill();

        var sprite = new PIXI.Sprite(Comima.app.renderer.generateTexture(ctx, PIXI.SCALE_MODES.LINEAR, 1, new PIXI.Rectangle(-distance, -distance, x + (distance * 2), y + (distance * 2))));
        sprite.anchor.set(0.5, 0.5);

        return { offset: { x: padding / 2, y: padding / 2 }, sprite: sprite };
    }

    else if (type === "ellipse") {
        var ellipse = drawBalloonPath(size, x, y, 0, 0);
        var ellipse_hige = drawBalloonPath(size, x, y, 0, 0, deg, 0.5);
        ellipse_hige.anchor.set(0.5, 0.5);

        return { offset: { x: (ellipse.width - ellipse_hige.width) / 2, y: (ellipse_hige.height - ellipse.height) / 2 }, sprite: ellipse_hige };
    }

    else {
        var sprite = new PIXI.Sprite(null);
        sprite.anchor.set(0.5, 0.5);

        return { offset: { x: 0, y: 0 }, sprite: sprite };
    }

};

function get_coord_ad(degree, distance) {
    var point = { x: 0, y: 0 };

    point.x = distance * Math.cos(degree * Math.PI / 180);
    point.y = distance * Math.sin(degree * Math.PI / 180);

    return point;
}

function getDgree(x, y, x2, y2) {
    var radian = Math.atan2(y2 - y, x2 - x);
    var dgree = radian * 180 / Math.PI;

    if (dgree < 0)
        dgree = 360 + dgree;

    return dgree;
}

function Rect(size, rot, parent) {
    var rect = {
        w: 147,
        h: 232
    };

    var width = size.w + 20;
    var height = size.h + 20;

    var rotate = rot;

    var hukidasi = {
        w: 20,
        h: 50
    };

    var _path = [];

    switch (rotate) {
        case 135:
            var start = hukidasi.w / 2;
            _path.push(0, height);
            _path.push(0, start);
            _path.push(-hukidasi.h / 2, -hukidasi.h / 2);
            _path.push(start, 0);
            _path.push(width, 0);
            _path.push(width, height);
            _path.push(0, height);
            break;

        case 45:
            var start = hukidasi.w / 2;
            _path.push(0, 0);
            _path.push(width - start, 0);
            _path.push(width + (hukidasi.h / 2), -hukidasi.h / 2);
            _path.push(width, start);
            _path.push(width, height);
            _path.push(0, height);
            break;

        case 315:
            var start = hukidasi.w / 2;
            _path.push(width, 0);
            _path.push(width, height - start);
            _path.push(width + (hukidasi.h / 2), height + hukidasi.h / 2);
            _path.push(width - start, height);
            _path.push(0, height);
            _path.push(0, 0);
            break;

        case 225:
            var start = hukidasi.w / 2;
            _path.push(width, height);
            _path.push(start, height);
            _path.push(-hukidasi.h / 2, height + hukidasi.h / 2);
            _path.push(0, height - start);
            _path.push(0, 0);
            _path.push(width, 0);
            break;

        default:
            // 上
            if (rotate <= 135 && rotate > 45) {
                parent.position.x = size.w - 5;
                parent.position.y = hukidasi.h + 5;

                var _rot = 135 - rotate;
                var max = 90;

                var start = (width * (_rot / max)) - (hukidasi.w / 2);
                if (start < 0) {
                    start = 0;
                }

                else if (start + hukidasi.w > width) {
                    start = width - hukidasi.w;
                }

                _path.push(0, 0);

                if (start !== 0)
                    _path.push(start, 0);

                _path.push(start + (hukidasi.w / 2), -hukidasi.h);
                _path.push(start + hukidasi.w, 0);
                _path.push(width, 0);
                _path.push(width, height);
                _path.push(0, height);
                _path.push(0, 0);
            }

            // 右
            else if (45 >= rotate || 315 <= rotate) {
                parent.position.x = size.w - 5;
                parent.position.y = 5;
                var _rot = rotate > 45 ? (360 - rotate) + 45 : 45 - rotate;
                var max = 90;

                var start = (height * (_rot / max)) - (hukidasi.w / 2);
                if (start < 0) {
                    start = 0;
                }

                else if (start + hukidasi.h > height) {
                    start = height - hukidasi.w;
                }
                _path.push(width, 0);

                if (start !== 0)
                    _path.push(width, start);

                _path.push(width + hukidasi.h, start + (hukidasi.w / 2));
                _path.push(width, start + (hukidasi.w));
                _path.push(width, height);
                _path.push(0, height);
                _path.push(0, 0);
                _path.push(width, 0);
            }

            // 下
            else if (rotate >= 225 && 315 >= rotate) {
                parent.position.y = 5;
                var _rot = rotate - 225;
                var max = 90;

                var start = (width * (_rot / max)) + (hukidasi.w / 2);
                _path.push(width, height);
                _path.push(start, height);
                _path.push(start - (hukidasi.w / 2), height + hukidasi.h);
                _path.push(start - (hukidasi.w), height);
                _path.push(0, height);
                _path.push(0, 0);
                _path.push(width, 0);
                _path.push(width, height);
            }

            // 左
            else if (rotate <= 225 && 135 <= rotate) {
                parent.position.y = 5;
                parent.position.x = size.w + hukidasi.w;

                var _rot = rotate - 135;
                var max = 90;

                var start = (height * (_rot / max)) + (hukidasi.w / 2);
                if (start - hukidasi.w < 0) {
                    start = hukidasi.w;
                }

                else if (start + hukidasi.w > height) {
                    start = height
                }

                _path.push(0, height);

                if (start !== height)
                    _path.push(0, start);

                _path.push(0 - hukidasi.h, start - (hukidasi.w / 2));
                _path.push(0, start - (hukidasi.w));
                _path.push(0, 0);
                _path.push(width, 0);
                _path.push(width, height);
                _path.push(0, height);
            }
            break;
    }

    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xffffff);
    graphics.drawPolygon(_path);
    graphics.endFill();

    var sprite = new PIXI.Sprite(Comima.app.renderer.generateTexture(graphics));
    sprite.addChild(parent);

    sprite.interactive = true;
    sprite.buttonMode = true;
    return sprite;
}

/* (encoding = EUC-JP)
 *
 * comic balloons
 *
 * CREDIT:
 *   written by tkuri {at} fat.coara.or.jp
 *
 * history:
 *   2010-6-6 書いた
 *   2010-6-7 公開
 *   2010-6-9 ちょっとだけコードを整理
 *   2010-6-10 ヒゲとして「○」を描画できるように
 */

/*
 * 点，あるいはタテヨコを表すクラス．
 * いろんなところで使えるクラスなので，今後の事を考えれば，他のファイルに追い出したいところ...
 */
var Xy = function (_x, _y) {
    this.x = _x;
    this.y = _y;
};
/**
 * another から this へコピー
 */
Xy.prototype.assign$ = function (another) {
    this.x = another.x;
    this.y = another.y;
};

/**
 * another との距離
 */
Xy.prototype.distanceTo = function (another) {
    var dx = this.x - another.x;
    var dy = this.y - another.y;
    return Math.sqrt(dx * dx + dy * dy);
};

/**
 * このオブジェクトが長方形のサイズを表すものとして、対角線の長さ
 */
Xy.prototype.diagonal = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * 符号反転
 */
Xy.prototype.negate = function () {
    return new Xy(-this.x, -this.y);
};

/**
 * 継ぎ足し
 * 次の形式のどちらでもok
 *  var resultA = p1.add(10, 12);  // 形式1 / 数字を入力
 *  var resultB = p2.add(p3); // 形式2 / bn2dオブジェクトを入力
 */
Xy.prototype.add = function (a1, a2) {
    if (typeof a1 === typeof this) {
        a2 = a1.y;
        a1 = a1.x;
    }

    return new Xy(this.x + a1, this.y + a2);
};

/**
 * 拡大縮小
 */
Xy.prototype.scale = function (sx, sy) {
    if (arguments.length == 1) {
        sy = sx;
    }
    return new Xy(this.x * sx, this.y * sy);
};
// Xy ここまで


/**
 * w, h の長方形に外接する楕円のデータ．
 * 焦点は長方形の左右の辺上にあるものとする．
 *
 *   this.ps_[0] => 最初の点の座標
 *   this.ps_[1] => 次の点
 *     :
 *   this.ps_[bnEllipse.RESOLUTION - 1] => 最後の点
 *
 *   this.ds_[0] => 最後の点から最初の点への距離をあらかじめ測っておく
 *   this.ds_[1] => 最初の点から次の点への距離
 *     :
 *   this.ds_[bn.Ellipse.RESOLUTION - 1]
 */
var OuterEllipse = function (w, h, size) {
    this.inner_ = new Xy(w, h); // テキストを入れたい箱の大きさ
    this.size = size;
    this.ps_ = [];
    this.ds_ = [];
    this.L_ = 0;
};

// 楕円データを作る際に，1周をどんだけ細かくするか
// static
OuterEllipse.RESOLUTION = 180;

// ps_ や ds_ を作り上げる
OuterEllipse.prototype.requireData_ = function () {
    if (this.ps_.length) {
        return this.ps_;
    }

    var halfbox = this.inner_.scale(1.0, 0.5); // 半分の高さ
    var quadbox = this.inner_.scale(0.5, 0.5); // タテヨコとも半分にしたもの
    /*
    var a = (halfbox.diagonal() + halfbox.y) / 2;
    var b = Math.sqrt(a * a - quadbox.x * quadbox.x);
    */
    var a = (this.inner_.x / 2) + (this.size * 2) + 10;
    var b = (this.inner_.y / 2) + (this.size * 2) + 10;

    // ここで a => 楕円の長軸，b => 楕円の短軸 が求まった

    var prev_p = new Xy(a, 0);

    var round = Math.PI * 2;
    var step = round / OuterEllipse.RESOLUTION;
    for (var deg = 0; deg < round; deg += step) {
        var x = a * Math.cos(deg);
        var y = -b * Math.sin(deg);

        var p = new Xy(x, y);
        this.ps_.push(p);

        var d = prev_p.distanceTo(p);
        this.ds_.push(d);
        this.L_ += d;

        prev_p = p;
    }

    // 最後に，ゴール地点からスタート地点までの距離を測って ds_[0] に上書き
    var d = prev_p.distanceTo(this.ps_[0]);
    this.ds_[0] = d;
    this.L_ += d;

    return this.ps_;
};

// アイテムの個数
OuterEllipse.prototype.count = function () {
    return this.requireData_().length;
};

// bn2dオブジェクトを得る
OuterEllipse.prototype.at = function (p) {
    return (this.requireData_())[p];
};

// 点pと，その一つ前の点との距離
OuterEllipse.prototype.delta = function (p) {
    this.requireData_();
    return this.ds_[p];
};

// 外周の長さ
OuterEllipse.prototype.L = function () {
    this.requireData_();
    return this.L_;
};

/**
 * @param cxt  obj of canvas.getContext('2d')
 * @param ox   left boundary of text box
 * @param oy   top boundary of text box
 * @param w    width of text box
 * @param h    height of text box
 *  -- optional --
 * @param spikes  spikes count. 4 ~ 20 is good.
 * @param depth   spike depth.  -1.0 ~ 1.0 is nice.
 * @param rot     rotation ...   0 ~ 359.
 * @param hige    arrow length.  0.5 is pretty cool.
 */

var drawBalloonPath = function (size, w, h, spikes, depth, rot, hige) {
    var cxt = new PIXI.Graphics();

    cxt.lineStyle(size.lineWidth, 0x000000, 1);
    cxt.beginFill(0xffffff);

    if (!spikes) spikes = 1;
    if (!depth) depth = 0;
    if (!rot) rot = 0;
    if (!hige) hige = 0;

    rot %= 360;
    rot /= (360 / OuterEllipse.RESOLUTION);
    rot = Math.floor(rot);

    var cx = w / 2;
    var cy = h / 2;

    var alt_dep = 1 + Math.abs(depth);
    var data = (depth > 0)
        ? new OuterEllipse(w, h, size.size)
        : new OuterEllipse(w * alt_dep, h * alt_dep, size.size);

    var t = 0;
    var t2 = 0;
    var step = data.L() / spikes;
    var count = 0;

    var start = rot;
    var i = start;
    var prev_i = i;
    var last = data.count() + rot;
    while (i <= last) {

        var n = i % data.count();
        var p = data.at(n);
        var d = data.delta(n);

        t += d;
        t2 += d;

        if (i == start) {
            // ふきだしにヒゲや o o o をつける？
            if (typeof hige == 'string') {
                // o o o をつける
                var p1 = p.scale(1.2);
                var rad = h / 10;
                for (var k = 0; k < hige.length; k++) {
                    cxt.moveTo(cx + p1.x + rad, cy + p1.y); // subpathをここにやらないとへんな線が...
                    cxt.arc(cx + p1.x, cy + p1.y, rad, 0, Math.PI * 2, false);
                    rad /= 2;
                    p1 = p1.scale(1.2);
                }

                cxt.moveTo(cx + p.x, cy + p.y);

            } else if (hige) {
                // 数値ならヒゲをつける
                var p1 = data.at((start + 2) % data.count());
                var d = p.scale(1 + hige);

                cxt.moveTo(cx + p.x, cy + p.y);
                cxt.quadraticCurveTo(
                    cx + d.x, cy + d.y,
                    cx + p1.x, cy + p1.y);
                i += 2;

            } else {
                cxt.moveTo(cx + p.x, cy + p.y);
            }

            prev_i = i;

        } else if (depth == 0) {
            // spike の深さが 0 なら，綺麗な楕円を描くだけ
            cxt.lineTo(cx + p.x, cy + p.y);

        } else if ((data.L() - t2) < 10 && i < last) {
            // t2 が data.L() に近い = つまりもうすぐ周を終える．
            // どうせだから i == last になるまで何もしない．

        } else if (t >= step || i == last) {
            // spike の深さがあるなら，
            // ここまで辿った円周の距離 t が step に達する毎に
            // トゲトゲ (あるいはモコモコ) を描く
            var alt_i = Math.floor((i + prev_i) / 2);
            alt_i = alt_i % data.count();
            var alt_p = data.at(alt_i);
            var alt_x = (depth > 0) ? alt_p.x * alt_dep : alt_p.x / alt_dep;
            var alt_y = (depth > 0) ? alt_p.y * alt_dep : alt_p.y / alt_dep;

            cxt.quadraticCurveTo(
                cx + alt_x,
                cy + alt_y,
                cx + p.x,
                cy + p.y);

            t -= step;
            prev_i = i;
        }

        i++;
    }

    cxt.endFill();

    var bounds = cxt.getLocalBounds();
    bounds.width += 10;
    bounds.height += 10;

    return new PIXI.Sprite(Comima.app.renderer.generateTexture(cxt, PIXI.SCALE_MODES.LINEAR, 1, bounds));
}
