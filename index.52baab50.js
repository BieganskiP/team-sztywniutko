function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},c=t.parcelRequired7c6;null==c&&((c=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var c={id:e,exports:{}};return r[e]=c,t.call(c.exports,c,c.exports),c.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequired7c6=c),c.register("bTcpz",(function(t,r){function n(){document.querySelector(".movie-set").addEventListener("click",o)}e(t.exports,"attachModal",(function(){return n})),e(t.exports,"closeModalWithEscapeKey",(function(){return l}));const c=document.querySelector(".backdrop");function o(e){let t=e.target.parentNode;"DIV"==t.nodeName&&(t=t.parentNode),console.log(t.dataset.movieId),c.classList.remove("is-hidden"),document.querySelector(".movie-modal__button--close").addEventListener("click",a)}function a(){c.classList.add("is-hidden"),document.querySelector(".movie-modal__button--close").removeEventListener("click",a)}function l(e){"Escape"===e.key&&(a(),document.removeEventListener("keydown",e))}}));const o=document.querySelector("[data-homepage]"),a=document.querySelector("[data-library]"),l=document.querySelector("header"),i=document.querySelector(".header__library-container"),d=document.querySelector(".header__homepage-container"),s=document.querySelector("[data-watched]"),u=document.querySelector("[data-queue]"),y=document.querySelectorAll(".library-container__btn"),m=document.querySelector(".movie-container"),v=document.querySelector(".watched"),b=document.querySelector(".queued"),p=document.querySelector(".library-container"),_=e=>{e.currentTarget.removeEventListener("click",_),i.style.display="none",d.style.display="block",l.classList.remove("library"),e.currentTarget.classList.add("nav__btn--active"),a.classList.remove("nav__btn--active"),a.addEventListener("click",q),m.style.display="flex",p.style.display="none"},q=e=>{e.currentTarget.removeEventListener("click",_),l.classList.add("library"),d.style.display="none",i.style.display="flex",e.currentTarget.classList.add("nav__btn--active"),o.classList.remove("nav__btn--active"),o.addEventListener("click",_),u.classList.contains("library-container__btn--active")&&(u.classList.remove("library-container__btn--active"),y[1].addEventListener("click",L),s.classList.add("library-container__btn--active")),m.style.display="none",p.style.display="block",v.style.display="flex",b.style.display="none"},L=e=>{e.currentTarget.removeEventListener("click",L),e.currentTarget.classList.contains("library-container__btn--active")||(e.currentTarget===y[0]?(y[0].classList.add("library-container__btn--active"),y[1].classList.remove("library-container__btn--active"),y[1].addEventListener("click",L),v.style.display="flex",b.style.display="none"):(y[1].classList.add("library-container__btn--active"),y[0].classList.remove("library-container__btn--active"),y[0].addEventListener("click",L),v.style.display="none",b.style.display="flex"))};var f=c("bTcpz");c("bTcpz"),f=c("bTcpz");document.querySelector("[data-homepage]");const S=document.querySelector("[data-library]"),h=(document.querySelector("header"),document.querySelector(".header__library-container"),document.querySelector(".header__homepage-container"),document.querySelector("[data-watched]"),document.querySelector("[data-queue]"));document.querySelectorAll(".library-container__btn"),document.querySelector(".movie-container"),document.querySelector(".watched"),document.querySelector(".queued"),document.querySelector(".library-container");S.addEventListener("click",q),h.addEventListener("click",L);document.querySelector(".modal-open"),document.querySelector(".modal-close");document.addEventListener("keydown",f.closeModalWithEscapeKey);
//# sourceMappingURL=index.52baab50.js.map