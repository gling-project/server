/**
 * @license
 * lodash 3.10.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./lodash.js`
 */
;(function(){function n(n,t){if(n!==t){var r=null===n,e=n===w,u=n===n,o=null===t,i=t===w,f=t===t;if(n>t&&!o||!u||r&&!i&&f||e&&f)return 1;if(n<t&&!r||!f||o&&!e&&u||i&&u)return-1}return 0}function t(n,t,r){for(var e=n.length,u=r?e:-1;r?u--:++u<e;)if(t(n[u],u,n))return u;return-1}function r(n,t,r){if(t!==t)return p(n,r);r-=1;for(var e=n.length;++r<e;)if(n[r]===t)return r;return-1}function e(n){return typeof n=="function"||false}function u(n){return null==n?"":n+""}function o(n,t){for(var r=-1,e=n.length;++r<e&&-1<t.indexOf(n.charAt(r)););
return r}function i(n,t){for(var r=n.length;r--&&-1<t.indexOf(n.charAt(r)););return r}function f(t,r){return n(t.a,r.a)||t.b-r.b}function a(n){return Nn[n]}function c(n){return Tn[n]}function l(n,t,r){return t?n=Bn[n]:r&&(n=Dn[n]),"\\"+n}function s(n){return"\\"+Dn[n]}function p(n,t,r){var e=n.length;for(t+=r?0:-1;r?t--:++t<e;){var u=n[t];if(u!==u)return t}return-1}function h(n){return!!n&&typeof n=="object"}function _(n){return 160>=n&&9<=n&&13>=n||32==n||160==n||5760==n||6158==n||8192<=n&&(8202>=n||8232==n||8233==n||8239==n||8287==n||12288==n||65279==n);
}function v(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;)n[r]===t&&(n[r]=z,o[++u]=r);return o}function g(n){for(var t=-1,r=n.length;++t<r&&_(n.charCodeAt(t)););return t}function y(n){for(var t=n.length;t--&&_(n.charCodeAt(t)););return t}function d(n){return Ln[n]}function m(_){function Nn(n){if(h(n)&&!(Oo(n)||n instanceof zn)){if(n instanceof Ln)return n;if(nu.call(n,"__chain__")&&nu.call(n,"__wrapped__"))return Mr(n)}return new Ln(n)}function Tn(){}function Ln(n,t,r){this.__wrapped__=n,this.__actions__=r||[],
this.__chain__=!!t}function zn(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=Ru,this.__views__=[]}function Bn(){this.__data__={}}function Dn(n){var t=n?n.length:0;for(this.data={hash:gu(null),set:new lu};t--;)this.push(n[t])}function Mn(n,t){var r=n.data;return(typeof t=="string"||ge(t)?r.set.has(t):r.hash[t])?0:-1}function qn(n,t){var r=-1,e=n.length;for(t||(t=Be(e));++r<e;)t[r]=n[r];return t}function Pn(n,t){for(var r=-1,e=n.length;++r<e&&false!==t(n[r],r,n););
return n}function Kn(n,t){for(var r=-1,e=n.length;++r<e;)if(!t(n[r],r,n))return false;return true}function Vn(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;){var i=n[r];t(i,r,n)&&(o[++u]=i)}return o}function Gn(n,t){for(var r=-1,e=n.length,u=Be(e);++r<e;)u[r]=t(n[r],r,n);return u}function Jn(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function Xn(n,t,r,e){var u=-1,o=n.length;for(e&&o&&(r=n[++u]);++u<o;)r=t(r,n[u],u,n);return r}function Hn(n,t){for(var r=-1,e=n.length;++r<e;)if(t(n[r],r,n))return true;
return false}function Qn(n,t,r,e){return n!==w&&nu.call(e,r)?n:t}function nt(n,t,r){for(var e=-1,u=zo(t),o=u.length;++e<o;){var i=u[e],f=n[i],a=r(f,t[i],i,n,t);(a===a?a===f:f!==f)&&(f!==w||i in n)||(n[i]=a)}return n}function tt(n,t){return null==t?n:et(t,zo(t),n)}function rt(n,t){for(var r=-1,e=null==n,u=!e&&Er(n),o=u?n.length:0,i=t.length,f=Be(i);++r<i;){var a=t[r];f[r]=u?Cr(a,o)?n[a]:w:e?w:n[a]}return f}function et(n,t,r){r||(r={});for(var e=-1,u=t.length;++e<u;){var o=t[e];r[o]=n[o]}return r}function ut(n,t,r){
var e=typeof n;return"function"==e?t===w?n:Bt(n,t,r):null==n?Fe:"object"==e?bt(n):t===w?ze(n):xt(n,t)}function ot(n,t,r,e,u,o,i){var f;if(r&&(f=u?r(n,e,u):r(n)),f!==w)return f;if(!ge(n))return n;if(e=Oo(n)){if(f=kr(n),!t)return qn(n,f)}else{var a=ru.call(n),c=a==K;if(a!=Z&&a!=B&&(!c||u))return Fn[a]?Rr(n,a,t):u?n:{};if(f=Ir(c?{}:n),!t)return tt(f,n)}for(o||(o=[]),i||(i=[]),u=o.length;u--;)if(o[u]==n)return i[u];return o.push(n),i.push(f),(e?Pn:_t)(n,function(e,u){f[u]=ot(e,t,r,u,n,o,i)}),f}function it(n,t,r){
if(typeof n!="function")throw new Ge(L);return su(function(){n.apply(w,r)},t)}function ft(n,t){var e=n?n.length:0,u=[];if(!e)return u;var o=-1,i=xr(),f=i===r,a=f&&t.length>=F&&gu&&lu?new Dn(t):null,c=t.length;a&&(i=Mn,f=false,t=a);n:for(;++o<e;)if(a=n[o],f&&a===a){for(var l=c;l--;)if(t[l]===a)continue n;u.push(a)}else 0>i(t,a,0)&&u.push(a);return u}function at(n,t){var r=true;return Su(n,function(n,e,u){return r=!!t(n,e,u)}),r}function ct(n,t,r,e){var u=e,o=u;return Su(n,function(n,i,f){i=+t(n,i,f),(r(i,u)||i===e&&i===o)&&(u=i,
o=n)}),o}function lt(n,t){var r=[];return Su(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function st(n,t,r,e){var u;return r(n,function(n,r,o){return t(n,r,o)?(u=e?r:n,false):void 0}),u}function pt(n,t,r,e){e||(e=[]);for(var u=-1,o=n.length;++u<o;){var i=n[u];h(i)&&Er(i)&&(r||Oo(i)||pe(i))?t?pt(i,t,r,e):Jn(e,i):r||(e[e.length]=i)}return e}function ht(n,t){Nu(n,t,Re)}function _t(n,t){return Nu(n,t,zo)}function vt(n,t){return Tu(n,t,zo)}function gt(n,t){for(var r=-1,e=t.length,u=-1,o=[];++r<e;){var i=t[r];
ve(n[i])&&(o[++u]=i)}return o}function yt(n,t,r){if(null!=n){r!==w&&r in Br(n)&&(t=[r]),r=0;for(var e=t.length;null!=n&&r<e;)n=n[t[r++]];return r&&r==e?n:w}}function dt(n,t,r,e,u,o){if(n===t)n=true;else if(null==n||null==t||!ge(n)&&!h(t))n=n!==n&&t!==t;else n:{var i=dt,f=Oo(n),a=Oo(t),c=D,l=D;f||(c=ru.call(n),c==B?c=Z:c!=Z&&(f=xe(n))),a||(l=ru.call(t),l==B?l=Z:l!=Z&&xe(t));var s=c==Z,a=l==Z,l=c==l;if(!l||f||s){if(!e&&(c=s&&nu.call(n,"__wrapped__"),a=a&&nu.call(t,"__wrapped__"),c||a)){n=i(c?n.value():n,a?t.value():t,r,e,u,o);
break n}if(l){for(u||(u=[]),o||(o=[]),c=u.length;c--;)if(u[c]==n){n=o[c]==t;break n}u.push(n),o.push(t),n=(f?yr:mr)(n,t,i,r,e,u,o),u.pop(),o.pop()}else n=false}else n=dr(n,t,c)}return n}function mt(n,t,r){var e=t.length,u=e,o=!r;if(null==n)return!u;for(n=Br(n);e--;){var i=t[e];if(o&&i[2]?i[1]!==n[i[0]]:!(i[0]in n))return false}for(;++e<u;){var i=t[e],f=i[0],a=n[f],c=i[1];if(o&&i[2]){if(a===w&&!(f in n))return false}else if(i=r?r(a,c,f):w,i===w?!dt(c,a,r,true):!i)return false}return true}function wt(n,t){var r=-1,e=Er(n)?Be(n.length):[];
return Su(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function bt(n){var t=Ar(n);if(1==t.length&&t[0][2]){var r=t[0][0],e=t[0][1];return function(n){return null==n?false:n[r]===e&&(e!==w||r in Br(n))}}return function(n){return mt(n,t)}}function xt(n,t){var r=Oo(n),e=Wr(n)&&t===t&&!ge(t),u=n+"";return n=Dr(n),function(o){if(null==o)return false;var i=u;if(o=Br(o),!(!r&&e||i in o)){if(o=1==n.length?o:yt(o,Et(n,0,-1)),null==o)return false;i=Zr(n),o=Br(o)}return o[i]===t?t!==w||i in o:dt(t,o[i],w,true)}}function At(n,t,r,e,u){
if(!ge(n))return n;var o=Er(t)&&(Oo(t)||xe(t)),i=o?w:zo(t);return Pn(i||t,function(f,a){if(i&&(a=f,f=t[a]),h(f)){e||(e=[]),u||(u=[]);n:{for(var c=a,l=e,s=u,p=l.length,_=t[c];p--;)if(l[p]==_){n[c]=s[p];break n}var p=n[c],v=r?r(p,_,c,n,t):w,g=v===w;g&&(v=_,Er(_)&&(Oo(_)||xe(_))?v=Oo(p)?p:Er(p)?qn(p):[]:me(_)||pe(_)?v=pe(p)?ke(p):me(p)?p:{}:g=false),l.push(_),s.push(v),g?n[c]=At(v,_,r,l,s):(v===v?v!==p:p===p)&&(n[c]=v)}}else c=n[a],l=r?r(c,f,a,n,t):w,(s=l===w)&&(l=f),l===w&&(!o||a in n)||!s&&(l===l?l===c:c!==c)||(n[a]=l);
}),n}function jt(n){return function(t){return null==t?w:t[n]}}function kt(n){var t=n+"";return n=Dr(n),function(r){return yt(r,n,t)}}function It(n,t){for(var r=n?t.length:0;r--;){var e=t[r];if(e!=u&&Cr(e)){var u=e;pu.call(n,e,1)}}}function Rt(n,t){return n+yu(ku()*(t-n+1))}function Ot(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function Et(n,t,r){var e=-1,u=n.length;for(t=null==t?0:+t||0,0>t&&(t=-t>u?0:u+t),r=r===w||r>u?u:+r||0,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Be(u);++e<u;)r[e]=n[e+t];
return r}function Ct(n,t){var r;return Su(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function Ut(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].c;return n}function Wt(t,r,e){var u=wr(),o=-1;return r=Gn(r,function(n){return u(n)}),t=wt(t,function(n){return{a:Gn(r,function(t){return t(n)}),b:++o,c:n}}),Ut(t,function(t,r){var u;n:{for(var o=-1,i=t.a,f=r.a,a=i.length,c=e.length;++o<a;)if(u=n(i[o],f[o])){if(o>=c)break n;o=e[o],u*="asc"===o||true===o?1:-1;break n}u=t.b-r.b}return u})}function $t(n,t){
var r=0;return Su(n,function(n,e,u){r+=+t(n,e,u)||0}),r}function St(n,t){var e=-1,u=xr(),o=n.length,i=u===r,f=i&&o>=F,a=f&&gu&&lu?new Dn(void 0):null,c=[];a?(u=Mn,i=false):(f=false,a=t?[]:c);n:for(;++e<o;){var l=n[e],s=t?t(l,e,n):l;if(i&&l===l){for(var p=a.length;p--;)if(a[p]===s)continue n;t&&a.push(s),c.push(l)}else 0>u(a,s,0)&&((t||f)&&a.push(s),c.push(l))}return c}function Ft(n,t){for(var r=-1,e=t.length,u=Be(e);++r<e;)u[r]=n[t[r]];return u}function Nt(n,t,r,e){for(var u=n.length,o=e?u:-1;(e?o--:++o<u)&&t(n[o],o,n););
return r?Et(n,e?0:o,e?o+1:u):Et(n,e?o+1:0,e?u:o)}function Tt(n,t){var r=n;r instanceof zn&&(r=r.value());for(var e=-1,u=t.length;++e<u;)var o=t[e],r=o.func.apply(o.thisArg,Jn([r],o.args));return r}function Lt(n,t,r){var e=0,u=n?n.length:e;if(typeof t=="number"&&t===t&&u<=Eu){for(;e<u;){var o=e+u>>>1,i=n[o];(r?i<=t:i<t)&&null!==i?e=o+1:u=o}return u}return zt(n,t,Fe,r)}function zt(n,t,r,e){t=r(t);for(var u=0,o=n?n.length:0,i=t!==t,f=null===t,a=t===w;u<o;){var c=yu((u+o)/2),l=r(n[c]),s=l!==w,p=l===l;
(i?p||e:f?p&&s&&(e||null!=l):a?p&&(e||s):null==l?0:e?l<=t:l<t)?u=c+1:o=c}return xu(o,Ou)}function Bt(n,t,r){if(typeof n!="function")return Fe;if(t===w)return n;switch(r){case 1:return function(r){return n.call(t,r)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,o){return n.call(t,r,e,u,o)};case 5:return function(r,e,u,o,i){return n.call(t,r,e,u,o,i)}}return function(){return n.apply(t,arguments)}}function Dt(n){var t=new ou(n.byteLength);return new hu(t).set(new hu(n)),
t}function Mt(n,t,r){for(var e=r.length,u=-1,o=bu(n.length-e,0),i=-1,f=t.length,a=Be(f+o);++i<f;)a[i]=t[i];for(;++u<e;)a[r[u]]=n[u];for(;o--;)a[i++]=n[u++];return a}function qt(n,t,r){for(var e=-1,u=r.length,o=-1,i=bu(n.length-u,0),f=-1,a=t.length,c=Be(i+a);++o<i;)c[o]=n[o];for(i=o;++f<a;)c[i+f]=t[f];for(;++e<u;)c[i+r[e]]=n[o++];return c}function Pt(n,t){return function(r,e,u){var o=t?t():{};if(e=wr(e,u,3),Oo(r)){u=-1;for(var i=r.length;++u<i;){var f=r[u];n(o,f,e(f,u,r),r)}}else Su(r,function(t,r,u){
n(o,t,e(t,r,u),u)});return o}}function Kt(n){return le(function(t,r){var e=-1,u=null==t?0:r.length,o=2<u?r[u-2]:w,i=2<u?r[2]:w,f=1<u?r[u-1]:w;for(typeof o=="function"?(o=Bt(o,f,5),u-=2):(o=typeof f=="function"?f:w,u-=o?1:0),i&&Ur(r[0],r[1],i)&&(o=3>u?w:o,u=1);++e<u;)(i=r[e])&&n(t,i,o);return t})}function Vt(n,t){return function(r,e){var u=r?Bu(r):0;if(!Sr(u))return n(r,e);for(var o=t?u:-1,i=Br(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}function Zt(n){return function(t,r,e){var u=Br(t);e=e(t);for(var o=e.length,i=n?o:-1;n?i--:++i<o;){
var f=e[i];if(false===r(u[f],f,u))break}return t}}function Yt(n,t){function r(){return(this&&this!==Zn&&this instanceof r?e:n).apply(t,arguments)}var e=Jt(n);return r}function Gt(n){return function(t){var r=-1;t=$e(Ce(t));for(var e=t.length,u="";++r<e;)u=n(u,t[r],r);return u}}function Jt(n){return function(){var t=arguments;switch(t.length){case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:
return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=$u(n.prototype),t=n.apply(r,t);return ge(t)?t:r}}function Xt(n){function t(r,e,u){return u&&Ur(r,e,u)&&(e=w),r=gr(r,n,w,w,w,w,w,e),r.placeholder=t.placeholder,r}return t}function Ht(n,t){return le(function(r){var e=r[0];return null==e?e:(r.push(t),n.apply(w,r))})}function Qt(n,t){return function(r,e,u){if(u&&Ur(r,e,u)&&(e=w),e=wr(e,u,3),1==e.length){
u=r=Oo(r)?r:zr(r);for(var o=e,i=-1,f=u.length,a=t,c=a;++i<f;){var l=u[i],s=+o(l);n(s,a)&&(a=s,c=l)}if(u=c,!r.length||u!==t)return u}return ct(r,e,n,t)}}function nr(n,r){return function(e,u,o){return u=wr(u,o,3),Oo(e)?(u=t(e,u,r),-1<u?e[u]:w):st(e,u,n)}}function tr(n){return function(r,e,u){return r&&r.length?(e=wr(e,u,3),t(r,e,n)):-1}}function rr(n){return function(t,r,e){return r=wr(r,e,3),st(t,r,n,true)}}function er(n){return function(){for(var t,r=arguments.length,e=n?r:-1,u=0,o=Be(r);n?e--:++e<r;){
var i=o[u++]=arguments[e];if(typeof i!="function")throw new Ge(L);!t&&Ln.prototype.thru&&"wrapper"==br(i)&&(t=new Ln([],true))}for(e=t?-1:r;++e<r;){var i=o[e],u=br(i),f="wrapper"==u?zu(i):w;t=f&&$r(f[0])&&f[1]==(E|k|R|C)&&!f[4].length&&1==f[9]?t[br(f[0])].apply(t,f[3]):1==i.length&&$r(i)?t[u]():t.thru(i)}return function(){var n=arguments,e=n[0];if(t&&1==n.length&&Oo(e)&&e.length>=F)return t.plant(e).value();for(var u=0,n=r?o[u].apply(this,n):e;++u<r;)n=o[u].call(this,n);return n}}}function ur(n,t){
return function(r,e,u){return typeof e=="function"&&u===w&&Oo(r)?n(r,e):t(r,Bt(e,u,3))}}function or(n){return function(t,r,e){return(typeof r!="function"||e!==w)&&(r=Bt(r,e,3)),n(t,r,Re)}}function ir(n){return function(t,r,e){return(typeof r!="function"||e!==w)&&(r=Bt(r,e,3)),n(t,r)}}function fr(n){return function(t,r,e){var u={};return r=wr(r,e,3),_t(t,function(t,e,o){o=r(t,e,o),e=n?o:e,t=n?t:o,u[e]=t}),u}}function ar(n){return function(t,r,e){return t=u(t),(n?t:"")+pr(t,r,e)+(n?"":t)}}function cr(n){
var t=le(function(r,e){var u=v(e,t.placeholder);return gr(r,n,w,e,u)});return t}function lr(n,t){return function(r,e,u,o){var i=3>arguments.length;return typeof e=="function"&&o===w&&Oo(r)?n(r,e,u,i):Ot(r,wr(e,o,4),u,i,t)}}function sr(n,t,r,e,u,o,i,f,a,c){function l(){for(var m=arguments.length,b=m,j=Be(m);b--;)j[b]=arguments[b];if(e&&(j=Mt(j,e,u)),o&&(j=qt(j,o,i)),_||y){var b=l.placeholder,k=v(j,b),m=m-k.length;if(m<c){var I=f?qn(f):w,m=bu(c-m,0),E=_?k:w,k=_?w:k,C=_?j:w,j=_?w:j;return t|=_?R:O,t&=~(_?O:R),
g||(t&=~(x|A)),j=[n,t,r,C,E,j,k,I,a,m],I=sr.apply(w,j),$r(n)&&Du(I,j),I.placeholder=b,I}}if(b=p?r:this,I=h?b[n]:n,f)for(m=j.length,E=xu(f.length,m),k=qn(j);E--;)C=f[E],j[E]=Cr(C,m)?k[C]:w;return s&&a<j.length&&(j.length=a),this&&this!==Zn&&this instanceof l&&(I=d||Jt(n)),I.apply(b,j)}var s=t&E,p=t&x,h=t&A,_=t&k,g=t&j,y=t&I,d=h?w:Jt(n);return l}function pr(n,t,r){return n=n.length,t=+t,n<t&&mu(t)?(t-=n,r=null==r?" ":r+"",Ue(r,vu(t/r.length)).slice(0,t)):""}function hr(n,t,r,e){function u(){for(var t=-1,f=arguments.length,a=-1,c=e.length,l=Be(c+f);++a<c;)l[a]=e[a];
for(;f--;)l[a++]=arguments[++t];return(this&&this!==Zn&&this instanceof u?i:n).apply(o?r:this,l)}var o=t&x,i=Jt(n);return u}function _r(n){var t=Pe[n];return function(n,r){return(r=r===w?0:+r||0)?(r=au(10,r),t(n*r)/r):t(n)}}function vr(n){return function(t,r,e,u){var o=wr(e);return null==e&&o===ut?Lt(t,r,n):zt(t,r,o(e,u,1),n)}}function gr(n,t,r,e,u,o,i,f){var a=t&A;if(!a&&typeof n!="function")throw new Ge(L);var c=e?e.length:0;if(c||(t&=~(R|O),e=u=w),c-=u?u.length:0,t&O){var l=e,s=u;e=u=w}var p=a?w:zu(n);
return r=[n,t,r,e,u,l,s,o,i,f],p&&(e=r[1],t=p[1],f=e|t,u=t==E&&e==k||t==E&&e==C&&r[7].length<=p[8]||t==(E|C)&&e==k,(f<E||u)&&(t&x&&(r[2]=p[2],f|=e&x?0:j),(e=p[3])&&(u=r[3],r[3]=u?Mt(u,e,p[4]):qn(e),r[4]=u?v(r[3],z):qn(p[4])),(e=p[5])&&(u=r[5],r[5]=u?qt(u,e,p[6]):qn(e),r[6]=u?v(r[5],z):qn(p[6])),(e=p[7])&&(r[7]=qn(e)),t&E&&(r[8]=null==r[8]?p[8]:xu(r[8],p[8])),null==r[9]&&(r[9]=p[9]),r[0]=p[0],r[1]=f),t=r[1],f=r[9]),r[9]=null==f?a?0:n.length:bu(f-c,0)||0,(p?Lu:Du)(t==x?Yt(r[0],r[2]):t!=R&&t!=(x|R)||r[4].length?sr.apply(w,r):hr.apply(w,r),r);
}function yr(n,t,r,e,u,o,i){var f=-1,a=n.length,c=t.length;if(a!=c&&(!u||c<=a))return false;for(;++f<a;){var l=n[f],c=t[f],s=e?e(u?c:l,u?l:c,f):w;if(s!==w){if(s)continue;return false}if(u){if(!Hn(t,function(n){return l===n||r(l,n,e,u,o,i)}))return false}else if(l!==c&&!r(l,c,e,u,o,i))return false}return true}function dr(n,t,r){switch(r){case M:case q:return+n==+t;case P:return n.name==t.name&&n.message==t.message;case V:return n!=+n?t!=+t:n==+t;case Y:case G:return n==t+""}return false}function mr(n,t,r,e,u,o,i){var f=zo(n),a=f.length,c=zo(t).length;
if(a!=c&&!u)return false;for(c=a;c--;){var l=f[c];if(!(u?l in t:nu.call(t,l)))return false}for(var s=u;++c<a;){var l=f[c],p=n[l],h=t[l],_=e?e(u?h:p,u?p:h,l):w;if(_===w?!r(p,h,e,u,o,i):!_)return false;s||(s="constructor"==l)}return s||(r=n.constructor,e=t.constructor,!(r!=e&&"constructor"in n&&"constructor"in t)||typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)?true:false}function wr(n,t,r){var e=Nn.callback||Se,e=e===Se?ut:e;return r?e(n,t,r):e}function br(n){for(var t=n.name+"",r=Wu[t],e=r?r.length:0;e--;){
var u=r[e],o=u.func;if(null==o||o==n)return u.name}return t}function xr(n,t,e){var u=Nn.indexOf||Vr,u=u===Vr?r:u;return n?u(n,t,e):u}function Ar(n){n=Oe(n);for(var t=n.length;t--;){var r=n[t][1];n[t][2]=r===r&&!ge(r)}return n}function jr(n,t){var r=null==n?w:n[t];return ye(r)?r:w}function kr(n){var t=n.length,r=new n.constructor(t);return t&&"string"==typeof n[0]&&nu.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function Ir(n){return n=n.constructor,typeof n=="function"&&n instanceof n||(n=Ve),
new n}function Rr(n,t,r){var e=n.constructor;switch(t){case J:return Dt(n);case M:case q:return new e(+n);case X:case H:case Q:case nn:case tn:case rn:case en:case un:case on:return t=n.buffer,new e(r?Dt(t):t,n.byteOffset,n.length);case V:case G:return new e(n);case Y:var u=new e(n.source,kn.exec(n));u.lastIndex=n.lastIndex}return u}function Or(n,t,r){return null==n||Wr(t,n)||(t=Dr(t),n=1==t.length?n:yt(n,Et(t,0,-1)),t=Zr(t)),t=null==n?n:n[t],null==t?w:t.apply(n,r)}function Er(n){return null!=n&&Sr(Bu(n));
}function Cr(n,t){return n=typeof n=="number"||On.test(n)?+n:-1,t=null==t?Cu:t,-1<n&&0==n%1&&n<t}function Ur(n,t,r){if(!ge(r))return false;var e=typeof t;return("number"==e?Er(r)&&Cr(t,r.length):"string"==e&&t in r)?(t=r[t],n===n?n===t:t!==t):false}function Wr(n,t){var r=typeof n;return"string"==r&&dn.test(n)||"number"==r?true:Oo(n)?false:!yn.test(n)||null!=t&&n in Br(t)}function $r(n){var t=br(n),r=Nn[t];return typeof r=="function"&&t in zn.prototype?n===r?true:(t=zu(r),!!t&&n===t[0]):false}function Sr(n){return typeof n=="number"&&-1<n&&0==n%1&&n<=Cu;
}function Fr(n,t){return n===w?t:Eo(n,t,Fr)}function Nr(n,t){n=Br(n);for(var r=-1,e=t.length,u={};++r<e;){var o=t[r];o in n&&(u[o]=n[o])}return u}function Tr(n,t){var r={};return ht(n,function(n,e,u){t(n,e,u)&&(r[e]=n)}),r}function Lr(n){for(var t=Re(n),r=t.length,e=r&&n.length,u=!!e&&Sr(e)&&(Oo(n)||pe(n)),o=-1,i=[];++o<r;){var f=t[o];(u&&Cr(f,e)||nu.call(n,f))&&i.push(f)}return i}function zr(n){return null==n?[]:Er(n)?ge(n)?n:Ve(n):Ee(n)}function Br(n){return ge(n)?n:Ve(n)}function Dr(n){if(Oo(n))return n;
var t=[];return u(n).replace(mn,function(n,r,e,u){t.push(e?u.replace(An,"$1"):r||n)}),t}function Mr(n){return n instanceof zn?n.clone():new Ln(n.__wrapped__,n.__chain__,qn(n.__actions__))}function qr(n,t,r){return n&&n.length?((r?Ur(n,t,r):null==t)&&(t=1),Et(n,0>t?0:t)):[]}function Pr(n,t,r){var e=n?n.length:0;return e?((r?Ur(n,t,r):null==t)&&(t=1),t=e-(+t||0),Et(n,0,0>t?0:t)):[]}function Kr(n){return n?n[0]:w}function Vr(n,t,e){var u=n?n.length:0;if(!u)return-1;if(typeof e=="number")e=0>e?bu(u+e,0):e;else if(e)return e=Lt(n,t),
e<u&&(t===t?t===n[e]:n[e]!==n[e])?e:-1;return r(n,t,e||0)}function Zr(n){var t=n?n.length:0;return t?n[t-1]:w}function Yr(n){return qr(n,1)}function Gr(n,t,e,u){if(!n||!n.length)return[];null!=t&&typeof t!="boolean"&&(u=e,e=Ur(n,t,u)?w:t,t=false);var o=wr();if((null!=e||o!==ut)&&(e=o(e,u,3)),t&&xr()===r){t=e;var i;e=-1,u=n.length;for(var o=-1,f=[];++e<u;){var a=n[e],c=t?t(a,e,n):a;e&&i===c||(i=c,f[++o]=a)}n=f}else n=St(n,e);return n}function Jr(n){if(!n||!n.length)return[];var t=-1,r=0;n=Vn(n,function(n){
return Er(n)?(r=bu(n.length,r),true):void 0});for(var e=Be(r);++t<r;)e[t]=Gn(n,jt(t));return e}function Xr(n,t,r){return n&&n.length?(n=Jr(n),null==t?n:(t=Bt(t,r,4),Gn(n,function(n){return Xn(n,t,w,true)}))):[]}function Hr(n,t){var r=-1,e=n?n.length:0,u={};for(!e||t||Oo(n[0])||(t=[]);++r<e;){var o=n[r];t?u[o]=t[r]:o&&(u[o[0]]=o[1])}return u}function Qr(n){return n=Nn(n),n.__chain__=true,n}function ne(n,t,r){return t.call(r,n)}function te(n,t,r){var e=Oo(n)?Kn:at;return r&&Ur(n,t,r)&&(t=w),(typeof t!="function"||r!==w)&&(t=wr(t,r,3)),
e(n,t)}function re(n,t,r){var e=Oo(n)?Vn:lt;return t=wr(t,r,3),e(n,t)}function ee(n,t,r,e){var u=n?Bu(n):0;return Sr(u)||(n=Ee(n),u=n.length),r=typeof r!="number"||e&&Ur(t,r,e)?0:0>r?bu(u+r,0):r||0,typeof n=="string"||!Oo(n)&&be(n)?r<=u&&-1<n.indexOf(t,r):!!u&&-1<xr(n,t,r)}function ue(n,t,r){var e=Oo(n)?Gn:wt;return t=wr(t,r,3),e(n,t)}function oe(n,t,r){if(r?Ur(n,t,r):null==t){n=zr(n);var e=n.length;return 0<e?n[Rt(0,e-1)]:w}r=-1,n=je(n);var e=n.length,u=e-1;for(t=xu(0>t?0:+t||0,e);++r<t;){var e=Rt(r,u),o=n[e];
n[e]=n[r],n[r]=o}return n.length=t,n}function ie(n,t,r){var e=Oo(n)?Hn:Ct;return r&&Ur(n,t,r)&&(t=w),(typeof t!="function"||r!==w)&&(t=wr(t,r,3)),e(n,t)}function fe(n,t){var r;if(typeof t!="function"){if(typeof n!="function")throw new Ge(L);var e=n;n=t,t=e}return function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=w),r}}function ae(n,t,r){function e(t,r){r&&iu(r),a=p=h=w,t&&(_=ho(),c=n.apply(s,f),p||a||(f=s=w))}function u(){var n=t-(ho()-l);0>=n||n>t?e(h,a):p=su(u,n)}function o(){e(g,p);
}function i(){if(f=arguments,l=ho(),s=this,h=g&&(p||!y),false===v)var r=y&&!p;else{a||y||(_=l);var e=v-(l-_),i=0>=e||e>v;i?(a&&(a=iu(a)),_=l,c=n.apply(s,f)):a||(a=su(o,e))}return i&&p?p=iu(p):p||t===v||(p=su(u,t)),r&&(i=true,c=n.apply(s,f)),!i||p||a||(f=s=w),c}var f,a,c,l,s,p,h,_=0,v=false,g=true;if(typeof n!="function")throw new Ge(L);if(t=0>t?0:+t||0,true===r)var y=true,g=false;else ge(r)&&(y=!!r.leading,v="maxWait"in r&&bu(+r.maxWait||0,t),g="trailing"in r?!!r.trailing:g);return i.cancel=function(){p&&iu(p),a&&iu(a),
_=0,a=p=h=w},i}function ce(n,t){function r(){var e=arguments,u=t?t.apply(this,e):e[0],o=r.cache;return o.has(u)?o.get(u):(e=n.apply(this,e),r.cache=o.set(u,e),e)}if(typeof n!="function"||t&&typeof t!="function")throw new Ge(L);return r.cache=new ce.Cache,r}function le(n,t){if(typeof n!="function")throw new Ge(L);return t=bu(t===w?n.length-1:+t||0,0),function(){for(var r=arguments,e=-1,u=bu(r.length-t,0),o=Be(u);++e<u;)o[e]=r[t+e];switch(t){case 0:return n.call(this,o);case 1:return n.call(this,r[0],o);
case 2:return n.call(this,r[0],r[1],o)}for(u=Be(t+1),e=-1;++e<t;)u[e]=r[e];return u[t]=o,n.apply(this,u)}}function se(n,t){return n>t}function pe(n){return h(n)&&Er(n)&&nu.call(n,"callee")&&!cu.call(n,"callee")}function he(n,t,r,e){return e=(r=typeof r=="function"?Bt(r,e,3):w)?r(n,t):w,e===w?dt(n,t,r):!!e}function _e(n){return h(n)&&typeof n.message=="string"&&ru.call(n)==P}function ve(n){return ge(n)&&ru.call(n)==K}function ge(n){var t=typeof n;return!!n&&("object"==t||"function"==t)}function ye(n){
return null==n?false:ve(n)?uu.test(Qe.call(n)):h(n)&&Rn.test(n)}function de(n){return typeof n=="number"||h(n)&&ru.call(n)==V}function me(n){var t;if(!h(n)||ru.call(n)!=Z||pe(n)||!(nu.call(n,"constructor")||(t=n.constructor,typeof t!="function"||t instanceof t)))return false;var r;return ht(n,function(n,t){r=t}),r===w||nu.call(n,r)}function we(n){return ge(n)&&ru.call(n)==Y}function be(n){return typeof n=="string"||h(n)&&ru.call(n)==G}function xe(n){return h(n)&&Sr(n.length)&&!!Sn[ru.call(n)]}function Ae(n,t){
return n<t}function je(n){var t=n?Bu(n):0;return Sr(t)?t?qn(n):[]:Ee(n)}function ke(n){return et(n,Re(n))}function Ie(n){return gt(n,Re(n))}function Re(n){if(null==n)return[];ge(n)||(n=Ve(n));for(var t=n.length,t=t&&Sr(t)&&(Oo(n)||pe(n))&&t||0,r=n.constructor,e=-1,r=typeof r=="function"&&r.prototype===n,u=Be(t),o=0<t;++e<t;)u[e]=e+"";for(var i in n)o&&Cr(i,t)||"constructor"==i&&(r||!nu.call(n,i))||u.push(i);return u}function Oe(n){n=Br(n);for(var t=-1,r=zo(n),e=r.length,u=Be(e);++t<e;){var o=r[t];
u[t]=[o,n[o]]}return u}function Ee(n){return Ft(n,zo(n))}function Ce(n){return(n=u(n))&&n.replace(En,a).replace(xn,"")}function Ue(n,t){var r="";if(n=u(n),t=+t,1>t||!n||!mu(t))return r;do t%2&&(r+=n),t=yu(t/2),n+=n;while(t);return r}function We(n,t,r){var e=n;return(n=u(n))?(r?Ur(e,t,r):null==t)?n.slice(g(n),y(n)+1):(t+="",n.slice(o(n,t),i(n,t)+1)):n}function $e(n,t,r){return r&&Ur(n,t,r)&&(t=w),n=u(n),n.match(t||Wn)||[]}function Se(n,t,r){return r&&Ur(n,t,r)&&(t=w),h(n)?Ne(n):ut(n,t)}function Fe(n){
return n}function Ne(n){return bt(ot(n,true))}function Te(n,t,r){if(null==r){var e=ge(t),u=e?zo(t):w;((u=u&&u.length?gt(t,u):w)?u.length:e)||(u=false,r=t,t=n,n=this)}u||(u=gt(t,zo(t)));var o=true,e=-1,i=ve(n),f=u.length;false===r?o=false:ge(r)&&"chain"in r&&(o=r.chain);for(;++e<f;){r=u[e];var a=t[r];n[r]=a,i&&(n.prototype[r]=function(t){return function(){var r=this.__chain__;if(o||r){var e=n(this.__wrapped__);return(e.__actions__=qn(this.__actions__)).push({func:t,args:arguments,thisArg:n}),e.__chain__=r,e}return t.apply(n,Jn([this.value()],arguments));
}}(a))}return n}function Le(){}function ze(n){return Wr(n)?jt(n):kt(n)}_=_?Yn.defaults(Zn.Object(),_,Yn.pick(Zn,$n)):Zn;var Be=_.Array,De=_.Date,Me=_.Error,qe=_.Function,Pe=_.Math,Ke=_.Number,Ve=_.Object,Ze=_.RegExp,Ye=_.String,Ge=_.TypeError,Je=Be.prototype,Xe=Ve.prototype,He=Ye.prototype,Qe=qe.prototype.toString,nu=Xe.hasOwnProperty,tu=0,ru=Xe.toString,eu=Zn._,uu=Ze("^"+Qe.call(nu).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ou=_.ArrayBuffer,iu=_.clearTimeout,fu=_.parseFloat,au=Pe.pow,cu=Xe.propertyIsEnumerable,lu=jr(_,"Set"),su=_.setTimeout,pu=Je.splice,hu=_.Uint8Array,_u=jr(_,"WeakMap"),vu=Pe.ceil,gu=jr(Ve,"create"),yu=Pe.floor,du=jr(Be,"isArray"),mu=_.isFinite,wu=jr(Ve,"keys"),bu=Pe.max,xu=Pe.min,Au=jr(De,"now"),ju=_.parseInt,ku=Pe.random,Iu=Ke.NEGATIVE_INFINITY,Ru=Ke.POSITIVE_INFINITY,Ou=4294967294,Eu=2147483647,Cu=9007199254740991,Uu=_u&&new _u,Wu={};
Nn.support={},Nn.templateSettings={escape:_n,evaluate:vn,interpolate:gn,variable:"",imports:{_:Nn}};var $u=function(){function n(){}return function(t){if(ge(t)){n.prototype=t;var r=new n;n.prototype=w}return r||{}}}(),Su=Vt(_t),Fu=Vt(vt,true),Nu=Zt(),Tu=Zt(true),Lu=Uu?function(n,t){return Uu.set(n,t),n}:Fe,zu=Uu?function(n){return Uu.get(n)}:Le,Bu=jt("length"),Du=function(){var n=0,t=0;return function(r,e){var u=ho(),o=S-(u-t);if(t=u,0<o){if(++n>=$)return r}else n=0;return Lu(r,e)}}(),Mu=le(function(n,t){
return h(n)&&Er(n)?ft(n,pt(t,false,true)):[]}),qu=tr(),Pu=tr(true),Ku=le(function(n){for(var t=n.length,e=t,u=Be(l),o=xr(),i=o===r,f=[];e--;){var a=n[e]=Er(a=n[e])?a:[];u[e]=i&&120<=a.length&&gu&&lu?new Dn(e&&a):null}var i=n[0],c=-1,l=i?i.length:0,s=u[0];n:for(;++c<l;)if(a=i[c],0>(s?Mn(s,a):o(f,a,0))){for(e=t;--e;){var p=u[e];if(0>(p?Mn(p,a):o(n[e],a,0)))continue n}s&&s.push(a),f.push(a)}return f}),Vu=le(function(t,r){r=pt(r);var e=rt(t,r);return It(t,r.sort(n)),e}),Zu=vr(),Yu=vr(true),Gu=le(function(n){return St(pt(n,false,true));
}),Ju=le(function(n,t){return Er(n)?ft(n,t):[]}),Xu=le(Jr),Hu=le(function(n){var t=n.length,r=2<t?n[t-2]:w,e=1<t?n[t-1]:w;return 2<t&&typeof r=="function"?t-=2:(r=1<t&&typeof e=="function"?(--t,e):w,e=w),n.length=t,Xr(n,r,e)}),Qu=le(function(n){return n=pt(n),this.thru(function(t){t=Oo(t)?t:[Br(t)];for(var r=n,e=-1,u=t.length,o=-1,i=r.length,f=Be(u+i);++e<u;)f[e]=t[e];for(;++o<i;)f[e++]=r[o];return f})}),no=le(function(n,t){return rt(n,pt(t))}),to=Pt(function(n,t,r){nu.call(n,r)?++n[r]:n[r]=1}),ro=nr(Su),eo=nr(Fu,true),uo=ur(Pn,Su),oo=ur(function(n,t){
for(var r=n.length;r--&&false!==t(n[r],r,n););return n},Fu),io=Pt(function(n,t,r){nu.call(n,r)?n[r].push(t):n[r]=[t]}),fo=Pt(function(n,t,r){n[r]=t}),ao=le(function(n,t,r){var e=-1,u=typeof t=="function",o=Wr(t),i=Er(n)?Be(n.length):[];return Su(n,function(n){var f=u?t:o&&null!=n?n[t]:w;i[++e]=f?f.apply(n,r):Or(n,t,r)}),i}),co=Pt(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),lo=lr(Xn,Su),so=lr(function(n,t,r,e){var u=n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);return r},Fu),po=le(function(n,t){
if(null==n)return[];var r=t[2];return r&&Ur(t[0],t[1],r)&&(t.length=1),Wt(n,pt(t),[])}),ho=Au||function(){return(new De).getTime()},_o=le(function(n,t,r){var e=x;if(r.length)var u=v(r,_o.placeholder),e=e|R;return gr(n,e,t,r,u)}),vo=le(function(n,t){t=t.length?pt(t):Ie(n);for(var r=-1,e=t.length;++r<e;){var u=t[r];n[u]=gr(n[u],x,n)}return n}),go=le(function(n,t,r){var e=x|A;if(r.length)var u=v(r,go.placeholder),e=e|R;return gr(t,e,n,r,u)}),yo=Xt(k),mo=Xt(I),wo=le(function(n,t){return it(n,1,t)}),bo=le(function(n,t,r){
return it(n,t,r)}),xo=er(),Ao=er(true),jo=le(function(n,t){if(t=pt(t),typeof n!="function"||!Kn(t,e))throw new Ge(L);var r=t.length;return le(function(e){for(var u=xu(e.length,r);u--;)e[u]=t[u](e[u]);return n.apply(this,e)})}),ko=cr(R),Io=cr(O),Ro=le(function(n,t){return gr(n,C,w,w,w,pt(t))}),Oo=du||function(n){return h(n)&&Sr(n.length)&&ru.call(n)==D},Eo=Kt(At),Co=Kt(function(n,t,r){return r?nt(n,t,r):tt(n,t)}),Uo=Ht(Co,function(n,t){return n===w?t:n}),Wo=Ht(Eo,Fr),$o=rr(_t),So=rr(vt),Fo=or(Nu),No=or(Tu),To=ir(_t),Lo=ir(vt),zo=wu?function(n){
var t=null==n?w:n.constructor;return typeof t=="function"&&t.prototype===n||typeof n!="function"&&Er(n)?Lr(n):ge(n)?wu(n):[]}:Lr,Bo=fr(true),Do=fr(),Mo=le(function(n,t){if(null==n)return{};if("function"!=typeof t[0])return t=Gn(pt(t),Ye),Nr(n,ft(Re(n),t));var r=Bt(t[0],t[1],3);return Tr(n,function(n,t,e){return!r(n,t,e)})}),qo=le(function(n,t){return null==n?{}:"function"==typeof t[0]?Tr(n,Bt(t[0],t[1],3)):Nr(n,pt(t))}),Po=Gt(function(n,t,r){return t=t.toLowerCase(),n+(r?t.charAt(0).toUpperCase()+t.slice(1):t);
}),Ko=Gt(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Vo=ar(),Zo=ar(true),Yo=Gt(function(n,t,r){return n+(r?"_":"")+t.toLowerCase()}),Go=Gt(function(n,t,r){return n+(r?" ":"")+(t.charAt(0).toUpperCase()+t.slice(1))}),Jo=le(function(n,t){try{return n.apply(w,t)}catch(r){return _e(r)?r:new Me(r)}}),Xo=le(function(n,t){return function(r){return Or(r,n,t)}}),Ho=le(function(n,t){return function(r){return Or(n,r,t)}}),Qo=_r("ceil"),ni=_r("floor"),ti=Qt(se,Iu),ri=Qt(Ae,Ru),ei=_r("round");return Nn.prototype=Tn.prototype,
Ln.prototype=$u(Tn.prototype),Ln.prototype.constructor=Ln,zn.prototype=$u(Tn.prototype),zn.prototype.constructor=zn,Bn.prototype["delete"]=function(n){return this.has(n)&&delete this.__data__[n]},Bn.prototype.get=function(n){return"__proto__"==n?w:this.__data__[n]},Bn.prototype.has=function(n){return"__proto__"!=n&&nu.call(this.__data__,n)},Bn.prototype.set=function(n,t){return"__proto__"!=n&&(this.__data__[n]=t),this},Dn.prototype.push=function(n){var t=this.data;typeof n=="string"||ge(n)?t.set.add(n):t.hash[n]=true;
},ce.Cache=Bn,Nn.after=function(n,t){if(typeof t!="function"){if(typeof n!="function")throw new Ge(L);var r=n;n=t,t=r}return n=mu(n=+n)?n:0,function(){return 1>--n?t.apply(this,arguments):void 0}},Nn.ary=function(n,t,r){return r&&Ur(n,t,r)&&(t=w),t=n&&null==t?n.length:bu(+t||0,0),gr(n,E,w,w,w,w,t)},Nn.assign=Co,Nn.at=no,Nn.before=fe,Nn.bind=_o,Nn.bindAll=vo,Nn.bindKey=go,Nn.callback=Se,Nn.chain=Qr,Nn.chunk=function(n,t,r){t=(r?Ur(n,t,r):null==t)?1:bu(yu(t)||1,1),r=0;for(var e=n?n.length:0,u=-1,o=Be(vu(e/t));r<e;)o[++u]=Et(n,r,r+=t);
return o},Nn.compact=function(n){for(var t=-1,r=n?n.length:0,e=-1,u=[];++t<r;){var o=n[t];o&&(u[++e]=o)}return u},Nn.constant=function(n){return function(){return n}},Nn.countBy=to,Nn.create=function(n,t,r){var e=$u(n);return r&&Ur(n,t,r)&&(t=w),t?tt(e,t):e},Nn.curry=yo,Nn.curryRight=mo,Nn.debounce=ae,Nn.defaults=Uo,Nn.defaultsDeep=Wo,Nn.defer=wo,Nn.delay=bo,Nn.difference=Mu,Nn.drop=qr,Nn.dropRight=Pr,Nn.dropRightWhile=function(n,t,r){return n&&n.length?Nt(n,wr(t,r,3),true,true):[]},Nn.dropWhile=function(n,t,r){
return n&&n.length?Nt(n,wr(t,r,3),true):[]},Nn.fill=function(n,t,r,e){var u=n?n.length:0;if(!u)return[];for(r&&typeof r!="number"&&Ur(n,t,r)&&(r=0,e=u),u=n.length,r=null==r?0:+r||0,0>r&&(r=-r>u?0:u+r),e=e===w||e>u?u:+e||0,0>e&&(e+=u),u=r>e?0:e>>>0,r>>>=0;r<u;)n[r++]=t;return n},Nn.filter=re,Nn.flatten=function(n,t,r){var e=n?n.length:0;return r&&Ur(n,t,r)&&(t=false),e?pt(n,t):[]},Nn.flattenDeep=function(n){return n&&n.length?pt(n,true):[]},Nn.flow=xo,Nn.flowRight=Ao,Nn.forEach=uo,Nn.forEachRight=oo,Nn.forIn=Fo,
Nn.forInRight=No,Nn.forOwn=To,Nn.forOwnRight=Lo,Nn.functions=Ie,Nn.groupBy=io,Nn.indexBy=fo,Nn.initial=function(n){return Pr(n,1)},Nn.intersection=Ku,Nn.invert=function(n,t,r){r&&Ur(n,t,r)&&(t=w),r=-1;for(var e=zo(n),u=e.length,o={};++r<u;){var i=e[r],f=n[i];t?nu.call(o,f)?o[f].push(i):o[f]=[i]:o[f]=i}return o},Nn.invoke=ao,Nn.keys=zo,Nn.keysIn=Re,Nn.map=ue,Nn.mapKeys=Bo,Nn.mapValues=Do,Nn.matches=Ne,Nn.matchesProperty=function(n,t){return xt(n,ot(t,true))},Nn.memoize=ce,Nn.merge=Eo,Nn.method=Xo,Nn.methodOf=Ho,
Nn.mixin=Te,Nn.modArgs=jo,Nn.negate=function(n){if(typeof n!="function")throw new Ge(L);return function(){return!n.apply(this,arguments)}},Nn.omit=Mo,Nn.once=function(n){return fe(2,n)},Nn.pairs=Oe,Nn.partial=ko,Nn.partialRight=Io,Nn.partition=co,Nn.pick=qo,Nn.pluck=function(n,t){return ue(n,ze(t))},Nn.property=ze,Nn.propertyOf=function(n){return function(t){return yt(n,Dr(t),t+"")}},Nn.pull=function(){var n=arguments,t=n[0];if(!t||!t.length)return t;for(var r=0,e=xr(),u=n.length;++r<u;)for(var o=0,i=n[r];-1<(o=e(t,i,o));)pu.call(t,o,1);
return t},Nn.pullAt=Vu,Nn.range=function(n,t,r){r&&Ur(n,t,r)&&(t=r=w),n=+n||0,r=null==r?1:+r||0,null==t?(t=n,n=0):t=+t||0;var e=-1;t=bu(vu((t-n)/(r||1)),0);for(var u=Be(t);++e<t;)u[e]=n,n+=r;return u},Nn.rearg=Ro,Nn.reject=function(n,t,r){var e=Oo(n)?Vn:lt;return t=wr(t,r,3),e(n,function(n,r,e){return!t(n,r,e)})},Nn.remove=function(n,t,r){var e=[];if(!n||!n.length)return e;var u=-1,o=[],i=n.length;for(t=wr(t,r,3);++u<i;)r=n[u],t(r,u,n)&&(e.push(r),o.push(u));return It(n,o),e},Nn.rest=Yr,Nn.restParam=le,
Nn.set=function(n,t,r){if(null==n)return n;var e=t+"";t=null!=n[e]||Wr(t,n)?[e]:Dr(t);for(var e=-1,u=t.length,o=u-1,i=n;null!=i&&++e<u;){var f=t[e];ge(i)&&(e==o?i[f]=r:null==i[f]&&(i[f]=Cr(t[e+1])?[]:{})),i=i[f]}return n},Nn.shuffle=function(n){return oe(n,Ru)},Nn.slice=function(n,t,r){var e=n?n.length:0;return e?(r&&typeof r!="number"&&Ur(n,t,r)&&(t=0,r=e),Et(n,t,r)):[]},Nn.sortBy=function(n,t,r){if(null==n)return[];r&&Ur(n,t,r)&&(t=w);var e=-1;return t=wr(t,r,3),n=wt(n,function(n,r,u){return{a:t(n,r,u),
b:++e,c:n}}),Ut(n,f)},Nn.sortByAll=po,Nn.sortByOrder=function(n,t,r,e){return null==n?[]:(e&&Ur(t,r,e)&&(r=w),Oo(t)||(t=null==t?[]:[t]),Oo(r)||(r=null==r?[]:[r]),Wt(n,t,r))},Nn.spread=function(n){if(typeof n!="function")throw new Ge(L);return function(t){return n.apply(this,t)}},Nn.take=function(n,t,r){return n&&n.length?((r?Ur(n,t,r):null==t)&&(t=1),Et(n,0,0>t?0:t)):[]},Nn.takeRight=function(n,t,r){var e=n?n.length:0;return e?((r?Ur(n,t,r):null==t)&&(t=1),t=e-(+t||0),Et(n,0>t?0:t)):[]},Nn.takeRightWhile=function(n,t,r){
return n&&n.length?Nt(n,wr(t,r,3),false,true):[]},Nn.takeWhile=function(n,t,r){return n&&n.length?Nt(n,wr(t,r,3)):[]},Nn.tap=function(n,t,r){return t.call(r,n),n},Nn.throttle=function(n,t,r){var e=true,u=true;if(typeof n!="function")throw new Ge(L);return false===r?e=false:ge(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),ae(n,t,{leading:e,maxWait:+t,trailing:u})},Nn.thru=ne,Nn.times=function(n,t,r){if(n=yu(n),1>n||!mu(n))return[];var e=-1,u=Be(xu(n,4294967295));for(t=Bt(t,r,1);++e<n;)4294967295>e?u[e]=t(e):t(e);
return u},Nn.toArray=je,Nn.toPlainObject=ke,Nn.transform=function(n,t,r,e){var u=Oo(n)||xe(n);return t=wr(t,e,4),null==r&&(u||ge(n)?(e=n.constructor,r=u?Oo(n)?new e:[]:$u(ve(e)?e.prototype:w)):r={}),(u?Pn:_t)(n,function(n,e,u){return t(r,n,e,u)}),r},Nn.union=Gu,Nn.uniq=Gr,Nn.unzip=Jr,Nn.unzipWith=Xr,Nn.values=Ee,Nn.valuesIn=function(n){return Ft(n,Re(n))},Nn.where=function(n,t){return re(n,bt(t))},Nn.without=Ju,Nn.wrap=function(n,t){return t=null==t?Fe:t,gr(t,R,w,[n],[])},Nn.xor=function(){for(var n=-1,t=arguments.length;++n<t;){
var r=arguments[n];if(Er(r))var e=e?Jn(ft(e,r),ft(r,e)):r}return e?St(e):[]},Nn.zip=Xu,Nn.zipObject=Hr,Nn.zipWith=Hu,Nn.backflow=Ao,Nn.collect=ue,Nn.compose=Ao,Nn.each=uo,Nn.eachRight=oo,Nn.extend=Co,Nn.iteratee=Se,Nn.methods=Ie,Nn.object=Hr,Nn.select=re,Nn.tail=Yr,Nn.unique=Gr,Te(Nn,Nn),Nn.add=function(n,t){return(+n||0)+(+t||0)},Nn.attempt=Jo,Nn.camelCase=Po,Nn.capitalize=function(n){return(n=u(n))&&n.charAt(0).toUpperCase()+n.slice(1)},Nn.ceil=Qo,Nn.clone=function(n,t,r,e){return t&&typeof t!="boolean"&&Ur(n,t,r)?t=false:typeof t=="function"&&(e=r,
r=t,t=false),typeof r=="function"?ot(n,t,Bt(r,e,3)):ot(n,t)},Nn.cloneDeep=function(n,t,r){return typeof t=="function"?ot(n,true,Bt(t,r,3)):ot(n,true)},Nn.deburr=Ce,Nn.endsWith=function(n,t,r){n=u(n),t+="";var e=n.length;return r=r===w?e:xu(0>r?0:+r||0,e),r-=t.length,0<=r&&n.indexOf(t,r)==r},Nn.escape=function(n){return(n=u(n))&&hn.test(n)?n.replace(sn,c):n},Nn.escapeRegExp=function(n){return(n=u(n))&&bn.test(n)?n.replace(wn,l):n||"(?:)"},Nn.every=te,Nn.find=ro,Nn.findIndex=qu,Nn.findKey=$o,Nn.findLast=eo,
Nn.findLastIndex=Pu,Nn.findLastKey=So,Nn.findWhere=function(n,t){return ro(n,bt(t))},Nn.first=Kr,Nn.floor=ni,Nn.get=function(n,t,r){return n=null==n?w:yt(n,Dr(t),t+""),n===w?r:n},Nn.gt=se,Nn.gte=function(n,t){return n>=t},Nn.has=function(n,t){if(null==n)return false;var r=nu.call(n,t);if(!r&&!Wr(t)){if(t=Dr(t),n=1==t.length?n:yt(n,Et(t,0,-1)),null==n)return false;t=Zr(t),r=nu.call(n,t)}return r||Sr(n.length)&&Cr(t,n.length)&&(Oo(n)||pe(n))},Nn.identity=Fe,Nn.includes=ee,Nn.indexOf=Vr,Nn.inRange=function(n,t,r){
return t=+t||0,r===w?(r=t,t=0):r=+r||0,n>=xu(t,r)&&n<bu(t,r)},Nn.isArguments=pe,Nn.isArray=Oo,Nn.isBoolean=function(n){return true===n||false===n||h(n)&&ru.call(n)==M},Nn.isDate=function(n){return h(n)&&ru.call(n)==q},Nn.isElement=function(n){return!!n&&1===n.nodeType&&h(n)&&!me(n)},Nn.isEmpty=function(n){return null==n?true:Er(n)&&(Oo(n)||be(n)||pe(n)||h(n)&&ve(n.splice))?!n.length:!zo(n).length},Nn.isEqual=he,Nn.isError=_e,Nn.isFinite=function(n){return typeof n=="number"&&mu(n)},Nn.isFunction=ve,Nn.isMatch=function(n,t,r,e){
return r=typeof r=="function"?Bt(r,e,3):w,mt(n,Ar(t),r)},Nn.isNaN=function(n){return de(n)&&n!=+n},Nn.isNative=ye,Nn.isNull=function(n){return null===n},Nn.isNumber=de,Nn.isObject=ge,Nn.isPlainObject=me,Nn.isRegExp=we,Nn.isString=be,Nn.isTypedArray=xe,Nn.isUndefined=function(n){return n===w},Nn.kebabCase=Ko,Nn.last=Zr,Nn.lastIndexOf=function(n,t,r){var e=n?n.length:0;if(!e)return-1;var u=e;if(typeof r=="number")u=(0>r?bu(e+r,0):xu(r||0,e-1))+1;else if(r)return u=Lt(n,t,true)-1,n=n[u],(t===t?t===n:n!==n)?u:-1;
if(t!==t)return p(n,u,true);for(;u--;)if(n[u]===t)return u;return-1},Nn.lt=Ae,Nn.lte=function(n,t){return n<=t},Nn.max=ti,Nn.min=ri,Nn.noConflict=function(){return Zn._=eu,this},Nn.noop=Le,Nn.now=ho,Nn.pad=function(n,t,r){n=u(n),t=+t;var e=n.length;return e<t&&mu(t)?(e=(t-e)/2,t=yu(e),e=vu(e),r=pr("",e,r),r.slice(0,t)+n+r):n},Nn.padLeft=Vo,Nn.padRight=Zo,Nn.parseInt=function(n,t,r){return(r?Ur(n,t,r):null==t)?t=0:t&&(t=+t),n=We(n),ju(n,t||(In.test(n)?16:10))},Nn.random=function(n,t,r){r&&Ur(n,t,r)&&(t=r=w);
var e=null==n,u=null==t;return null==r&&(u&&typeof n=="boolean"?(r=n,n=1):typeof t=="boolean"&&(r=t,u=true)),e&&u&&(t=1,u=false),n=+n||0,u?(t=n,n=0):t=+t||0,r||n%1||t%1?(r=ku(),xu(n+r*(t-n+fu("1e-"+((r+"").length-1))),t)):Rt(n,t)},Nn.reduce=lo,Nn.reduceRight=so,Nn.repeat=Ue,Nn.result=function(n,t,r){var e=null==n?w:n[t];return e===w&&(null==n||Wr(t,n)||(t=Dr(t),n=1==t.length?n:yt(n,Et(t,0,-1)),e=null==n?w:n[Zr(t)]),e=e===w?r:e),ve(e)?e.call(n):e},Nn.round=ei,Nn.runInContext=m,Nn.size=function(n){var t=n?Bu(n):0;
return Sr(t)?t:zo(n).length},Nn.snakeCase=Yo,Nn.some=ie,Nn.sortedIndex=Zu,Nn.sortedLastIndex=Yu,Nn.startCase=Go,Nn.startsWith=function(n,t,r){return n=u(n),r=null==r?0:xu(0>r?0:+r||0,n.length),n.lastIndexOf(t,r)==r},Nn.sum=function(n,t,r){if(r&&Ur(n,t,r)&&(t=w),t=wr(t,r,3),1==t.length){n=Oo(n)?n:zr(n),r=n.length;for(var e=0;r--;)e+=+t(n[r])||0;n=e}else n=$t(n,t);return n},Nn.template=function(n,t,r){var e=Nn.templateSettings;r&&Ur(n,t,r)&&(t=r=w),n=u(n),t=nt(tt({},r||t),e,Qn),r=nt(tt({},t.imports),e.imports,Qn);
var o,i,f=zo(r),a=Ft(r,f),c=0;r=t.interpolate||Cn;var l="__p+='";r=Ze((t.escape||Cn).source+"|"+r.source+"|"+(r===gn?jn:Cn).source+"|"+(t.evaluate||Cn).source+"|$","g");var p="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";if(n.replace(r,function(t,r,e,u,f,a){return e||(e=u),l+=n.slice(c,a).replace(Un,s),r&&(o=true,l+="'+__e("+r+")+'"),f&&(i=true,l+="';"+f+";\n__p+='"),e&&(l+="'+((__t=("+e+"))==null?'':__t)+'"),c=a+t.length,t}),l+="';",(t=t.variable)||(l="with(obj){"+l+"}"),l=(i?l.replace(fn,""):l).replace(an,"$1").replace(cn,"$1;"),
l="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(o?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}",t=Jo(function(){return qe(f,p+"return "+l).apply(w,a)}),t.source=l,_e(t))throw t;return t},Nn.trim=We,Nn.trimLeft=function(n,t,r){var e=n;return(n=u(n))?n.slice((r?Ur(e,t,r):null==t)?g(n):o(n,t+"")):n},Nn.trimRight=function(n,t,r){var e=n;return(n=u(n))?(r?Ur(e,t,r):null==t)?n.slice(0,y(n)+1):n.slice(0,i(n,t+"")+1):n;
},Nn.trunc=function(n,t,r){r&&Ur(n,t,r)&&(t=w);var e=U;if(r=W,null!=t)if(ge(t)){var o="separator"in t?t.separator:o,e="length"in t?+t.length||0:e;r="omission"in t?u(t.omission):r}else e=+t||0;if(n=u(n),e>=n.length)return n;if(e-=r.length,1>e)return r;if(t=n.slice(0,e),null==o)return t+r;if(we(o)){if(n.slice(e).search(o)){var i,f=n.slice(0,e);for(o.global||(o=Ze(o.source,(kn.exec(o)||"")+"g")),o.lastIndex=0;n=o.exec(f);)i=n.index;t=t.slice(0,null==i?e:i)}}else n.indexOf(o,e)!=e&&(o=t.lastIndexOf(o),
-1<o&&(t=t.slice(0,o)));return t+r},Nn.unescape=function(n){return(n=u(n))&&pn.test(n)?n.replace(ln,d):n},Nn.uniqueId=function(n){var t=++tu;return u(n)+t},Nn.words=$e,Nn.all=te,Nn.any=ie,Nn.contains=ee,Nn.eq=he,Nn.detect=ro,Nn.foldl=lo,Nn.foldr=so,Nn.head=Kr,Nn.include=ee,Nn.inject=lo,Te(Nn,function(){var n={};return _t(Nn,function(t,r){Nn.prototype[r]||(n[r]=t)}),n}(),false),Nn.sample=oe,Nn.prototype.sample=function(n){return this.__chain__||null!=n?this.thru(function(t){return oe(t,n)}):oe(this.value());
},Nn.VERSION=b,Pn("bind bindKey curry curryRight partial partialRight".split(" "),function(n){Nn[n].placeholder=Nn}),Pn(["drop","take"],function(n,t){zn.prototype[n]=function(r){var e=this.__filtered__;if(e&&!t)return new zn(this);r=null==r?1:bu(yu(r)||0,0);var u=this.clone();return e?u.__takeCount__=xu(u.__takeCount__,r):u.__views__.push({size:r,type:n+(0>u.__dir__?"Right":"")}),u},zn.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()}}),Pn(["filter","map","takeWhile"],function(n,t){
var r=t+1,e=r!=T;zn.prototype[n]=function(n,t){var u=this.clone();return u.__iteratees__.push({iteratee:wr(n,t,1),type:r}),u.__filtered__=u.__filtered__||e,u}}),Pn(["first","last"],function(n,t){var r="take"+(t?"Right":"");zn.prototype[n]=function(){return this[r](1).value()[0]}}),Pn(["initial","rest"],function(n,t){var r="drop"+(t?"":"Right");zn.prototype[n]=function(){return this.__filtered__?new zn(this):this[r](1)}}),Pn(["pluck","where"],function(n,t){var r=t?"filter":"map",e=t?bt:ze;zn.prototype[n]=function(n){
return this[r](e(n))}}),zn.prototype.compact=function(){return this.filter(Fe)},zn.prototype.reject=function(n,t){return n=wr(n,t,1),this.filter(function(t){return!n(t)})},zn.prototype.slice=function(n,t){n=null==n?0:+n||0;var r=this;return r.__filtered__&&(0<n||0>t)?new zn(r):(0>n?r=r.takeRight(-n):n&&(r=r.drop(n)),t!==w&&(t=+t||0,r=0>t?r.dropRight(-t):r.take(t-n)),r)},zn.prototype.takeRightWhile=function(n,t){return this.reverse().takeWhile(n,t).reverse()},zn.prototype.toArray=function(){return this.take(Ru);
},_t(zn.prototype,function(n,t){var r=/^(?:filter|map|reject)|While$/.test(t),e=/^(?:first|last)$/.test(t),u=Nn[e?"take"+("last"==t?"Right":""):t];u&&(Nn.prototype[t]=function(){function t(n){return e&&i?u(n,1)[0]:u.apply(w,Jn([n],o))}var o=e?[1]:arguments,i=this.__chain__,f=this.__wrapped__,a=!!this.__actions__.length,c=f instanceof zn,l=o[0],s=c||Oo(f);return s&&r&&typeof l=="function"&&1!=l.length&&(c=s=false),l={func:ne,args:[t],thisArg:w},a=c&&!a,e&&!i?a?(f=f.clone(),f.__actions__.push(l),n.call(f)):u.call(w,this.value())[0]:!e&&s?(f=a?f:new zn(this),
f=n.apply(f,o),f.__actions__.push(l),new Ln(f,i)):this.thru(t)})}),Pn("join pop push replace shift sort splice split unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?He:Je)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:join|pop|replace|shift)$/.test(n);Nn.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),_t(zn.prototype,function(n,t){var r=Nn[t];if(r){var e=r.name+"";(Wu[e]||(Wu[e]=[])).push({
name:t,func:r})}}),Wu[sr(w,A).name]=[{name:"wrapper",func:w}],zn.prototype.clone=function(){var n=new zn(this.__wrapped__);return n.__actions__=qn(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=qn(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=qn(this.__views__),n},zn.prototype.reverse=function(){if(this.__filtered__){var n=new zn(this);n.__dir__=-1,n.__filtered__=true}else n=this.clone(),n.__dir__*=-1;return n},zn.prototype.value=function(){
var n,t=this.__wrapped__.value(),r=this.__dir__,e=Oo(t),u=0>r,o=e?t.length:0;n=o;for(var i=this.__views__,f=0,a=-1,c=i.length;++a<c;){var l=i[a],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":n-=s;break;case"take":n=xu(n,f+s);break;case"takeRight":f=bu(f,n-s)}}if(n={start:f,end:n},i=n.start,f=n.end,n=f-i,u=u?f:i-1,i=this.__iteratees__,f=i.length,a=0,c=xu(n,this.__takeCount__),!e||o<F||o==n&&c==n)return Tt(t,this.__actions__);e=[];n:for(;n--&&a<c;){for(u+=r,o=-1,l=t[u];++o<f;){var p=i[o],s=p.type,p=p.iteratee(l);
if(s==T)l=p;else if(!p){if(s==N)continue n;break n}}e[a++]=l}return e},Nn.prototype.chain=function(){return Qr(this)},Nn.prototype.commit=function(){return new Ln(this.value(),this.__chain__)},Nn.prototype.concat=Qu,Nn.prototype.plant=function(n){for(var t,r=this;r instanceof Tn;){var e=Mr(r);t?u.__wrapped__=e:t=e;var u=e,r=r.__wrapped__}return u.__wrapped__=n,t},Nn.prototype.reverse=function(){function n(n){return n.reverse()}var t=this.__wrapped__;return t instanceof zn?(this.__actions__.length&&(t=new zn(this)),
t=t.reverse(),t.__actions__.push({func:ne,args:[n],thisArg:w}),new Ln(t,this.__chain__)):this.thru(n)},Nn.prototype.toString=function(){return this.value()+""},Nn.prototype.run=Nn.prototype.toJSON=Nn.prototype.valueOf=Nn.prototype.value=function(){return Tt(this.__wrapped__,this.__actions__)},Nn.prototype.collect=Nn.prototype.map,Nn.prototype.head=Nn.prototype.first,Nn.prototype.select=Nn.prototype.filter,Nn.prototype.tail=Nn.prototype.rest,Nn}var w,b="3.10.1",x=1,A=2,j=4,k=8,I=16,R=32,O=64,E=128,C=256,U=30,W="...",$=150,S=16,F=200,N=1,T=2,L="Expected a function",z="__lodash_placeholder__",B="[object Arguments]",D="[object Array]",M="[object Boolean]",q="[object Date]",P="[object Error]",K="[object Function]",V="[object Number]",Z="[object Object]",Y="[object RegExp]",G="[object String]",J="[object ArrayBuffer]",X="[object Float32Array]",H="[object Float64Array]",Q="[object Int8Array]",nn="[object Int16Array]",tn="[object Int32Array]",rn="[object Uint8Array]",en="[object Uint8ClampedArray]",un="[object Uint16Array]",on="[object Uint32Array]",fn=/\b__p\+='';/g,an=/\b(__p\+=)''\+/g,cn=/(__e\(.*?\)|\b__t\))\+'';/g,ln=/&(?:amp|lt|gt|quot|#39|#96);/g,sn=/[&<>"'`]/g,pn=RegExp(ln.source),hn=RegExp(sn.source),_n=/<%-([\s\S]+?)%>/g,vn=/<%([\s\S]+?)%>/g,gn=/<%=([\s\S]+?)%>/g,yn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,dn=/^\w*$/,mn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,wn=/^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,bn=RegExp(wn.source),xn=/[\u0300-\u036f\ufe20-\ufe23]/g,An=/\\(\\)?/g,jn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,kn=/\w*$/,In=/^0[xX]/,Rn=/^\[object .+?Constructor\]$/,On=/^\d+$/,En=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,Cn=/($^)/,Un=/['\n\r\u2028\u2029\\]/g,Wn=RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+","g"),$n="Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout isFinite parseFloat parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap".split(" "),Sn={};
Sn[X]=Sn[H]=Sn[Q]=Sn[nn]=Sn[tn]=Sn[rn]=Sn[en]=Sn[un]=Sn[on]=true,Sn[B]=Sn[D]=Sn[J]=Sn[M]=Sn[q]=Sn[P]=Sn[K]=Sn["[object Map]"]=Sn[V]=Sn[Z]=Sn[Y]=Sn["[object Set]"]=Sn[G]=Sn["[object WeakMap]"]=false;var Fn={};Fn[B]=Fn[D]=Fn[J]=Fn[M]=Fn[q]=Fn[X]=Fn[H]=Fn[Q]=Fn[nn]=Fn[tn]=Fn[V]=Fn[Z]=Fn[Y]=Fn[G]=Fn[rn]=Fn[en]=Fn[un]=Fn[on]=true,Fn[P]=Fn[K]=Fn["[object Map]"]=Fn["[object Set]"]=Fn["[object WeakMap]"]=false;var Nn={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a",
"\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y",
"\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss"},Tn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},Ln={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},zn={"function":true,object:true},Bn={0:"x30",1:"x31",2:"x32",3:"x33",4:"x34",5:"x35",6:"x36",7:"x37",8:"x38",9:"x39",A:"x41",B:"x42",C:"x43",D:"x44",E:"x45",F:"x46",a:"x61",b:"x62",c:"x63",d:"x64",e:"x65",f:"x66",n:"x6e",r:"x72",t:"x74",u:"x75",v:"x76",x:"x78"},Dn={"\\":"\\",
"'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Mn=zn[typeof exports]&&exports&&!exports.nodeType&&exports,qn=zn[typeof module]&&module&&!module.nodeType&&module,Pn=zn[typeof self]&&self&&self.Object&&self,Kn=zn[typeof window]&&window&&window.Object&&window,Vn=qn&&qn.exports===Mn&&Mn,Zn=Mn&&qn&&typeof global=="object"&&global&&global.Object&&global||Kn!==(this&&this.window)&&Kn||Pn||this,Yn=m();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(Zn._=Yn, define(function(){
return Yn})):Mn&&qn?Vn?(qn.exports=Yn)._=Yn:Mn._=Yn:Zn._=Yn}).call(this);
!function(){"use strict";function e(t,o){function r(e,t){return function(){return e.apply(t,arguments)}}var i;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=t,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!e.notNeeded(t)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,u=0,l=a.length;l>u;u++)c[a[u]]=r(c[a[u]],c);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var r=Node.prototype.removeEventListener;"click"===e?r.call(t,e,n.hijacked||n,o):r.call(t,e,n,o)},t.addEventListener=function(e,n,o){var r=Node.prototype.addEventListener;"click"===e?r.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),o):r.call(t,e,n,o)}),"function"==typeof t.onclick&&(i=t.onclick,t.addEventListener("click",function(e){i(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,r=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),i=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(o&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,o;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),o=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;o&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,i;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],o){if(i=window.getSelection(),i.rangeCount&&!i.isCollapsed)return!0;if(!r){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,a,c,u,l,s=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,i&&(l=e.changedTouches[0],s=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||s,s.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=s.tagName.toLowerCase(),"label"===c){if(t=this.findControl(s)){if(this.focus(s),n)return!1;s=t}}else if(this.needsFocus(s))return e.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(s),this.sendClick(s,e),o&&"select"===c||(this.targetElement=null,e.preventDefault()),!1);return o&&!r&&(u=s.fastClickScrollParent,u&&u.fastClickLastScrollTop!==u.scrollTop)?!0:(this.needsClick(s)||(e.preventDefault(),this.sendClick(s,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,o,r,i;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(r=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),r[1]>=10&&r[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(i=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],i>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),function(){"use strict";angular.module("mobile-angular-ui.core.activeLinks",[]).run(["$rootScope","$window","$document","$location",function(e,t,n,o){var r=function(){var e,r=o.url(),i=r.indexOf("#"),a=r.indexOf("?"),c=t.location.href,u=c.indexOf(r);-1===i&&-1===a?e=c:-1!==i&&i>a?e=c.slice(0,u+i):-1!==a&&a>i&&(e=c.slice(0,u+a));for(var l=n[0].links,s=0;s<l.length;s++){var d=l[s],f=angular.element(d);f.attr("href")&&""!==f.attr("href")&&d.href===e?f.addClass("active"):f.attr("href")&&""!==f.attr("href")&&d.href&&d.href.length&&f.removeClass("active")}};e.$on("$locationChangeSuccess",r),e.$on("$includeContentLoaded",r)}])}(),function(){"use strict";angular.module("mobile-angular-ui.core.capture",[]).run(["Capture","$rootScope",function(e,t){t.$on("$routeChangeSuccess",function(){e.resetAll()})}]).factory("Capture",["$compile",function(e){var t={};return{resetAll:function(){for(var e in t)t.hasOwnProperty(e)&&this.resetYielder(e)},resetYielder:function(e){var n=t[e];this.setContentFor(e,n.defaultContent,n.defaultScope)},putYielder:function(e,n,o,r){var i={};i.name=e,i.element=n,i.defaultContent=r||"",i.defaultScope=o,t[e]=i},getYielder:function(e){return t[e]},removeYielder:function(e){delete t[e]},setContentFor:function(n,o,r){var i=t[n];i&&(i.element.html(o),e(i.element.contents())(r))}}}]).directive("uiContentFor",["Capture",function(e){return{compile:function(t,n){var o=t.html();return(null===n.uiDuplicate||void 0===n.uiDuplicate)&&(t.html(""),t.remove()),function(t,n,r){e.setContentFor(r.uiContentFor,o,t)}}}}]).directive("uiYieldTo",["$compile","Capture",function(e,t){return{link:function(e,n,o){t.putYielder(o.uiYieldTo,n,e,n.html()),n.on("$destroy",function(){t.removeYielder(o.uiYieldTo)}),e.$on("$destroy",function(){t.removeYielder(o.uiYieldTo)})}}}])}(),function(){"use strict";var e=angular.module("mobile-angular-ui.core.fastclick",[]);e.run(["$window",function(e){function t(e,t){return function(){return e.apply(t,arguments)}}var n=FastClick.prototype.onTouchEnd;FastClick.prototype.onTouchEnd=function(e){e.changedTouches||(e.changedTouches=[{}]),(n=t(n,this))(e)},FastClick.attach(e.document.body)}]),angular.forEach(["select","input","textarea"],function(t){e.directive(t,function(){return{restrict:"E",compile:function(e){e.addClass("needsclick")}}})})}(),function(){"use strict";var e=function(e,t){for(var n=e;n.length>0;){if(n[0]===t[0])return n=null,!0;n=n.parent()}return n=null,!1};angular.module("mobile-angular-ui.core.outerClick",[]).factory("bindOuterClick",["$document","$timeout",function(t,n){return function(o,r,i,a){var c=function(t){e(angular.element(t.target),r)||o.$apply(function(){i(o,{$event:t})})},u=angular.noop,l=null;a?u=o.$watch(a,function(e){n.cancel(l),e?l=n(function(){t.on("click tap",c)},0):t.unbind("click tap",c)}):(n.cancel(l),t.on("click tap",c)),o.$on("$destroy",function(){u(),t.unbind("click tap",c)})}}]).directive("uiOuterClick",["bindOuterClick","$parse",function(e,t){return{restrict:"A",compile:function(n,o){var r=t(o.uiOuterClick),i=o.uiOuterClickIf;return function(t,n){e(t,n,r,i)}}}}])}(),function(){"use strict";var e=angular.module("mobile-angular-ui.core.sharedState",[]);e.factory("SharedState",["$rootScope",function(e){var t={},n={},o={},r={};return{initialize:function(i,a,c){c=c||{};var u=void 0===o[i],l=c.defaultValue,s=c.exclusionGroup;o[i.$id]=o[i.$id]||[],o[i.$id].push(a),n[a]?u&&n[a].references++:(n[a]=angular.extend({},c,{references:1}),e.$broadcast("mobile-angular-ui.state.initialized."+a,l),void 0!==l&&this.setOne(a,l),s&&(r[s]=r[s]||{},r[s][a]=!0)),i.$on("$destroy",function(){for(var c=o[i.$id]||[],u=0;u<c.length;u++){var l=n[c[u]];l.exclusionGroup&&(delete r[l.exclusionGroup][c[u]],0===Object.keys(r[l.exclusionGroup]).length&&delete r[l.exclusionGroup]),l.references--,l.references<=0&&(delete n[c[u]],delete t[c[u]],e.$broadcast("mobile-angular-ui.state.destroyed."+a))}delete o[i.$id]})},setOne:function(o,r){if(void 0!==n[o]){var i=t[o];return t[o]=r,i!==r&&e.$broadcast("mobile-angular-ui.state.changed."+o,r,i),r}console&&console.warn("Warning: Attempt to set uninitialized shared state:",o)},setMany:function(e){angular.forEach(e,function(e,t){this.setOne(t,e)},this)},set:function(e,t){angular.isObject(e)&&angular.isUndefined(t)?this.setMany(e):this.setOne(e,t)},turnOn:function(e){var t=n[e]&&n[e].exclusionGroup;if(t)for(var o=Object.keys(r[t]),i=0;i<o.length;i++){var a=o[i];a!==e&&this.turnOff(a)}return this.setOne(e,!0)},turnOff:function(e){return this.setOne(e,!1)},toggle:function(e){return this.get(e)?this.turnOff(e):this.turnOn(e)},get:function(e){return n[e]&&t[e]},isActive:function(e){return!!this.get(e)},active:function(e){return this.isActive(e)},isUndefined:function(e){return void 0===n[e]||void 0===this.get(e)},has:function(e){return void 0!==n[e]},referenceCount:function(e){var t=n[e];return void 0===t?0:t.references},equals:function(e,t){return this.get(e)===t},eq:function(e,t){return this.equals(e,t)},values:function(){return t}}}]);var t=function(e,t,n,o){n=n||"click tap",t.on(n,function(t){e.$apply(function(){o(e,{$event:t})})})};e.directive("uiState",["SharedState",function(e){return{restrict:"EA",priority:601,link:function(t,n,o){var r=o.uiState||o.id,i=o.uiDefault||o["default"],a=i?t.$eval(i):void 0;e.initialize(t,r,{defaultValue:a,exclusionGroup:o.uiExclusionGroup})}}}]),angular.forEach(["toggle","turnOn","turnOff","set"],function(n){var o="ui"+n[0].toUpperCase()+n.slice(1);e.directive(o,["$parse","$interpolate","SharedState",function(e,r,i){var a=i[n];return{restrict:"A",priority:1,compile:function(c,u){var l=u[o],s=l.match(/\{\{/),d=function(t){var o=l;if(s){var i=r(o);o=i(t)}return"set"===n&&(o=e(o)(t)),o};return function(e,n,o){var r=function(){var t=d(e);return a.call(i,t)};t(e,n,o.uiTriggers,r)}}}}])});var n=function(e){if(!e||""===e)return[];for(var t=e?e.trim().split(/ *, */):[],n=[],o=0;o<t.length;o++){var r=t[o].split(/ *as */);if(r.length>2||r.length<1)throw new Error('Error parsing uiScopeContext="'+e+'"');n.push(r)}return n},o=function(e,t,n){for(var o=0;o<t.length;o++){var r=t[o][0],i=t[o][1]||r;e[i]=r.split(".").reduce(function(e,t){return e[t]},n)}},r=function(e,t,r,i,a,c){var u,l=t[e],s=l.match(/\{\{/);u=s?function(e){var t=c(l),n=a(t(r));return n(e)}:a(l);var d=n(t.uiScopeContext);return function(){var e;return d.length?(e=angular.extend({},i.values()),o(e,d,r)):e=i.values(),u(e)}};e.directive("uiIf",["$animate","SharedState","$parse","$interpolate",function(e,t,n,o){function i(e){var t=e[0],n=e[e.length-1],o=[t];do{if(t=t.nextSibling,!t)break;o.push(t)}while(t!==n);return angular.element(o)}return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(a,c,u,l,s){var d,f,h,m=r("uiIf",u,a,t,n,o);a.$watch(m,function(t){if(t)f||s(function(t,n){f=n,t[t.length++]=document.createComment(" end uiIf: "+u.uiIf+" "),d={clone:t},e.enter(t,c.parent(),c)});else if(h&&(h.remove(),h=null),f&&(f.$destroy(),f=null),d){h=i(d.clone);var n=function(){h=null},o=e.leave(h,n);o&&o.then(n),d=null}})}}}]),e.directive("uiHide",["$animate","SharedState","$parse","$interpolate",function(e,t,n,o){var i="ng-hide",a="ng-hide-animate";return{restrict:"A",multiElement:!0,link:function(c,u,l){var s=r("uiHide",l,c,t,n,o);c.$watch(s,function(t){e[t?"addClass":"removeClass"](u,i,{tempClasses:a})})}}}]),e.directive("uiShow",["$animate","SharedState","$parse","$interpolate",function(e,t,n){var o="ng-hide",i="ng-hide-animate";return{restrict:"A",multiElement:!0,link:function(a,c,u){var l=r("uiShow",u,a,t,n);a.$watch(l,function(t){e[t?"removeClass":"addClass"](c,o,{tempClasses:i})})}}}]),e.directive("uiClass",["SharedState","$parse","$interpolate",function(e,t){return{restrict:"A",link:function(n,o,i){var a=r("uiClass",i,n,e,t);n.$watch(a,function(e){var t="",n="";angular.forEach(e,function(e,r){e?t+=" "+r:n+=" "+r,t=t.trim(),n=n.trim(),t.length&&o.addClass(t),n.length&&o.removeClass(n)})},!0)}}}]),e.run(["$rootScope","SharedState",function(e,t){e.Ui=t}])}(),function(){"use strict";var e=angular.module("mobile-angular-ui.core.touchmoveDefaults",[]);e.directive("uiPreventTouchmoveDefaults",function(){var e=function(e){e.allowTouchmoveDefault!==!0&&e.preventDefault()};return{compile:function(t){"ontouchmove"in document&&t.on("touchmove",e)}}}),e.factory("allowTouchmoveDefault",function(){var e=function(){return!0};return"ontouchmove"in document?function(t,n){n=n||e;var o=function(e){n(e)&&(e.allowTouchmoveDefault=!0)};return t=angular.element(t),t.on("touchmove",o),t.on("$destroy",function(){t.off("touchmove",o),t=null}),function(){t&&t.off("touchmove",o)}}:angular.noop})}(),function(){"use strict";angular.module("mobile-angular-ui.core",["mobile-angular-ui.core.fastclick","mobile-angular-ui.core.activeLinks","mobile-angular-ui.core.capture","mobile-angular-ui.core.outerClick","mobile-angular-ui.core.sharedState","mobile-angular-ui.core.touchmoveDefaults"])}(),function(e,t){var n=e.document,o=n.documentElement,r="overthrow-enabled",i="ontouchmove"in n,a="WebkitOverflowScrolling"in o.style||"msOverflowStyle"in o.style||!i&&e.screen.width>800||function(){var t=e.navigator.userAgent,n=t.match(/AppleWebKit\/([0-9]+)/),o=n&&n[1],r=n&&o>=534;return t.match(/Android ([0-9]+)/)&&RegExp.$1>=3&&r||t.match(/ Version\/([0-9]+)/)&&RegExp.$1>=0&&e.blackberry&&r||t.indexOf("PlayBook")>-1&&r&&-1===!t.indexOf("Android 2")||t.match(/Firefox\/([0-9]+)/)&&RegExp.$1>=4||t.match(/wOSBrowser\/([0-9]+)/)&&RegExp.$1>=233&&r||t.match(/NokiaBrowser\/([0-9\.]+)/)&&7.3===parseFloat(RegExp.$1)&&n&&o>=533}();e.overthrow={},e.overthrow.enabledClassName=r,e.overthrow.addClass=function(){-1===o.className.indexOf(e.overthrow.enabledClassName)&&(o.className+=" "+e.overthrow.enabledClassName)},e.overthrow.removeClass=function(){o.className=o.className.replace(e.overthrow.enabledClassName,"")},e.overthrow.set=function(){a&&e.overthrow.addClass()},e.overthrow.canBeFilledWithPoly=i,e.overthrow.forget=function(){e.overthrow.removeClass()},e.overthrow.support=a?"native":"none"}(this),function(e,t){e.overthrow.set()}(this),function(e,t,n){if(t!==n){t.scrollIndicatorClassName="overthrow";var o=e.document,r=o.documentElement,i="native"===t.support,a=t.canBeFilledWithPoly,c=(t.configure,t.set),u=t.forget,l=t.scrollIndicatorClassName;t.closest=function(e,n){return!n&&e.className&&e.className.indexOf(l)>-1&&e||t.closest(e.parentNode)};var s=!1;t.set=function(){if(c(),!s&&!i&&a){e.overthrow.addClass(),s=!0,t.support="polyfilled",t.forget=function(){u(),s=!1,o.removeEventListener&&o.removeEventListener("touchstart",b,!1)};var l,d,f,h,m=[],v=[],p=function(){m=[],d=null},g=function(){v=[],f=null},C=function(e){h=l.querySelectorAll("textarea, input");for(var t=0,n=h.length;n>t;t++)h[t].style.pointerEvents=e},k=function(e,t){if(o.createEvent){var r,i=(!t||t===n)&&l.parentNode||l.touchchild||l;i!==l&&(r=o.createEvent("HTMLEvents"),r.initEvent("touchend",!0,!0),l.dispatchEvent(r),i.touchchild=l,l=i,i.dispatchEvent(e))}},b=function(e){if(t.intercept&&t.intercept(),p(),g(),l=t.closest(e.target),l&&l!==r&&!(e.touches.length>1)){C("none");var n=e,o=l.scrollTop,i=l.scrollLeft,a=l.offsetHeight,c=l.offsetWidth,u=e.touches[0].pageY,s=e.touches[0].pageX,h=l.scrollHeight,b=l.scrollWidth,E=function(e){var t=o+u-e.touches[0].pageY,r=i+s-e.touches[0].pageX,C=t>=(m.length?m[0]:0),E=r>=(v.length?v[0]:0);t>0&&h-a>t||r>0&&b-c>r?e.preventDefault():k(n),d&&C!==d&&p(),f&&E!==f&&g(),d=C,f=E,l.scrollTop=t,l.scrollLeft=r,m.unshift(t),v.unshift(r),m.length>3&&m.pop(),v.length>3&&v.pop()},y=function(e){C("auto"),setTimeout(function(){C("none")},450),l.removeEventListener("touchmove",E,!1),l.removeEventListener("touchend",y,!1)};l.addEventListener("touchmove",E,!1),l.addEventListener("touchend",y,!1)}};o.addEventListener("touchstart",b,!1)}}}}(this,this.overthrow),function(){"use strict";angular.module("mobile-angular-ui.components.modals",[]).directive("modal",["$rootElement",function(e){return{restrict:"C",link:function(t,n){e.addClass("has-modal"),n.on("$destroy",function(){e.removeClass("has-modal")}),t.$on("$destroy",function(){e.removeClass("has-modal")}),n.hasClass("modal-overlay")&&(e.addClass("has-modal-overlay"),n.on("$destroy",function(){e.removeClass("has-modal-overlay")}),t.$on("$destroy",function(){e.removeClass("has-modal-overlay")}))}}}])}(),function(){"use strict";var e=angular.module("mobile-angular-ui.components.navbars",[]);angular.forEach(["top","bottom"],function(t){var n="navbarAbsolute"+t.charAt(0).toUpperCase()+t.slice(1);e.directive(n,["$rootElement",function(e){return{restrict:"C",link:function(n){e.addClass("has-navbar-"+t),n.$on("$destroy",function(){e.removeClass("has-navbar-"+t)})}}}])})}(),function(){"use strict";var e=angular.module("mobile-angular-ui.components.scrollable",["mobile-angular-ui.core.touchmoveDefaults"]),t=function(e){var t=e.touches&&e.touches.length?e.touches:[e],n=e.changedTouches&&e.changedTouches[0]||e.originalEvent&&e.originalEvent.changedTouches&&e.originalEvent.changedTouches[0]||t[0].originalEvent||t[0];return n.clientY};e.directive("scrollableContent",function(){return{restrict:"C",controller:["$element","allowTouchmoveDefault",function(e,n){var o=e[0],r=e.parent()[0];if("ontouchmove"in document){var i,a,c,u,l,s=function(e){i=o.scrollTop>0,a=o.scrollTop<o.scrollHeight-o.clientHeight,c=null,u=null,l=t(e)};e.on("touchstart",s),e.on("$destroy",function(){e.off("touchstart")}),n(e,function(e){var n=t(e),o=n>l,r=!o;return l=n,o&&i||r&&a})}this.scrollableContent=o,this.scrollTo=function(e,t){if(t=t||0,angular.isNumber(e))o.scrollTop=e-t;else{var n=angular.element(e)[0];n.offsetParent&&n.offsetParent!==r?this.scrollTo(n.offsetParent,t-n.offsetTop):o.scrollTop=n.offsetTop-t}}}],link:function(e,t){"native"!==overthrow.support&&(t.addClass("overthrow"),overthrow.forget(),overthrow.set())}}}),angular.forEach(["input","textarea"],function(t){e.directive(t,["$rootScope","$timeout",function(e,t){return{require:"?^^scrollableContent",link:function(e,n,o,r){n.on("focus",function(){if(r&&r.scrollableContent){var e=r.scrollableContent.offsetHeight;t(function(){var t=r.scrollableContent.offsetHeight;e>t&&r.scrollTo(n,10)},500)}})}}}])}),angular.forEach({uiScrollTop:function(e){return 0===e.scrollTop},uiScrollBottom:function(e){return e.scrollHeight===e.scrollTop+e.clientHeight}},function(t,n){e.directive(n,[function(){return{restrict:"A",link:function(e,o,r){o.on("scroll",function(){t(o[0])&&e.$apply(function(){e.$eval(r[n])})})}}}])}),angular.forEach({Top:"scrollableHeader",Bottom:"scrollableFooter"},function(t,n){e.directive(t,["$window",function(e){return{restrict:"C",link:function(t,o){var r=o[0],i=o.parent()[0].style,a=function(){var t=e.getComputedStyle(r),o=parseInt(t.marginTop,10)+parseInt(t.marginBottom,10);i["padding"+n]=r.offsetHeight+o+"px"},c=setInterval(a,30);o.on("$destroy",function(){i["padding"+n]=null,clearInterval(c),c=a=o=null})}}}])})}(),function(){"use strict";var e=angular.module("mobile-angular-ui.components.sidebars",["mobile-angular-ui.core.sharedState","mobile-angular-ui.core.outerClick"]);angular.forEach(["left","right"],function(t){var n="sidebar"+t.charAt(0).toUpperCase()+t.slice(1),o="ui"+n.charAt(0).toUpperCase()+n.slice(1);e.directive(n,["$rootElement","SharedState","bindOuterClick","$location",function(e,n,r,i){return{restrict:"C",link:function(a,c,u){var l="has-sidebar-"+t,s="sidebar-"+t+"-visible",d="sidebar-"+t+"-in";u.id&&(o=u.id);var f=function(){n.turnOff(o)},h=function(){return n.isActive(o)};e.addClass(l),a.$on("$destroy",function(){e.removeClass(l),e.removeClass(s),e.removeClass(d)});var m=void 0!==u.active&&"false"!==u.active;n.initialize(a,o,{defaultValue:m}),a.$on("mobile-angular-ui.state.changed."+o,function(t,n){(""===u.uiTrackAsSearchParam||u.uiTrackAsSearchParam)&&i.search(o,n||null),n?(e.addClass(s),e.addClass(d)):e.removeClass(d)}),a.$on("$routeChangeSuccess",function(){n.turnOff(o)}),a.$on("$routeUpdate",function(){u.uiTrackAsSearchParam&&(i.search()[o]?n.turnOn(o):n.turnOff(o))}),a.$on("mobile-angular-ui.app.transitionend",function(){n.isActive(o)||e.removeClass(s)}),"false"!==u.closeOnOuterClicks&&r(a,c,f,h)}}}])}),e.directive("app",["$rootScope",function(e){return{restrict:"C",link:function(t,n){n.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend",function(){e.$broadcast("mobile-angular-ui.app.transitionend")})}}}])}(),function(){"use strict";angular.module("mobile-angular-ui.components.switch",[]).directive("uiSwitch",["$injector",function(e){var t=e.has("$drag")&&e.get("$drag");return{restrict:"EA",scope:{model:"=ngModel",changeExpr:"@ngChange"},link:function(e,n,o){n.addClass("switch");var r=o.disabled||n.attr("disabled"),i=e.$watch(function(){return o.disabled||n.attr("disabled")},function(e){r=e&&"false"!==e&&"0"!==e?!0:!1}),a=angular.element('<div class="switch-handle"></div>');n.append(a),e.model&&n.addClass("active"),n.addClass("switch-transition-enabled");var c=e.$watch("model",function(e){e?n.addClass("active"):n.removeClass("active")}),u=function(){return!r},l=function(t){u()&&t!==e.model&&(e.model=t,e.$apply(),null!==e.changeExpr&&void 0!==e.changeExpr&&e.$parent.$eval(e.changeExpr))},s=function(){l(!e.model)};n.on("click tap",s);var d=angular.noop;t&&(d=t.bind(a,{transform:t.TRANSLATE_INSIDE(n),start:function(){n.off("click tap",s)},cancel:function(){a.removeAttr("style"),n.off("click tap",s),n.on("click tap",s)},end:function(){var e=a[0].getBoundingClientRect(),t=n[0].getBoundingClientRect();e.left-t.left<e.width/3?(l(!1),a.removeAttr("style")):t.right-e.right<e.width/3?(l(!0),a.removeAttr("style")):a.removeAttr("style"),n.on("click tap",s)}})),n.on("$destroy",function(){d(),i(),c(),u=l=d=c=i=s=null})}}}])}(),function(){"use strict";angular.module("mobile-angular-ui.components",["mobile-angular-ui.components.modals","mobile-angular-ui.components.navbars","mobile-angular-ui.components.sidebars","mobile-angular-ui.components.scrollable","mobile-angular-ui.components.switch"])}(),function(){"use strict";angular.module("mobile-angular-ui",["mobile-angular-ui.core","mobile-angular-ui.components"])}();
//# sourceMappingURL=mobile-angular-ui.min.js.map
!function(){"use strict";function e(t,i){function r(e,t){return function(){return e.apply(t,arguments)}}var o;if(i=i||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=i.touchBoundary||10,this.layer=t,this.tapDelay=i.tapDelay||200,this.tapTimeout=i.tapTimeout||700,!e.notNeeded(t)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],u=this,c=0,l=a.length;l>c;c++)u[a[c]]=r(u[a[c]],u);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,i){var r=Node.prototype.removeEventListener;"click"===e?r.call(t,e,n.hijacked||n,i):r.call(t,e,n,i)},t.addEventListener=function(e,n,i){var r=Node.prototype.addEventListener;"click"===e?r.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),i):r.call(t,e,n,i)}),"function"==typeof t.onclick&&(o=t.onclick,t.addEventListener("click",function(e){o(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,i=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,r=i&&/OS 4_\d(_\d)?/.test(navigator.userAgent),o=i&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(i&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,i;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),i=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;i&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,o;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],i){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!r){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,a,u,c,l,s=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,o&&(l=e.changedTouches[0],s=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||s,s.fastClickScrollParent=this.targetElement.fastClickScrollParent),u=s.tagName.toLowerCase(),"label"===u){if(t=this.findControl(s)){if(this.focus(s),n)return!1;s=t}}else if(this.needsFocus(s))return e.timeStamp-a>100||i&&window.top!==window&&"input"===u?(this.targetElement=null,!1):(this.focus(s),this.sendClick(s,e),i&&"select"===u||(this.targetElement=null,e.preventDefault()),!1);return i&&!r&&(c=s.fastClickScrollParent,c&&c.fastClickLastScrollTop!==c.scrollTop)?!0:(this.needsClick(s)||(e.preventDefault(),this.sendClick(s,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,i,r,o;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(i>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(r=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),r[1]>=10&&r[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(o=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],o>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),function(){"use strict";angular.module("mobile-angular-ui.core.activeLinks",[]).run(["$rootScope","$window","$document","$location",function(e,t,n,i){var r=function(){var e,r=i.url(),o=r.indexOf("#"),a=r.indexOf("?"),u=t.location.href,c=u.indexOf(r);-1===o&&-1===a?e=u:-1!==o&&o>a?e=u.slice(0,c+o):-1!==a&&a>o&&(e=u.slice(0,c+a));for(var l=n[0].links,s=0;s<l.length;s++){var d=l[s],f=angular.element(d);f.attr("href")&&""!==f.attr("href")&&d.href===e?f.addClass("active"):f.attr("href")&&""!==f.attr("href")&&d.href&&d.href.length&&f.removeClass("active")}};e.$on("$locationChangeSuccess",r),e.$on("$includeContentLoaded",r)}])}(),function(){"use strict";angular.module("mobile-angular-ui.core.capture",[]).run(["Capture","$rootScope",function(e,t){t.$on("$routeChangeSuccess",function(){e.resetAll()})}]).factory("Capture",["$compile",function(e){var t={};return{resetAll:function(){for(var e in t)t.hasOwnProperty(e)&&this.resetYielder(e)},resetYielder:function(e){var n=t[e];this.setContentFor(e,n.defaultContent,n.defaultScope)},putYielder:function(e,n,i,r){var o={};o.name=e,o.element=n,o.defaultContent=r||"",o.defaultScope=i,t[e]=o},getYielder:function(e){return t[e]},removeYielder:function(e){delete t[e]},setContentFor:function(n,i,r){var o=t[n];o&&(o.element.html(i),e(o.element.contents())(r))}}}]).directive("uiContentFor",["Capture",function(e){return{compile:function(t,n){var i=t.html();return(null===n.uiDuplicate||void 0===n.uiDuplicate)&&(t.html(""),t.remove()),function(t,n,r){e.setContentFor(r.uiContentFor,i,t)}}}}]).directive("uiYieldTo",["$compile","Capture",function(e,t){return{link:function(e,n,i){t.putYielder(i.uiYieldTo,n,e,n.html()),n.on("$destroy",function(){t.removeYielder(i.uiYieldTo)}),e.$on("$destroy",function(){t.removeYielder(i.uiYieldTo)})}}}])}(),function(){"use strict";var e=angular.module("mobile-angular-ui.core.fastclick",[]);e.run(["$window",function(e){function t(e,t){return function(){return e.apply(t,arguments)}}var n=FastClick.prototype.onTouchEnd;FastClick.prototype.onTouchEnd=function(e){e.changedTouches||(e.changedTouches=[{}]),(n=t(n,this))(e)},FastClick.attach(e.document.body)}]),angular.forEach(["select","input","textarea"],function(t){e.directive(t,function(){return{restrict:"E",compile:function(e){e.addClass("needsclick")}}})})}(),function(){"use strict";var e=function(e,t){for(var n=e;n.length>0;){if(n[0]===t[0])return n=null,!0;n=n.parent()}return n=null,!1};angular.module("mobile-angular-ui.core.outerClick",[]).factory("bindOuterClick",["$document","$timeout",function(t,n){return function(i,r,o,a){var u=function(t){e(angular.element(t.target),r)||i.$apply(function(){o(i,{$event:t})})},c=angular.noop,l=null;a?c=i.$watch(a,function(e){n.cancel(l),e?l=n(function(){t.on("click tap",u)},0):t.unbind("click tap",u)}):(n.cancel(l),t.on("click tap",u)),i.$on("$destroy",function(){c(),t.unbind("click tap",u)})}}]).directive("uiOuterClick",["bindOuterClick","$parse",function(e,t){return{restrict:"A",compile:function(n,i){var r=t(i.uiOuterClick),o=i.uiOuterClickIf;return function(t,n){e(t,n,r,o)}}}}])}(),function(){"use strict";var e=angular.module("mobile-angular-ui.core.sharedState",[]);e.factory("SharedState",["$rootScope",function(e){var t={},n={},i={},r={};return{initialize:function(o,a,u){u=u||{};var c=void 0===i[o],l=u.defaultValue,s=u.exclusionGroup;i[o.$id]=i[o.$id]||[],i[o.$id].push(a),n[a]?c&&n[a].references++:(n[a]=angular.extend({},u,{references:1}),e.$broadcast("mobile-angular-ui.state.initialized."+a,l),void 0!==l&&this.setOne(a,l),s&&(r[s]=r[s]||{},r[s][a]=!0)),o.$on("$destroy",function(){for(var u=i[o.$id]||[],c=0;c<u.length;c++){var l=n[u[c]];l.exclusionGroup&&(delete r[l.exclusionGroup][u[c]],0===Object.keys(r[l.exclusionGroup]).length&&delete r[l.exclusionGroup]),l.references--,l.references<=0&&(delete n[u[c]],delete t[u[c]],e.$broadcast("mobile-angular-ui.state.destroyed."+a))}delete i[o.$id]})},setOne:function(i,r){if(void 0!==n[i]){var o=t[i];return t[i]=r,o!==r&&e.$broadcast("mobile-angular-ui.state.changed."+i,r,o),r}console&&console.warn("Warning: Attempt to set uninitialized shared state:",i)},setMany:function(e){angular.forEach(e,function(e,t){this.setOne(t,e)},this)},set:function(e,t){angular.isObject(e)&&angular.isUndefined(t)?this.setMany(e):this.setOne(e,t)},turnOn:function(e){var t=n[e]&&n[e].exclusionGroup;if(t)for(var i=Object.keys(r[t]),o=0;o<i.length;o++){var a=i[o];a!==e&&this.turnOff(a)}return this.setOne(e,!0)},turnOff:function(e){return this.setOne(e,!1)},toggle:function(e){return this.get(e)?this.turnOff(e):this.turnOn(e)},get:function(e){return n[e]&&t[e]},isActive:function(e){return!!this.get(e)},active:function(e){return this.isActive(e)},isUndefined:function(e){return void 0===n[e]||void 0===this.get(e)},has:function(e){return void 0!==n[e]},referenceCount:function(e){var t=n[e];return void 0===t?0:t.references},equals:function(e,t){return this.get(e)===t},eq:function(e,t){return this.equals(e,t)},values:function(){return t}}}]);var t=function(e,t,n,i){n=n||"click tap",t.on(n,function(t){e.$apply(function(){i(e,{$event:t})})})};e.directive("uiState",["SharedState",function(e){return{restrict:"EA",priority:601,link:function(t,n,i){var r=i.uiState||i.id,o=i.uiDefault||i["default"],a=o?t.$eval(o):void 0;e.initialize(t,r,{defaultValue:a,exclusionGroup:i.uiExclusionGroup})}}}]),angular.forEach(["toggle","turnOn","turnOff","set"],function(n){var i="ui"+n[0].toUpperCase()+n.slice(1);e.directive(i,["$parse","$interpolate","SharedState",function(e,r,o){var a=o[n];return{restrict:"A",priority:1,compile:function(u,c){var l=c[i],s=l.match(/\{\{/),d=function(t){var i=l;if(s){var o=r(i);i=o(t)}return"set"===n&&(i=e(i)(t)),i};return function(e,n,i){var r=function(){var t=d(e);return a.call(o,t)};t(e,n,i.uiTriggers,r)}}}}])});var n=function(e){if(!e||""===e)return[];for(var t=e?e.trim().split(/ *, */):[],n=[],i=0;i<t.length;i++){var r=t[i].split(/ *as */);if(r.length>2||r.length<1)throw new Error('Error parsing uiScopeContext="'+e+'"');n.push(r)}return n},i=function(e,t,n){for(var i=0;i<t.length;i++){var r=t[i][0],o=t[i][1]||r;e[o]=r.split(".").reduce(function(e,t){return e[t]},n)}},r=function(e,t,r,o,a,u){var c,l=t[e],s=l.match(/\{\{/);c=s?function(e){var t=u(l),n=a(t(r));return n(e)}:a(l);var d=n(t.uiScopeContext);return function(){var e;return d.length?(e=angular.extend({},o.values()),i(e,d,r)):e=o.values(),c(e)}};e.directive("uiIf",["$animate","SharedState","$parse","$interpolate",function(e,t,n,i){function o(e){var t=e[0],n=e[e.length-1],i=[t];do{if(t=t.nextSibling,!t)break;i.push(t)}while(t!==n);return angular.element(i)}return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(a,u,c,l,s){var d,f,h,m=r("uiIf",c,a,t,n,i);a.$watch(m,function(t){if(t)f||s(function(t,n){f=n,t[t.length++]=document.createComment(" end uiIf: "+c.uiIf+" "),d={clone:t},e.enter(t,u.parent(),u)});else if(h&&(h.remove(),h=null),f&&(f.$destroy(),f=null),d){h=o(d.clone);var n=function(){h=null},i=e.leave(h,n);i&&i.then(n),d=null}})}}}]),e.directive("uiHide",["$animate","SharedState","$parse","$interpolate",function(e,t,n,i){var o="ng-hide",a="ng-hide-animate";return{restrict:"A",multiElement:!0,link:function(u,c,l){var s=r("uiHide",l,u,t,n,i);u.$watch(s,function(t){e[t?"addClass":"removeClass"](c,o,{tempClasses:a})})}}}]),e.directive("uiShow",["$animate","SharedState","$parse","$interpolate",function(e,t,n){var i="ng-hide",o="ng-hide-animate";return{restrict:"A",multiElement:!0,link:function(a,u,c){var l=r("uiShow",c,a,t,n);a.$watch(l,function(t){e[t?"removeClass":"addClass"](u,i,{tempClasses:o})})}}}]),e.directive("uiClass",["SharedState","$parse","$interpolate",function(e,t){return{restrict:"A",link:function(n,i,o){var a=r("uiClass",o,n,e,t);n.$watch(a,function(e){var t="",n="";angular.forEach(e,function(e,r){e?t+=" "+r:n+=" "+r,t=t.trim(),n=n.trim(),t.length&&i.addClass(t),n.length&&i.removeClass(n)})},!0)}}}]),e.run(["$rootScope","SharedState",function(e,t){e.Ui=t}])}(),function(){"use strict";var e=angular.module("mobile-angular-ui.core.touchmoveDefaults",[]);e.directive("uiPreventTouchmoveDefaults",function(){var e=function(e){e.allowTouchmoveDefault!==!0&&e.preventDefault()};return{compile:function(t){"ontouchmove"in document&&t.on("touchmove",e)}}}),e.factory("allowTouchmoveDefault",function(){var e=function(){return!0};return"ontouchmove"in document?function(t,n){n=n||e;var i=function(e){n(e)&&(e.allowTouchmoveDefault=!0)};return t=angular.element(t),t.on("touchmove",i),t.on("$destroy",function(){t.off("touchmove",i),t=null}),function(){t&&t.off("touchmove",i)}}:angular.noop})}(),function(){"use strict";angular.module("mobile-angular-ui.core",["mobile-angular-ui.core.fastclick","mobile-angular-ui.core.activeLinks","mobile-angular-ui.core.capture","mobile-angular-ui.core.outerClick","mobile-angular-ui.core.sharedState","mobile-angular-ui.core.touchmoveDefaults"])}();
//# sourceMappingURL=mobile-angular-ui.core.min.js.map
var test = function (accountService) {
    var myself = accountService.getMyself();
    if (myself == null) {
        console.log('ROUTES NOT_CONNECTED');
        return 'NOT_CONNECTED';
    }
    else {
        console.log('ROUTES CONNECTED');
        return myself.type;
    }
};


var initializeCommonRoutes = function () {
    myApp
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/assets/javascripts/view/mobile/welcome.html',
                    controller: 'WelcomeCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) != 'NOT_CONNECTED') {
                                console.log('FROM ROUTES WELCOME');
                                $location.path('/home');
                            }
                        }]
                    }
                })
                .when('/home', {
                    templateUrl: '/assets/javascripts/view/mobile/home.html',
                    controller: 'HomeCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                console.log('FROM ROUTES HOME');
                                $location.path('/');
                            }
                        }]
                    }
                })
                .when('/customer_registration', {
                    templateUrl: '/assets/javascripts/view/mobile/customer_registration.html',
                    controller: 'CustomerRegistrationCtrl',
                    resolve: {
                        a: ['accountService', '$location', function (accountService, $location) {
                            if (test(accountService) != 'NOT_CONNECTED') {
                                console.log('FROM ROUTES CUST');
                                $location.path('/');
                            }
                        }]
                    }
                })
                .when('/promotion', {
                    templateUrl: '/assets/javascripts/view/mobile/promotion.html',
                    controller: 'PromotionCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            if (test(accountService) == 'NOT_CONNECTED' || accountService.getMyself().businessId == null) {
                                console.log('FROM ROUTES PROM');
                                $location.path('/');
                            }
                        }]
                    }
                })
                .when('/businessNotification', {
                    templateUrl: '/assets/javascripts/view/mobile/businessNotification.html',
                    controller: 'BusinessNotificationCtrl',
                    resolve: {
                        a: ['accountService', '$location', function (accountService, $location) {
                            if (test(accountService) == 'NOT_CONNECTED' || accountService.getMyself().businessId == null) {
                                console.log('FROM ROUTES NOT');
                                $location.path('/');
                            }
                        }]
                    }
                })
                .when('/profile', {
                    templateUrl: '/assets/javascripts/view/mobile/profile.html',
                    controller: 'ProfileCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                console.log('FROM ROUTES PROFILE');
                                $location.path('/');
                            }
                        }]
                    }
                }).when('/business/:businessId', {
                    templateUrl: '/assets/javascripts/view/mobile/business.html',
                    controller: 'BusinessCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }]
                    }
                }).when('/business/:businessId/publication/:publicationId', {
                    templateUrl: '/assets/javascripts/view/mobile/business.html',
                    controller: 'BusinessCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }]
                    }
                }).when('/search/:param', {
                    templateUrl: '/assets/javascripts/view/mobile/search_page.html',
                    controller: 'SearchPageCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                console.log('FROM ROUTES BUSINES');
                                $location.path('/');
                            }
                        }]
                    }
                }).when('/my-businesses', {
                    templateUrl: '/assets/javascripts/view/mobile/followed_business_page.html',
                    controller: 'FollowedBusinessPageCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                console.log('FROM ROUTES FOLLOW');
                                $location.path('/');
                            }
                        }]
                    }
                }).when('/forgot_password', {
                    templateUrl: '/assets/javascripts/view/mobile/forgotPassword.html',
                    controller: 'ForgotPasswordCtrl',
                    resolve: {
                        a: ['accountService', '$location', '$rootScope', 'modalService', function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) != 'NOT_CONNECTED') {
                                console.log('FROM ROUTES FORGOT');
                                $location.path('/');
                            }
                        }]
                    }
                }).when('/legal/', {
                    templateUrl: '/assets/javascripts/view/mobile/legal.html',
                    controller: 'LegalCtrl'
                }).when('/help/', {
                    resolve: {
                        a: ['$rootScope', function ($rootScope) {
                            window.location.replace('/help/');
                        }]
                    }
                }).otherwise({
                    redirectTo: '/'
                });
        }]);
};
var myApp = angular.module('app', [
        'ngAnimate',
        'ui.bootstrap',
        "mobile-angular-ui",
        'ui.bootstrap.datetimepicker',
        "angucomplete",
        'angularFileUpload',
        'ngRoute',
        'ngTable',
        'geolocation',
        'timer',
        'ngMap']
);

