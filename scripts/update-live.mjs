import { readFileSync, writeFileSync } from 'node:fs';

const cfg=JSON.parse(readFileSync('data/live-sources.json','utf8'));
const localWords=[...new Set(cfg.sources.flatMap(s=>s.keywords||[]).map(x=>x.toLowerCase()))];
const strip=x=>String(x??'').replace(/<[^>]*>/g,' ').replace(/<!\[CDATA\[|\]\]>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
const tag=(xml,name)=>{const m=xml.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)</'+name+'>','i'));return m?strip(m[1]):''};
const all=[];
for(const source of cfg.sources){
  for(const url of source.rss||[]){
    try{
      const res=await fetch(url,{headers:{'user-agent':'Chañar-HUB-live/1.0'},signal:AbortSignal.timeout(12000)});
      if(!res.ok) continue;
      const xml=await res.text();
      const blocks=[...xml.matchAll(/<item(?:\\s[^>]*)?>([\\s\\S]*?)<\\/item>/gi)].map(m=>m[1]);
      for(const b of blocks){
        const title=tag(b,'title'),link=tag(b,'link'),date=tag(b,'pubDate')||tag(b,'dc:date'),description=tag(b,'description');
        const hay=(title+' '+description).toLowerCase();
        if(!localWords.some(k=>hay.includes(k))) continue;
        all.push({title,url:link,date:date?new Date(date).toISOString():null,source:source.name,type:source.type});
      }
    }catch{}
  }
}
const dedup=[...new Map(all.filter(x=>x.title&&x.url).map(x=>[x.url,x])).values()]
  .sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,30);
writeFileSync('data/live-news.json',JSON.stringify({schemaVersion:'1.0',generatedAt:new Date().toISOString(),generatedBy:'github-actions',items:dedup},null,2)+'\\n');
console.log('LIVE SOURCES:',dedup.length,'items');
