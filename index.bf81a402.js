const e=document.querySelector(".movie-set");(async function(){const[e,r,o]=await Promise.all([fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=bfe21f4061b2869ccff2b4c323a3a257"),fetch("https://api.themoviedb.org/3/configuration?api_key=bfe21f4061b2869ccff2b4c323a3a257"),fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=bfe21f4061b2869ccff2b4c323a3a257")]);if(!e.ok){const r=`An error has occured: ${e.status}`;throw new Error(r)}if(!r.ok){const e=`An error has occured: ${r.status}`;throw new Error(e)}if(!o.ok){const e=`An error has occured: ${o.status}`;throw new Error(e)}const t=await e.json(),i=await r.json(),s=await o.json();return[t,i.images,s.genres]})().then((([r,o,t])=>{r.results.forEach((r=>{let i=r.title,s=function(e,r){let o=[];return e.forEach((e=>{let t=r.find((r=>r.id===e)).name;void 0!==t&&o.push(t)})),o.join(", ")}(r.genre_ids,t),a=r.release_date.slice(0,4),c=o.base_url+"w500"+r.poster_path;e.insertAdjacentHTML("beforeend",`\n  <li class="movie-card modal-open">\n    <img class="movie-card__img" src="${c}" />\n    <div class="movie-card__description">\n      <h2 class="movie-card__description--title">${i}</h2>\n      <p class="movie-card__description--category">${s} | ${a}</p>\n    </div>\n  </li>`)}))})).catch((e=>{console.error("movies or categories request failed. Error: "+e.message)}));
//# sourceMappingURL=index.bf81a402.js.map