app.config(['$locationProvider', function ($locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);
myApp.controller('ChangePasswordModalCtrl', ['$scope', '$flash', '$modalInstance', 'accountService', '$timeout', function ($scope,  $flash, $modalInstance,accountService,$timeout) {

    $scope.loading=false;

    $scope.dto={};

    $scope.fields = {
        oldPassword: {
            id:'change-password-input-password',
            name:'password',
            fieldTitle: "--.generic.oldPassword",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            focus: function () {
                return true;
            },
            disabled:function(){
                return $scope.loading;
            },
            field: $scope.dto,
            fieldName: 'oldPassword'
        },
        newPassword: {
            id:'change-password-input-new-password',
            name:'newPassword',
            fieldTitle: "--.changePasswordModal.newPassword",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            details:'--.registration.form.password.help',
            disabled:function(){
                return $scope.loading;
            },
            field: $scope.dto,
            fieldName: 'newPassword'
        },
        repeatPassword: {
            id:'change-password-input-repeat-password',
            name:'repeatNewPassword',
            fieldTitle: "--.generic.repeatPassword",
            fieldType: 'password',
            validationMessage: "--.generic.validation.repeatPassword",
            validation: function () {
                return $scope.dto.newPassword === $scope.dto.repeatPassword;
            },
            disabled:function(){
                return $scope.loading;
            },
            field: $scope.dto,
            fieldName: 'repeatPassword'
        }
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    //
    // validation : watching on field
    //
    $scope.$watch('fields', function () {
        var validation = true;

        for (var key in $scope.fields) {
            var obj = $scope.fields[key];
            if ($scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                obj.firstAttempt = !$scope.displayErrorMessage;
                validation = false;
            }
        }
        $scope.isValid = validation;
    }, true);

    //
    // display error watching
    //
    $scope.$watch('displayErrorMessage', function () {
        for (var key in $scope.fields) {
            var obj = $scope.fields[key];
            obj.firstAttempt = !$scope.displayErrorMessage;
        }
    });

    $scope.save = function () {

        if ($scope.isValid) {

            $scope.loading=true;

            accountService.changePassword(
                $scope.dto.oldPassword,
                $scope.dto.newPassword,
            function(){
                $scope.loading=false;
                $scope.close();
            },
            function(){
                $scope.loading=false;
            });
        }
    };

}]);
myApp.controller('AddressModalCtrl', ['$scope', '$flash', '$modalInstance', 'businessService', 'accountService', 'translationService', 'addName', 'dto', 'isBusiness', 'callback', function ($scope, $flash, $modalInstance, businessService, accountService, translationService, addName, dto, isBusiness, callback) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.addressParam = {
        addName: addName,
        dto: angular.copy(dto)
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.success = function (data) {
        $scope.loading = false;
        $scope.close();

        if (callback != null && callback != undefined) {
            callback(data);
        }
    };

    $scope.save = function () {

        if (!$scope.addressParam.isValid) {
            $scope.addressParam.displayErrorMessage = true;
        }
        else {
            $scope.loading = true;
            if ($scope.update) {
                accountService.editAddress($scope.addressParam.dto, function (data) {
                        $scope.success(data);
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
            else {
                accountService.addAddress($scope.addressParam.dto, function (data) {
                        $scope.success(data);
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
        }
    }


}]);
myApp.controller('OneFieldModalCtrl', ['$scope', '$flash', 'facebookService', 'translationService', '$modal', '$modalInstance', 'accountService', '$location', 'field', 'callback', function ($scope, $flash, facebookService, translationService, $modal, $modalInstance, accountService, $location, field,callback) {

    var value = {
        data: null
    };

    $scope.text = {
        fieldTitle: field.name,
        validationRegex: "^.{1,255}$",
        validationMessage: ['--.generic.validation.size', '1', '255'],
        field: value,
        fieldName: 'data'
    };

    $scope.loading = false;

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if ($scope.text.isValid) {
            callback(value.data);
            $modalInstance.close();
        }
        else {
            $scope.text.firstAttempt = false;
        }
    };

}])
;
myApp.controller('AlertMessageCtrl', ['$scope', '$flash', '$modalInstance', '$compile', 'message', function ($scope, $flash, $modalInstance,  $compile, message) {

    $scope.message = message;

    $scope.close = function () {
        $modalInstance.close();
    };


}]);
myApp.controller('LoadingModalCtrl', ['$scope', '$flash', '$modalInstance', '$compile', function ($scope, $flash, $modalInstance,  $compile) {

    $scope.close = function () {
        $modalInstance.close();
    };


}]);
myApp.controller('InterestSelectionModalCtrl', ['$scope', '$flash', '$modalInstance', 'callback', 'customerInterestService', 'listInterest', function ($scope, $flash, $modalInstance, callback, customerInterestService, listInterest) {

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.getHeight = function(){
        var h = {height:($(window).height() - 190)+'px'};
        return h;
    };

    $scope.customerInterests = listInterest;

    $scope.selectInterest = function (target) {
        callback(target);
        $scope.close();
    }

}]);
myApp.controller('MessageModalCtrl', ['$scope', '$flash', '$modalInstance', '$compile', 'title', 'message', 'save', function ($scope, $flash, $modalInstance,  $compile, title,message, save) {

    $scope.message = message;

    $scope.title=title;

    $scope.loading = false;


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.displaySaveButton = function(){
        return save!=null && save != undefined;
    };

    $scope.save = function () {
        save($scope.close);
    }


}]);
myApp.directive('galleryMobileCtrl', ['$rootScope', function ($rootScope) {

    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/mobile/galleryMobile/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.display = false;
                    scope.image=null;


                    $rootScope.$on('DISPLAY_PICTURE_IN_GALLERY',function(event,params){
                        scope.display = true;
                        scope.image=params.first;
                        scope.images=params.list;
                    });

                    scope.close = function(){
                        scope.display=false;
                    };

                    scope.openGallery = function (image) {
                        modalService.galleryModal(image, scope.getInfo().images);
                    };

                    scope.previous = function () {
                        for (var key in scope.images) {
                            if (scope.images[key].storedName == scope.image.storedName) {
                                if (scope.images[key - 1] == undefined) {
                                    scope.image = scope.images[scope.images.length - 1];
                                    scope.imageNb = scope.images.length;
                                }
                                else {
                                    scope.image = scope.images[key - 1];
                                    scope.imageNb = key - 1 - -1;
                                }
                                break;
                            }
                        }
                    };

                    scope.next = function () {
                        for (var key in scope.images) {
                            if (scope.images[key].storedName == scope.image.storedName) {
                                var newKey = key - -1;
                                if (scope.images[newKey] == undefined) {
                                    scope.image = scope.images[0];
                                    scope.imageNb = 1;
                                }
                                else {
                                    scope.image = scope.images[newKey];
                                    scope.imageNb = key - -1 - -1;
                                }
                                break;
                            }
                        }
                    };
                }
            }
        }
    }
}]);
myApp.controller('ResizeImageMobileModalCtrl', ['$scope', '$flash', '$modalInstance', 'params', 'save', function ($scope, $flash, $modalInstance,params,save) {

    $scope.params=params;

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {
        var isValid = true;
        if(params.callBackSave!=null){
            params.callBackSave();
        }
        if (params.isValid != undefined) {
            isValid = params.isValid;

            params.displayErrorMessage = true;
        }
        if (isValid) {
            $scope.loading = true;
            save($scope.close,$scope.setLoading);
        }
    }

}]);
(function(){myApp.controller("WelcomeCtrl",['$rootScope', '$scope', '$location', 'accountService', '$flash', 'translationService', '$timeout', 'modalService', 'languageService', function($rootScope,$scope,$location,accountService,$flash,translationService,$timeout,modalService,languageService){$scope.$watch("lang",function(){if(!angular.isUndefined($scope.lang))return languageService.changeLanguage($scope.lang)});$scope.languageService=languageService;$scope.loginFormParam={dto:{},mobileVersion:true,facebookSuccess:function(data){return $location.url("/home")}};$scope.login=function(){if($scope.loginFormParam.isValid){$scope.setLoading(true);
return accountService.login($scope.loginFormParam.dto,function(){return $timeout(function(){$scope.setLoading(false);$flash.success(translationService.get("--.login.flash.success"));return $location.url("/home")},1)},function(){return $scope.setLoading(false)})}else return $scope.loginFormParam.displayErrorMessage=true};$scope.setLoading=function(b){if(b===true)return modalService.openLoadingModal();else return modalService.closeLoadingModal()};$rootScope.$broadcast("PROGRESS_BAR_STOP");return modalService.closeLoadingModal()}])}).call(this);
(function(){myApp.controller("HomeCtrl",['$scope', 'geolocationService', 'searchService', 'customerInterestService', '$timeout', 'accountService', '$rootScope', 'followService', 'modalService', function($scope,geolocationService,searchService,customerInterestService,$timeout,accountService,$rootScope,followService,modalService){var loadingBusinessSuccess;var loadingPublicationSuccess;$scope.publicationListCtrl={};$scope.businessInfoParam={};$scope.businessListParam={data:[]};$scope.currentPage=0;$scope.allLoaded=false;$scope.loadSemaphore=false;$scope.emptyMessage=null;$scope.getSelectedInterest=function(){var interest;var _i;var _len;var _ref;if(!($scope.customerInterests!=
null))return null;_ref=$scope.customerInterests;for(_i=0,_len=_ref.length;_i<_len;_i++){interest=_ref[_i];if(interest.selected)return interest}return null};$scope.selectInterest=function(){return modalService.interestSelection($scope.customerInterests,function(target){return $scope.loadPublicationByInterest(target)})};$(".scrollable-content-body").on("scroll",function(){var scrollBottom;scrollBottom=$(".scrollable-content-body").scrollTop()+$(".scrollable-content-body").height();if($(".scrollable-content-inner").height()-
scrollBottom<200)if($scope.loadSemaphore===false){$scope.loadSemaphore=true;$scope.currentPage=$scope.currentPage+1;return $scope.loadPublication()}});loadingPublicationSuccess=function(data,callbackEmptyResultFunction){var d;var _i;var _len;if($scope.currentPage===0)$scope.publicationListCtrl.data=[];$scope.loadSemaphore=false;$scope.publicationListCtrl.loading=false;if(data===null||data.length<=5){$scope.allLoaded=true;if($scope.currentPage===0&&callbackEmptyResultFunction!=null){callbackEmptyResultFunction();
if(data.length!==0)$scope.emptyMessage="moreBusiness"}}for(_i=0,_len=data.length;_i<_len;_i++){d=data[_i];$scope.publicationListCtrl.data.push(d)}};loadingBusinessSuccess=function(data){$scope.businessListParam.data=data;return $scope.businessListParam.loading=false};$scope.loadPublicationByInterest=function(selectedInterest){var interest;var _i;var _j;var _len;var _len1;var _ref;var _ref1;if(selectedInterest===null){_ref=$scope.customerInterests;for(_i=0,_len=_ref.length;_i<_len;_i++){interest=_ref[_i];
interest.selected=false}}else if(selectedInterest.selected===true)selectedInterest.selected=false;else{_ref1=$scope.customerInterests;for(_j=0,_len1=_ref1.length;_j<_len1;_j++){interest=_ref1[_j];interest.selected=false}selectedInterest.selected=true}console.log("LOAD PUBLICATION AFTER searchByInterest ");$scope.currentPage=0;$scope.allLoaded=false;return $scope.loadPublication()};$scope.$on("POSITION_CHANGED",function(){$scope.currentPage=0;$scope.allLoaded=false;console.log("LOAD PUBLICATION AFTER POSITION_CHANGED");
return $scope.loadPublication()});$scope.$watch("followingMode",function(o,n){if(o!==n){$scope.currentPage=0;$scope.allLoaded=false;console.log("LOAD PUBLICATION AFTER followingMode");return $scope.loadPublication()}});$scope.loadPublication=function(){var interestSelected;interestSelected=$scope.getSelectedInterest();if($scope.currentPage===0){$scope.publicationListCtrl.loading=true;$scope.publicationListCtrl.data=[]}if($scope.followingMode)if(interestSelected!=null)return searchService.byFollowedAndInterest($scope.currentPage,
interestSelected.id,function(data$$0){return loadingPublicationSuccess(data$$0,function(){$scope.emptyMessage="followedWithInterest";$scope.businessListParam.loading=true;return searchService.nearBusinessByInterest(interestSelected.id,function(data){return loadingBusinessSuccess(data)})})});else return searchService.byFollowed($scope.currentPage,function(data$$0){return loadingPublicationSuccess(data$$0,function(){$scope.emptyMessage="followed";$scope.businessListParam.loading=true;return searchService.nearBusiness(function(data){return loadingBusinessSuccess(data)})})});
else if(interestSelected!=null)return searchService.byInterest($scope.currentPage,interestSelected.id,function(data$$0){return loadingPublicationSuccess(data$$0,function(){$scope.emptyMessage="newsFeedWithInterest";$scope.businessListParam.loading=true;return searchService.nearBusinessByInterest(interestSelected.id,function(data){return loadingBusinessSuccess(data)})})});else return searchService["default"]($scope.currentPage,function(data$$0){return loadingPublicationSuccess(data$$0,function(){$scope.emptyMessage=
"newsFeed";$scope.businessListParam.loading=true;return searchService.nearBusiness(function(data){return loadingBusinessSuccess(data)})})})};$scope.setFollowingMode=function(n){if(n===null)return n=!$scope.followingMode;else return $scope.followingMode=!$scope.followingMode};$rootScope.$broadcast("PROGRESS_BAR_STOP");modalService.closeLoadingModal();$scope.currentPage=0;$scope.allLoaded=false;$scope.loadPublication();return customerInterestService.getAll(function(value){return $scope.customerInterests=
value})}])}).call(this);
(function(){myApp.controller("ForgotPasswordCtrl",['$rootScope', '$scope', 'facebookService', 'accountService', '$location', '$filter', '$flash', 'modalService', function($rootScope,$scope,facebookService,accountService,$location,$filter,$flash,modalService){$scope.loading=false;$scope.dto={};$scope.fields={email:{fieldType:"email",name:"email",fieldTitle:"--.changeEmailModal.email",validationRegex:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,validationMessage:"--.generic.validation.email",focus:function(){return true},
disabled:function(){return $scope.loading},field:$scope.dto,fieldName:"email"}};$scope.$watch("fields",function(){var obj;var validation;var _i;var _len;var _ref;validation=true;_ref=$scope.fields;for(_i=0,_len=_ref.length;_i<_len;_i++){obj=_ref[_i];if($scope.fields.hasOwnProperty(key)&&(obj.isValid===null||obj.isValid===false)){obj.firstAttempt=!$scope.displayErrorMessage;validation=false}}return $scope.isValid=validation},true);$scope.$watch("displayErrorMessage",function(){var obj;var _i;var _len;
var _ref;var _results;_ref=$scope.fields;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){obj=_ref[_i];_results.push(obj.firstAttempt=!$scope.displayErrorMessage)}return _results});$scope.save=function(){if($scope.isValid){$scope.loading=true;return accountService.forgotPassword($scope.dto,function(){$flash.success($filter("translateText")("--.forgotPassword.success"));$scope.loading=false;return $location.path("/")},function(){return $scope.loading=false})}else return $scope.displayErrorMessage=
true};$rootScope.$broadcast("PROGRESS_BAR_STOP");return modalService.closeLoadingModal()}])}).call(this);
(function(){myApp.controller("CustomerRegistrationCtrl",['$rootScope', '$scope', '$flash', 'accountService', 'facebookService', 'translationService', 'modalService', '$location', function($rootScope,$scope,$flash,accountService,facebookService,translationService,modalService,$location){var access_token;$scope.facebookAppId=facebookService.facebookAppId;$scope.facebookAuthorization=facebookService.facebookAuthorization;$scope.basic_url=location.host;$scope.getUrlParam=function(name,url){var regex;var regexS;var results;if(!url)url=location.href;name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");regexS="[\\?\x26]"+name+
"\x3d([^\x26#]*)";regex=new RegExp(regexS);results=regex.exec(url);if(results===null)return null;else return results[1]};$scope.setLoading=function(b){if(b===true)modalService.openLoadingModal();else modalService.closeLoadingModal()};$scope.facebookSuccess=function(data){accountService.setMyself(data);if(data.type==="BUSINESS")$location.path("/business/"+accountService.getMyself().businessId);else $location.path("/");return $scope.setLoading(false)};$scope.fb_login=function(){var failed;var success;
var url;success=function(data){$scope.facebookSuccess(data);return $scope.setLoading(false)};failed=function(data){$flash.error(data.message);$scope.setLoading(false);return $scope.$apply()};$scope.setLoading(true);if(facebookService.isConnected())return facebookService.loginToServer(success,failed);else{url="https://www.facebook.com/dialog/oauth/?client_id\x3d"+$scope.facebookAppId+"\x26redirect_uri\x3d"+$scope.basic_url+"/\x26state\x3dBELGIUM\x26$scope\x3d"+$scope.facebookAuthorization+"\x26response_type\x3dtoken";
return window.open(url,"_self")}};if(location.href.indexOf("access_token")!==-1){access_token=$scope.getUrlParam("access_token",location.href);if(access_token!==null){$scope.setLoading(true);facebookService.loginToServerSimple(access_token,function(data){return $scope.facebookSuccess(data)},function(data,status){return $scope.setLoading(false)})}}$scope.save=function(){if(!$scope.accountParam.isValid)return $scope.accountParam.displayErrorMessage=true;else{$scope.setLoading(true);return accountService.registration($scope.accountParam.dto,
function(){$scope.setLoading(false);$flash.success(translationService.get("--.login.flash.success"));return $location.url("/")},function(){return $scope.setLoading(false)})}};if($scope.basic_url.indexOf("http")===-1)$scope.basic_url="http://"+$scope.basic_url;$scope.accountParam={mobileVersion:true};$rootScope.$broadcast("PROGRESS_BAR_STOP");return modalService.closeLoadingModal()}])}).call(this);
(function(){myApp.controller("MenuCtrl",['$rootScope', '$scope', 'facebookService', 'accountService', '$location', '$timeout', 'geolocationService', 'modalService', 'addressService', function($rootScope,$scope,facebookService,accountService,$location,$timeout,geolocationService,modalService,addressService){var completePositions;var _ref;$scope.showmenu=false;$scope.myBusiness=null;$scope.currentPosition=null;$scope.semaphoreComputeAddress=false;$scope.positionBasicData=[{key:"currentPosition",translation:"--.position.current"},{key:"createNewAddress",translation:"--.position.newAddress"}];if(((_ref=accountService.getMyself())!=null?_ref.businessId:
void 0)!=null)$scope.myBusiness=accountService.getMyself().businessId;$scope.$watch(function(){var _ref1;return(_ref1=accountService.getMyself())!=null?_ref1.businessId:void 0},function(){var _ref1;return $scope.myBusiness=(_ref1=accountService.getMyself())!=null?_ref1.businessId:void 0});$scope.$on("toggleMenu",function(){return $scope.showmenu=$scope.showmenu?false:true});$scope.closeMenu=function(){return $scope.showmenu=false};$scope.navigateTo=function(target){$scope.showmenu=false;if($location.path().indexOf(target)===
-1){$rootScope.$broadcast("PROGRESS_BAR_START");modalService.openLoadingModal();$rootScope.$broadcast("SEARCH_CLEAN");return $timeout(function(){return $location.path(target)},1)}};$scope.logout=function(){$scope.$broadcast("LOGOUT");return accountService.logout(function(){$location.path("/");return $scope.closeMenu()})};$rootScope.$on("CHANGE_ADDRESS_SELECTED",function(){if(accountService.getMyself().selectedAddress===null)if(geolocationService.position===null)$scope.currentPosition="default";else $scope.currentPosition=
"currentPosition";return $scope.currentPosition=accountService.getMyself().selectedAddress.name});$rootScope.$on("POSITION_CHANGED",function(){console.log("je suis POSITION_CHANGED : "+$scope.suspendWatching);return completePositions()});completePositions=function(){var address;var _i;var _len;var _ref1;$scope.positions=angular.copy($scope.positionBasicData);if(geolocationService.position===null)$scope.positions.splice(0,0,{key:"default",translation:"--.position.brussel"});else if($scope.currentPosition===
"default")$scope.currentPosition="currentPosition";if(accountService.getMyself()!=null){_ref1=accountService.getMyself().addresses;for(_i=0,_len=_ref1.length;_i<_len;_i++){address=_ref1[_i];$scope.positions.splice($scope.positions.length-1,0,{key:address.name,translation:address.name})}}return $scope.currentPosition=geolocationService.getLocationText()};$rootScope.$watch(function(){return accountService.model.myself},function(n,o){completePositions()},true);return $timeout(function(){completePositions();
$scope.$watch("currentPosition",function(n,o){var address;var _i;var _len;var _ref1;if(n!=null&&o!=null&&!$scope.semaphoreComputeAddress){$scope.semaphoreComputeAddress=true;if($scope.currentPosition==="createNewAddress"){$scope.currentPosition=o;if(accountService.getMyself()!=null)modalService.addressModal(true,null,false,function(data){return $timeout(function(){return $scope.currentPosition=data.name},1)});else modalService.openLoginModal($scope.createNewAddress,angular.copy(o),"--.loginModal.help.address")}else if($scope.currentPosition===
"currentPosition"&&!(geolocationService.currentPosition!=null)){$scope.currentPosition=o;modalService.messageModal("--.message.modal.notLocalised.title","--.message.modal.notLocalised.content")}else if($scope.currentPosition!==$scope.positionCurrenltyComputed){$scope.positionCurrenltyComputed=$scope.currentPosition;if(accountService.getMyself()!==null&&(accountService.getMyself().selectedAddress===null&&$scope.currentPosition!=="currentPosition"&&$scope.currentPosition!=="default"||accountService.getMyself().selectedAddress!==
null&&accountService.getMyself().selectedAddress.name!==$scope.currentPosition)){if($scope.currentPosition==="default"||$scope.currentPosition==="currentPosition")accountService.getMyself().selectedAddress=null;else{_ref1=accountService.getMyself().addresses;for(_i=0,_len=_ref1.length;_i<_len;_i++){address=_ref1[_i];if(address.name===$scope.currentPosition)accountService.getMyself().selectedAddress=address}}$timeout(function(){return $rootScope.$broadcast("POSITION_CHANGED")},1);addressService.changeAddress($scope.currentPosition)}}$timeout(function(){return $scope.semaphoreComputeAddress=
false},1)}});return $rootScope.$watch(function(){return accountService.model.myself},function(){return completePositions()})},1)}])}).call(this);
(function(){myApp.controller("ProfileCtrl",['$rootScope', '$scope', 'modalService', 'accountService', 'facebookService', '$flash', 'translationService', '$location', '$route', function($rootScope,$scope,modalService,accountService,facebookService,$flash,translationService,$location,$route){var access_token;$scope.model=accountService.model;$scope.activeTab="personal";$scope.facebookAppId=facebookService.facebookAppId;$scope.facebookAuthorization=facebookService.facebookAuthorization;$scope.basic_url=location.host+"/profile";if($scope.basic_url.indexOf("http")===-1)if($scope.basic_url.indexOf("localhost")!==-1)$scope.basic_url=
"http://"+$scope.basic_url;else $scope.basic_url="https://"+$scope.basic_url;$scope.accountParam={updateMode:true,dto:angular.copy(accountService.getMyself()),disabled:true};$scope.interestParam={result:angular.copy(accountService.getMyself().customerInterests),disabled:true};$scope.editPassword=function(){return modalService.openEditPasswordModal()};$scope.accountSave=function(){$scope.accountParam.disabled=true;return accountService.editAccount($scope.accountParam.dto)};$scope.accountCancel=function(){$scope.accountParam.dto=
angular.copy(accountService.getMyself());return $scope.accountParam.disabled=true};$scope.addAddress=function(){return modalService.addressModal(true,null,false)};$scope.editAddress=function(address){return modalService.addressModal(true,address,false)};$scope.deleteAddress=function(address){var _ref;accountService.deleteAddress(address);if(((_ref=accountService.getMyself().selectedAddress)!=null?_ref.id:void 0)===address.id)return accountService.getMyself().selectedAddress=null};$scope.interestSave=
function(){return accountService.editCustomerInterest({customerInterests:$scope.interestParam.result},function(){accountService.getMyself().customerInterests=$scope.interestParam.result;$scope.interestParam.disabled=true;return $scope.loading=false},function(){return $scope.loading=false})};$scope.facebookSuccess=function(data){accountService.setMyself(data);return $flash.success(translationService.get("--.profile.linkFacebook.success"))};$scope.fb_login=function(){var url;$scope.loading=true;if(facebookService.isConnected())return facebookService.linkToAccount(null,
function(data){$scope.facebookSuccess(data);return $scope.loading=false},function(){return $scope.loading=false});else{url="https://www.facebook.com/dialog/oauth/?client_id\x3d"+$scope.facebookAppId+"\x26redirect_uri\x3d"+$scope.basic_url+"/\x26state\x3dBELGIUM\x26scope\x3d"+$scope.facebookAuthorization+"\x26response_type\x3dtoken";return window.open(url,"_self")}};$scope.getUrlParam=function(name,url){var regex;var regexS;var results;if(!url)url=location.href;name=name.replace(/[\[]/,"\\[").replace(/[\]]/,
"\\]");regexS="[\\?\x26]"+name+"\x3d([^\x26#]*)";regex=new RegExp(regexS);results=regex.exec(url);if(results===null)return null;else return results[1]};if(location.href.indexOf("access_token")!==-1){access_token=$scope.getUrlParam("access_token",location.href);if(access_token!=null){$scope.loading=true;facebookService.linkToAccount(access_token,function(data){return $scope.facebookSuccess(data)},function(){return $scope.loading=false})}$location.url($location.path())}$rootScope.$broadcast("PROGRESS_BAR_STOP");
modalService.closeLoadingModal()}])}).call(this);
(function(){myApp.controller("BusinessCtrl",['$rootScope', '$scope', '$routeParams', 'businessService', 'geolocationService', 'addressService', '$timeout', '$flash', 'followService', '$filter', 'modalService', 'accountService', function($rootScope,$scope,$routeParams,businessService,geolocationService,addressService,$timeout,$flash,followService,$filter,modalService,accountService){$scope.loading=true;$scope.publicationListParam={businessId:$routeParams.businessId};$scope.myBusiness=accountService.getMyself().businessId===$scope.publicationListParam.businessId;$scope.descriptionLimitBase=200;$scope.descriptionLimit=$scope.descriptionLimitBase;$scope.googleMapParams={staticMap:true};
$scope.displayBack=function(){return window.history.length>0};$scope.back=function(){return window.history.back()};$scope.followed=function(){$scope.business.following=!$scope.business.following;if($scope.business.following)$flash.success($filter("translateText")("--.followWidget.message.add"));else $flash.success($filter("translateText")("--.followWidget.message.remove"));return followService.addFollow($scope.business.following,$scope.business.id)};$scope.openGallery=function(image){return $rootScope.$broadcast("DISPLAY_PICTURE_IN_GALLERY",
{list:$scope.business.galleryPictures,first:image})};$scope.displaySchedule=function(){var schedule;var _i;var _len;var _ref;var _ref1;if(((_ref=$scope.business)!=null?_ref.schedules:void 0)!=null){_ref1=$scope.business.schedules;for(_i=0,_len=_ref1.length;_i<_len;_i++){schedule=_ref1[_i];if(schedule.length>0)return true}}return false};businessService.getBusiness($routeParams.businessId,function(data){$rootScope.$broadcast("PROGRESS_BAR_STOP");modalService.closeLoadingModal();$scope.loading=false;
$scope.business=data;$scope.tabToDisplay="home";$scope.categoryLineParams={categories:$scope.business.categories};$scope.googleMapParams.address=$scope.business.address;$scope.googleMapParams.mobile=true;$scope.$watch("tabToDisplay",function(){if($scope.tabToDisplay==="info")return $timeout(function(){$scope.googleMapParams.refreshNow()},1)});$scope.displaySocialNetwork=function(){var s;s=$scope.business.socialNetwork;if(!(s!=null))return false;return s.facebookLink!=null||s.twitterLink!=null||s.instagramLink!=
null||s.deliveryLink!=null||s.opinionLink!=null||s.reservationLink!=null};$scope.tab=[{name:"home",translatableName:"--.business.action.home",icon:"gling-icon-home",action:function(){$scope.tabToDisplay="home"},display:function(){return true}},{name:"info",translatableName:"--.business.action.info",icon:"gling-icon-info",action:function(){$scope.tabToDisplay="info"},display:function(){return true}},{name:"gallery",icon:"gling-icon-images",translatableName:"--.business.action.gallery",action:function(){$scope.tabToDisplay=
"gallery"},display:function(){return $scope.business.galleryPictures!=null&&$scope.business.galleryPictures.length>0}}];$scope.computeDistance=function(){return addressService.distance($scope.business.address.id,function(data){return $scope.business.distance=data.distance})};$scope.$on("POSITION_CHANGED",function(){$scope.computeDistance();return $scope.$broadcast("RELOAD_PUBLICATION")});$scope.refreshPublications=function(){$scope.tabToDisplay="home";return $scope.$broadcast("RELOAD_PUBLICATION")};
$scope.$on("RELOAD_PUBLICATION",function(){return $scope.publicationListParam.refresh()});if(geolocationService.currentPosition!=null)$scope.$broadcast("RELOAD_PUBLICATION");return $scope.computeDistance()});$scope.createPromotion=function(){modalService.openLoadingModal();return $scope.navigateTo("/promotion")};return $scope.createNotification=function(){modalService.openLoadingModal();return $scope.navigateTo("/businessNotification")}}])}).call(this);
(function(){myApp.controller("SearchPageCtrl",['$rootScope', '$scope', 'searchService', '$routeParams', 'searchBarService', 'geolocationService', 'modalService', function($rootScope,$scope,searchService,$routeParams,searchBarService,geolocationService,modalService){var param;param=$routeParams.param;searchBarService.setCurrentSearch(param);$scope.businessTab={currentPage:0};$scope.categoryTab={currentPage:0};$scope.publicationTab={currentPage:0};$scope.results=null;$scope.search=function(){return searchService.searchByString(0,param,function(result){var alreadyOneTabActive;var cat;var cat2;var cat3;var criteria;
var selectedCounter;var _i;var _len;var _ref;modalService.closeLoadingModal();$scope.businessTab.display=false;$scope.categoryTab.display=false;$scope.publicationTab.display=false;selectedCounter=0;_ref=searchBarService.searchCriteria;for(_i=0,_len=_ref.length;_i<_len;_i++){criteria=_ref[_i];if(criteria.selected){if(criteria.key==="business")$scope.businessTab.display=true;else if(criteria.key==="category")$scope.categoryTab.display=true;else if(criteria.key==="publication")$scope.publicationTab.display=
true;selectedCounter++}}if(selectedCounter===0){$scope.businessTab.display=true;$scope.categoryTab.display=true;$scope.publicationTab.display=true}$scope.results=result;alreadyOneTabActive=false;if($scope.businessTab.display){$scope.businessTab.total=$scope.results.businesses.length;if(!alreadyOneTabActive&&$scope.businessTab.total>0){$scope.businessTab.active=true;alreadyOneTabActive=true}$scope.businessTab.totalToDisplay=$scope.businessTab.total;if($scope.results.businesses.length===20)$scope.businessTab.totalToDisplay+=
"+"}if($scope.publicationTab.display){$scope.publicationTab.total=$scope.results.publications.length;if(!alreadyOneTabActive&&$scope.publicationTab.total>0){$scope.publicationTab.active=true;alreadyOneTabActive=true}$scope.publicationTab.totalToDisplay=$scope.publicationTab.total;if($scope.results.publications.length===20)$scope.publicationTab.totalToDisplay+="+"}if($scope.categoryTab.display){$scope.categoryTab.total=0;for(cat in $scope.results.categoriesMap)for(cat2 in $scope.results.categoriesMap[cat])for(cat3 in $scope.results.categoriesMap[cat][cat2]){$scope.categoryTab.total+=
$scope.results.categoriesMap[cat][cat2][cat3].length;if($scope.results.categoriesMap[cat][cat2][cat3].length===20)$scope.categoryTab.loadCategory=true}if(!alreadyOneTabActive&&$scope.categoryTab.total>0){$scope.categoryTab.active=true;alreadyOneTabActive=true}$scope.categoryTab.totalToDisplay=$scope.categoryTab.total;if($scope.categoryTab.total>=20)$scope.categoryTab.totalToDisplay+="+"}$scope.businessTab.data=$scope.results.businesses;$scope.publicationTab.data=$scope.results.publications;$scope.categoryTab.data=
$scope.results.categoriesMap;$scope.loadSemaphore=false;$(window).on("scroll",function(){var scrollBottom;scrollBottom=$(window).scrollTop()+$(window).height();if($(".container-content").height()-scrollBottom<200)$scope.search()});return $scope.search=function(){var s;var tabToLoad;if($scope.loadSemaphore===false){$scope.loadSemaphore=true;tabToLoad=void 0;if($scope.businessTab.active)tabToLoad=$scope.businessTab;else if($scope.publicationTab.active)tabToLoad=$scope.publicationTab;else if($scope.categoryTab.active)tabToLoad=
$scope.categoryTab;if(tabToLoad.total===20&&tabToLoad.allLoaded!==true){s=searchBarService.currentSearch;if(s.indexOf(":")!==-1)s=s.split(":")[1];tabToLoad.currentPage++;if($scope.businessTab.active){s="business:"+s;return searchService.searchByString(tabToLoad.currentPage,s,function(data){var business;var _j;var _len1;var _ref1;var _results;$scope.loadSemaphore=false;if(data.businesses.length===0)return tabToLoad.allLoaded=true;else{_ref1=data.businesses;_results=[];for(_j=0,_len1=_ref1.length;_j<
_len1;_j++){business=_ref1[_j];_results.push(tabToLoad.data.push(business))}return _results}})}else if($scope.publicationTab.active){s="publication:"+s;return searchService.searchByString(tabToLoad.currentPage,s,function(data){var publication;var _j;var _len1;var _ref1;var _results;$scope.loadSemaphore=false;if(data.publications.length===0)return tabToLoad.allLoaded=true;else{_ref1=data.publications;_results=[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){publication=_ref1[_j];_results.push(tabToLoad.data.push(publication))}return _results}})}else if($scope.categoryTab.active&&
$scope.categoryTab.loadCategory===true){s="category:"+s;return searchService.searchByString(tabToLoad.currentPage,s,function(data){var total;$scope.loadSemaphore=false;total=$scope.fusionCategories(data.categoriesMap);if(total===0)return tabToLoad.allLoaded=true})}}}}})};$scope.fusionCategories=function(newMap){var b;var cat;var catFounded;var newCat;var newSCat;var newSSCat;var sCat;var sCatFounded;var ssCat;var ssCatFounded;var totalToAdd;totalToAdd=0;for(newCat in newMap){catFounded=false;for(cat in $scope.results.categoriesMap)if(cat===
newCat){catFounded=true;break}if(!catFounded)$scope.results.categoriesMap.newCat=newMap[newCat];else for(newSCat in newMap[newCat]){sCatFounded=false;for(sCat in $scope.results.categoriesMap[newCat])if(sCat===newSCat){sCatFounded=true;break}if(!sCatFounded)$scope.results.categoriesMap[newCat].newSCat=newMap[newCat][newSCat];else for(newSSCat in newMap[newCat][newSCat]){ssCatFounded=false;for(ssCat in $scope.results.categoriesMap[newCat][newSCat])if(ssCat===newSSCat){ssCatFounded=true;break}if(!ssCatFounded)$scope.results.categoriesMap[newCat][newSCat].newSSCat=
newMap[newCat][newSCat][newSSCat];else for(b in newMap[newCat][newSCat][newSSCat]){$scope.results.categoriesMap[newCat][newSCat][newSSCat].push(newMap[newCat][newSCat][newSSCat][b]);totalToAdd++}}}}return totalToAdd};$scope.$on("POSITION_CHANGED",function(){return $scope.search()});$(window).scrollTop(0);$rootScope.$broadcast("PROGRESS_BAR_STOP");return $scope.search()}])}).call(this);
(function(){myApp.controller("FollowedBusinessPageCtrl",['$rootScope', '$scope', 'businessService', 'ngTableParams', '$filter', 'followService', 'modalService', function($rootScope,$scope,businessService,ngTableParams,$filter,followService,modalService){$scope.businessListParams={loading:true};businessService.getFollowedBusinesses(function(data){$scope.businesses=data;$scope.setNotification=function(business){business.followingNotification=!business.followingNotification;return followService.setNotification(business.id,business.followingNotification)};return $scope.stopFollow=function(business){for(var key in $scope.businesses)if($scope.businesses[key]===
business)$scope.businesses.splice(key,1);return followService.addFollow(false,business.id)}});$(window).scrollTop(0);$rootScope.$broadcast("PROGRESS_BAR_STOP");return modalService.closeLoadingModal()}])}).call(this);
(function(){myApp.controller("PromotionCtrl",['$rootScope', '$scope', 'accountService', '$flash', 'translationService', 'facebookService', 'modalService', 'promotionService', 'businessService', '$compile', function($rootScope,$scope,accountService,$flash,translationService,facebookService,modalService,promotionService,businessService,$compile){return businessService.getBusiness(accountService.getMyself().businessId,function(business){var directive;$scope.publicationFormParam={dto:null,business:$scope.business};directive=$compile("\x3cpromotion-form-ctrl ng-info\x3d'publicationFormParam'\x3e\x3c/promotion-form-ctrl\x3e")($scope);$(".inject-box").append(directive);
$scope.save=function(share){if(!$scope.publicationFormParam.isValid)return $scope.publicationFormParam.displayErrorMessage=true;else if($scope.publicationFormParam.minimalQuantity>$scope.publicationFormParam.quantity)return $flash.error(translationService.get("--.promotion.validation.minimalQuantityMustBeLowerThanQuantity"));else{modalService.openLoadingModal();return promotionService.add($scope.publicationFormParam.dto,function(data){modalService.closeLoadingModal();$scope.navigateTo("/business/"+
$scope.business.id);return modalService.successAndShare($scope.publicationFormParam.business.id,data.id)},function(){return modalService.closeLoadingModal()})}};modalService.closeLoadingModal();return $scope.business=business})}])}).call(this);
(function(){myApp.controller("BusinessNotificationCtrl",['$rootScope', '$scope', 'accountService', '$flash', 'translationService', 'facebookService', 'modalService', 'businessNotificationService', 'businessService', '$compile', function($rootScope,$scope,accountService,$flash,translationService,facebookService,modalService,businessNotificationService,businessService,$compile){return businessService.getBusiness(accountService.getMyself().businessId,function(business){var directive;$scope.business=business;$scope.businessNotificationFormParam={dto:null,business:$scope.business};modalService.closeLoadingModal();directive=$compile("\x3cbusiness-notification-form-ctrl ng-info\x3d'businessNotificationFormParam'\x3e\x3c/business-notification-form-ctrl\x3e")($scope);
$(".inject-box").append(directive);return $scope.save=function(share){if(!$scope.businessNotificationFormParam.isValid)return $scope.businessNotificationFormParam.displayErrorMessage=true;else{modalService.openLoadingModal();return businessNotificationService.add($scope.businessNotificationFormParam.dto,function(data){modalService.closeLoadingModal();$scope.navigateTo("/business/"+$scope.business.id);return modalService.successAndShare($scope.businessNotificationFormParam.business.id,data.id)},function(){return modalService.closeLoadingModal()})}}})}])}).call(this);
(function() {

  myApp.directive('businessListMobileCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$location', function($rootScope, businessService, geolocationService, directiveService, searchService, $location) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/businessListMobile/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            directiveService.autoScopeImpl(scope);
            scope.descriptionLimitBase = 200;
            scope.descriptionLimit = scope.descriptionLimitBase;
            scope.getInfo().loading = true;
            scope.navigateTo = function(target) {
              return $location.path(target);
            };
            return scope.$watch('getInfo().data', function() {
              return scope.businesses = scope.getInfo().data;
            });
          }
        };
      }
    };
  }]);

}).call(this);

