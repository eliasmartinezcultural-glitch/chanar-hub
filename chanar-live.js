(function(){
  'use strict';
  const root=document.getElementById('liveNews');
  if(!root)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const age=iso=>{const d=new Date(iso);if(!Number.isFinite(d.getTime()))return '';const h=Math.max(0,Math.round((Date.now()-d.getTime())/3600000));if(h<1)return 'hace instantes';if(h<24)return 'hace '+h+' h';const days=Math.floor(h/24);return 'hace '+days+' d';};
  const render=data=>{
    const items=(data.items||[]).slice(0,6);
    const stamp=data.generatedAt?new Date(data.generatedAt):null;
    const valid=stamp&&Number.isFinite(stamp.getTime());
    root.innerHTML='<div class="live-head"><div><b>Información que se mueve</b><small>Noticias y avisos publicados por fuentes externas. Chañar HUB no los presenta como datos propios.</small></div><span class="live-sync">'+(valid?'Actualizado '+age(data.generatedAt):'Sin fecha')+'</span></div>'+
      (items.length?'<div class="live-list">'+items.map(x=>'<a class="live-item" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer"><span class="live-source">'+esc(x.source||'Fuente externa')+' · '+esc(x.date?new Date(x.date).toLocaleDateString('es-AR'): '')+'</span><b>'+esc(x.title)+'</b><span>Leer fuente ↗</span></a>').join('')+'</div>':'<div class="empty"><b>No hay novedades locales disponibles ahora.</b><p>Las fuentes siguen accesibles abajo.</p></div>');
  };
  const load=async()=>{
    const key='chanar-hub-live-news-v1',cached=localStorage.getItem(key);
    if(cached){try{const x=JSON.parse(cached);if(Date.now()-x.saved<1800000)render(x.data)}catch{}}
    try{
      const res=await fetch('data/live-news.json?'+Date.now(),{cache:'no-store'});
      if(!res.ok)throw new Error('live');
      const data=await res.json();
      localStorage.setItem(key,JSON.stringify({saved:Date.now(),data}));
      render(data);
    }catch{
      if(!cached)root.innerHTML='<div class="empty"><b>Actualidad temporalmente no disponible.</b><p>Las fuentes oficiales y locales siguen disponibles en esta página.</p></div>';
    }
  };
  load();
})();