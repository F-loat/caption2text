(function(e){function t(t){for(var r,i,s=t[0],c=t[1],l=t[2],f=0,d=[];f<s.length;f++)i=s[f],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/caption2text/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},"2bb3":function(e,t,n){},5326:function(e,t,n){"use strict";var r=n("2bb3"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Index")},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{directives:[{name:"resize",rawName:"v-resize",value:e.resizeHandler,expression:"resizeHandler"}]},[n("v-app-bar",{attrs:{app:"",dark:"",color:"primary"}},[n("v-toolbar-title",{staticClass:"white--text"},[e._v("字幕转换工具")]),n("v-spacer"),n("v-btn",{attrs:{icon:"",dark:""},domProps:{textContent:e._s("<-")},on:{click:e.syncSource}}),n("v-btn",{attrs:{text:"",dark:""},on:{click:e.switchEncoding}},[e._v(e._s(e.encoding))]),n("v-btn",{attrs:{icon:"",dark:""},on:{click:e.switchFormat}},[e._v(e._s(e.files[0].format))]),n("v-btn",{attrs:{icon:"",dark:""},on:{click:e.switchInvert}},[n("v-icon",[e._v("mdi-call-split")])],1),n("a",{attrs:{href:"https://img.alicdn.com/imgextra/i2/O1CN01VhAWVx25SV6pfoc7C_!!6000000007525-0-tps-720-720.jpg",target:"_blank"}},[n("v-btn",{attrs:{icon:"",dark:""}},[n("v-icon",[e._v("mdi-arm-flex")])],1)],1),n("a",{attrs:{href:"https://github.com/F-loat/caption2text",target:"_blank"}},[n("v-btn",{attrs:{icon:"",dark:""}},[n("v-icon",[e._v("mdi-github")])],1)],1)],1),n("v-main",[n("div",{staticClass:"main",on:{drop:function(t){return t.preventDefault(),e.dropFile(t)}}},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.files[0].source,expression:"files[0].source"}],ref:"source",staticClass:"source",attrs:{placeholder:"支持多文件拖入",spellcheck:"false"},domProps:{value:e.files[0].source},on:{input:[function(t){t.target.composing||e.$set(e.files[0],"source",t.target.value)},e.syncResult]}}),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.files[0].result,expression:"files[0].result"}],ref:"result",staticClass:"result",attrs:{placeholder:"支持批量导出",spellcheck:"false"},domProps:{value:e.files[0].result},on:{input:function(t){t.target.composing||e.$set(e.files[0],"result",t.target.value)}}})]),n("v-btn",{staticClass:"file-btn",attrs:{color:"secondary",dark:"",fixed:"",bottom:"",right:"",fab:""}},[n("v-icon",[e._v("mdi-plus")]),n("input",{attrs:{type:"file",multiple:""},on:{input:e.dropFile}})],1),n("v-btn",{attrs:{color:"secondary",dark:"",fixed:"",bottom:"",right:"",fab:""},on:{click:function(t){t.stopPropagation(),e.dialog=!0}}},[n("v-icon",[e._v("mdi-arrow-down")])],1)],1),n("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[e._v("导出文本")]),n("v-card-text",[e._l(e.files,(function(t){return n("v-text-field",{key:t.name,attrs:{label:"文件名",value:t.name,suffix:"."+e.outputFormat},on:{blur:function(e){return t.name=e.target.value}}})})),n("v-radio-group",{attrs:{label:"文件格式",row:""},model:{value:e.outputFormat,callback:function(t){e.outputFormat=t},expression:"outputFormat"}},[n("v-radio",{attrs:{label:"Word",value:"docx"}}),n("v-radio",{attrs:{label:"Text",value:"txt"}})],1)],2),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"primary",text:""},on:{click:function(t){t.stopPropagation(),e.dialog=!1}}},[e._v("取消")]),n("v-btn",{attrs:{color:"primary",text:""},on:{click:function(t){return t.stopPropagation(),e.downFile(t)}}},[e._v("下载")])],1)],1)],1),n("v-snackbar",{attrs:{timeout:2e3,bottom:""},model:{value:e.snackbar.show,callback:function(t){e.$set(e.snackbar,"show",t)},expression:"snackbar.show"}},[e._v(" "+e._s(e.snackbar.text)+" "),n("v-btn",{attrs:{text:"",color:"secondary"},nativeOn:{click:function(t){e.snackbar.show=!1}}},[e._v("关闭")])],1)],1)},s=[],c=(n("99af"),n("a15b"),n("d81d"),n("13d5"),n("b0c0"),n("d3b7"),n("ac1f"),n("5319"),n("1276"),n("498a"),n("f3f3")),l=n("54f8"),u=(n("96cf"),n("c964")),f=n("d0ff"),d=n("3907"),p=n.n(d),v=n("7c39"),m=n.n(v),b=n("0083"),g=n.n(b),h=n("fbf9"),w=n.n(h),x=n("21a6"),k=function(e,t){return new Promise((function(n){var r=new FileReader;r.onload=function(e){n(e.target.result)},r.readAsText(e,t)}))},y=function(e,t){return t?e.split("\n\n").map((function(e){return e.split("\n").reduce((function(e,t){return[t].concat(Object(f["a"])(e))}),[]).join("\n")})).join("\n\n"):e},_={name:"Index",data:function(){return{windowSize:{x:window.innerWidth,y:window.innerHeight},encoding:"utf-8",outputFormat:"docx",needInvert:!1,files:[{format:"ass",source:"",result:"",name:""}],snackbar:{show:!1,text:""},dialog:!1}},mounted:function(){var e=this;this.$nextTick((function(){e.$refs.source.addEventListener("scroll",e.syncScroll),e.$refs.result.addEventListener("scroll",e.syncScroll),new p.a}))},methods:{getResult:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,n=this.needInvert;if("srt"===t){var r=e.replace(/\d+\s*(\d+:?){3},\d* --> (\d+:?){3},\d*/g,"").replace(/{\\an.*}/g,"").replace(/{\\pos.*}/g,"").replace(/(\s*\n){3,}/g,"\n\n").trim();return y(r,n)}if("ass"===t){var a=e.replace(/[^]*\[Events\]\s*/,"").replace(/Format:.*\s*/,"").replace(/Dialogue.*,,(.*p0})?/g,"\n").replace(/{.*?}/g,"").replace(/\\N/g,"\n").replace(/(\s*\n){3,}/g,"\n\n").trim();return y(a,n)}return"txt"===t?e.replace(/(，|。|\.)+/g,"\n"):e},resizeHandler:function(){this.windowSize={x:window.innerWidth,y:window.innerHeight}},switchEncoding:function(){this.encoding="utf-8"===this.encoding?"gb2312":"utf-8";var e=this.files[0];e.raw&&this.dropFile({target:{files:[e.raw]}})},switchFormat:function(){var e=this.files[0];"srt"===e.format?e.format="ass":"ass"===e.format&&(e.format="srt"),this.syncResult()},switchInvert:function(){this.needInvert=!this.needInvert,this.syncResult()},dropFile:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){var r,a,o,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e.target.files||e.dataTransfer.files,a=0;case 2:if(!(a<r.length)){n.next=12;break}return n.next=5,k(r[a],t.encoding);case 5:o=n.sent,i=r[a].name.replace(/.*\./,""),s=r[a].name.replace(".".concat(i),""),t.files[a]={raw:r[a],source:o,format:i,name:s};case 9:a+=1,n.next=2;break;case 12:t.files.length>1&&(t.dialog=!0),t.snackbar={show:!0,text:"字幕导入成功"},t.syncResult();case 15:case"end":return n.stop()}}),n)})))()},downFile:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n,r,a,o,i,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.files,r=e.outputFormat,a=Object(l["a"])(n),t.prev=2,a.s();case 4:if((o=a.n()).done){t.next=30;break}if(i=o.value,i.name){t.next=9;break}return e.snackbar={show:!0,text:"请输入文件名"},t.abrupt("continue",28);case 9:if(s=i.result||e.getResult(i.source,i.format),c=void 0,"docx"!==r){t.next=24;break}return t.prev=12,t.next=15,e.generateDoc(s);case 15:c=t.sent,t.next=22;break;case 18:t.prev=18,t.t0=t["catch"](12),console.log(t.t0),t.t0&&(e.snackbar={show:!0,text:"出错了..."});case 22:t.next=25;break;case 24:c=new Blob([s.replace(/\r?\n/g,"\r\n")]);case 25:Object(x["saveAs"])(c,"".concat(i.name,".").concat(r)),e.snackbar={show:!0,text:"已导出 ".concat(i.name)},e.dialog=!1;case 28:t.next=4;break;case 30:t.next=35;break;case 32:t.prev=32,t.t1=t["catch"](2),a.e(t.t1);case 35:return t.prev=35,a.f(),t.finish(35);case 38:case"end":return t.stop()}}),t,null,[[2,32,35,38],[12,18]])})))()},generateDoc:function(e){return new Promise((function(t,n){g.a.getBinaryContent("template.docx",(function(r,a){if(r)return n(r);var o=new m.a(a),i=(new w.a).loadZip(o);i.setData({author:"F-loat",content:e.split("\n").map((function(e){return{text:e}}))}),i.render();var s=i.getZip().generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});t(s)}))}))},syncScroll:function(e){var t=this;clearTimeout(this.scrollTimer);var n=e.target,r=n.scrollTop,a=n.scrollHeight,o=r/a,i=this.$refs,s=i.source,c=i.result,l=e.target===s?c:s;l.removeEventListener("scroll",this.syncScroll),l.scrollTop=l.scrollHeight*o,this.scrollTimer=setTimeout((function(){l.addEventListener("scroll",t.syncScroll)}),300)},syncSource:function(){var e=this.files[0];this.$set(this.files,0,Object(c["a"])(Object(c["a"])({},e),{},{source:e.result}))},syncResult:function(){var e=this.files[0],t=this.getResult(e.source,e.format);this.$set(this.files,0,Object(c["a"])(Object(c["a"])({},e),{},{result:t}))}}},j=_,O=(n("5326"),n("2877")),F=n("6544"),T=n.n(F),V=n("7496"),S=n("40dc"),R=n("8336"),P=n("b0af"),C=n("99d9"),$=n("169a"),E=n("132d"),I=n("f6c4"),A=n("67b6"),z=n("43a6"),N=n("2db4"),H=n("2fa4"),D=n("8654"),B=n("2a7f"),M=n("269a"),L=n.n(M),W=n("dc22"),J=Object(O["a"])(j,i,s,!1,null,"100eb04e",null),Z=J.exports;T()(J,{VApp:V["a"],VAppBar:S["a"],VBtn:R["a"],VCard:P["a"],VCardActions:C["a"],VCardText:C["b"],VCardTitle:C["c"],VDialog:$["a"],VIcon:E["a"],VMain:I["a"],VRadio:A["a"],VRadioGroup:z["a"],VSnackbar:N["a"],VSpacer:H["a"],VTextField:D["a"],VToolbarTitle:B["a"]}),L()(J,{Resize:W["a"]});var q={name:"app",components:{Index:Z}},G=q,K=(n("034f"),Object(O["a"])(G,a,o,!1,null,null,null)),Q=K.exports,U=n("f309");r["a"].use(U["a"]);var X=new U["a"]({theme:{themes:{light:{primary:"#474a4f",secondary:"#ff5252"}}}}),Y=n("9483");Object(Y["a"])("".concat("/caption2text/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({vuetify:X,render:function(e){return e(Q)}}).$mount("#app")},"85ec":function(e,t,n){}});