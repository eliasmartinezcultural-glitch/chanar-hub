const AUDIT={"hospital":{"name":"VERIFICADO","address":"VERIFICADO","phone":"PARCIAL","source":"PARCIAL","url":"VERIFICADO"},"global":{"name":"VERIFICADO","address":"VERIFICADO","phone":"PENDIENTE","source":"VERIFICADO","url":"VERIFICADO"},"farmacia-san-patricio":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"VERIFICADO"},"hosteria":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"balneario":{"name":"VERIFICADO","address":"VERIFICADO","phone":"PENDIENTE","source":"VERIFICADO","url":"VERIFICADO"},"bodega-schroeder":{"name":"VERIFICADO","address":"VERIFICADO","phone":"PENDIENTE","source":"VERIFICADO","url":"VERIFICADO"},"municipalidad":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"correo":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"},"juzgado-paz":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"},"comisaria":{"name":"VERIFICADO","address":"VERIFICADO","phone":"PARCIAL","source":"VERIFICADO","url":"VERIFICADO"},"puma":{"name":"VERIFICADO","address":"VERIFICADO","phone":"PARCIAL","source":"PARCIAL","url":"VERIFICADO"},"supermercado":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"},"corralon":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"},"delorean":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"augusta":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"picada11":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"heidi":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"haw":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"hotel-don-pedro":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"complejo-uno":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"VERIFICADO"},"emergencias":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"VERIFICADO","url":"PARCIAL"},"bomberos":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"},"policia":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"},"defensa":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"},"vial":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"},"violencia":{"name":"VERIFICADO","address":"VERIFICADO","phone":"VERIFICADO","source":"PARCIAL","url":"PARCIAL"}};
const DATA=[
{id:"hospital",type:"salud",name:"Hospital Dra. Alicia Cruz",address:"San Patricio del Chañar",phone:"0299 485-5084",source:"Ministerio de Salud del Neuquén · ficha local corroborada",url:"https://salud.neuquen.gob.ar/hospitales-y-centros/",tags:"hospital salud emergencia guardia médico",level:"oficial"},
{id:"global",type:"salud",name:"Farmacias y Perfumerías Global",address:"Villa Pehuenia s/n esq. Calquín Oeste",phone:"",source:"Farmacias de turno · referencia 2026",url:"https://www.buscandofarmacias.com.ar/farmacias-de-turno/san-patricio-del-chanar/",tags:"farmacia farmacias medicamentos remedios salud global perfumeria turno guardia",level:"local"},
{id:"farmacia-san-patricio",type:"salud",name:"Farmacia San Patricio",address:"Río Limay s/n",phone:"0299 485-5138",source:"Cartilla de prestadores + referencia de turnos 2026",url:"https://www.osde.com.ar/documents/cartillas/Cartilla13_62.pdf",tags:"farmacia medicamentos remedios salud san patricio turno guardia",level:"institucional"},
{id:"hosteria",type:"dormir",name:"El Chañar · Hostería o Posada",address:"Araucaria 565, Barrio Jardín",phone:"299-5286731",source:"Turismo Neuquén",url:"https://turismo.neuquen.gob.ar/alojamientos/el-chanar-cuit-n-27-24388984-2/",tags:"dormir alojamiento hosteria hospedaje",level:"oficial"},
{id:"balneario",type:"visitar",name:"Balneario Municipal · Camping",address:"Sector del Balneario Municipal, San Patricio del Chañar",phone:"",source:"Gobierno de Neuquén",url:"https://www.neuqueninforma.gob.ar/amp/noticias/2025/01/13/247652-habilitaron-camping-en-san-patricio-del-chanar",tags:"visitar camping río playa pileta picnic parrilla turismo",level:"oficial"},
{id:"bodega-schroeder",type:"visitar",name:"Bodega Familia Schroeder",address:"Lote 109 Parte Chacra B7, San Patricio del Chañar",phone:"",source:"Municipalidad de San Patricio del Chañar",url:"https://sanpatricio.gob.ar/quehacer",tags:"visitar bodega vino turismo saurus restaurante",level:"oficial"},
{id:"municipalidad",type:"tramites",name:"Municipalidad de San Patricio del Chañar",address:"Quili Malal 314",phone:"+54 299 408-4225",source:"Municipalidad de San Patricio del Chañar",url:"https://www.sanpatricio.gob.ar/tramites",tags:"tramites municipio municipalidad gobierno consultas carnet licencia libre deuda",level:"oficial"},
{id:"correo",type:"tramites",name:"Correo Argentino · Sucursal San Patricio del Chañar",address:"Villa Pehuenia s/n",phone:"+54 299 485-5273",source:"Ficha local contrastada",url:"https://www.google.com/maps/search/?api=1&query=Correo+Argentino+San+Patricio+del+Chañar",tags:"correo encomienda paquete carta postal envío trámites",level:"local"},
{id:"juzgado-paz",type:"tramites",name:"Juzgado de Paz",address:"Pje. El Arco 435 / B° Obrero casa 97",phone:"+54 299 485-5029",source:"Poder Judicial de Neuquén",url:"https://www.jusneuquen.gov.ar/justicia-de-paz-nueva/",tags:"juzgado paz trámites justicia legal",level:"local"},
{id:"comisaria",type:"tramites",name:"Comisaría 13",address:"Pilmaiquén s/n",phone:"0299 485-5236",source:"Policía del Neuquén + Guía Vaca Muerta 2026",url:"https://www.policiadelneuquen.gob.ar/",tags:"policia comisaria seguridad denuncia",level:"local"},
{id:"puma",type:"moverme",name:"Estación de Servicio Puma",address:"Chos Malal y Acceso Principal",phone:"0299 498-4345",source:"Global Oil · estación PUMA El Chañar",url:"https://globaloilsrl.com.ar/estacion.html",tags:"nafta combustible diesel gasoil estación servicio cargar combustible",level:"local"},
{id:"supermercado",type:"comprar",name:"La Anónima",address:"Chos Malal 266",phone:"0299 485-5002 / 0299 485-5004",source:"La Anónima · sucursales",url:"https://mobilenikappviews.laanonimaws.com/empresa/sucursales/listado-de-sucursales",tags:"comprar supermercado alimentos comida compras",level:"local"},
{id:"corralon",type:"comprar",name:"Corralón Pitty",address:"Río Neuquén Mza G2 Lote 11 y 12",phone:"+54 299 485-5419",source:"Ficha local contrastada",url:"https://www.google.com/maps/search/?api=1&query=Corralón+Pitty+San+Patricio+del+Chañar",tags:"comprar materiales ferreteria corralon construcción reparación",level:"local"},
{id:"delorean",type:"comer",name:"Deloreán Resto y Café",address:"Complejo Chocón 690",phone:"0299 327-6297",source:"Municipalidad de San Patricio del Chañar",url:"https://sanpatricio.gob.ar/gastronomicos",tags:"comer restaurante café almuerzo cena comida",level:"institucional"},
{id:"augusta",type:"comer",name:"Augusta Restaurante - Bistró",address:"Villa La Angostura y Pehuén",phone:"0299 572-5836",source:"Municipalidad de San Patricio del Chañar",url:"https://sanpatricio.gob.ar/gastronomicos",tags:"comer restaurante bistro almuerzo comida",level:"institucional"},
{id:"picada11",type:"comer",name:"Picada 11 · Restaurant Café",address:"Rutas 7 y 8 · El Cruce · Picada 11 Sur",phone:"0299 412-7928",source:"Municipalidad de San Patricio del Chañar",url:"https://sanpatricio.gob.ar/gastronomicos",tags:"comer restaurante café ruta cruce comida",level:"institucional"},
{id:"heidi",type:"comer",name:"Bar de helados HEIDI",address:"Complejo Chocón 690",phone:"0299 586-2350",source:"Municipalidad de San Patricio del Chañar",url:"https://sanpatricio.gob.ar/gastronomicos",tags:"comer helado café merienda",level:"institucional"},
{id:"haw",type:"comer",name:"Cervecería Artesanal Haw",address:"Manzana F4 · calle Moquehue",phone:"0299 633-4628",source:"Municipalidad de San Patricio del Chañar",url:"https://sanpatricio.gob.ar/quehacer",tags:"comer cerveceria bebidas gastronomia",level:"institucional"},
{id:"hotel-don-pedro",type:"dormir",name:"Hotel Don Pedro",address:"Complejo Chocón 690",phone:"0299 574-6863",source:"Municipalidad de San Patricio del Chañar",url:"https://sanpatricio.gob.ar/dormir",tags:"dormir hotel alojamiento hospedaje",level:"institucional"},
{id:"complejo-uno",type:"dormir",name:"Complejo Uno Chañar",address:"Chos Malal y Av. Malvinas Argentinas",phone:"011 6593-2796",source:"Municipalidad de San Patricio del Chañar",url:"https://sanpatricio.gob.ar/dormir",tags:"dormir alojamiento hospedaje complejo",level:"institucional"},
{id:"emergencias",type:"salud",name:"Emergencias médicas · SIEN",address:"",phone:"107",source:"Gobierno de Neuquén",url:"https://seguridad.neuquen.gob.ar/",tags:"urgente emergencia ambulancia salud",level:"oficial"},
{id:"bomberos",type:"emergencia",name:"Bomberos",address:"",phone:"100",source:"Gobierno de Neuquén",url:"https://copronaf.neuquen.gob.ar/contacto/",tags:"urgente incendio fuego rescate",level:"oficial"},
{id:"policia",type:"emergencia",name:"Policía",address:"",phone:"101",source:"Gobierno de Neuquén",url:"https://copronaf.neuquen.gob.ar/contacto/",tags:"urgente seguridad policía",level:"oficial"},
{id:"defensa",type:"emergencia",name:"Defensa Civil",address:"",phone:"103",source:"Gobierno de Neuquén",url:"https://seguridad.neuquen.gob.ar/",tags:"urgente defensa inundacion incendio",level:"oficial"},
{id:"vial",type:"emergencia",name:"Siniestros viales",address:"",phone:"149",source:"Ministerio de Seguridad del Neuquén",url:"https://seguridad.neuquen.gob.ar/",tags:"urgente ruta accidente tránsito vial",level:"oficial"},
{id:"violencia",type:"emergencia",name:"Asistencia en violencia",address:"",phone:"148",source:"Ministerio de Seguridad del Neuquén",url:"https://seguridad.neuquen.gob.ar/",tags:"urgente violencia asistencia",level:"oficial"}
];

