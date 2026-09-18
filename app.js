const DATA=[
{id:"hospital",type:"salud",name:"Hospital Dra. Alicia Cruz",address:"San Patricio del Chañar",phone:"0299 485-5084",source:"Ministerio de Salud del Neuquén",url:"https://salud.neuquen.gob.ar/hospitales-y-centros/",tags:"hospital salud emergencia"},
{id:"hosteria",type:"dormir",name:"El Chañar · Hostería o Posada",address:"Araucaria 565, Barrio Jardín",phone:"299-5286731",source:"Turismo Neuquén",url:"https://turismo.neuquen.gob.ar/alojamientos/el-chanar-cuit-n-27-24388984-2/",tags:"dormir alojamiento hosteria"},
{id:"balneario",type:"visitar",name:"Balneario Municipal · Camping",address:"Sector del Balneario Municipal, San Patricio del Chañar",phone:"",source:"Gobierno de Neuquén",url:"https://www.neuqueninforma.gob.ar/amp/noticias/2025/01/13/247652-habilitaron-camping-en-san-patricio-del-chanar",tags:"visitar camping río familia verano"},
{id:"bodega-schroeder",type:"visitar",name:"Bodega Familia Schroeder",address:"Calle 7 Norte",phone:"+54 299 454-8920",source:"Familia Schroeder / Turismo Neuquén",url:"https://familiaschroeder.com/arg/turismo/",tags:"visitar bodega vino turismo"},
{id:"emergencias",type:"salud",name:"Emergencias médicas · SIEN",address:"",phone:"107",source:"Gobierno de Neuquén",url:"https://seguridad.neuquen.gob.ar/",tags:"urgente emergencia ambulancia"},
{id:"bomberos",type:"emergencia",name:"Bomberos",address:"",phone:"100",source:"Gobierno de Neuquén",url:"https://copronaf.neuquen.gob.ar/contacto/",tags:"urgente incendio fuego"},
{id:"policia",type:"emergencia",name:"Policía",address:"",phone:"101",source:"Gobierno de Neuquén",url:"https://copronaf.neuquen.gob.ar/contacto/",tags:"urgente seguridad"},
{id:"defensa",type:"emergencia",name:"Defensa Civil",address:"",phone:"103",source:"Gobierno de Neuquén",url:"https://seguridad.neuquen.gob.ar/",tags:"urgente defensa"},
{id:"vial",type:"emergencia",name:"Siniestros viales",address:"",phone:"149",source:"Ministerio de Seguridad del Neuquén",url:"https://seguridad.neuquen.gob.ar/",tags:"urgente ruta accidente tránsito"},
{id:"violencia",type:"emergencia",name:"Asistencia en violencia",address:"",phone:"148",source:"Ministerio de Seguridad del Neuquén",url:"https://seguridad.neuquen.gob.ar/",tags:"urgente violencia"}
];

const norm=s=>String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function card(x){
 const phone=x.phone?'<a href="tel:'+x.phone.replace(/\D/g,"")+'">☎️ Llamar</a>':"";
 const map=x.address?'<a class="secondary" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(x.name+" "+x.address+" San Patricio del Chañar")+'">📍 Cómo llegar</a>':"";
 return '<article class="card"><h3>'+esc(x.name)+'</h3>'+(x.address?'<p>📍 '+esc(x.address)+'</p>':"")+(x.phone?'<p>☎️ '+esc(x.phone)+'</p>':"")+'<p>Fuente: '+esc(x.source)+'</p><div class="buttons">'+phone+map+'<a class="secondary" target="_blank" rel="noopener" href="'+x.url+'">↗ Fuente</a></div></article>';
}
function render(items){document.getElementById("results").innerHTML=items.length?items.map(card).join(""):'<div class="empty">No encontré un dato confiable para eso todavía. Probá otra palabra.</div>'}
function search(q){q=norm(q);if(!q)return render([]);const words=q.split(/\s+/).filter(x=>x.length>2);const items=DATA.map(x=>{let s=0;const hay=norm(x.name+" "+x.address+" "+x.type+" "+x.tags);words.forEach(w=>{if(hay.includes(w))s+=w===norm(x.name)?10:2});return [s,x]}).filter(x=>x[0]).sort((a,b)=>b[0]-a[0]).map(x=>x[1]);render(items)}
document.getElementById("go").onclick=()=>search(document.getElementById("q").value);
document.getElementById("q").addEventListener("keydown",e=>{if(e.key==="Enter")search(e.target.value)});
document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{const t=b.dataset.filter;search(t)});
const quick=["hospital","balneario","bodega-schroeder","hosteria"].map(id=>DATA.find(x=>x.id===id)).filter(Boolean);
document.getElementById("quick").innerHTML=quick.map(card).join("");