(function() {

  myApp.directive('publicationListMobileCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$location', 'modalService', '$timeout', function($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService, $timeout) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/publicationListMobile/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            directiveService.autoScopeImpl(scope);
            scope.getInfo().loading = true;
            return scope.$watch('getInfo().data', function() {
              var publication, _i, _len, _ref, _results;
              scope.publications = scope.getInfo().data;
              _ref = scope.publications;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                publication = _ref[_i];
                publication.descriptionLimit = scope.descriptionLimitBase;
                _results.push(publication.interval = publication.endDate - (new Date));
              }
              return _results;
            });
          }
        };
      }
    };
  }]);

}).call(this);

(function() {

  myApp.directive('publicationListMobileForBusinessCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$timeout', function($rootScope, businessService, geolocationService, directiveService, searchService, $timeout) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/publicationListMobileForBusiness/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            directiveService.autoScopeImpl(scope);
            scope.descriptionLimitBase = 250;
            scope.currentPage = 0;
            scope.allLoaded = false;
            scope.loadSemaphore = false;
            scope.publications = [];
            scope.loading = false;
            scope.isArchived = function(publication) {
              return publication.endDate < (new Date).getTime();
            };
            $('.scrollable-content-body').on('scroll', function() {
              var scrollBottom;
              scrollBottom = $('.scrollable-content-body').scrollTop() + $('.scrollable-content-body').height();
              if ($('.scrollable-content-inner').height() - scrollBottom < 200) {
                if (scope.loadSemaphore === false) {
                  console.log('-- SERACH FROM SCROOL');
                  scope.loadSemaphore = true;
                  scope.currentPage = scope.currentPage + 1;
                  return scope.search();
                }
              }
            });
            scope.openGallery = function(image, publication) {
              return $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY', {
                list: publication.pictures,
                first: image
              });
            };
            scope.getInterestClass = function(publication) {
              if (publication.interest != null) {
                return 'gling-icon-' + publication.interest.name;
              }
              return null;
            };
            scope.getInfo().refresh = function(type) {
              scope.currentPage = 0;
              scope.publications = [];
              scope.type = type;
              return scope.search();
            };
            scope.success = function(data) {
              var d, publication, _i, _j, _len, _len1, _ref;
              if (scope.currentPage === 0) {
                scope.publications = [];
              }
              if (data.length === 0) {
                scope.allLoaded = true;
              }
              scope.loadSemaphore = false;
              for (_i = 0, _len = data.length; _i < _len; _i++) {
                d = data[_i];
                scope.publications.push(d);
              }
              _ref = scope.publications;
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                publication = _ref[_j];
                publication.descriptionLimit = scope.descriptionLimitBase;
                publication.interval = (publication.endDate - (new Date)) / 1000;
              }
              $timeout((function() {
                if (scope.getInfo().scrollTo != null) {
                  $('.main-body').scrollTop($('#publication' + scope.getInfo().scrollTo).offset().top);
                  return scope.$apply();
                }
              }), 1);
              return scope.loading = false;
            };
            scope.search = function() {
              if (scope.allLoaded === true) {
                return;
              }
              scope.loading = true;
              return searchService.byBusiness(scope.currentPage, scope.getInfo().businessId, scope.success);
            };
            console.log('-- SERACH FROM initialization');
            return scope.search();
          }
        };
      }
    };
  }]);

}).call(this);