const norm=s=>String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const phones=x=>String(x.phone||"").split(/\s*\/\s*/).map(s=>s.trim()).filter(Boolean);
const maps=x=>x.address?'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(x.name+" "+x.address+" San Patricio del Chañar"):"";

function card(x){
 const phone=phones(x).map((p,i)=>'<a href="tel:'+p.replace(/\D/g,"")+'">☎️ '+(phones(x).length>1?("Llamar "+(i+1)):"Llamar")+'</a>').join("");
 const map=x.address?'<a class="secondary" target="_blank" rel="noopener" href="'+maps(x)+'">📍 Cómo llegar</a>':"";
 const share='<button class="share" type="button" data-share="'+esc(x.id)+'">↗ Compartir</button>';
 const level=x.level==="oficial"?"Fuente oficial":x.level==="institucional"?"Fuente institucional":"Ficha local consultada"; const sourceLabel=x.level==="local"?"↗ Ver ficha":"↗ Fuente";
 return '<article class="card"><h3>'+esc(x.name)+'</h3><span class="badge">'+level+'</span>'+(x.address?'<p>📍 '+esc(x.address)+'</p>':"")+(x.phone?'<p>☎️ '+esc(x.phone)+'</p>':"")+'<p>Fuente: '+esc(x.source)+'</p><div class="buttons">'+phone+map+'<a class="secondary" target="_blank" rel="noopener" href="'+esc(x.url)+'">' + sourceLabel + '</a>'+share+'</div></article>';
}

