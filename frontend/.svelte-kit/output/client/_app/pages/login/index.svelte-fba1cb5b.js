import{S as t,i as n,s,P as o,z as e}from"../../chunks/vendor-adcc401c.js";import{p as r}from"../../chunks/stores-e9c66975.js";import{g as i}from"../../chunks/navigation-20968cc5.js";import"../../chunks/AvailablePages.store-4be7f7f6.js";import{C as a}from"../../chunks/CurrentProfile.store-6e386cb1.js";import"../../chunks/singletons-bb9012b7.js";function c(t,n,s){let c;o(t,r,(t=>s(0,c=t)));var u=this&&this.__awaiter||function(t,n,s,o){return new(s||(s=Promise))((function(e,r){function i(t){try{c(o.next(t))}catch(n){r(n)}}function a(t){try{c(o.throw(t))}catch(n){r(n)}}function c(t){var n;t.done?e(t.value):(n=t.value,n instanceof s?n:new s((function(t){t(n)}))).then(i,a)}c((o=o.apply(t,n||[])).next())}))};return e((()=>u(void 0,void 0,void 0,(function*(){const t=c.query.get("token");if(t)a.authorize(t),a.subscribe((t=>{t.loggedIn&&i("/app")}));else{i(`https://cloud.odzi.dog/auth/v1/${"617a54db957b58a8819eafe9"}`)}})))),[]}export default class extends t{constructor(t){super(),n(this,t,c,null,s,{})}}