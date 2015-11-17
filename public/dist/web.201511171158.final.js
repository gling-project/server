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
var test = function (accountService) {
    var myself = accountService.getMyself();
    if (myself == null) {
        return 'NOT_CONNECTED';
    }
    else {
        return myself.type;
    }
};


var initializeCommonRoutes = function () {
    myApp
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider.when('/home/:param*?', {
                templateUrl: '/assets/javascripts/view/web/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    a: ['accountService', '$rootScope', function (accountService, $rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        var status = test(accountService);
                    }]
                }
            }).when('/profile', {
                templateUrl: '/assets/javascripts/view/web/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    a: ['accountService', '$location', '$rootScope', function (accountService, $location, $rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        if (test(accountService) == 'NOT_CONNECTED') {
                            $location.path('/');
                        }
                    }]
                }
            }).when('/search/:param?', {
                templateUrl: '/assets/javascripts/view/web/search_page.html',
                controller: 'SearchPageCtrl',
                resolve: {
                    a: ['$rootScope', function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }]
                }
            }).when('/my-businesses', {
                templateUrl: '/assets/javascripts/view/web/followed_business_page.html',
                controller: 'FollowedBusinessPageCtrl',
                resolve: {
                    a: ['$rootScope', function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }]
                }
            }).when('/business/:businessId', {
                templateUrl: '/assets/javascripts/view/web/business.html',
                controller: 'BusinessCtrl',
                resolve: {
                    a: ['$rootScope', function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }]
                }
            }).when('/business/:businessId/publication/:publicationId', {
                templateUrl: '/assets/javascripts/view/web/business.html',
                controller: 'BusinessCtrl',
                resolve: {
                    a: ['$rootScope', function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }]
                }
            }).when('/welcome/', {
                resolve: {
                    a: ['$rootScope', function ($rootScope) {
                        window.location.replace('/welcome/');
                    }]
                }
            }).when('/legal/', {
                resolve: {
                    a: ['$rootScope', function ($rootScope) {
                        window.location.replace('/legal/');
                    }]
                }
            }).when('/help/', {
                resolve: {
                    a: ['$rootScope', function ($rootScope) {
                        window.location.replace('/help/');
                    }]
                }
            }).otherwise({
                redirectTo: '/home/'
            });


            // use the HTML5 History API
            $locationProvider.html5Mode(true);
        }]);
};
var myApp = angular.module('app', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        "angucomplete",
        'angularFileUpload',
        'ngRoute',
        'ngTable',
        'geolocation',
        'timer',
        'ngMap'
        //,'ezfb'
    ]
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
myApp.controller('LoginModalCtrl', ['$scope', '$flash', 'facebookService', 'translationService', '$modal', '$modalInstance', 'accountService', '$location', 'modalService', 'fctToExecute', 'fctToExecuteParams', 'helpMessage', function ($scope, $flash, facebookService, translationService, $modal, $modalInstance, accountService, $location, modalService, fctToExecute, fctToExecuteParams,helpMessage) {

    $scope.fctToExecute=fctToExecute;
    $scope.helpMessage=helpMessage;

    $scope.loginFormParam = {
        facebookSuccess: function (data) {
            if (fctToExecute != null) {
                fctToExecute(fctToExecuteParams);
            }
            $scope.close();
        },
        loading:false
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if ($scope.loginFormParam.isValid) {

            $scope.loginFormParam.loading = true;

            accountService.login($scope.loginFormParam.dto,
                function () {

                    $flash.success(translationService.get("--.login.flash.success"));
                    $scope.loading = false;
                    $scope.close();
                    if (accountService.getMyself().type == 'BUSINESS') {
                        $location.path('/business/'+accountService.getMyself().businessId);
                    }
                    if (fctToExecute != null) {
                        fctToExecute(fctToExecuteParams);
                    }
                },
                function () {
                    $scope.loginFormParam.loading = false;
                });
        }
        else {
            $scope.loginFormParam.displayErrorMessage = true;
        }
    };

    $scope.toForgotPassword = function () {
        modalService.openForgotPasswordModal($scope.loginFormParam.dto.email);
        $scope.close();
    };

    $scope.toBusinessRegistration = function () {
        $scope.close();
        modalService.openBusinessRegistrationModal();
    };

    $scope.toCustomerRegistration = function () {
        $scope.close();
        modalService.openCustomerRegistrationModal(fctToExecute, fctToExecuteParams);
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
myApp.controller('ForgotPasswordModalCtrl', ['$scope', '$http', '$flash', '$modalInstance', '$filter', 'email', 'accountService', function ($scope, $http, $flash, $modalInstance, $filter, email, accountService) {

    $scope.loading = false;

    $scope.dto = {
        email:email
    };

    $scope.fields = {
        email: {
            fieldType: "email",
            name: 'email',
            fieldTitle: "--.changeEmailModal.email",
            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            validationMessage: "--.generic.validation.email",
            focus: function () {
                return true;
            },
            disabled: function () {
                return $scope.loading;
            },
            field: $scope.dto,
            fieldName: 'email'
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

            $scope.loading = true;

            accountService.forgotPassword($scope.dto, function () {
                    $flash.success($filter('translateText')('--.forgotPassword.success'));
                    $scope.loading = false;
                    $scope.close();
                },
                function () {
                    $scope.loading = false;
                });
        }
        else {
            $scope.displayErrorMessage = true;
        }
    };

}]);
myApp.controller('HelpModalCtrl', ['$scope', '$modalInstance', 'message', function ($scope, $modalInstance,message) {

    $scope.message=message;

    $scope.close = function () {
        $modalInstance.close();
    };

}]);
myApp.controller('DownloadFieldModalCtrl', ['$scope', '$flash', '$modalInstance', function ($scope, $flash, $modalInstance) {

    $scope.loading=false;

    $scope.fields = {
        file: {
            fieldTitle: "generic.file",
            disabled:function(){
                return $scope.loading;
            }
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.allFieldValid = function () {

        var validation = true;

        for (var key in $scope.fields) {
            var obj = $scope.fields[key];
            if ($scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                obj.firstAttempt = false;
                validation= false;
            }
        }
        return validation;
    };

    $scope.save = function () {
        if ($scope.allFieldValid()) {
            /*

            var dto = {
                oldPassword: $scope.fields.oldPassword.field,
                newEmail: $scope.fields.newEmail.field
            };

            $scope.loading=true;

            $http({
                'method': "PUT",
                'url': "/account/email/"+account.id,
                'headers': "Content-Type:application/json",
                'data': dto
            }).success(function (data, status) {
                $scope.loading=false;
                $scope.close();
                setEmail(data.email);
            })
            .error(function (data, status) {
                $scope.loading=false;
                $flash.error(data.message);
            });
             */
        }
    }


}]);
(function() {

  myApp.controller('CustomerRegistrationModalCtrl', ['$scope', '$flash', '$modal', '$modalInstance', 'translationService', 'accountService', 'facebookService', 'modalService', 'fctToExecute', 'fctToExecuteParams', function($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, modalService, fctToExecute, fctToExecuteParams) {
    $scope.accountParam = {};
    $scope.close = function() {
      return $modalInstance.close();
    };
    $scope.toBusinessRegistration = function() {
      $scope.close();
      return modalService.openBusinessRegistrationModal();
    };
    $scope.setLoading = function(b) {
      $scope.loading = b;
      return $scope.accountParam.disabled = b;
    };
    $scope.fb_login = function() {
      $scope.setLoading(true);
      return facebookService.login((function(data) {
        accountService.setMyself(data);
        if (data.type === 'BUSINESS') {
          $location.path('/business/' + accountService.getMyself().businessId);
        }
        $scope.setLoading(false);
        return $scope.close();
      }), function(data) {
        return $flash.error(data.message);
      });
    };
    return $scope.save = function() {
      if (!$scope.accountParam.isValid) {
        return $scope.accountParam.displayErrorMessage = true;
      } else {
        $scope.setLoading(true);
        return accountService.registration($scope.accountParam.dto, (function() {
          $scope.setLoading(false);
          $flash.success(translationService.get('--.login.flash.success'));
          if (fctToExecute != null) {
            fctToExecute(fctToExecuteParams);
          }
          return $scope.close();
        }), function() {
          return $scope.setLoading(false);
        });
      }
    };
  }]);

}).call(this);

(function() {

  myApp.controller('BusinessRegistrationModalCtrl', ['$scope', '$flash', '$modal', '$modalInstance', 'translationService', 'accountService', 'facebookService', 'businessService', '$location', function($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, businessService, $location) {
    $scope.badgeSelected = 1;
    $scope.accountParam = {};
    $scope.account = null;
    $scope.business = {};
    $scope.businessNameField = {
      name: 'name',
      fieldTitle: "--.generic.name",
      validationRegex: "^.{2,50}$",
      validationMessage: ['--.generic.validation.size', '2', '250'],
      field: $scope.business,
      disabled: function() {
        return $scope.loading;
      },
      fieldName: 'name'
    };
    $scope.importFromFacebookParam = {
      name: 'facebookUrl',
      validationRegex: "^($|https://www.facebook\.com/.*$)",
      validationMessage: '--.generic.validation.facebook',
      fieldTitle: "Facebook",
      field: $scope.business,
      disabled: function() {
        return $scope.loading;
      },
      fieldName: 'facebookUrl'
    };
    $scope.setLoading = function(b) {
      $scope.loading = b;
      return $scope.accountParam.disabled = b;
    };
    $scope.close = function() {
      $modalInstance.close();
    };
    $scope.toBusinessStep = function() {
      if (accountService.getMyself().type === 'BUSINESS') {
        $flash.success(translationService.get('--.businessRegistration.alreadyBusiness'));
        return $scope.close();
      } else {
        return $scope.badgeSelected = 2;
      }
    };
    $scope.saveSuccess = function(data) {
      accountService.setMyself(data);
      $location.path('/business/' + accountService.getMyself().businessId);
      $scope.close();
      return $scope.setLoading(false);
    };
    $scope.save = function() {
      if (!$scope.businessNameField.isValid) {
        return $scope.businessNameField.displayErrorMessage = true;
      } else {
        $scope.setLoading(true);
        return businessService.createBusiness(accountService.getMyself().id, $scope.business.name, function(data) {
          return $scope.saveSuccess(data);
        }, function() {
          return $scope.loading = false;
        });
      }
    };
    $scope.fb_login = function() {
      $scope.setLoading(true);
      return facebookService.login((function(data) {
        accountService.setMyself(data);
        $scope.setLoading(false);
        return $scope.toBusinessStep();
      }), function(data) {
        return $flash.error(data.message);
      });
    };
    $scope.createAccount = function() {
      if (!$scope.accountParam.isValid) {
        return $scope.accountParam.displayErrorMessage = true;
      } else {
        $scope.setLoading(true);
        return accountService.registration($scope.accountParam.dto, (function() {
          $scope.setLoading(false);
          return $scope.toBusinessStep();
        }), function() {
          return $scope.setLoading(false);
        });
      }
    };
    return $scope.importBusinessFromFacebook = function() {
      var urlEncoded;
      console.log($scope.importFromFacebookParam);
      if (!$scope.importFromFacebookParam.isValid) {
        return $scope.importFromFacebookParam.displayErrorMessage = true;
      } else {
        $scope.setLoading(true);
        urlEncoded = encodeURIComponent($scope.business.facebookUrl);
        return businessService.importBusinessFormFacebook(urlEncoded, function(data) {
          return $scope.saveSuccess(data);
        }, function() {
          return $scope.setLoading(false);
        });
      }
    };
  }]);

}).call(this);

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
myApp.controller('EditCustomerInterestModalCtrl', ['$scope', '$flash', '$modal', '$modalInstance', 'translationService', 'accountService', 'facebookService', 'modalService', function ($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, modalService) {


    $scope.customerInterestParam = {
        result : accountService.getMyself().customerInterests
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {
        $scope.loading=true;
        accountService.editCustomerInterest(
            $scope.customerInterestParam.result,
            function () {
                $scope.loading = false;
                $scope.close();
            },
            function () {
                $scope.loading = false;
            });
    }

}]);
myApp.controller('PromotionModalCtrl', ['$scope', '$flash', '$modalInstance', 'translationService', 'dto', 'promotionService', 'callback', 'facebookService', 'business', 'modalService', function ($scope, $flash, $modalInstance, translationService, dto, promotionService, callback,facebookService,business,modalService) {

    $scope.loading = false;



    $scope.update = (dto != null);

    $scope.promotionParam = {
        dto: angular.copy(dto),
        business:business
    };


    $scope.getHeight = function(){
        var h = {height:($(window).height() - 190)+'px'};
        return h;
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.getIllustration = function(publication){
        if(publication.pictures.length>0){
            return publication.pictures[O];
        }
        return publication.businessIllustration;
    };


    $scope.success = function (data) {

        $scope.loading = false;

        $scope.close();
        callback();
    };

    $scope.save = function (share) {

        if (!$scope.promotionParam.isValid) {
            $scope.promotionParam.displayErrorMessage = true;
        }
        else {

            if ($scope.promotionParam.minimalQuantity > $scope.promotionParam.quantity) {
                $flash.error(translationService.get('--.promotion.validation.minimalQuantityMustBeLowerThanQuantity'))
            }
            else if($scope.loading===false){

                $scope.loading = true;
                if ($scope.update) {
                    promotionService.edit($scope.promotionParam.dto, function (data) {
                            $scope.success(data);
                        },
                        function () {
                            $scope.loading = false;
                        });
                }
                else {
                    promotionService.add($scope.promotionParam.dto, function (data) {
                            $scope.success(data);
                            modalService.successAndShare($scope.promotionParam.business.id, data.id);
                        },
                        function () {
                            $scope.loading = false;
                        });
                }
            }
        }
    }


}]);
myApp.controller('BusinessNotificationModalCtrl', ['$scope', '$flash', '$modalInstance', 'translationService', 'dto', 'businessNotificationService', 'callback', 'facebookService', 'business', 'modalService', function ($scope, $flash, $modalInstance, translationService, dto, businessNotificationService, callback, facebookService, business,modalService) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.businessNotificationParam = {
        dto: angular.copy(dto),
        business: business
    };


    $scope.getHeight = function () {
        var h = {height: ($(window).height() - 190) + 'px'};
        return h;
    };


    $scope.close = function () {
        $modalInstance.close();
    };


    $scope.getIllustration = function (publication) {
        if (publication.pictures.length > 0) {
            return publication.pictures[O];
        }
        return publication.businessIllustration;
    };

    $scope.success = function (data) {

        $scope.loading = false;

        $scope.close();
        callback();
    };

    $scope.save = function (share) {

        if (!$scope.businessNotificationParam.isValid) {
            $scope.businessNotificationParam.displayErrorMessage = true;
        }
        else if($scope.loading===false){
            $scope.loading = true;
            if ($scope.update) {
                businessNotificationService.edit($scope.businessNotificationParam.dto, function (data) {
                        $scope.success(data);
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
            else {
                businessNotificationService.add($scope.businessNotificationParam.dto, function (data) {
                        $scope.success(data);
                        modalService.successAndShare($scope.businessNotificationParam.business.id,data.id);
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
myApp.controller('BasicModalCtrl', ['$scope', '$flash', '$modalInstance', 'businessService', 'accountService', 'translationService', 'param', '$compile', 'directiveName', 'save', '$timeout', 'title', function ($scope, $flash, $modalInstance, businessService, accountService, translationService, param, $compile, directiveName, save, $timeout, title) {

    $scope.title = title;

    var directive = $compile("<" + directiveName + " ng-info=\"param\"/>")($scope);

    $timeout(function () {
        $('.inject-data:first').append(directive)
    }, 1);


    $scope.loading = false;

    $scope.param = param;


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.setLoading = function(value){
        $scope.loading = value;
    };

    $scope.save = function () {
        var isValid = true;
        if(param.callBackSave!=null){
            param.callBackSave();
        }
        if (param.isValid != undefined) {
            isValid = param.isValid;

            param.displayErrorMessage = true;
        }
        if (isValid) {
            $scope.loading = true;
            save($scope.close,$scope.setLoading);
        }
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
myApp.controller('GalleryModalCtrl', ['$scope', '$modalInstance', 'image', 'images', function ($scope, $modalInstance, image, images) {


    $scope.image = image;
    $scope.images = images;
    $scope.imageNb = null;

    $scope.close = function () {
        $modalInstance.close();
    };

    for (var key in $scope.images) {
        if ($scope.images[key] == $scope.image) {
            $scope.imageNb = key - -1;
        }
    }

    $scope.previous = function () {
        for (var key in $scope.images) {
            if ($scope.images[key] == $scope.image) {
                if ($scope.images[key - 1] == undefined) {
                    $scope.image = $scope.images[$scope.images.length - 1];
                    $scope.imageNb = $scope.images.length;
                }
                else {
                    $scope.image = $scope.images[key - 1];
                    $scope.imageNb = key - 1 - -1;
                }
                break;
            }
        }
    };

    $scope.next = function () {
        for (var key in $scope.images) {
            if ($scope.images[key] == $scope.image) {
                var newKey = key - -1;
                if ($scope.images[newKey] == undefined) {
                    $scope.image = $scope.images[0];
                    $scope.imageNb = 1;
                }
                else {
                    $scope.image = $scope.images[newKey];
                    $scope.imageNb = key - -1 - -1;
                }
                break;
            }
        }
    };

}]);
myApp.controller('iframeModalCtrl', ['$scope', '$flash', '$modalInstance', 'title', 'url', function ($scope, $flash, $modalInstance,title,url) {


    $scope.title=title;
    $scope.url=url;

    $scope.close = function () {
        $modalInstance.close();
    };

}]);
myApp.controller('HomeCtrl', ['$scope', 'modalService', 'customerInterestService', 'searchService', '$rootScope', 'geolocationService', 'accountService', '$timeout', 'addressService', '$location', '$route', '$routeParams', function ($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService, $timeout, addressService, $location, $route,$routeParams) {

    //back to the top of the page
    $(window).scrollTop(0);

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.param = $routeParams.param;


    var original = $location.path;
    var path = function () {

        //build path
        var path = '/home';

        if ($scope.followedMode) {
            path+='/following';
        }
        for (var i in $scope.customerInterests) {
            if($scope.customerInterests[i].selected === true){
                path+='/'+$scope.customerInterests[i].name;
            }
        }

        //navigate
        $location.path(path, false);
        $rootScope.$broadcast('PROGRESS_BAR_STOP');
    };


    $scope.displaySharePositionAdvertissement = function () {
        return geolocationService.sharePosition == false && (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null);
    };
    $rootScope.$watch(function () {
        return geolocationService.sharePosition;
    }, function (n) {
        $scope.sharePosition = n;
    });

    $scope.interestDisplayMax = 12;
    $scope.interestDisplayed = [];
    $scope.interestDisplayed2 = [];
    $scope.computeList = function () {
        $scope.interestDisplayed = $scope.customerInterests.slice(0, $scope.interestDisplayMax);
        $scope.interestDisplayed2 = $scope.customerInterests.slice($scope.interestDisplayMax, $scope.customerInterests.length);
    };

    //variable
    $scope.followedMode = $scope.param != null && $scope.param.indexOf('following')!=-1;
    $scope.businessInfoParam = {};
    $scope.businessListParam = {data: []};
    $scope.accountService = accountService.model;
    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;

        if ($scope.param != null) {
            for (var i in $scope.customerInterests) {
                if ($scope.param.indexOf($scope.customerInterests[i].name)!=-1) {
                    $scope.customerInterests[i].selected = true;
                }
            }
        }

        $scope.computeList();
    });
    $scope.publicationListCtrl = {};
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    $scope.loadSemaphore = false;
    $scope.emptyMessage = null;


    $scope.setFollowedMode = function (n) {
        if (n == null) {
            n = !$scope.followedMode;
        }
        if (accountService.getMyself() == null) {
            modalService.openLoginModal($scope.switchFollowedMode, n, '--.loginModal.help.followMode');
        }
        else {
            $scope.switchFollowedMode(n);
        }
    };

    $scope.switchFollowedMode = function (n) {

        if (n != null) {
            $scope.followedMode = n;
        }
        else {
            $scope.followedMode = !$scope.followedMode;
        }

        path();
    };


    //open registration modal
    $scope.customerRegistration = function () {
        modalService.openCustomerRegistrationModal();
    };

    //functions
    //search by interest
    $scope.searchByInterest = function (interest) {

        if (interest.selected == true) {
            interest.selected = false;
        }
        else {
            for (var i in $scope.customerInterests) {
                $scope.customerInterests[i].selected = false;
            }
            interest.selected = true;
        }
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        $scope.search();

        path();
    };

    //watch on change position
    $scope.$on('POSITION_CHANGED', function () {
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        $scope.search();
    });


    //watch in follow mode
    $scope.$watch('followedMode', function (o, n) {
        if (o != n) {
            $scope.currentPage = 0;
            $scope.allLoaded = false;
            $scope.search();
        }
    });

    $scope.$on('LOGOUT', function () {
        if ($scope.followedMode) {
            $scope.followedMode = false;
        }
    });

    //scrolling
    $(window).on('scroll', function () {
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if ($('.container-content').height() - scrollBottom < 200) {

            if ($scope.loadSemaphore == false) {
                $scope.currentPage = $scope.currentPage + 1;
                $scope.search();
            }
        }
    });


    var success = function (data, callbackEmptyResultFunction) {
        if ($scope.currentPage == 0) {
            $scope.publicationListCtrl.data = [];
        }
        $scope.loadSemaphore = false;
        $scope.publicationListCtrl.loading = false;
        if (data == null || data.length <= 5) {
            $scope.allLoaded = true;


            //if there is no result and this is the first page and there is a callbackFunction,
            //try something else
            if ($scope.currentPage == 0 && callbackEmptyResultFunction != null) {
                callbackEmptyResultFunction();
                if (data.length != 0) {
                    $scope.emptyMessage = 'moreBusiness';
                }
            }
        }
        for (var key in data) {
            $scope.publicationListCtrl.data.push(data[key]);
        }
    };

    var successBusiness = function (data) {
        $scope.businessListParam.data = data;
        $scope.businessListParam.loading = false;
    };


    //search function
    $scope.search = function () {
        if ($scope.allLoaded == false) {

            var interestSelected = null;
            for (var i in $scope.customerInterests) {
                if ($scope.customerInterests[i].selected) {
                    interestSelected = $scope.customerInterests[i];
                }
            }

            $scope.loadSemaphore = true;

            //if this is the first page that asked, remove other publication
            if ($scope.currentPage == 0) {
                $scope.publicationListCtrl.loading = true;
                $scope.emptyMessage = null;
                $scope.publicationListCtrl.data = [];
                $scope.businessListParam.data = [];
            }

            if ($scope.followedMode) {
                if (interestSelected != null) {
                    searchService.byFollowedAndInterest($scope.currentPage, interestSelected.id, function (data) {
                        success(data,
                            function () {
                                $scope.emptyMessage = 'followedWithInterest';
                                $scope.businessListParam.loading = true;
                                searchService.nearBusinessByInterest(interestSelected.id, function (data) {
                                    successBusiness(data);
                                });
                            });
                    });

                }
                else {
                    searchService.byFollowed($scope.currentPage, function (data) {
                        success(data,
                            function () {
                                $scope.emptyMessage = 'followed';
                                $scope.businessListParam.loading = true;
                                searchService.nearBusiness(function (data) {
                                    successBusiness(data);
                                });
                            });
                    });
                }
            }
            else {
                if (interestSelected != null) {
                    searchService.byInterest($scope.currentPage, interestSelected.id, function (data) {
                        success(data,
                            function () {
                                $scope.emptyMessage = 'newsFeedWithInterest';
                                $scope.businessListParam.loading = true;
                                searchService.nearBusinessByInterest(interestSelected.id, function (data) {
                                    successBusiness(data);
                                });
                            });
                    });

                }
                else {
                    searchService.default($scope.currentPage, function (data) {
                        success(data,
                            function () {
                                $scope.emptyMessage = 'newsFeed';
                                $scope.businessListParam.loading = true;
                                searchService.nearBusiness(function (data) {
                                    successBusiness(data);
                                });
                            });
                    });
                }
            }
        }
    };

    $scope.createNewAddress = function () {
        if (accountService.getMyself() != null) {
            $scope.createNewAddressLaunch();
        }
        else {
            modalService.openLoginModal($scope.createNewAddressLaunch, null, '--.loginModal.help.address');
        }
    };

    $scope.createNewAddressLaunch = function () {
        modalService.addressModal(true, null, false, function (data) {
            $timeout(function () {
                addressService.changeAddress(data.name, function (data) {
                    accountService.getMyself().selectedAddress = data;
                    $timeout(function () {
                        $rootScope.$broadcast("CHANGE_ADDRESS_SELECTED");
                    }, 1);
                });
            }, 1);
        });
    };


    //initialize
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    $scope.search();

}]);
(function() {

  myApp.controller('ProfileCtrl', ['$scope', 'modalService', 'accountService', '$rootScope', '$window', 'businessService', 'facebookService', 'translationService', '$flash', function($scope, modalService, accountService, $rootScope, $window, businessService, facebookService, translationService, $flash) {
    $scope.model = accountService.model;
    $scope.accountParam = {
      updateMode: true,
      dto: angular.copy(accountService.getMyself()),
      disabled: true
    };
    $scope.editPassword = function() {
      return modalService.openEditPasswordModal();
    };
    $scope.interestEdit = function() {
      return modalService.openEditCustomerInterest();
    };
    $scope.personalEdit = function() {
      $scope.oldLang = angular.copy($scope.accountParam.dto.lang);
      return $scope.accountParam.disabled = false;
    };
    $scope.personalSave = function() {
      $scope.accountParam.disabled = true;
      return accountService.editAccount($scope.accountParam.dto, function() {
        if ($scope.oldLang !== $scope.accountParam.dto.lang) {
          return $window.location.reload();
        }
      });
    };
    $scope.personalCancel = function() {
      $scope.accountParam.dto.firstname = accountService.getMyself().firstname;
      $scope.accountParam.dto.lastname = accountService.getMyself().lastname;
      $scope.accountParam.dto.email = accountService.getMyself().email;
      $scope.accountParam.dto.gender = accountService.getMyself().gender;
      return $scope.accountParam.disabled = true;
    };
    $scope.addAddress = function() {
      return modalService.addressModal(true, null, false);
    };
    $scope.editAddress = function(address) {
      return modalService.addressModal(true, address, false);
    };
    $scope.deleteAddress = function(address) {
      return accountService.deleteAddress(address);
    };
    $scope.createBusiness = function() {
      return businessService.createBusiness(accountService.getMyself().id, $scope.businessName, function(data) {
        return accountService.setMyself(data);
      });
    };
    $scope.facebookSuccess = function(data) {
      accountService.setMyself(data);
      return $flash.success(translationService.get('--.profile.linkFacebook.success'));
    };
    $scope.fb_login = function() {
      $scope.loading = true;
      return facebookService.login(function(data) {
        $scope.facebookSuccess(data);
        return $scope.loading = false;
      }, function(data) {
        return failed(data);
      });
    };
    $rootScope.$broadcast('PROGRESS_BAR_STOP');
    modalService.closeLoadingModal();
    $(window).scrollTop(0);
    return $rootScope.$broadcast('PROGRESS_BAR_STOP');
  }]);

}).call(this);

(function() {

  myApp.controller('BusinessCtrl', ['$rootScope', '$scope', 'modalService', 'businessService', '$routeParams', 'accountService', '$window', 'addressService', 'geolocationService', 'translationService', '$flash', '$timeout', 'contactService', '$filter', 'constantService', function($rootScope, $scope, modalService, businessService, $routeParams, accountService, $window, addressService, geolocationService, translationService, $flash, $timeout, contactService, $filter, constantService) {
    if ($routeParams.publicationId !== null) {
      $scope.publicationIdToGo = $routeParams.publicationId;
    }
    $scope.displayError = false;
    $scope.loading = true;
    $scope.business = null;
    $scope.edit = false;
    $scope.myBusiness = false;
    $scope.businessId = $routeParams.businessId;
    $scope.descriptionLimitBase = 200;
    $scope.descriptionLimit = $scope.descriptionLimitBase;
    $scope.publicationOptions = [
      {
        key: 'BASIC',
        value: '--.business.publication.basic'
      }, {
        key: 'ARCHIVE',
        value: '--.business.publication.archive'
      }
    ];
    $scope.googleMapParams = {
      staticMap: true
    };
    $scope.displayEditMode = function() {
      return $scope.myBusiness === true || accountService.getMyself() !== null && accountService.getMyself().role === 'SUPERADMIN';
    };
    $scope.publicationListParam = {
      scrollTo: $scope.publicationIdToGo,
      displayRemoveIcon: $scope.edit,
      type: 'BASIC',
      businessId: $routeParams.businessId
    };
    $scope.$watch('edit', function() {
      return $scope.publicationListParam.displayRemoveIcon = $scope.edit;
    });
    businessService.getBusiness($routeParams.businessId, (function(data) {
      $scope.loading = false;
      $scope.business = data;
      $scope.publicationListParam.business = $scope.business;
      $scope.$watch('business.businessStatus', function() {
        console.log('je suis une foutu merde');
        console.log(accountService.getMyself().businessId + '/' + $routeParams.businessId + '/' + constantService.compareNumber(accountService.getMyself().businessId, $routeParams.businessId));
        if ((accountService.getMyself() != null) && constantService.compareNumber(accountService.getMyself().businessId, $routeParams.businessId)) {
          if ($scope.business.businessStatus !== 'WAITING_CONFIRMATION') {
            $scope.edit = true;
          }
          $scope.myBusiness = true;
        }
        if ($scope.myBusiness) {
          return $scope.publicationOptions.push({
            key: 'PREVISUALIZATION',
            value: '--.business.publication.previsualization'
          });
        }
      });
      $scope.computeDistance = function() {
        if ($scope.business.address !== void 0 && $scope.business.address !== null) {
          addressService.distance($scope.business.address.id, function(data) {
            $scope.business.distance = data.distance;
          });
        }
      };
      $scope.computeDistance();
      $scope.$on('POSITION_CHANGED', function() {
        return $scope.computeDistance();
      });
      $scope.publish = function() {
        return modalService.messageModal('--.business.page.askPublication.window.title', '--.business.page.askPublication.window.message', function(close) {
          businessService.publishBusiness();
          close();
          $flash.info(translationService.get('--.business.page.askPublication.window.flash'));
          return $scope.business.businessStatus = 'WAITING_CONFIRMATION';
        });
      };
      $scope.cancelPublishRequest = function() {
        return modalService.messageModal('--.business.page.cancelPublishRequest.window.title', '--.business.page.cancelPublishRequest.window.message', function(close) {
          businessService.cancelPublishRequest();
          close();
          $flash.info(translationService.get('--.business.page.cancelPublishRequest.window.flash'));
          return $scope.business.businessStatus = 'NOT_PUBLISHED';
        });
      };
      $scope.stopPublish = function() {
        return modalService.messageModal('--.business.page.stopPublication.window.title', '--.business.page.stopPublication.window.message', function(close) {
          businessService.stopPublication();
          close();
          $flash.info(translationService.get('--.business.page.stopPublication.window.flash'));
          return $scope.business.businessStatus = 'NOT_PUBLISHED';
        });
      };
      $scope.editbusiness = function() {
        var business;
        business = angular.copy($scope.business);
        return modalService.basicModal('--.business.edit.data.modal.title', 'business-form-ctrl', {
          dto: business,
          status: business.businessStatus
        }, function(close, setLoading) {
          return businessService.edit(business, (function(data) {
            $scope.business.name = data.name;
            $scope.business.description = data.description;
            $scope.business.phone = data.phone;
            $scope.business.website = data.website;
            $scope.business.email = data.email;
            return close();
          }), function() {
            return setLoading(false);
          });
        });
      };
      $scope.editIllustration = function() {
        var business;
        business = angular.copy($scope.business);
        return modalService.basicModal('--.business.edit.illustration.modal.title', 'image-form-ctrl', {
          dto: business,
          target: 'business_illustration',
          fieldName: 'illustration',
          details: '--.business.logo.edit.modal.description'
        }, function(close, setLoading) {
          return businessService.editIllustration(business.id, business.illustration, (function() {
            $scope.business.illustration = business.illustration;
            close();
          }), function() {
            return setLoading(false);
          });
        });
      };
      $scope.editLandscape = function() {
        var business;
        business = angular.copy($scope.business);
        return modalService.basicModal('--.business.edit.landscape.modal.title', 'image-form-ctrl', {
          dto: business,
          target: 'business_landscape',
          fieldName: 'landscape',
          details: '--.business.landscape.edit.modal.description'
        }, function(close, setLoading) {
          return businessService.editLandscape(business.id, business.landscape, (function() {
            $scope.business.landscape = business.landscape;
            return close();
          }), function() {
            return setLoading(false);
          });
        });
      };
      $scope.googleMapParams.address = $scope.business.address;
      $timeout((function() {
        if ($scope.business.address !== null && $scope.business.address !== void 0) {
          return $scope.googleMapParams.refreshNow();
        }
      }), 1);
      $scope.editAddress = function() {
        var address;
        address = angular.copy($scope.business.address);
        if (!(address != null)) {
          address = {};
        }
        return modalService.basicModal('--.business.edit.address.modal.title', 'address-form-ctrl', {
          dto: address,
          addName: false
        }, function(close, setLoading) {
          console.log('je suis une craaaacasse');
          console.log(address);
          return businessService.editAddress($scope.business.id, address, function(data) {
            $scope.business.address = data;
            $scope.googleMapParams.setAddress(data);
            return close();
          }, function() {
            return setLoading(false);
          });
        });
      };
      $scope.categoryLineParams = {
        categories: $scope.business.categories
      };
      $scope.editCategory = function() {
        var catList, lev2, lev3, lev4, _i, _j, _k, _len, _len1, _len2, _ref;
        catList = [];
        _ref = $scope.business.categories;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lev2 = _ref[_i];
          for (_j = 0, _len1 = lev2.length; _j < _len1; _j++) {
            lev3 = lev2[_j];
            for (_k = 0, _len2 = lev3.length; _k < _len2; _k++) {
              lev4 = lev3[_k];
              catList.push(lev4);
            }
          }
        }
        return modalService.basicModal('--.business.edit.category.modal.title', 'business-category-form-ctrl', {
          value: catList
        }, function(close, setLoading) {
          return businessService.editBusinessCategory($scope.business.id, catList, function(data) {
            $scope.business.categories = data.categories;
            $scope.categoryLineParams.categories = $scope.business.categories;
            return close();
          }, function() {
            return setLoading(false);
          });
        });
      };
      $scope.editSchedule = function() {
        var schedules;
        schedules = angular.copy($scope.business.schedules);
        return modalService.basicModal('--.business.edit.schedule.modal.title', 'schedule-form-ctrl', {
          dto: schedules,
          disabled: false
        }, function(close, setLoading) {
          return businessService.createSchedule($scope.business.id, {
            schedules: schedules
          }, function(data) {
            $scope.business.schedules = schedules;
            return close();
          }, function() {
            return setLoading(false);
          });
        });
      };
      $scope.editGallery = function() {
        var business;
        business = angular.copy($scope.business);
        return modalService.basicModal('--.business.edit.address.modal.title', 'dir-field-image-mutiple', {
          fieldTitle: '--.business.modal.gallery.title',
          validationMessage: '--.error.validation.image',
          help: '--.business.gallery.download.help',
          details: '--gallery.maximumImage',
          field: business,
          maxImage: 10,
          multiple: true,
          target: 'galley_picture',
          fieldName: 'galleryPictures'
        }, function(close, setLoading) {
          return businessService.editGallery($scope.business.id, {
            list: business.galleryPictures
          }, function(data) {
            $scope.business.galleryPictures = data;
            return close();
          }, function() {
            return setLoading(false);
          });
        });
      };
      $scope.editSocialNetwork = function() {
        var socialNetwork;
        socialNetwork = angular.copy($scope.business.socialNetwork);
        if (socialNetwork === void 0 || socialNetwork === null) {
          socialNetwork = {};
        }
        return modalService.basicModal('--.business.edit.socialNetwork.modal.title', 'business-social-network-ctrl', {
          dto: socialNetwork
        }, function(close, setLoading) {
          return businessService.editSocialNetwork($scope.business.id, socialNetwork, function(data) {
            $scope.business.socialNetwork = socialNetwork;
            return close();
          }, function() {
            return setLoading(false);
          });
        });
      };
      $scope.createPromotion = function() {
        return modalService.openPromotionModal(null, $scope.business, function() {
          return $scope.$broadcast('RELOAD_PUBLICATION');
        });
      };
      $scope.createNotification = function() {
        return modalService.openBusinessNotificationModal(null, $scope.business, function() {
          return $scope.$broadcast('RELOAD_PUBLICATION');
        });
      };
      $scope.$on('POSITION_CHANGED', function() {
        $scope.$broadcast('RELOAD_PUBLICATION');
      });
      $scope.$watch('publicationListParam.type', function(o, n) {
        if (o !== n) {
          return $scope.$broadcast('RELOAD_PUBLICATION');
        }
      });
      $scope.refreshPublications = function() {
        return $scope.$broadcast('RELOAD_PUBLICATION');
      };
      $scope.$on('RELOAD_PUBLICATION', function() {
        return $scope.publicationListParam.refresh($scope.publicationListParam.type);
      });
      $scope.numberCategories = function() {
        return Object.keys($scope.business.categories).length;
      };
      if (geolocationService.currentPosition !== null) {
        $scope.$broadcast('RELOAD_PUBLICATION');
      }
      $scope.displaySchedule = function() {
        var schedulesPart, _i, _len, _ref;
        _ref = $scope.business.schedules;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          schedulesPart = _ref[_i];
          if (schedulesPart.length > 0) {
            return true;
          }
        }
        return false;
      };
      $scope.displaySocialNetwork = function() {
        var s;
        s = $scope.business.socialNetwork;
        if (s === null) {
          return false;
        }
        return (s.facebookLink != null) || (s.twitterLink != null) || (s.instagramLink != null) || (s.deliveryLink != null) || (s.opinionLink != null) || (s.reservationLink != null);
      };
      $scope.computeProgression = function() {
        var total;
        total = 0;
        if ($scope.business.address != null) {
          total++;
        }
        if ($scope.numberCategories() > 0) {
          total++;
        }
        if ($scope.business.description != null) {
          total++;
        }
        if ($scope.business.illustration != null) {
          total++;
        }
        if ($scope.business.landscape != null) {
          total++;
        }
        if ($scope.business.galleryPictures.length > 0) {
          total++;
        }
        if ($scope.displaySocialNetwork()) {
          total++;
        }
        if ($scope.displaySchedule()) {
          total++;
        }
        return total;
      };
      $scope.getProgressionStyle = function() {
        return 'width:' + 300 * $scope.computeProgression() / 5 + 'px';
      };
      return $scope.openContact = function() {
        var dto;
        dto = {
          target: 'HELP'
        };
        return modalService.basicModal('--.contactForm.modal.title', 'contact-form-ctrl', {
          dto: dto
        }, function(close) {
          return contactService.contact(dto, function() {
            $flash.success($filter('translateText')('--.contactForm.send.success'));
            return close();
          });
        });
      };
    }), function() {
      $scope.loading = false;
      return $scope.displayError = true;
    });
    $(window).scrollTop(0);
    return $rootScope.$broadcast('PROGRESS_BAR_STOP');
  }]);

}).call(this);

myApp.controller('SearchPageCtrl', ['$rootScope', '$scope', 'searchService', '$routeParams', 'searchBarService', 'geolocationService', function ($rootScope, $scope, searchService, $routeParams, searchBarService, geolocationService) {

    //back to the top of the page
    $(window).scrollTop(0);

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    var param = $routeParams.param;
    searchBarService.setCurrentSearch(param);

    $scope.businessTab = {currentPage: 0};
    $scope.categoryTab = {currentPage: 0};
    $scope.publicationTab = {currentPage: 0};

    $scope.results = null;

    //$scope.publicationParams = {};
    //$scope.businessParams = {};


    $scope.search = function () {
        searchService.searchByString(0, param, function (result) {

            //compute witch tab must be displayed
            $scope.businessTab.display = false;
            $scope.categoryTab.display = false;
            $scope.publicationTab.display = false;

            var selectedCounter = 0;

            for (var i in searchBarService.searchCriteria) {
                if (searchBarService.searchCriteria[i].selected) {
                    if (searchBarService.searchCriteria[i].key == 'business') {
                        $scope.businessTab.display = true;
                    }
                    else if (searchBarService.searchCriteria[i].key == 'category') {
                        $scope.categoryTab.display = true;
                    }
                    else if (searchBarService.searchCriteria[i].key == 'publication') {
                        $scope.publicationTab.display = true;
                    }
                    selectedCounter++;
                }
            }
            if (selectedCounter == 0) {
                $scope.businessTab.display = true;
                $scope.categoryTab.display = true;
                $scope.publicationTab.display = true;
            }


            $scope.results = result;

            //compute tabs
            var alreadyOneTabActive = false;
            if ($scope.businessTab.display) {
                $scope.businessTab.total = $scope.results.businesses.length;
                if (!alreadyOneTabActive && $scope.businessTab.total > 0) {
                    $scope.businessTab.active = true;
                    alreadyOneTabActive = true;
                }
                $scope.businessTab.totalToDisplay = $scope.businessTab.total;
                if ($scope.results.businesses.length == 20) {
                    $scope.businessTab.totalToDisplay += "+";
                }
            }
            if ($scope.publicationTab.display) {
                $scope.publicationTab.total = $scope.results.publications.length;

                if (!alreadyOneTabActive && $scope.publicationTab.total > 0) {
                    $scope.publicationTab.active = true;
                    alreadyOneTabActive = true;
                }
                $scope.publicationTab.totalToDisplay = $scope.publicationTab.total;
                if ($scope.results.publications.length == 20) {
                    $scope.publicationTab.totalToDisplay += "+";
                }

            }

            if ($scope.categoryTab.display) {
                $scope.categoryTab.total = 0;
                for (var cat in $scope.results.categoriesMap) {
                    for (var cat2 in $scope.results.categoriesMap[cat]) {
                        for (var cat3 in $scope.results.categoriesMap[cat][cat2]) {
                            $scope.categoryTab.total += $scope.results.categoriesMap[cat][cat2][cat3].length;
                            if ($scope.results.categoriesMap[cat][cat2][cat3].length == 20) {
                                $scope.categoryTab.loadCategory = true;
                            }
                        }
                    }
                }
                if (!alreadyOneTabActive && $scope.categoryTab.total > 0) {
                    $scope.categoryTab.active = true;
                    alreadyOneTabActive = true;
                }
                $scope.categoryTab.totalToDisplay = $scope.categoryTab.total;
                if ($scope.categoryTab.total >= 20) {
                    $scope.categoryTab.totalToDisplay += "+";
                }
            }


            //business
            $scope.businessTab.data = $scope.results.businesses;
            //$scope.businessParams.loading = false;

            //publication
            $scope.publicationTab.data = $scope.results.publications;
            //$scope.publicationParams.data = $scope.results.publications;
            //$scope.publicationParams.loading = false;

            //category
            $scope.categoryTab.data = $scope.results.categoriesMap;

            $scope.loadSemaphore = false;

            //scrolling
            $(window).on('scroll', function () {
                var scrollBottom = $(window).scrollTop() + $(window).height();
                if ($('.container-content').height() - scrollBottom < 200) {

                    $scope.search();
                }
            });

            $scope.search = function () {

                if ($scope.loadSemaphore == false) {
                    $scope.loadSemaphore = true;

                    var tabToLoad;

                    if ($scope.businessTab.active) {
                        tabToLoad = $scope.businessTab;
                        console.log('business load more...');
                    }
                    else if ($scope.publicationTab.active) {
                        tabToLoad = $scope.publicationTab;
                        console.log('business load more...');
                    }
                    else if ($scope.categoryTab.active) {
                        tabToLoad = $scope.categoryTab;
                        console.log('business load more...');
                    }


                    if (tabToLoad.total == 20 && tabToLoad.allLoaded != true) {
                        //if (tabToLoad.currentPage == 0) {
                        //    tabToLoad.data = [];
                        //}


                        var s = searchBarService.currentSearch;
                        if (s.indexOf(':') != -1) {
                            s = s.split(':')[1];
                        }
                        tabToLoad.currentPage++;

                        if ($scope.businessTab.active) {
                            s = 'business:' + s;
                            searchService.searchByString(tabToLoad.currentPage, s, function (data) {
                                $scope.loadSemaphore = false;
                                if (data.businesses.length == 0) {
                                    tabToLoad.allLoaded = true;
                                }
                                else {
                                    for (var key in data.businesses) {
                                        tabToLoad.data.push(data.businesses[key])
                                    }
                                }
                            });
                        }
                        else if ($scope.publicationTab.active) {
                            s = 'publication:' + s;
                            searchService.searchByString(tabToLoad.currentPage, s, function (data) {
                                $scope.loadSemaphore = false;
                                if (data.publications.length == 0) {
                                    tabToLoad.allLoaded = true;
                                }
                                else {
                                    for (var key in data.publications) {
                                        tabToLoad.data.push(data.publications[key])
                                    }
                                }
                            });
                        }
                        else if ($scope.categoryTab.active && $scope.categoryTab.loadCategory === true) {
                            s = 'category:' + s;
                            searchService.searchByString(tabToLoad.currentPage, s, function (data) {
                                $scope.loadSemaphore = false;
                                var total = $scope.fusionCategories(data.categoriesMap);
                                if (total == 0) {
                                    tabToLoad.allLoaded = true;
                                }
                            });
                        }

                    }
                }

            };


        });
    };

    $scope.fusionCategories = function (newMap) {

        var totalToAdd = 0;

        for (var newCat in newMap) {
            var catFounded = false;
            for (var cat in $scope.results.categoriesMap) {
                if (cat == newCat) {
                    catFounded = true;
                    break;
                }
            }

            if (!catFounded) {
                $scope.results.categoriesMap.newCat = newMap[newCat];
            }
            else {
                for (var newSCat in newMap[newCat]) {
                    var sCatFounded = false;
                    for (var sCat in $scope.results.categoriesMap[newCat]) {
                        if (sCat == newSCat) {
                            sCatFounded = true;
                            break;
                        }
                    }

                    if (!sCatFounded) {
                        $scope.results.categoriesMap[newCat].newSCat = newMap[newCat][newSCat];
                    }
                    else {
                        for (var newSSCat in newMap[newCat][newSCat]) {
                            var ssCatFounded = false;
                            for (var ssCat in $scope.results.categoriesMap[newCat][newSCat]) {
                                if (ssCat == newSSCat) {
                                    ssCatFounded = true;
                                    break;
                                }
                            }

                            if (!ssCatFounded) {
                                $scope.results.categoriesMap[newCat][newSCat].newSSCat = newMap[newCat][newSCat][newSSCat];
                            }
                            else {
                                for (var b in newMap[newCat][newSCat][newSSCat]) {
                                    $scope.results.categoriesMap[newCat][newSCat][newSSCat].push(newMap[newCat][newSCat][newSSCat][b]);
                                    totalToAdd++;
                                }
                            }
                        }
                    }
                }
            }
        }
        return totalToAdd;
    };

    //initialization
        $scope.search();

    $scope.$on('POSITION_CHANGED', function () {
        $scope.search();
    });
}]);
myApp.controller('FollowedBusinessPageCtrl', ['$rootScope', '$scope', 'businessService', 'ngTableParams', '$filter', 'followService', function ($rootScope, $scope, businessService, ngTableParams, $filter, followService) {

    //back to the top of the page
    $(window).scrollTop(0);

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.businessListParams = {
        loading: true
    };

    //loading
    businessService.getFollowedBusinesses(
        function (data) {

            $scope.businesses = data;

            $scope.$watch("filter.$", function (o, n) {
                if (n != o) {
                    $scope.tableParams.reload();
                }
            });

            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                counts: [], // hides page sizes
                total: $scope.businesses.length, // length of data
                getData: function ($defer, params) {

                    var filteredData = $filter('filter')($scope.businesses, $scope.filter);
                    var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

                    //var filteredData = $filter('filter')(data, $scope.filter);
                    //// use build-in angular filter
                    //var orderedData = params.sorting() ? $filter('orderBy')($scope.businesses, params.orderBy()) : $scope.businesses;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

            $scope.checkAll = function (check) {
                for (var key  in $scope.businesses) {
                    if ($scope.businesses[key].followingNotification != check) {
                        $scope.businesses[key].followingNotification = check;
                        $scope.setNotification($scope.businesses[key]);
                    }
                }
            };

            $scope.setNotification = function (business) {
                followService.setNotification(business.id, business.followingNotification);
            };

            $scope.stopFollow = function (business) {
                followService.addFollow(false, business.id, function () {
                    for (var key  in $scope.businesses) {
                        if ($scope.businesses[key] == business) {
                            $scope.businesses.splice(key, 1);
                        }
                    }
                    $scope.tableParams.reload();
                });
            };


        }, function () {
            $scope.loading = false;
            $scope.displayError = true;

        });

}])
;
(function() {

  myApp.directive('publicationListCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$location', 'modalService', function($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/publicationList/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            directiveService.autoScopeImpl(scope);
            scope.getInfo().loading = true;
            return scope.$watch('getInfo().data', function() {
              var publication, _results;
              scope.publications = scope.getInfo().data;
              _results = [];
              for (publication in scope.publications) {
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

  myApp.directive('publicationWidgetCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$location', 'modalService', function($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/publicationWidget/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            var isEmpty;
            directiveService.autoScopeImpl(scope);
            scope.descriptionLimit = 200;
            scope.descriptionLimitBase = scope.descriptionLimit;
            scope.navigateTo = function(target) {
              return $location.path(target);
            };
            scope.getInterestClass = function(publication) {
              if (publication.interest != null) {
                return 'gling-icon-' + publication.interest.name;
              }
              return null;
            };
            isEmpty = function(val) {
              return val === void 0 || val === null || val === '';
            };
            scope.descriptionIsEmpty = function(publication) {
              return publication.type !== 'PROMOTION' && isEmpty(publication.description);
            };
            scope.openGallery = function(image, publication) {
              return modalService.galleryModal(image, publication.pictures);
            };
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

(function() {

  myApp.directive('publicationListForBusinessCtrl', ['$rootScope', 'directiveService', 'searchService', '$timeout', 'publicationService', 'modalService', function($rootScope, directiveService, searchService, $timeout, publicationService, modalService) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/publicationListForBusiness/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            var isEmpty;
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
              if (scope.getInfo().scrollTo != null) {
                $timeout((function() {
                  var target;
                  target = '#publication' + scope.getInfo().scrollTo;
                  $(window).scrollTop($(target).offset().top - 70);
                  scope.getInfo().scrollTo = null;
                  return scope.$apply();
                }), 1);
              }
              return scope.loading = false;
            };
            $(window).on('scroll', function() {
              var scrollBottom;
              scrollBottom = $(window).scrollTop() + $(window).height();
              if ($('.container-content').height() - scrollBottom < 200) {
                if (scope.loadSemaphore === false) {
                  scope.loadSemaphore = true;
                  scope.currentPage = scope.currentPage + 1;
                  console.log('-- from scrolling');
                  return scope.search();
                }
              }
            });
            scope.getInfo().refresh = function(type) {
              scope.currentPage = 0;
              scope.publications = [];
              if (scope.type !== type) {
                return scope.type = type;
              } else {
                scope.allLoaded = false;
                console.log('-- from refresh');
                return scope.search();
              }
            };
            scope.search = function() {
              if (scope.allLoaded === true) {
                return;
              }
              scope.loading = true;
              if ((scope.type != null) && scope.type !== void 0 && scope.type === 'ARCHIVE') {
                return searchService.byBusinessArchived(scope.currentPage, scope.getInfo().businessId, scope.success);
              } else if ((scope.type != null) && scope.type !== void 0 && scope.type === 'PREVISUALIZATION') {
                return searchService.byBusinessPrevisualization(scope.currentPage, scope.getInfo().businessId, scope.success);
              } else {
                return searchService.byBusiness(scope.currentPage, scope.getInfo().businessId, scope.success);
              }
            };
            scope.$watch('type', function(n, o) {
              if (n !== o) {
                scope.allLoaded = false;
                return scope.search();
              }
            });
            console.log('-- SERACH FROM initialization');
            scope.search();
            scope.removePublication = function(publication) {
              return modalService.messageModal('--.business.publication.remove.confirmationModal.title', '--.business.publication.remove.confirmationModal.body', function(close) {
                return publicationService["delete"](publication, function() {
                  $rootScope.$broadcast('RELOAD_PUBLICATION');
                  return close();
                });
              });
            };
            scope.editPublication = function(publication) {
              if (publication.type === 'PROMOTION') {
                return modalService.openPromotionModal(publication, scope.getInfo().business, function() {
                  return $rootScope.$broadcast('RELOAD_PUBLICATION');
                });
              } else {
                return modalService.openBusinessNotificationModal(publication, scope.getInfo().business, function() {
                  return $rootScope.$broadcast('RELOAD_PUBLICATION');
                });
              }
            };
            scope.getInterestClass = function(publication) {
              if (publication.interest != null) {
                return 'gling-icon-' + publication.interest.name;
              }
              return null;
            };
            isEmpty = function(val) {
              return !(val != null) || val === '';
            };
            scope.descriptionIsEmpty = function(publication) {
              return publication.type !== 'PROMOTION' && isEmpty(publication.description);
            };
            scope.openGallery = function(image, publication) {
              return modalService.galleryModal(image, publication.pictures);
            };
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

(function() {

  myApp.directive('businessListCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$location', function($rootScope, businessService, geolocationService, directiveService, searchService, $location) {
    return {
      restrict: 'E',
      scope: directiveService.autoScope({
        ngInfo: '='
      }),
      templateUrl: '/assets/javascripts/directive/component/businessList/template.html',
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

myApp.directive("headerBarCtrl", ['addressService', '$rootScope', 'languageService', '$location', 'accountService', 'facebookService', 'modalService', '$timeout', 'geolocationService', 'addressService', function (addressService, $rootScope, languageService, $location, accountService, facebookService, modalService, $timeout, geolocationService, addressService) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/web/headerBar/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.currentLang = languageService.currentLang;


                    //use the model
                    scope.myself = accountService.getMyself();
                    scope.accountService = accountService;


                    scope.goToHome = function(){
                        $(window).scrollTop(0);
                        scope.navigateTo('/home');
                    };

                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };


                    //login open modal
                    scope.login = function () {
                        modalService.openLoginModal();
                    };

                    //registration open modal
                    scope.registration = function () {
                        modalService.openCustomerRegistrationModal();
                    };

                    //edit profile
                    scope.editProfile = function () {
                        modalService.openEditProfileModal();

                    };

                    //log out
                    scope.logout = function () {
                        $rootScope.$broadcast('LOGOUT');
                        accountService.logout(function () {
                            $location.path('/');
                        });
                    };

                    //
                    // change lang
                    //
                    scope.$watch('lang', function () {
                        if (!angular.isUndefined(scope.lang)) {
                            languageService.changeLanguage(scope.lang);
                        }
                    });

                    scope.languageService = languageService;


                    //
                    // POSITION
                    //
                    scope.currentPosition = null;
                    scope.suspendWatching=false;
                    scope.positionBasicData = [
                        {key: 'currentPosition', translation: '--.position.current'},
                        {key: 'createNewAddress', translation: '--.position.newAddress'}
                    ];

                    //the user has selected a new address
                    $rootScope.$on("CHANGE_ADDRESS_SELECTED", function () {
                        if (accountService.getMyself().selectedAddress == null) {
                            if (geolocationService.position == null) {
                                scope.currentPosition = 'default';
                            }
                            else {
                                scope.currentPosition = 'currentPosition';
                            }
                            return;
                        }
                        scope.currentPosition = accountService.getMyself().selectedAddress.name;
                    });

                    $timeout(function () {
                        completePositions();

                        scope.$watch('currentPosition', function (n, o) {
                            console.log(n+'/'+o+"=>"+scope.suspendWatching);
                            if (n != null && o != n && scope.suspendWatching!=true) {
                                scope.suspendWatching=true;
                                if (scope.currentPosition == 'createNewAddress') {
                                    scope.currentPosition = o;
                                    if (accountService.getMyself() != null) {

                                        //open modal to create new address
                                        modalService.addressModal(true, null, false, function (data) {
                                            $timeout(function () {
                                                scope.currentPosition = data.name;
                                            }, 1);
                                        });
                                    }
                                    else {
                                        modalService.openLoginModal(scope.createNewAddress, angular.copy(o), '--.loginModal.help.address');
                                    }
                                }
                                else if (scope.currentPosition == 'currentPosition' && geolocationService.position == null) {
                                    scope.currentPosition = o;
                                    modalService.messageModal('--.message.modal.notLocalised.title', '--.message.modal.notLocalised.content');
                                }
                                else if (scope.currentPosition != scope.positionCurrenltyComputed) {

                                    scope.positionCurrenltyComputed = scope.currentPosition;
                                    addressService.changeAddress(scope.currentPosition, function (result) {

                                        if (accountService.getMyself() != null) {
                                            if (result.__type.indexOf('AddressDTO') == -1) {
                                                accountService.getMyself().selectedAddress = null;
                                            }
                                            else {
                                                accountService.getMyself().selectedAddress = result;
                                            }
                                        }
                                        $timeout(function () {
                                            $rootScope.$broadcast('POSITION_CHANGED');
                                        }, 1);
                                    });
                                }
                                $timeout(function () {
                                    scope.suspendWatching = false;
                                }, 1);
                            }
                        });

                        $rootScope.$watch(function () {
                            return accountService.model.myself;
                        }, function watchCallback(newValue, oldValue) {
                            completePositions();
                        });

                    }, 1);

                    $rootScope.$on('POSITION_CHANGED',function(){
                        console.log('je suis POSITION_CHANGED : '+scope.suspendWatching);
                        completePositions();
                    });

                    var completePositions = function () {
                        scope.positions = angular.copy(scope.positionBasicData);
                        if(geolocationService.position == null){
                            scope.positions.splice(0,0,{key: 'default', translation: '--.position.brussel'});
                        }
                        else{
                            if(scope.currentPosition == 'default'){
                                scope.currentPosition ='currentPosition';
                            }
                        }
                        if (accountService.getMyself() != null) {
                            for (var key in accountService.getMyself().addresses) {
                                scope.positions.splice(scope.positions.length - 1, 0,
                                    {
                                        key: accountService.getMyself().addresses[key].name,
                                        translation: accountService.getMyself().addresses[key].name
                                    });
                            }
                        }
                        scope.currentPosition = geolocationService.getLocationText();
                    };

                    $rootScope.$watch(function () {
                        return accountService.model.myself;
                    }, function watchCallback(n, o) {
                        completePositions();
                    }, true);
                }
            }
        }
    }
}]);

myApp.directive("footerBarCtrl", ['modalService', 'contactService', '$flash', '$filter', function (modalService,contactService,$flash,$filter) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/web/footerBar/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.openContactForm = function (target) {

                        var dto = {
                            target: target
                        };

                        modalService.basicModal('--.contactForm.modal.title', 'contact-form-ctrl',
                            {dto: dto},
                            function (close) {
                                contactService.contact(dto, function () {
                                    $flash.success($filter('translateText')('--.contactForm.send.success'));
                                    close();
                                });
                            }
                        );
                    };
                }
            }
        }
    }
}]);

(function() {

  myApp.directive('toTopCtrl', ['$window', function($window) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/assets/javascripts/directive/component/toTop/template.html',
      replace: true,
      transclude: true,
      compile: function() {
        return {
          post: function(scope) {
            scope.toTop = function() {
              return $(window).scrollTop(0);
            };
            scope.displayToTopButton = $(window).scrollTop() > 100;
            return angular.element($window).bind('scroll', function() {
              scope.displayToTopButton = $(window).scrollTop() > 100;
              return scope.$apply();
            });
          }
        };
      }
    };
  }]);

}).call(this);

myApp.service("$flash", ['$filter', function($filter) {

    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right cr-messenger',
        theme: 'block'
    }

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

                Messenger().post({
                    message: message,
                    type: type,
                    showCloseButton: true
                });
            }
        };
        return;
    }
}]);
