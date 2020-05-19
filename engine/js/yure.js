var meter_power = 1;
var osawari_power = 0;
var oppai_zoom = 1;
            
var _yure = function()
{
    
}

var mode_yoin = 0; //1:余韻モード
var mode_yoin_success_ct1 = 60;
var mode_yoin_success_ct2 = 90;
var move_scale = {x: 5, y: 5};

var speed = 0;
var x_scale = 1.0666666666667;
var y_scale = 1;
var sinpuku_ct2 = 0;
var sinpuku_ct = 0;
var yure_ct = 0;
var yure_ct_asi = 0;
var char_y = 0;
var char_v = -2;
var char_t = 0;
//setTimeout("yure_chg()", 50);
var sinpuku_ct_att = 0;

var deg = 90;   
var rad_90 = deg * (180 / Math.PI); //90度相当のラジアン角。
var to_rad = Math.PI / 180; //これをかけると、degからラジアンへ変換される。

var mouse_xper_avr = 50;
var mouse_yper_avr = 50;
var extra_scale_avr = 0;

var div_time = 1;

var now_yure = 0; //二重実行防止。
function yure_chg() {

    now_yure = 1;

    if (mode_yoin > 0 && mode_yoin <= 1000) {
        mode_yoin++;
    }
    if (mode_yoin > 0 && mode_yoin <= mode_yoin_success_ct1) {
        var opacity = (mode_yoin_success_ct1 - mode_yoin) / mode_yoin_success_ct1;
        if (opacity <= 0) {
            document.getElementById('yoin_fade').style.display = "none";
        } else {
            document.getElementById('yoin_fade').style.opacity = "" + opacity;
        }
    }

    yure_ct += 8 + speed;

    var scale_str = {
        x: (1.0 + (1 + Math.sin( (yure_ct / 8) - rad_90)) / move_scale.x * sinpuku_ct * sinpuku_ct2),
        y: (1.0 + (1 + Math.sin( (yure_ct / 10) - rad_90)) / move_scale.y * sinpuku_ct)
    };

    sinpuku_ct *= 0.95;

    if (now_pinch_zoom || sinpuku_ct > 0.01 || osawari_power > 0 || meter_power > 0 && (mode_yoin == 0 || mode_yoin > 0 && sinpuku_ct > 0.01)) { //いろいろ条件判定しているには、画面が止まったときにsetTimeoutを呼び出さないため。
        if (sinpuku_ct <= 0.01) {
            sinpuku_ct = 0;
        }
        if (now_pinch_zoom || meter_power < 1 || osawari_power < 100 || (mode_yoin > 0 && sinpuku_ct > 0.01)) { //いろいろ条件判定しているには、画面が止まったときにsetTimeoutを呼び出さないため。
            if (now_pinch_zoom > 0) {
                now_pinch_zoom--;
            }
            //setTimeout("yure_chg()", 50);
        } else {
            now_yure = 0;
        }
    } else {
        now_yure = 0;
        sinpuku_ct = 0;
    }

    try{

        for(var i=0; i<AdvTag.yure.length; i++)
        {
            var name = AdvTag.yure[i].name;

            if(Adv.core.sprites[name] === undefined)
                continue;

            AdvTag.yure[i].yure_ct += 8 + AdvTag.yure[i].speed;
            AdvTag.yure[i].sinpuku_ct *= 0.95;

            var scale_str = {
                x: (1.0 + (1 + Math.sin( (AdvTag.yure[i].yure_ct / 8) - rad_90)) / AdvTag.yure[i].yure_scalex * AdvTag.yure[i].sinpuku_ct * sinpuku_ct2),
                y: (1.0 + (1 + Math.sin( (AdvTag.yure[i].yure_ct / 10) - rad_90)) / AdvTag.yure[i].yure_scaley * AdvTag.yure[i].sinpuku_ct)
            };

            Adv.core.sprites[name].scale.set(scale_str.x, scale_str.y);

            if (now_pinch_zoom || AdvTag.yure[i].sinpuku_ct > 0.01 || osawari_power > 0 || meter_power > 0 && (mode_yoin == 0 || mode_yoin > 0 && AdvTag.yure[i].sinpuku_ct > 0.01)) { //いろいろ条件判定しているには、画面が止まったときにsetTimeoutを呼び出さないため。
                if (AdvTag.yure[i].sinpuku_ct <= 0.01) {
                    AdvTag.yure[i].sinpuku_ct = 0;
                }
                if (now_pinch_zoom || meter_power < 1 || osawari_power < 100 || (mode_yoin > 0 && AdvTag.yure[i].sinpuku_ct > 0.01)) { //いろいろ条件判定しているには、画面が止まったときにsetTimeoutを呼び出さないため。
                    if (now_pinch_zoom > 0) {
                        now_pinch_zoom--;
                    }
                } else {
                    now_yure = 0;
                }
            } else {
                now_yure = 0;
                AdvTag.yure[i].sinpuku_ct = 0;
            }
        }

        for(var i=0; i<AdvTag.yure.length;)
        {
            if(AdvTag.yure[i].sinpuku_ct === 0)
            {
                AdvTag.yure.splice(i, 1);
                continue;
            }

            i++;
        }

        //Adv.core.sprites[event.name].scale.set(scale_str.x, scale_str.y);
        //Adv.core.sprites[event.name].scale.set(scale_str.x, 1);
        //Adv.core.sprites[event.name].rotation = Math.sin( (yure_ct / 8) - rad_90) * 0.1 * sinpuku_ct;
    }

    catch(e)
    {

    }
}

