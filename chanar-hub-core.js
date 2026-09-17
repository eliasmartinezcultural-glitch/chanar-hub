/* CHANAR HUB · capa común de experiencia
 * No contiene datos. Solo unifica navegación y acciones entre las vistas.
 */
(function(){
  'use strict';
  const path=location.pathname.split('/').pop()||'index.html';
  const links=[
    ['index.html','🏠','Inicio'],
    ['vecinos.html','👥','Vecinos'],
    ['viajero.html','🧭','Viajero'],
    ['mapa.html','🗺️','Mapa']
  ];
  const css=`
    .hub-core-nav{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
    .hub-core-nav a{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:42px;padding:8px 12px;border:2px solid currentColor;border-radius:999px;text-decoration:none;font-weight:850;font-size:14px;line-height:1}
    .hub-core-nav a[aria-current="page"]{background:#355b3d;color:#fff;border-color:#355b3d}
    .hub-core-quick{position:fixed;right:16px;bottom:16px;z-index:1200;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:10px 15px;border-radius:999px;background:#355b3d;color:#fff;border:2px solid #fff;text-decoration:none;font-weight:900;box-shadow:0 7px 24px #0003}
    .hub-core-bottom{display:none}
    @media(max-width:700px){
      .hub-core-bottom{position:fixed;left:8px;right:8px;bottom:8px;z-index:1190;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:5px;border:1px solid #d6c6a7;border-radius:18px;background:#fffaf0ee;backdrop-filter:blur(10px);box-shadow:0 10px 30px #0003}
      .hub-core-bottom a{min-height:46px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border-radius:13px;text-decoration:none;font-size:11px;font-weight:850;color:#355b3d}
      .hub-core-bottom a[aria-current="page"]{background:#355b3d;color:#fff}
      .hub-core-quick{right:14px;bottom:78px;font-size:13px;min-height:42px;padding:8px 12px}
      body{padding-bottom:70px!important}
    }
  `;
  function inject(){
    if(document.getElementById('chanar-hub-core-style'))return;
    const style=document.createElement('style');style.id='chanar-hub-core-style';style.textContent=css;document.head.appendChild(style);
    const nav=document.createElement('nav');nav.className='hub-core-nav';nav.setAttribute('aria-label','Chañar HUB');
    nav.innerHTML=links.map(([href,icon,label])=>`<a href="${href}" ${path===href?'aria-current="page"':''}><span>${icon}</span><span>${label}</span></a>`).join('');
    const old=document.querySelector('header.top nav');
    if(old){old.replaceWith(nav)}else{
      const head=document.querySelector('.map-head');
      if(head){const actions=head.querySelector('.head-actions');if(actions)actions.replaceWith(nav);else head.appendChild(nav)}
    }
    const bottom=document.createElement('nav');bottom.className='hub-core-bottom';bottom.setAttribute('aria-label','Navegación rápida');
    bottom.innerHTML=links.map(([href,icon,label])=>`<a href="${href}" ${path===href?'aria-current="page"':''}><span>${icon}</span><span>${label}</span></a>`).join('');
    document.body.appendChild(bottom);
    if(path!=='index.html'&&path!=='compartir.html'){
      const quick=document.createElement('a');quick.className='hub-core-quick';quick.href='index.html#buscar';quick.textContent='🔎 Buscar';quick.setAttribute('aria-label','Volver al buscador de Chañar HUB');document.body.appendChild(quick);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject,{once:true});else inject();
})();
