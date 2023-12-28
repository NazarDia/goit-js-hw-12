import{S as f,i as m}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function h(){m.show({close:!1,closeOnClick:!0,message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",timeout:3e3,transitionIn:"flipInX",transitionOut:"flipOutX",position:"topRight",backgroundColor:"red",progressBar:!1})}let p=new f("#gallery a",{overlayOpacity:.5,showCounter:!1});const c=document.querySelector(".search-form"),g=document.querySelector(".search-input"),l=document.querySelector(".gallery"),a=document.querySelector(".loader");c.addEventListener("submit",y);function y(n){a.classList.remove("hide"),l.innerHTML="",n.preventDefault();const o=new URLSearchParams({key:"41488002-513c6a9a4c115eae6a99045d3",q:g.value,image_type:"photo",orientation:"horizontal",safesearch:!0});fetch(`https://pixabay.com/api/?${o}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{setTimeout(()=>{if(a.classList.add("hide"),r.hits.length===0)return h();v(r.hits)},2e3)}).catch(r=>console.log(r)),c.reset()}function v(n){l.innerHTML=n.reduce((o,{webformatURL:r,largeImageURL:i,tags:e,likes:t,views:s,comments:u,downloads:d})=>o+`
      <li class="gallery-item">
        <a href="${i}">
          <img src="${r}" alt="${e}" />
        </a>
        <div class="image-desc">
          <div class="container-link">Likes <span class="container-item">${t}</span></div>
          <div class="container-link">Views <span class="container-item">${s}</span></div>
          <div class="container-link">Comments <span class="container-item">${u}</span></div>
          <div class="container-link">Downloads <span class="container-item">${d}</span></div>
        </div>
      </li>
      `,""),p.refresh()}
//# sourceMappingURL=commonHelpers.js.map