function render(items){
 document.getElementById("results").innerHTML=items.length?items.map(card).join(""):'<div class="empty">No encontré un dato confiable para eso todavía. Probá otra palabra.</div>';
}

function search(q){
 q=norm(q).trim();
 if(!q){document.getElementById("results").innerHTML="";return}
 const words=q.split(/\s+/).filter(x=>x.length>1);
 const items=DATA.map(x=>{
   let score=0;
   words.forEach(w=>{
     if(norm(x.name).includes(w))score+=7;
     if(norm(x.type).includes(w))score+=5;
     if(norm(x.address).includes(w))score+=3;
     if(norm(x.tags).includes(w))score+=2;
   });
   return [score,x];
 }).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]).map(x=>x[1]);
 render(items);
}

async function shareItem(id){
 const x=DATA.find(i=>i.id===id);
 if(!x)return;
 const link=new URL(location.href); link.hash=x.id;
 const text=[x.name,"Chañar HUB · San Patricio del Chañar",x.address&&"📍 "+x.address,x.phone&&"☎️ "+x.phone,"Fuente: "+x.source,"🔗 "+link.toString()].filter(Boolean).join("\n");
 if(navigator.share){
   try{await navigator.share({title:x.name,text,url:location.href+"#"+x.id});return}catch(e){}
 }
 try{await navigator.clipboard.writeText(text);alert("Ficha copiada. Podés pegarla en WhatsApp.");}
 catch(e){alert(text);}
}

