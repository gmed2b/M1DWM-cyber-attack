import 'kleur/colors';
import { d as decodeKey } from './chunks/astro/server_PrRcvnhX.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DUDTsKv5.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/","cacheDir":"file:///Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/node_modules/.astro/","outDir":"file:///Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/dist/","srcDir":"file:///Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/src/","publicDir":"file:///Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/public/","buildClientDir":"file:///Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/dist/client/","buildServerDir":"file:///Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"cours/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cours","isIndex":false,"type":"page","pattern":"^\\/cours\\/?$","segments":[[{"content":"cours","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cours.astro","pathname":"/cours","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.html","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/tracking","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/tracking\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"tracking","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/tracking.ts","pathname":"/api/tracking","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/src/pages/cours.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/index@_@html":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/api/tracking@_@ts":"pages/api/tracking.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/cours@_@astro":"pages/cours.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DtRRudAG.mjs","\u0000@astrojs-manifest":"manifest_CGsXNdz2.mjs","@astrojs/react/client.js":"_astro/client.CeYSYu5a.js","/Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/src/pages/cours.astro?astro&type=script&index=0&lang.ts":"_astro/cours.astro_astro_type_script_index_0_lang.dZ1CyYNF.js","/Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/src/components/BottomHeader.astro?astro&type=script&index=0&lang.ts":"_astro/BottomHeader.astro_astro_type_script_index_0_lang.BNGUAoQs.js","/Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/src/components/ChatBot.astro?astro&type=script&index=0&lang.ts":"_astro/ChatBot.astro_astro_type_script_index_0_lang.a0s_iCi2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/src/pages/cours.astro?astro&type=script&index=0&lang.ts","function c(){var e=document.location.href.split(\"?\");if(e.length>1){var n=new Object,t=e[1].split(\"&\");for(var l in t){var r=t[l].split(\"=\");n[r[0]]=unescape(r[1].replace(\"+\",\" \"))}return n}return!1}const o=c(),a=document.getElementById(\"name_placeholder\");a&&(a.textContent=o.name);"],["/Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/src/components/BottomHeader.astro?astro&type=script&index=0&lang.ts","function n(){const t=new Date,e=String(t.getHours()).padStart(2,\"0\"),o=String(t.getMinutes()).padStart(2,\"0\"),s=String(t.getSeconds()).padStart(2,\"0\"),r=`${e}:${o}:${s}`;document.getElementById(\"horloge\").textContent=r}setInterval(n,1e3);n();"],["/Users/med/M1DWM/M1DISC1-Projet-Cybersecurite/fake-cours/src/components/ChatBot.astro?astro&type=script&index=0&lang.ts","const u=document.getElementById(\"user-input\"),m=document.getElementById(\"send-button\"),g=document.getElementById(\"user-input-form\");document.addEventListener(\"DOMContentLoaded\",()=>{function c(){const e=document.getElementById(\"user-input\"),t=document.getElementById(\"messages-container\"),o=e?.value.trim();if(o===\"\")return;const r=document.createElement(\"div\");r.style.marginBottom=\"12px\",r.style.textAlign=\"right\";const n=document.createElement(\"div\");n.style.backgroundColor=\"#0084ff\",n.style.color=\"white\",n.style.padding=\"8px 12px\",n.style.borderRadius=\"8px\",n.style.display=\"inline-block\",n.style.maxWidth=\"80%\",n.textContent=o,r.appendChild(n),t.appendChild(r),e.value=\"\",e.disabled=!0,document.getElementById(\"send-button\").disabled=!0;const l=document.createElement(\"div\");l.id=\"loadingWrapper\",l.innerHTML=`\n        <span></span>\n        <span></span>\n        <span></span>\n      `,t.appendChild(l);const p=`<div>\n        <h3>⚠️ ATTENTION : Ceci était une simulation de phishing !</h3><br />\n\nDans un vrai contexte, vous auriez pu être victime d'une tentative d'hameçonnage (phishing).<br />\n\nPoints à retenir :<br />\n<ol style='list-style: decimal !important;'>\n<li>Ne communiquez <b>jamais</b> vos informations personnelles ou mots de passe via des messages non sollicités</li>\n<li>Vérifiez <b>toujours</b> les adresses d'expéditeur et les URL suspectes</li>\n<li>Ne cliquez pas sur des liens <b>douteux</b>, même s'ils semblent provenir d'une source fiable</li>\n<li>En cas de doute, contactez directement l'organisation concernée par des <b>canaux officiels</b></li>\n</ol><br />\nLa cybersécurité est l'affaire de tous. <b>Restez vigilant !</b>\n</div>`;setTimeout(()=>{const a=document.createElement(\"div\");a.style.marginBottom=\"12px\";const s=document.createElement(\"div\");s.style.backgroundColor=\"#ff5522\",s.style.color=\"white\",s.style.padding=\"8px 12px\",s.style.borderRadius=\"8px\",s.style.display=\"inline-block\",s.style.maxWidth=\"80%\";const d=document.createElement(\"div\");d.className=\"typing-response\",d.innerHTML=p,s.appendChild(d),a.appendChild(s),t.appendChild(a),l.style.display=\"none\",t.scrollTop=t.scrollHeight},1500),t.scrollTop=t.scrollHeight}async function i(e){const t=await fetch(\"/api/tracking\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(e)}),o=await t.json();if(!t.ok)throw new Error(o.error||\"Une erreur s'est produite lors du tracking\")}u?.addEventListener(\"click\",()=>{i({click_chat_input:!0}),console.log({click_chat_input:!0})}),m?.addEventListener(\"click\",()=>{i({click_send_chat_btn:!0}),console.log({click_send_chat_btn:!0})}),g?.addEventListener(\"submit\",e=>{e.preventDefault(),c(),i({form_submit:!0}),console.log({form_submit:!0})}),u?.addEventListener(\"keypress\",e=>{e.key===\"Enter\"&&(e.preventDefault(),c(),i({form_submit:!0}),console.log({form_submit:!0}))})});"]],"assets":["/_astro/merlo_round_regular-webfont.D_BqAcZ7.woff2","/_astro/merlo_round_bold-webfont.CVSJmiEl.woff2","/_astro/merlo_round_medium-webfont.DXvBMZzM.woff2","/_astro/fa-brands-400.DHHVYjmR.woff2","/_astro/fa-thin-100.BSLTqyxF.woff2","/_astro/fa-duotone-900.Za4pdzNw.woff2","/_astro/fa-regular-400.DN2EwoO7.woff2","/_astro/fa-light-300.u7oF8oXe.woff2","/_astro/fa-solid-900.BNxclFD5.woff2","/_astro/fa-v4compatibility.XLCgpzyK.woff2","/_astro/merlo_round_regular-webfont.BON6hK_g.woff","/_astro/merlo_round_bold-webfont.C4EUgG-Z.woff","/_astro/merlo_round_medium-webfont.Mxcz7sxR.woff","/_astro/fa-brands-400.Cu4Td5Qf.ttf","/_astro/fa-regular-400.DrcCCWJC.ttf","/_astro/fa-v4compatibility.Cp52AQLE.ttf","/_astro/fa-thin-100.Cbx7koR_.ttf","/_astro/fa-duotone-900.CcRRqcBA.ttf","/_astro/fa-solid-900.eAlbkVlI.ttf","/_astro/fa-light-300.BoStmiAB.ttf","/_astro/cours.DjPDs2e4.css","/favicon.ico","/_astro/client.CeYSYu5a.js","/css/cas.css","/js/cas.js","/js/material.js","/images/imghomecoursenligne.png","/webjars/es5-shim/4.5.9/es5-shim.min.js","/webjars/jquery/3.7.1/jquery.min.js","/webjars/normalize.css/8.0.1/normalize.css","/webjars/datatables/1.13.5/css/jquery.dataTables.min.css","/webjars/datatables/1.13.5/js/jquery.dataTables.min.js","/webjars/bootstrap/5.3.3/css/bootstrap-grid.min.css","/webjars/material-components-web/14.0.0/dist/material-components-web.min.css","/webjars/material-components-web/14.0.0/dist/material-components-web.min.js","/webjars/mdi__font/7.3.67/css/materialdesignicons.min.css","/webjars/mdi__font/7.3.67/fonts/materialdesignicons-webfont.eot","/webjars/mdi__font/7.3.67/fonts/materialdesignicons-webfont.ttf","/webjars/mdi__font/7.3.67/fonts/materialdesignicons-webfont.woff","/webjars/mdi__font/7.3.67/fonts/materialdesignicons-webfont.woff2","/webjars/css-vars-ponyfill/2.4.7/dist/css-vars-ponyfill.min.js","/cours/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"ijoSA3Um6EiJ/GQXXebUkjZNwcdOEF/lBAWe5sGdTf0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