myApp.directive("headerSearchCtrl", ['$rootScope', '$location', '$timeout', 'modalService', function ($rootScope,$location,$timeout,modalService) {
    return {
        restrict: "E",
        scope: {
            title: '=',
            displayMenu: '='
        },
        templateUrl: "/assets/javascripts/directive/mobile/headerSearch/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.showMenu = function(){
                        $rootScope.$broadcast('toggleMenu');
                    };

                    scope.displayBack = function(){
                        return window.history.length>0;
                    };


                    scope.back = function () {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        modalService.openLoadingModal();
                        $timeout(function(){
                            $location.url('/');
                        },1);
                    };




                }
            }
        }
    }
}]);

myApp.directive("mobileTitleCtrl", ['$rootScope', '$location', '$timeout', 'modalService', function ($rootScope,$location,$timeout,modalService) {
    return {
        restrict: "E",
        scope: {
            title: '=',
            displayMenu: '='
        },
        templateUrl: "/assets/javascripts/directive/mobile/title/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.showMenu = function(){
                        console.log('showMenu');
                        $rootScope.$broadcast('toggleMenu');
                    };

                    scope.displayBack = function(){
                        return window.history.length>0;
                    };

                    scope.back = function () {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        modalService.openLoadingModal();
                        $timeout(function(){
                            $location.url('/');//window.history.back();
                        },1);

                    };




                }
            }
        }
    }
}]);

