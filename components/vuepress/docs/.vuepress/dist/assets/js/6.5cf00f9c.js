(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{337:function(t,e,n){"use strict";var o=n(83);n(29),n(338),n(82),n(186),n(6);var r=function(t){var e=decodeURI(t);if("string"==typeof e)return(e.split("?")[1]||"").split("#")[0].split("&").map((function(t){return t.split("=")})).reduce((function(t,e){var n=Object(o.a)(e,2),r=n[0],i=n[1];return r&&(t[r]=i),t}),{})},i={boardgamesApiUrl:"https://boardgames-api.calisaurus.net",boardgamesSamApiUrl:"https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod",params:{}};function s(){"undefined"!=typeof document&&(i.params=r(document.location))}i.boardgamesApiUrlStatus="".concat(i.boardgamesApiUrl,"/api/status"),i.boardgamesSamApiUrlStatus="".concat(i.boardgamesSamApiUrl,"/status"),s();e.a={update:s,state:i,getAuthHeaders:function(){return{"calisaurus-user":localStorage.getItem("api-user-name"),"calisaurus-user-api-key":localStorage.getItem("api-user-key")}}}},342:function(t,e,n){var o=n(5),r=n(7),i=n(87);t.exports=function(t,e,n){var s,a;return i&&o(s=e.constructor)&&s!==n&&r(a=s.prototype)&&a!==n.prototype&&i(t,a),t}},343:function(t,e,n){var o=n(2);t.exports=o(1..valueOf)},344:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},345:function(t,e,n){var o=n(2),r=n(30),i=n(21),s=n(344),a=o("".replace),c="["+s+"]",l=RegExp("^"+c+c+"*"),u=RegExp(c+c+"*$"),d=function(t){return function(e){var n=i(r(e));return 1&t&&(n=a(n,l,"")),2&t&&(n=a(n,u,"")),n}};t.exports={start:d(1),end:d(2),trim:d(3)}},353:function(t,e,n){var o=n(2),r=n(18),i=Date.prototype,s=o(i.toString),a=o(i.getTime);"Invalid Date"!=String(new Date(NaN))&&r(i,"toString",(function(){var t=a(this);return t==t?s(this):"Invalid Date"}))},354:function(t,e,n){"use strict";n(112),n(34),n(6),n(82),n(29),n(85),n(195);var o=n(362);n(355).c.add(o.a),e.a=function(){return Object.keys(o.a).map((function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLocaleLowerCase().replace("fa-","").replace("xray","x-ray").replace("hsquare","h-square").replace("icursor","i-cursor").replace("stopwatch20","stopwatch-20")})).filter((function(t){return!["font-awesome-logo-full","ad"].includes(t)}))}},357:function(t,e,n){var o=n(0),r=n(3),i=n(2),s=n(21),a=n(345).trim,c=n(344),l=o.parseInt,u=o.Symbol,d=u&&u.iterator,p=/^[+-]?0x/i,h=i(p.exec),f=8!==l(c+"08")||22!==l(c+"0x16")||d&&!r((function(){l(Object(d))}));t.exports=f?function(t,e){var n=a(s(t));return l(n,e>>>0||(h(p,n)?16:10))}:l},398:function(t,e,n){},457:function(t,e,n){var o=n(1),r=n(357);o({target:"Number",stat:!0,forced:Number.parseInt!=r},{parseInt:r})},458:function(t,e,n){"use strict";var o=n(9),r=n(0),i=n(2),s=n(116),a=n(18),c=n(11),l=n(342),u=n(37),d=n(90),p=n(205),h=n(3),f=n(59).f,v=n(32).f,m=n(12).f,y=n(343),g=n(345).trim,b=r.Number,_=b.prototype,O=r.TypeError,w=i("".slice),S=i("".charCodeAt),$=function(t){var e=p(t,"number");return"bigint"==typeof e?e:D(e)},D=function(t){var e,n,o,r,i,s,a,c,l=p(t,"number");if(d(l))throw O("Cannot convert a Symbol value to a number");if("string"==typeof l&&l.length>2)if(l=g(l),43===(e=S(l,0))||45===e){if(88===(n=S(l,2))||120===n)return NaN}else if(48===e){switch(S(l,1)){case 66:case 98:o=2,r=49;break;case 79:case 111:o=8,r=55;break;default:return+l}for(s=(i=w(l,2)).length,a=0;a<s;a++)if((c=S(i,a))<48||c>r)return NaN;return parseInt(i,o)}return+l};if(s("Number",!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var C,x=function(t){var e=arguments.length<1?0:b($(t)),n=this;return u(_,n)&&h((function(){y(n)}))?l(Object(e),n,x):e},M=o?f(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),A=0;M.length>A;A++)c(b,C=M[A])&&!c(x,C)&&m(x,C,v(b,C));x.prototype=_,_.constructor=x,a(r,"Number",x)}},459:function(t,e,n){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",o="second",r="minute",i="hour",s="day",a="week",c="month",l="quarter",u="year",d="date",p="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var o=String(t);return!o||o.length>=e?t:""+Array(e+1-o.length).join(n)+t},y={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),o=Math.floor(n/60),r=n%60;return(e<=0?"+":"-")+m(o,2,"0")+":"+m(r,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var o=12*(n.year()-e.year())+(n.month()-e.month()),r=e.clone().add(o,c),i=n-r<0,s=e.clone().add(o+(i?-1:1),c);return+(-(o+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:u,w:a,d:s,D:d,h:i,m:r,s:o,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",b={};b[g]=v;var _=function(t){return t instanceof $},O=function(t,e,n){var o;if(!t)return g;if("string"==typeof t)b[t]&&(o=t),e&&(b[t]=e,o=t);else{var r=t.name;b[r]=t,o=r}return!n&&o&&(g=o),o||!n&&g},w=function(t,e){if(_(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new $(n)},S=y;S.l=O,S.i=_,S.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var $=function(){function v(t){this.$L=O(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var o=e.match(h);if(o){var r=o[2]-1||0,i=(o[7]||"0").substring(0,3);return n?new Date(Date.UTC(o[1],r,o[3]||1,o[4]||0,o[5]||0,o[6]||0,i)):new Date(o[1],r,o[3]||1,o[4]||0,o[5]||0,o[6]||0,i)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return S},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,l=!!S.u(e)||e,p=S.p(t),h=function(t,e){var o=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return l?o:o.endOf(s)},f=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(p){case u:return l?h(1,0):h(31,11);case c:return l?h(1,m):h(0,m+1);case a:var b=this.$locale().weekStart||0,_=(v<b?v+7:v)-b;return h(l?y-_:y+(6-_),m);case s:case d:return f(g+"Hours",0);case i:return f(g+"Minutes",1);case r:return f(g+"Seconds",2);case o:return f(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,l=S.p(t),p="set"+(this.$u?"UTC":""),h=(a={},a[s]=p+"Date",a[d]=p+"Date",a[c]=p+"Month",a[u]=p+"FullYear",a[i]=p+"Hours",a[r]=p+"Minutes",a[o]=p+"Seconds",a[n]=p+"Milliseconds",a)[l],f=l===s?this.$D+(e-this.$W):e;if(l===c||l===u){var v=this.clone().set(d,1);v.$d[h](f),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](f);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[S.p(t)]()},m.add=function(n,l){var d,p=this;n=Number(n);var h=S.p(l),f=function(t){var e=w(p);return S.w(e.date(e.date()+Math.round(t*n)),p)};if(h===c)return this.set(c,this.$M+n);if(h===u)return this.set(u,this.$y+n);if(h===s)return f(1);if(h===a)return f(7);var v=(d={},d[r]=t,d[i]=e,d[o]=1e3,d)[h]||1,m=this.$d.getTime()+n*v;return S.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var o=t||"YYYY-MM-DDTHH:mm:ssZ",r=S.z(this),i=this.$H,s=this.$m,a=this.$M,c=n.weekdays,l=n.months,u=function(t,n,r,i){return t&&(t[n]||t(e,o))||r[n].substr(0,i)},d=function(t){return S.s(i%12||12,t,"0")},h=n.meridiem||function(t,e,n){var o=t<12?"AM":"PM";return n?o.toLowerCase():o},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:S.s(a+1,2,"0"),MMM:u(n.monthsShort,a,l,3),MMMM:u(l,a),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,c,2),ddd:u(n.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(i),HH:S.s(i,2,"0"),h:d(1),hh:d(2),a:h(i,s,!0),A:h(i,s,!1),m:String(s),mm:S.s(s,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:r};return o.replace(f,(function(t,e){return e||v[t]||r.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,p){var h,f=S.p(d),v=w(n),m=(v.utcOffset()-this.utcOffset())*t,y=this-v,g=S.m(this,v);return g=(h={},h[u]=g/12,h[c]=g,h[l]=g/3,h[a]=(y-m)/6048e5,h[s]=(y-m)/864e5,h[i]=y/e,h[r]=y/t,h[o]=y/1e3,h)[f]||y,p?g:S.a(g)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return b[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),o=O(t,e,!0);return o&&(n.$L=o),n},m.clone=function(){return S.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),D=$.prototype;return w.prototype=D,[["$ms",n],["$s",o],["$m",r],["$H",i],["$W",s],["$M",c],["$y",u],["$D",d]].forEach((function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,$,w),t.$i=!0),w},w.locale=O,w.isDayjs=_,w.unix=function(t){return w(1e3*t)},w.en=b[g],w.Ls=b,w.p={},w}()},460:function(t,e,n){t.exports=function(){"use strict";return function(t,e,n){var o=e.prototype,r=o.format;n.en.ordinal=function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"},o.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return r.bind(this)(t);var o=this.$utils(),i=(t||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(t){switch(t){case"Q":return Math.ceil((e.$M+1)/3);case"Do":return n.ordinal(e.$D);case"gggg":return e.weekYear();case"GGGG":return e.isoWeekYear();case"wo":return n.ordinal(e.week(),"W");case"w":case"ww":return o.s(e.week(),"w"===t?1:2,"0");case"W":case"WW":return o.s(e.isoWeek(),"W"===t?1:2,"0");case"k":case"kk":return o.s(String(0===e.$H?24:e.$H),"k"===t?1:2,"0");case"X":return Math.floor(e.$d.getTime()/1e3);case"x":return e.$d.getTime();case"z":return"["+e.offsetName()+"]";case"zzz":return"["+e.offsetName("long")+"]";default:return t}}));return r.bind(this)(i)}}}()},461:function(t,e,n){"undefined"!=typeof self&&self,t.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=8)}([function(t,e,n){var o=n(4),r=n(5),i=n(6);t.exports=function(t){return o(t)||r(t)||i()}},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e,n){},function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},function(t,e,n){"use strict";var o=n(2);n.n(o).a},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i=n(1),s=n.n(i),a=n(3),c=n.n(a),l={props:{autoscroll:{type:Boolean,default:!0}},watch:{typeAheadPointer:function(){this.autoscroll&&this.maybeAdjustScroll()},open:function(t){var e=this;this.autoscroll&&t&&this.$nextTick((function(){return e.maybeAdjustScroll()}))}},methods:{maybeAdjustScroll:function(){var t,e=(null===(t=this.$refs.dropdownMenu)||void 0===t?void 0:t.children[this.typeAheadPointer])||!1;if(e){var n=this.getDropdownViewport(),o=e.getBoundingClientRect(),r=o.top,i=o.bottom,s=o.height;if(r<n.top)return this.$refs.dropdownMenu.scrollTop=e.offsetTop;if(i>n.bottom)return this.$refs.dropdownMenu.scrollTop=e.offsetTop-(n.height-s)}},getDropdownViewport:function(){return this.$refs.dropdownMenu?this.$refs.dropdownMenu.getBoundingClientRect():{height:0,top:0,bottom:0}}}},u={data:function(){return{typeAheadPointer:-1}},watch:{filteredOptions:function(){for(var t=0;t<this.filteredOptions.length;t++)if(this.selectable(this.filteredOptions[t])){this.typeAheadPointer=t;break}}},methods:{typeAheadUp:function(){for(var t=this.typeAheadPointer-1;t>=0;t--)if(this.selectable(this.filteredOptions[t])){this.typeAheadPointer=t;break}},typeAheadDown:function(){for(var t=this.typeAheadPointer+1;t<this.filteredOptions.length;t++)if(this.selectable(this.filteredOptions[t])){this.typeAheadPointer=t;break}},typeAheadSelect:function(){var t=this.filteredOptions[this.typeAheadPointer];t&&this.select(t)}}},d={props:{loading:{type:Boolean,default:!1}},data:function(){return{mutableLoading:!1}},watch:{search:function(){this.$emit("search",this.search,this.toggleLoading)},loading:function(t){this.mutableLoading=t}},methods:{toggleLoading:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.mutableLoading=null==t?!this.mutableLoading:t}}};function p(t,e,n,o,r,i,s,a){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),o&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),s?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},l._ssrRegister=c):r&&(c=a?function(){r.call(this,this.$root.$options.shadowRoot)}:r),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(t,e){return c.call(e),u(t,e)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,c):[c]}return{exports:t,options:l}}var h={Deselect:p({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10"}},[e("path",{attrs:{d:"M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"}})])}),[],!1,null,null,null).exports,OpenIndicator:p({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"10"}},[e("path",{attrs:{d:"M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"}})])}),[],!1,null,null,null).exports},f={inserted:function(t,e,n){var o=n.context;if(o.appendToBody){var r=o.$refs.toggle.getBoundingClientRect(),i=r.height,s=r.top,a=r.left,c=r.width,l=window.scrollX||window.pageXOffset,u=window.scrollY||window.pageYOffset;t.unbindPosition=o.calculatePosition(t,o,{width:c+"px",left:l+a+"px",top:u+s+i+"px"}),document.body.appendChild(t)}},unbind:function(t,e,n){n.context.appendToBody&&(t.unbindPosition&&"function"==typeof t.unbindPosition&&t.unbindPosition(),t.parentNode&&t.parentNode.removeChild(t))}},v=0;function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function y(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){c()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var g={components:y({},h),directives:{appendToBody:f},mixins:[l,u,d],props:{value:{},components:{type:Object,default:function(){return{}}},options:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},clearable:{type:Boolean,default:!0},deselectFromDropdown:{type:Boolean,default:!1},searchable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:""},transition:{type:String,default:"vs__fade"},clearSearchOnSelect:{type:Boolean,default:!0},closeOnSelect:{type:Boolean,default:!0},label:{type:String,default:"label"},autocomplete:{type:String,default:"off"},reduce:{type:Function,default:function(t){return t}},selectable:{type:Function,default:function(t){return!0}},getOptionLabel:{type:Function,default:function(t){return"object"===s()(t)?t.hasOwnProperty(this.label)?t[this.label]:console.warn('[vue-select warn]: Label key "option.'.concat(this.label,'" does not')+" exist in options object ".concat(JSON.stringify(t),".\n")+"https://vue-select.org/api/props.html#getoptionlabel"):t}},getOptionKey:{type:Function,default:function(t){if("object"!==s()(t))return t;try{return t.hasOwnProperty("id")?t.id:function(t){var e={};return Object.keys(t).sort().forEach((function(n){e[n]=t[n]})),JSON.stringify(e)}(t)}catch(e){return console.warn("[vue-select warn]: Could not stringify this option to generate unique key. Please provide'getOptionKey' prop to return a unique key for each option.\nhttps://vue-select.org/api/props.html#getoptionkey",t,e)}}},onTab:{type:Function,default:function(){this.selectOnTab&&!this.isComposing&&this.typeAheadSelect()}},taggable:{type:Boolean,default:!1},tabindex:{type:Number,default:null},pushTags:{type:Boolean,default:!1},filterable:{type:Boolean,default:!0},filterBy:{type:Function,default:function(t,e,n){return(e||"").toLocaleLowerCase().indexOf(n.toLocaleLowerCase())>-1}},filter:{type:Function,default:function(t,e){var n=this;return t.filter((function(t){var o=n.getOptionLabel(t);return"number"==typeof o&&(o=o.toString()),n.filterBy(t,o,e)}))}},createOption:{type:Function,default:function(t){return"object"===s()(this.optionList[0])?c()({},this.label,t):t}},resetOnOptionsChange:{default:!1,validator:function(t){return["function","boolean"].includes(s()(t))}},clearSearchOnBlur:{type:Function,default:function(t){var e=t.clearSearchOnSelect,n=t.multiple;return e&&!n}},noDrop:{type:Boolean,default:!1},inputId:{type:String},dir:{type:String,default:"auto"},selectOnTab:{type:Boolean,default:!1},selectOnKeyCodes:{type:Array,default:function(){return[13]}},searchInputQuerySelector:{type:String,default:"[type=search]"},mapKeydown:{type:Function,default:function(t,e){return t}},appendToBody:{type:Boolean,default:!1},calculatePosition:{type:Function,default:function(t,e,n){var o=n.width,r=n.top,i=n.left;t.style.top=r,t.style.left=i,t.style.width=o}},dropdownShouldOpen:{type:Function,default:function(t){var e=t.noDrop,n=t.open,o=t.mutableLoading;return!e&&n&&!o}},uid:{type:[String,Number],default:function(){return++v}}},data:function(){return{search:"",open:!1,isComposing:!1,pushedTags:[],_value:[]}},computed:{isTrackingValues:function(){return void 0===this.value||this.$options.propsData.hasOwnProperty("reduce")},selectedValue:function(){var t=this.value;return this.isTrackingValues&&(t=this.$data._value),t?[].concat(t):[]},optionList:function(){return this.options.concat(this.pushTags?this.pushedTags:[])},searchEl:function(){return this.$scopedSlots.search?this.$refs.selectedOptions.querySelector(this.searchInputQuerySelector):this.$refs.search},scope:function(){var t=this,e={search:this.search,loading:this.loading,searching:this.searching,filteredOptions:this.filteredOptions};return{search:{attributes:y({disabled:this.disabled,placeholder:this.searchPlaceholder,tabindex:this.tabindex,readonly:!this.searchable,id:this.inputId,"aria-autocomplete":"list","aria-labelledby":"vs".concat(this.uid,"__combobox"),"aria-controls":"vs".concat(this.uid,"__listbox"),ref:"search",type:"search",autocomplete:this.autocomplete,value:this.search},this.dropdownOpen&&this.filteredOptions[this.typeAheadPointer]?{"aria-activedescendant":"vs".concat(this.uid,"__option-").concat(this.typeAheadPointer)}:{}),events:{compositionstart:function(){return t.isComposing=!0},compositionend:function(){return t.isComposing=!1},keydown:this.onSearchKeyDown,blur:this.onSearchBlur,focus:this.onSearchFocus,input:function(e){return t.search=e.target.value}}},spinner:{loading:this.mutableLoading},noOptions:{search:this.search,loading:this.mutableLoading,searching:this.searching},openIndicator:{attributes:{ref:"openIndicator",role:"presentation",class:"vs__open-indicator"}},listHeader:e,listFooter:e,header:y({},e,{deselect:this.deselect}),footer:y({},e,{deselect:this.deselect})}},childComponents:function(){return y({},h,{},this.components)},stateClasses:function(){return{"vs--open":this.dropdownOpen,"vs--single":!this.multiple,"vs--multiple":this.multiple,"vs--searching":this.searching&&!this.noDrop,"vs--searchable":this.searchable&&!this.noDrop,"vs--unsearchable":!this.searchable,"vs--loading":this.mutableLoading,"vs--disabled":this.disabled}},searching:function(){return!!this.search},dropdownOpen:function(){return this.dropdownShouldOpen(this)},searchPlaceholder:function(){return this.isValueEmpty&&this.placeholder?this.placeholder:void 0},filteredOptions:function(){var t=[].concat(this.optionList);if(!this.filterable&&!this.taggable)return t;var e=this.search.length?this.filter(t,this.search,this):t;if(this.taggable&&this.search.length){var n=this.createOption(this.search);this.optionExists(n)||e.unshift(n)}return e},isValueEmpty:function(){return 0===this.selectedValue.length},showClearButton:function(){return!this.multiple&&this.clearable&&!this.open&&!this.isValueEmpty}},watch:{options:function(t,e){var n=this;!this.taggable&&("function"==typeof n.resetOnOptionsChange?n.resetOnOptionsChange(t,e,n.selectedValue):n.resetOnOptionsChange)&&this.clearSelection(),this.value&&this.isTrackingValues&&this.setInternalValueFromOptions(this.value)},value:{immediate:!0,handler:function(t){this.isTrackingValues&&this.setInternalValueFromOptions(t)}},multiple:function(){this.clearSelection()},open:function(t){this.$emit(t?"open":"close")}},created:function(){this.mutableLoading=this.loading,this.$on("option:created",this.pushTag)},methods:{setInternalValueFromOptions:function(t){var e=this;Array.isArray(t)?this.$data._value=t.map((function(t){return e.findOptionFromReducedValue(t)})):this.$data._value=this.findOptionFromReducedValue(t)},select:function(t){this.$emit("option:selecting",t),this.isOptionSelected(t)?this.deselectFromDropdown&&(this.clearable||this.multiple&&this.selectedValue.length>1)&&this.deselect(t):(this.taggable&&!this.optionExists(t)&&this.$emit("option:created",t),this.multiple&&(t=this.selectedValue.concat(t)),this.updateValue(t),this.$emit("option:selected",t)),this.onAfterSelect(t)},deselect:function(t){var e=this;this.$emit("option:deselecting",t),this.updateValue(this.selectedValue.filter((function(n){return!e.optionComparator(n,t)}))),this.$emit("option:deselected",t)},clearSelection:function(){this.updateValue(this.multiple?[]:null)},onAfterSelect:function(t){this.closeOnSelect&&(this.open=!this.open,this.searchEl.blur()),this.clearSearchOnSelect&&(this.search="")},updateValue:function(t){var e=this;void 0===this.value&&(this.$data._value=t),null!==t&&(t=Array.isArray(t)?t.map((function(t){return e.reduce(t)})):this.reduce(t)),this.$emit("input",t)},toggleDropdown:function(t){var e=t.target!==this.searchEl;e&&t.preventDefault();var n=[].concat(r()(this.$refs.deselectButtons||[]),r()([this.$refs.clearButton]||!1));void 0===this.searchEl||n.filter(Boolean).some((function(e){return e.contains(t.target)||e===t.target}))?t.preventDefault():this.open&&e?this.searchEl.blur():this.disabled||(this.open=!0,this.searchEl.focus())},isOptionSelected:function(t){var e=this;return this.selectedValue.some((function(n){return e.optionComparator(n,t)}))},isOptionDeselectable:function(t){return this.isOptionSelected(t)&&this.deselectFromDropdown},optionComparator:function(t,e){return this.getOptionKey(t)===this.getOptionKey(e)},findOptionFromReducedValue:function(t){var e=this,n=[].concat(r()(this.options),r()(this.pushedTags)).filter((function(n){return JSON.stringify(e.reduce(n))===JSON.stringify(t)}));return 1===n.length?n[0]:n.find((function(t){return e.optionComparator(t,e.$data._value)}))||t},closeSearchOptions:function(){this.open=!1,this.$emit("search:blur")},maybeDeleteValue:function(){if(!this.searchEl.value.length&&this.selectedValue&&this.selectedValue.length&&this.clearable){var t=null;this.multiple&&(t=r()(this.selectedValue.slice(0,this.selectedValue.length-1))),this.updateValue(t)}},optionExists:function(t){var e=this;return this.optionList.some((function(n){return e.optionComparator(n,t)}))},normalizeOptionForSlot:function(t){return"object"===s()(t)?t:c()({},this.label,t)},pushTag:function(t){this.pushedTags.push(t)},onEscape:function(){this.search.length?this.search="":this.searchEl.blur()},onSearchBlur:function(){if(!this.mousedown||this.searching){var t=this.clearSearchOnSelect,e=this.multiple;return this.clearSearchOnBlur({clearSearchOnSelect:t,multiple:e})&&(this.search=""),void this.closeSearchOptions()}this.mousedown=!1,0!==this.search.length||0!==this.options.length||this.closeSearchOptions()},onSearchFocus:function(){this.open=!0,this.$emit("search:focus")},onMousedown:function(){this.mousedown=!0},onMouseUp:function(){this.mousedown=!1},onSearchKeyDown:function(t){var e=this,n=function(t){return t.preventDefault(),!e.isComposing&&e.typeAheadSelect()},o={8:function(t){return e.maybeDeleteValue()},9:function(t){return e.onTab()},27:function(t){return e.onEscape()},38:function(t){return t.preventDefault(),e.typeAheadUp()},40:function(t){return t.preventDefault(),e.typeAheadDown()}};this.selectOnKeyCodes.forEach((function(t){return o[t]=n}));var r=this.mapKeydown(o,this);if("function"==typeof r[t.keyCode])return r[t.keyCode](t)}}},b=(n(7),p(g,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"v-select",class:t.stateClasses,attrs:{dir:t.dir}},[t._t("header",null,null,t.scope.header),t._v(" "),n("div",{ref:"toggle",staticClass:"vs__dropdown-toggle",attrs:{id:"vs"+t.uid+"__combobox",role:"combobox","aria-expanded":t.dropdownOpen.toString(),"aria-owns":"vs"+t.uid+"__listbox","aria-label":"Search for option"},on:{mousedown:function(e){return t.toggleDropdown(e)}}},[n("div",{ref:"selectedOptions",staticClass:"vs__selected-options"},[t._l(t.selectedValue,(function(e){return t._t("selected-option-container",[n("span",{key:t.getOptionKey(e),staticClass:"vs__selected"},[t._t("selected-option",[t._v("\n            "+t._s(t.getOptionLabel(e))+"\n          ")],null,t.normalizeOptionForSlot(e)),t._v(" "),t.multiple?n("button",{ref:"deselectButtons",refInFor:!0,staticClass:"vs__deselect",attrs:{disabled:t.disabled,type:"button",title:"Deselect "+t.getOptionLabel(e),"aria-label":"Deselect "+t.getOptionLabel(e)},on:{click:function(n){return t.deselect(e)}}},[n(t.childComponents.Deselect,{tag:"component"})],1):t._e()],2)],{option:t.normalizeOptionForSlot(e),deselect:t.deselect,multiple:t.multiple,disabled:t.disabled})})),t._v(" "),t._t("search",[n("input",t._g(t._b({staticClass:"vs__search"},"input",t.scope.search.attributes,!1),t.scope.search.events))],null,t.scope.search)],2),t._v(" "),n("div",{ref:"actions",staticClass:"vs__actions"},[n("button",{directives:[{name:"show",rawName:"v-show",value:t.showClearButton,expression:"showClearButton"}],ref:"clearButton",staticClass:"vs__clear",attrs:{disabled:t.disabled,type:"button",title:"Clear Selected","aria-label":"Clear Selected"},on:{click:t.clearSelection}},[n(t.childComponents.Deselect,{tag:"component"})],1),t._v(" "),t._t("open-indicator",[t.noDrop?t._e():n(t.childComponents.OpenIndicator,t._b({tag:"component"},"component",t.scope.openIndicator.attributes,!1))],null,t.scope.openIndicator),t._v(" "),t._t("spinner",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.mutableLoading,expression:"mutableLoading"}],staticClass:"vs__spinner"},[t._v("Loading...")])],null,t.scope.spinner)],2)]),t._v(" "),n("transition",{attrs:{name:t.transition}},[t.dropdownOpen?n("ul",{directives:[{name:"append-to-body",rawName:"v-append-to-body"}],key:"vs"+t.uid+"__listbox",ref:"dropdownMenu",staticClass:"vs__dropdown-menu",attrs:{id:"vs"+t.uid+"__listbox",role:"listbox",tabindex:"-1"},on:{mousedown:function(e){return e.preventDefault(),t.onMousedown(e)},mouseup:t.onMouseUp}},[t._t("list-header",null,null,t.scope.listHeader),t._v(" "),t._l(t.filteredOptions,(function(e,o){return n("li",{key:t.getOptionKey(e),staticClass:"vs__dropdown-option",class:{"vs__dropdown-option--deselect":t.isOptionDeselectable(e)&&o===t.typeAheadPointer,"vs__dropdown-option--selected":t.isOptionSelected(e),"vs__dropdown-option--highlight":o===t.typeAheadPointer,"vs__dropdown-option--disabled":!t.selectable(e)},attrs:{id:"vs"+t.uid+"__option-"+o,role:"option","aria-selected":o===t.typeAheadPointer||null},on:{mouseover:function(n){t.selectable(e)&&(t.typeAheadPointer=o)},click:function(n){n.preventDefault(),n.stopPropagation(),t.selectable(e)&&t.select(e)}}},[t._t("option",[t._v("\n          "+t._s(t.getOptionLabel(e))+"\n        ")],null,t.normalizeOptionForSlot(e))],2)})),t._v(" "),0===t.filteredOptions.length?n("li",{staticClass:"vs__no-options"},[t._t("no-options",[t._v("Sorry, no matching options.")],null,t.scope.noOptions)],2):t._e(),t._v(" "),t._t("list-footer",null,null,t.scope.listFooter)],2):n("ul",{staticStyle:{display:"none",visibility:"hidden"},attrs:{id:"vs"+t.uid+"__listbox",role:"listbox"}})]),t._v(" "),t._t("footer",null,null,t.scope.footer)],2)}),[],!1,null,null,null).exports),_={ajax:d,pointer:u,pointerScroll:l};n.d(e,"VueSelect",(function(){return b})),n.d(e,"mixins",(function(){return _})),e.default=b}])},462:function(t,e,n){},463:function(t,e,n){"use strict";n(398)},487:function(t,e,n){"use strict";n.r(e);var o=n(55),r=(n(111),n(353),n(88),n(457),n(458),n(194),n(29),n(338),n(189),n(82),n(341)),i=n.n(r),s=n(459),a=n.n(s),c=n(460),l=n.n(c),u=n(461),d=n.n(u),p=(n(462),n(354),n(337));a.a.extend(l.a);var h=p.a.state,f=h.boardgamesApiUrl,v=h.boardgamesSamApiUrl,m={components:{vSelect:d.a},data:function(){return{name:"",date:"",coOp:"",winner:"",coOpOutcome:"",noOfPlayers:"",notes:"",message:"",listOfGames:[],sending:!1}},computed:{dateToday:function(){var t=new Date;return a()(t).format("DD/MM/YYYY")},dateYesterday:function(){var t=a()().add(-1,"day");return a()(t).format("DD/MM/YYYY")},dateTwoDaysAgo:function(){var t=a()().add(-2,"day");return a()(t).format("DD/MM/YYYY")},twoDaysAgo:function(){var t=a()().add(-2,"day");return a()(t).format("dddd")},dataToSend:function(){var t={name:this.name,date:this.date||this.dateToday,coOp:this.coOp||"no",noOfPlayers:Number.parseInt(this.noOfPlayers+"")||2};return"yes"===this.coOp?t.coOpOutcome=this.coOpOutcome||"draw":t.winner=this.winner||"draw",this.notes&&(t.notes=this.notes),t}},methods:{coOpClass:function(t){return["option",t===this.coOp?"selected":"deselected"].join(" ")},dateClass:function(t){return["option",t===this.date?"selected":"deselected"].join(" ")},winnerClass:function(t){return["option",t===this.winner?"selected":"deselected"].join(" ")},coOpOutcomeClass:function(t){return["option",t===this.coOpOutcome?"selected":"deselected"].join(" ")},playerCountClass:function(t){return["option",t+""==this.noOfPlayers+""?"selected":"deselected"].join(" ")},selectCoop:function(t){this.coOp=t,this.coOpOutcome="",this.winner=""},dayOfMonth:function(t){var e=t.split("/"),n=new Date(+e[2],e[1]-1,+e[0]);return a()(n).format("Do")},selectDate:function(t){this.date=t},handleSubmit:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var o,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.sending=!0,t.preventDefault(),console.log("You played ".concat(e.name," on ").concat(e.date,". ").concat(e.winner," was the winner!")),o="".concat(v,"/playrecords/create"),r={headers:p.a.getAuthHeaders()},n.prev=5,n.next=8,i.a.post(o,e.dataToSend,r);case 8:e.message="Successfully stored the new play record.",n.next=15;break;case 11:n.prev=11,n.t0=n.catch(5),e.message=n.t0.message,console.error("Could not post to endpoint",n.t0);case 15:e.sending=!1;case 16:case"end":return n.stop()}}),n,null,[[5,11]])})))()}},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,r,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(f,"/api/boardgame/list"),e.prev=1,e.next=4,i.a.get(n);case 4:o=e.sent,r=o.data,s=(r||[]).games,t.listOfGames=s.map((function(t){return t.name})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log("Unable to load board game list from",n,"Error:",e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))()}},y=(n(463),n(54)),g=Object(y.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p"),t._v(" "),n("form",{on:{submit:t.handleSubmit}},[n("h3",[t._v("What was the name of the game?")]),t._v(" "),n("p",{staticClass:"default info"},[t._v("(Required Field!)")]),t._v(" "),n("v-select",{attrs:{taggable:"",options:t.listOfGames},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),n("h3",[t._v("When was the game played?")]),t._v(" "),n("p",{staticClass:"default info"},[t._v("(Default: today, Format: dd/mm/yyyy)")]),t._v(" "),n("div",{staticClass:"row"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],attrs:{type:"text",placeholder:t.dateToday},domProps:{value:t.date},on:{input:function(e){e.target.composing||(t.date=e.target.value)}}}),t._v(" "),n("div",{class:t.dateClass(t.dateToday),on:{click:function(e){return t.selectDate(t.dateToday)}}},[n("label",{attrs:{for:"date-today"}},[t._v("Today ("+t._s(t.dayOfMonth(t.dateToday))+")")])]),t._v(" "),n("div",{class:t.dateClass(t.dateYesterday),on:{click:function(e){return t.selectDate(t.dateYesterday)}}},[n("label",{attrs:{for:"date-yesterday"}},[t._v("Yesterday ("+t._s(t.dayOfMonth(t.dateYesterday))+")")])]),t._v(" "),n("div",{class:t.dateClass(t.dateTwoDaysAgo),on:{click:function(e){return t.selectDate(t.dateTwoDaysAgo)}}},[n("label",{attrs:{for:"date-yesterday"}},[t._v(t._s(t.twoDaysAgo)+" ("+t._s(t.dayOfMonth(t.dateTwoDaysAgo))+")")])])]),t._v(" "),n("h3",[t._v("Was this game vs. or co-operative?")]),t._v(" "),n("p",{staticClass:"default info"},[t._v("(Default: vs)")]),t._v(" "),n("div",{staticClass:"row"},[n("div",{class:t.coOpClass("no"),on:{click:function(e){return t.selectCoop("no")}}},[n("label",{attrs:{for:"coOp-no"}},[t._v("Vs")])]),t._v(" "),n("div",{class:t.coOpClass("yes"),on:{click:function(e){return t.selectCoop("yes")}}},[n("label",{attrs:{for:"coOp-yes"}},[t._v("Co-op")])])]),t._v(" "),n("h3",[t._v("Who won?")]),t._v(" "),n("p",{staticClass:"default info"},[t._v("(Default: draw)")]),t._v(" "),"yes"===t.coOp?n("div",{staticClass:"row"},[n("div",{class:t.coOpOutcomeClass("win"),on:{click:function(e){t.coOpOutcome="win"}}},[n("label",{attrs:{for:"coOp-yes"}},[t._v("Win")])]),t._v(" "),n("div",{class:t.coOpOutcomeClass("loss"),on:{click:function(e){t.coOpOutcome="loss"}}},[n("label",{attrs:{for:"coOp-no"}},[t._v("Loss")])]),t._v(" "),n("div",{class:t.coOpOutcomeClass("draw"),on:{click:function(e){t.coOpOutcome="draw"}}},[n("label",{attrs:{for:"coOp-no"}},[t._v("Draw")])])]):n("div",{staticClass:"row"},[n("div",{class:t.winnerClass("Hannah"),on:{click:function(e){t.winner="Hannah"}}},[n("label",{attrs:{for:"coOp-yes"}},[t._v("Hannah")])]),t._v(" "),n("div",{class:t.winnerClass("John"),on:{click:function(e){t.winner="John"}}},[n("label",{attrs:{for:"coOp-no"}},[t._v("John")])]),t._v(" "),n("div",{class:t.winnerClass("draw"),on:{click:function(e){t.winner="draw"}}},[n("label",{attrs:{for:"coOp-no"}},[t._v("Draw")])]),t._v(" "),n("div",{class:t.winnerClass("other"),on:{click:function(e){t.winner="other"}}},[n("label",{attrs:{for:"coOp-no"}},[t._v("Other")])])]),t._v(" "),n("h3",[t._v("Number of Players")]),t._v(" "),n("p",{staticClass:"default info"},[t._v("(Default: 2)")]),t._v(" "),n("div",{staticClass:"row"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.noOfPlayers,expression:"noOfPlayers"}],attrs:{type:"text",placeholder:"#"},domProps:{value:t.noOfPlayers},on:{input:function(e){e.target.composing||(t.noOfPlayers=e.target.value)}}}),t._v(" "),n("div",{class:t.playerCountClass("2"),on:{click:function(e){t.noOfPlayers=2}}},[n("label",{attrs:{for:"coOp-yes"}},[t._v("2")])]),t._v(" "),n("div",{class:t.playerCountClass("3"),on:{click:function(e){t.noOfPlayers=3}}},[n("label",{attrs:{for:"coOp-no"}},[t._v("3")])]),t._v(" "),n("div",{class:t.playerCountClass("4"),on:{click:function(e){t.noOfPlayers=4}}},[n("label",{attrs:{for:"coOp-no"}},[t._v("4")])])]),t._v(" "),n("h3",[t._v("Notes")]),t._v(" "),n("div",{staticStyle:{position:"relative",width:"94%"}},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.notes,expression:"notes"}],attrs:{type:"text",placeholder:"Any extra notes about the game...",rows:"4"},domProps:{value:t.notes},on:{input:function(e){e.target.composing||(t.notes=e.target.value)}}})]),t._v(" "),n("p",{staticClass:"buttons"},[t.sending?n("button",{attrs:{type:"submit",disabled:""}},[t._v("Sending...")]):n("button",{attrs:{type:"submit"}},[t._v("Submit")])]),t._v(" "),t.message?n("p",[t._v(t._s(t.message))]):t._e()],1),t._v(" "),n("br"),t._v(" "),n("b",[t._v("Data preview")]),t._v(" "),n("pre",[t._v(t._s(JSON.stringify({dataToSend:t.dataToSend},null,2)))])])}),[],!1,null,"ada3e65e",null);e.default=g.exports}}]);