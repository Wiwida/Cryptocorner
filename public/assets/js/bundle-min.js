!function(){const e={base_URL:"https://api.coingecko.com/api/v3",modal_URL:"http://localhost:4700",init:async()=>{cardModule.setBaseUrl(e.base_URL),modalsHome.setBaseUrl(e.modal_URL),navbarChange.setBaseUrl(e.modal_URL),e.showTemplateHome(),await e.getCryptoFromAPI(),e.addListenerToActions()},addListenerToActions:()=>{const e=document.querySelectorAll(".container_card"),o=document.querySelector(".navbar_connexion"),t=document.querySelector(".navbar_enregistrement"),n=document.querySelector(".formRegistration"),r=document.querySelector(".formLogin"),a=document.querySelectorAll(".close"),d=document.querySelectorAll(".btn_cancel"),c=document.querySelector(".navbar_logout");for(const s of e)s.addEventListener("click",cardModule.showChartAfterClick);for(const s of a)s.addEventListener("click",modalsHome.hideModal);for(const s of d)s.addEventListener("click",modalsHome.hideModal);o.addEventListener("click",modalsHome.showModal),t.addEventListener("click",modalsHome.showModal),n.addEventListener("submit",modalsHome.checkRegister),r.addEventListener("submit",modalsHome.checkLogin),c.addEventListener("click",navbarChange.changeNavbar),document.querySelector(".overlayFormNotValid").addEventListener("mouseenter",modalsHome.overlayErrorHidden),document.querySelector(".overlayAuthNotValid").addEventListener("mouseenter",modalsHome.overlayErrorHidden),document.querySelector(".navbar_dashboard").addEventListener("click",navbarChange.pageDashboardBuild)},getCryptoFromAPI:async()=>{try{const o=await fetch(e.base_URL+"/coins/markets?vs_currency=usd&sparkline=true",{method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded"}});if(o.ok){const e=await o.json();for(const o of e)cardModule.makeCardFromApiInDOM(o)}}catch(o){console.error("Impossible de charger les listes depuis l'API",o)}},showTemplateHome:()=>{const e=document.getElementById("container_crypto"),o=document.getElementById("home"),t=document.importNode(o.content,!0);void 0===e.before()?e.before(t):console.log("Le contenu est d\xe9j\xe0 l\xe0 !")}};document.addEventListener("DOMContentLoaded",e.init)}();