(function() {

  myApp.directive('categoryLineCtrl', ['$rootScope', 'directiveService', '$location', function($rootScope, directiveService, $location) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/categoryLine/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            directiveService.autoScopeImpl(scope);
            return scope.searchCat = function(categoryName) {
              return $location.path('/search/category:' + categoryName);
            };
          }
        };
      }
    };
  }]);

}).call(this);

(function() {

  myApp.directive('publicationWidgetCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$location', 'modalService', '$timeout', function($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService, $timeout) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/publicationWidgetForMobile/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            directiveService.autoScopeImpl(scope);
            scope.descriptionLimitBase = 250;
            scope.descriptionLimit = scope.descriptionLimitBase;
            scope.getInterestClass = function(publication) {
              if (publication.interest != null) {
                return 'gling-icon-' + publication.interest.name;
              }
              return null;
            };
            scope.navigateTo = function(target) {
              $rootScope.$broadcast('PROGRESS_BAR_START');
              modalService.openLoadingModal();
              return $timeout((function() {
                return $location.path(target);
              }), 1);
            };
            scope.openGallery = function(image, publication) {
              return $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY', {
                list: publication.pictures,
                first: image
              });
            };
            scope.getInfo().loading = true;
            return scope.getIllustrationClass = function(picture) {
              if (picture !== void 0 && picture.height > picture.width) {
                return 'publication-illustration-high';
              } else {
                return 'publication-illustration';
              }
            };
          }
        };
      }
    };
  }]);

}).call(this);

myApp.service("$flash", ['$filter', 'modalService', function($filter,modalService) {

    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right cr-messenger',
        theme: 'block'
    };

    this.success = function(messages) {
        print(messages,'success');
        return;
    };
    this.info = function(messages) {
        print(messages,'info');
        return
    };
    this.error = function(messages) {
        print(messages,'error');
        return;

    };
    this.warning = function(messages) {
        print(messages,'warning');
        return;
    };

    print = function(messages,type){

        if(!(angular.isUndefined(messages) || messages === null )) {
            for (var key in messages.split("\n")) {
                var message = messages.split("\n")[key];

                modalService.alertModal(type,$filter('translateText')(message));

                //Messenger().post({
                //    message: message,
                //    type: type,
                //    showCloseButton: true
                //});
            }
        };
        return;
    }
}]);
