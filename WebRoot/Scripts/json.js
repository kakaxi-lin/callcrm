/*
* js操作cookie保存浏览记录（完整版）
* http://www.lty0311.com/
*
* Copyright 2012, 石家庄领头羊网络科技有限公司
*
* json.js
*/
var JSON = function (sJSON) {
    this.objType = (typeof sJSON);
    this.self = [];
    (function (s, o) { for (var i in o) { o.hasOwnProperty(i) && (s[i] = o[i], s.self[i] = o[i]) }; })(this, (this.objType == 'string') ? eval('0,' + sJSON) : sJSON);
}
JSON.prototype = {
    toString: function () {
        return this.getString();
    },
    valueOf: function () {
        return this.getString();
    },
    getString: function () {
        var sA = [];
        (function (o) {
            var oo = null;
            sA.push('{');
            for (var i in o) {
                if (o.hasOwnProperty(i) && i != 'prototype') {
                    oo = o[i];
                    if (oo instanceof Array) {
                        sA.push(i + ':[');
                        for (var b in oo) {
                            if (oo.hasOwnProperty(b) && b != 'prototype') {
                                sA.push(oo[b] + ',');
                                if (typeof oo[b] == 'object') arguments.callee(oo[b]);
                            }
                        }
                        sA.push('],');
                        continue;
                    } else {
                        sA.push(i + ':\'' + oo + '\',');
                    }
                    if (typeof oo == 'object') arguments.callee(oo);
                }
            }
            sA.push('},');
        })(this.self);
        return sA.slice(0).join('').replace(/\[object object\],/ig, '').replace(/,\}/g, '}').replace(/,\]/g, ']').slice(0, -1);
        //return sA;
    },
    push: function (sName, sValue) {
        this.self[sName] = sValue;
        this[sName] = sValue;
    },
    pop: function () {
        return this.getString();
    }
}