var now_pinch_zoom = 0;
var t_0_x = 0;
var t_0_y = 0;
var t_1_x = 0;
var t_1_y = 0;

var t_m_x0 = 50;
var t_m_y0 = 50;

var t_m_x = 0;
var t_m_y = 0;
var t_m_l2 = 0;
var t_m_l0 = 0;
var t_m_now_scale = 1;

var m_xp = 0;
var m_yp = 0;
var m_vx = 0;
var m_vy = 0;
var m_dir = 0;

var now_touching = 0;

function yure_start_on(option) {

    now_touching = 1;

    /*
    event = {clientX: 180, clientY: 208, preventDefault: function(){}, name: option.name};
    speed = option.speed;
    move_scale.x = option.yure_scalex;
    move_scale.y = option.yure_scaley;
    */
    option.yure_ct = 0;
    option.sinpuku_ct = 0.3;

    AdvTag.yure.push(option);

    if (sinpuku_ct < 0.1) {
        yure_start();
        if (m_dir == 0) {
            yure_ct_asi = 0;
        }
    }
    m_dir = 0;
}

function yure_start_updown() {
    yure_start();
    sinpuku_ct2 = 0;
}

var mouse_xper = 0;
var mouse_yper = 0;

var old_touch_ms = 0;

var player_start = 0;
var v_ct = 0;

var v_n = 0;
var play_ignore = 0;

var old_m_dir = 0;
var old_inner_vec = 0;

var mode_yoin_voice_start = 0;
var mode_yoin_voice_reset = 0;

var ccc = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function yure_start() {



    if (player_start != 0) {
        player_start++;
        if (player_start > 10) {
            if (player1.ended) {
                player1.currentTime = 0;
            }
            if (player2.ended) {
                player2.currentTime = 0;
            }
            if (player1.currentTime == 0 && player2.currentTime == 0) {
                player_start = 0;
            }
        }
    }

    if (sinpuku_ct <= 0.01 && osawari_power <= 0 && meter_power <= 0 || (mode_yoin > 0 && sinpuku_ct <= 0)) { //いろいろ条件判定しているには、画面が止まったときにsetTimeoutを呼び出さないため。
        if (now_yure == 0) {
            sinpuku_ct = 1.0; //これを一気に1にするから、不連続な感じがしてしまう。
            yure_ct = 0;
            //setTimeout("yure_chg()", 50);
        } else {
            sinpuku_ct += (1.0 - sinpuku_ct) * 0.3; //これを一気に1にするから、不連続な感じがしてしまう。
        }
    } else {
        //sinpuku_ct = 1.0; //これを一気に1にするから、不連続な感じがしてしまう。
        sinpuku_ct += (1.0 - sinpuku_ct) * 0.3; //これを一気に1にするから、不連続な感じがしてしまう。
    }

    sinpuku_ct2 = 1;
}