document.getElementById("searchForm").addEventListener("submit",e=>{
 e.preventDefault();
 search(document.getElementById("q").value);
 document.getElementById("results").scrollIntoView({behavior:"smooth",block:"start"});
});

document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{
 const t=b.dataset.filter;
 search(t);
 document.getElementById("results").scrollIntoView({behavior:"smooth",block:"start"});
}));

document.addEventListener("click",e=>{
 const b=e.target.closest("[data-share]");
 if(b)shareItem(b.dataset.share);
});

const quick=["hospital","global","farmacia-san-patricio","puma","delorean","hosteria","supermercado","municipalidad"].map(id=>DATA.find(x=>x.id===id)).filter(Boolean);
document.getElementById("quick").innerHTML=quick.map(card).join("");


// Chañar HUB · comportamiento multiplataforma
const offlineBar=document.getElementById("offlineBar");
function setConnection(){document.body.classList.toggle("is-offline",!navigator.onLine)}
window.addEventListener("online",setConnection);window.addEventListener("offline",setConnection);setConnection();
document.getElementById("shareHub")?.addEventListener("click",async()=>{
 const data={title:"Chañar HUB",text:"Chañar HUB · guía útil de San Patricio del Chañar",url:location.href};
 if(navigator.share){try{await navigator.share(data)}catch(e){}}
 else{try{await navigator.clipboard.writeText(location.href);alert("Enlace de Chañar HUB copiado.")}catch(e){prompt("Copiá este enlace:",location.href)}}
});
const topButton=document.getElementById("topButton");
window.addEventListener("scroll",()=>topButton?.classList.toggle("show",scrollY>420),{passive:true});
topButton?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

function openSharedItem(){
 const id=decodeURIComponent(location.hash.replace(/^#/,""));
 if(!id)return;
 const x=DATA.find(i=>i.id===id);
 if(!x)return;
 render([x]);
 setTimeout(()=>document.getElementById("results")?.scrollIntoView({behavior:"smooth",block:"start"}),80);
}
window.addEventListener("hashchange",openSharedItem);
openSharedItem();
