// POWER BOT V25 ULTIMATE FIXED - ALL FEATURES FROM FIRST MSG - module.exports
const BOT_TOKEN = "9047328284:AAGwbhOK_plflLsJ6_MRa_zG00I2-c4jor4";
const OWNER_ID = "7655594746";

let D = global.D || {
  users:{}, vips:{}, admins:{}, bans:{},
  products:[], groupProducts:{},
  ratings:[], replies:{}, groupReplies:{},
  groups:{}, channels:{}, langs:{}, tempRate:{}, tempGroupLink:{},
  stats:{msg:0, groupMsg:{}},
  premiumEmojis:{}, warns:{},
  groupRanks:{}, groupMutes:{}, groupBans:{},
  antilink:{}, antibad:{}
};
global.D = D;

function extractPremium(msg){ if(!msg?.entities) return; for(let e of msg.entities){ if(e.type=='custom_emoji'){ D.premiumEmojis[e.custom_emoji_id]=true; } } }
function P(t){
  let ids=Object.keys(D.premiumEmojis);
  if(ids.length<2) return t;
  let i=0; return t.replace(/👑|🔥|⭐|🛒|💰|💳|🎁|📻|🔗|⚙️|📢|✅|❌|👋|💬|🚫|🔨|🤖|📦|⚠️|💎|👮|🎖️|🌐|👥/g,(m)=>{
    let id=ids[i++%ids.length]; return `<tg-emoji emoji-id="${id}">${m}</tg-emoji>`;
  });
}

const BAD_WORDS = ["كس","شرموط","عرص","متناك","لبوة","خول","زبي","نيك","قحبة","احا","كسمك","fuck","shit","bitch","porn","xxx","كلب","حمار"];
const LINK_REGEX = /(t\.me\/|telegram\.me\/|@\w+|https?:\/\/|www\.|\.com|\.net|\.org|joinchat|fragment\.com)/i;
const isBad = (t)=> t && BAD_WORDS.some(w=>t.toLowerCase().includes(w));
const isLink = (t)=> t && LINK_REGEX.test(t);

const RANKS = {
  owner: {name:"👑 مالك الجروب",power:100},
  superadmin: {name:"💎 سوبر أدمن",power:90},
  admin: {name:"⚙️ أدمن",power:80},
  trader: {name:"💰 تاجر",power:70},
  power: {name:"🔥 سطوة",power:60},
  vip: {name:"⭐ VIP",power:50},
  member: {name:"👤 عضو",power:10}
};
function getRank(gid,uid){
  if(String(D.groups[gid]?.owner)==String(uid)) return "owner";
  if(D.groupRanks[gid]?.[uid]) return D.groupRanks[gid][uid];
  if(D.admins[uid]) return "admin";
  if(D.vips[uid]) return "vip";
  return "member";
}
function hasPower(gid,uid,need){ return (RANKS[getRank(gid,uid)]?.power||0) >= (RANKS[need]?.power||0); }

module.exports = async (req, res) => {
  if(req.method!=='POST'){
    let gList = Object.values(D.groups).map(g=>`<tr><td>${g.title}</td><td>${g.id}</td><td>${new Date(g.expire).toLocaleDateString('ar-EG')}</td><td>${g.trial?'يوم مجاني':'مدفوع'}</td></tr>`).join("")||"<tr><td colspan=4>مفيش</td></tr>";
    let rList = Object.entries(D.groupRanks).map(([gid,users])=>Object.entries(users).map(([uid,rank])=>`<tr><td>${D.groups[gid]?.title||gid}</td><td>${uid}</td><td>${RANKS[rank]?.name||rank}</td></tr>`).join("")).join("")||"<tr><td colspan=3>مفيش رتب</td></tr>";
    return res.send(`<html dir="rtl" style="font-family:system-ui;background:#0f172a;color:#fff;padding:20px"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0} table{width:100%;border-collapse:collapse;margin:12px 0} td,th{border:1px solid #334155;padding:8px} .card{background:#1e293b;padding:16px;border-radius:16px;margin:12px 0}</style></head><body><h1>👑 POWER BOT V25 COMPLETE ✅</h1><div class="card">👥 ${Object.keys(D.users).length} | 📦 ${D.products.length} | 👥 جروبات: ${Object.keys(D.groups).length} | ⭐ بريميوم: ${Object.keys(D.premiumEmojis).length} | 💬 ${D.stats.msg}</div><div class="card"><h2>👥 الجروبات - يوم مجاني</h2><table><tr><th>الاسم</th><th>ID</th><th>ينتهي</th><th>نوع</th></tr>${gList}</table></div><div class="card"><h2>🎖️ رتب التجارة والسطوة</h2><table><tr><th>الجروب</th><th>اليوزر</th><th>الرتبة</th></tr>${rList}</table><p>مالك 100 - سوبر 90 - أدمن 80 - تاجر 70 - سطوة 60 - VIP 50</p></div><div class="card"><h2>🔨 أوامر</h2><code>/ban @يوزر سبب<br>/kick @يوزر سبب<br>/mute @يوزر 60 سبب<br>/unmute @يوزر<br>/warn @يوزر سبب<br>/rank @يوزر تاجر/سطوة/vip/admin<br>/ranks<br>/antilink on/off<br>/antibad on/off<br>/addreply كلمة | رد<br>/addproduct اسم | سعر | عملة | مدة | وصف | نوع | كود</code></div><button id="rb" style="position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:#e11d48;color:#fff;border:none;font-size:24px;z-index:999">📻</button><audio id="pl"></audio><div id="sts" style="display:none;position:fixed;bottom:90px;right:20px;background:#1e293b;padding:12px;border-radius:12px;z-index:999"><b>📻 راديو:</b><br><button onclick="play('https://n02.radiojar.com/8s5u5tpdtwzuv')">📖 قرآن</button><br><button onclick="play('https://stream.radiomix.net/radio-masr')">🇪🇬 راديو مصر</button><br><button onclick="play('https://nilefm.out.airtime.pro:8000/nilefm_a')">🎵 Nile FM</button></div><script>let b=document.getElementById('rb'),s=document.getElementById('sts'),p=document.getElementById('pl');b.onclick=()=>s.style.display=s.style.display=='none'?'block':'none';function play(u){p.src=u;p.play();b.textContent='⏸️'}p.onpause=()=>b.textContent='📻'</script></body></html>`);
  }

  const body=req.body; const m=body.message; const cq=body.callback_query;
  if(m) extractPremium(m);
  if(!m && !cq) return res.status(200).send('ok');
  const from=m?.from||cq?.from; const chatId=m?.chat?.id||cq?.message?.chat?.id; const text=m?.text||""; const data=cq?.data||"";
  const isGroup = m?.chat?.type?.includes("group") || cq?.message?.chat?.type?.includes("group");
  const groupId = isGroup ? (m?.chat?.id || cq?.message?.chat?.id) : null;
  const isOwner=String(from.id)===OWNER_ID; const isAdmin=isOwner||D.admins[from.id];
  if(D.bans[from.id]) return res.status(200).send('ok');

  const call=async(mt,pl)=>{ let r=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${mt}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(pl)}); return r.json(); };
  const send=(t,kb)=>call('sendMessage',{chat_id:chatId,text:P(t),parse_mode:'HTML',reply_markup:kb});
  const getTarget = ()=>{ let reply=m?.reply_to_message?.from; if(reply) return reply; let mention=text.match(/@(\w+)/); if(mention) return {id:null,username:mention[1],first_name:mention[1]}; let parts=text.split(" "); if(parts[1] && !isNaN(parts[1])) return {id:parts[1],first_name:parts[1]}; return null; };

  D.users[from.id]=D.users[from.id]||{id:from.id,name:from.first_name,username:from.username,joined:Date.now(),invites:D.users[from.id]?.invites||0,purchases:[]};
  D.stats.msg++; if(isGroup) D.stats.groupMsg[groupId]=(D.stats.groupMsg[groupId]||0)+1;

  // حماية
  if(isGroup && D.groups[groupId] && (D.groups[groupId].expire>Date.now()||D.groups[groupId].paid) && m && !text.startsWith("/")){
    let txt=m.text||m.caption||""; let adm=await call('getChatMember',{chat_id:groupId,user_id:from.id}).catch(()=>({result:{status:"member"}}));
    let isAdminUser=['administrator','creator'].includes(adm.result?.status) || hasPower(groupId,from.id,'admin');
    if(!isAdminUser){
      if(from.is_bot){ await call('deleteMessage',{chat_id:groupId,message_id:m.message_id}).catch(()=>{}); return res.status(200).send('ok'); }
      if((D.antibad[groupId]!==false) && isBad(txt)){ await call('deleteMessage',{chat_id:groupId,message_id:m.message_id}).catch(()=>{}); D.warns[`${groupId}_${from.id}`]=(D.warns[`${groupId}_${from.id}`]||0)+1; let w=D.warns[`${groupId}_${from.id}`]; await send(`🚫 يا ${from.first_name} ممنوع الشتايم 👑 ${w}/3`); if(w>=3){ await call('banChatMember',{chat_id:groupId,user_id:from.id}); await call('unbanChatMember',{chat_id:groupId,user_id:from.id}); delete D.warns[`${groupId}_${from.id}`]; } return res.status(200).send('ok'); }
      if((D.antilink[groupId]!==false) && isLink(txt)){ await call('deleteMessage',{chat_id:groupId,message_id:m.message_id}).catch(()=>{}); D.warns[`${groupId}_${from.id}`]=(D.warns[`${groupId}_${from.id}`]||0)+1; let w=D.warns[`${groupId}_${from.id}`]; await send(`🔗 ممنوع اللينكات 👑 ${w}/3`); if(w>=3){ await call('banChatMember',{chat_id:groupId,user_id:from.id}); await call('unbanChatMember',{chat_id:groupId,user_id:from.id}); delete D.warns[`${groupId}_${from.id}`]; } return res.status(200).send('ok'); }
    }
  }

  if(m?.new_chat_members && D.groups[m.chat.id] && (D.groups[m.chat.id].expire>Date.now()||D.groups[m.chat.id].paid)){
    for(let u of m.new_chat_members){
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:m.chat.id,text:P(`👋 مرحبا ${u.first_name} في ${D.groups[m.chat.id].title} 👑\n✅ دوس أنا لست روبوت خلال دقيقتين`),reply_markup:{inline_keyboard:[[{text:P("✅ أنا لست روبوت 👑"),callback_data:`verify_${u.id}`}]]}})});
      setTimeout(async()=>{ try{ let ch=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${m.chat.id}&user_id=${u.id}`).then(r=>r.json()); if(ch.result && !['kicked','left'].includes(ch.result.status)){ await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/banChatMember?chat_id=${m.chat.id}&user_id=${u.id}`); await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/unbanChatMember?chat_id=${m.chat.id}&user_id=${u.id}`);} }catch(e){} },120000);
    }
    return res.status(200).send('ok');
  }

  if(text.startsWith("/start")){
    let ref=text.split(" ")[1]; if(ref && ref!=String(from.id) && !D.users[from.id].ref){ D.users[from.id].ref=ref; if(D.users[ref]) D.users[ref].invites++; }
    let kb={keyboard:[[{text:"🛒 المتجر"},{text:"⭐ تقييم البوت"}],[{text:"💳 محافظ كاش"},{text:"💰 سعر TON"}],[{text:"🎁 تقييم هدية"},{text:"📻 الراديو"}],[{text:"🔗 رابط دعوتي"},{text:"⚙️ ردودي"}],[{text:"📢 نشر للقنوات"},{text:"🔗 تفعيل جروب VIP"}],[{text:"📋 قنواتي"},{text:"👑 لوحة التحكم"}],[{text:"🌐 اللغة"}]],resize_keyboard:true};
    await send(`👑 <b>POWER BOT V25 COMPLETE</b> 🔥\n🆔 <code>${from.id}</code>\n👥 دعواتك: ${D.users[from.id].invites}/20\n💬 ${D.stats.msg}\n⭐ بريميوم: ${Object.keys(D.premiumEmojis).length}\n🎖️ ${isGroup?RANKS[getRank(groupId,from.id)].name:'خاص'}\n\n<b>خاص + جروب + رتب تجارة وسطوة + حماية + متجر A7B7 + راديو + TON + كل حاجة 👑</b>`,kb); return res.status(200).send('ok');
  }

  if(data.startsWith("verify_")){ let uid=data.split("_")[1]; if(String(from.id)!==uid && !isAdmin && !hasPower(groupId,from.id,'admin')) return (await call('answerCallbackQuery',{callback_query_id:cq.id,text:P("❌ مش ليك")}),res.status(200).send('ok')); await call('answerCallbackQuery',{callback_query_id:cq.id,text:P("✅ تم التحقق 👑")}); return res.status(200).send('ok'); }
  if(text.includes("تفعيل جروب")||data.startsWith("activate")||text=="/activate"){ D.tempGroupLink[from.id]=true; await send(`🔗 <b>تفعيل جروب VIP - يوم مجاني 👑</b>\n1️⃣ ضيف @PowerPnbot مشرف\n2️⃣ انسخ لينك https://t.me/+...\n3️⃣ ابعته هنا`); return res.status(200).send('ok'); }
  if((text.includes("t.me/+")||text.includes("t.me/joinchat")) && D.tempGroupLink[from.id]){ D.groups["pending_"+from.id]={invite:text.trim(),owner:from.id,pending:true}; await send(`⏳ حفظت اللينك 👑 /setgroup جوه الجروب`); return res.status(200).send('ok'); }
  if(text=="/setgroup" && isGroup){ let bot=await call('getChatMember',{chat_id:chatId,user_id:BOT_TOKEN.split(":")[0]}); if(!['administrator','creator'].includes(bot.result?.status)) { await send(`❌ لازم مشرف 👑`); return res.status(200).send('ok'); } D.groups[chatId]={id:chatId,title:m.chat.title,owner:from.id,activated:Date.now(),trial:true,expire:Date.now()+24*60*60*1000,paid:false}; D.groupRanks[chatId]=D.groupRanks[chatId]||{}; D.antilink[chatId]=true; D.antibad[chatId]=true; await send(`✅ تفعيل ${m.chat.title} يوم مجاني 👑 ينتهي ${new Date(D.groups[chatId].expire).toLocaleString('ar-EG')}`); return res.status(200).send('ok'); }

  if(text.startsWith("/ban") && isGroup){ if(!hasPower(groupId,from.id,'admin') && !isAdmin){ await send(`❌ أدمن فقط 👑`); return res.status(200).send('ok'); } let t=getTarget(); let reason=text.split(" ").slice(2).join(" ")||"بدون سبب"; if(t?.id){ await call('banChatMember',{chat_id:groupId,user_id:t.id}); await send(`🔨 حظر ${t.first_name} 👑\n👮 ${from.first_name}\n📝 ${reason}\n🎖️ ${RANKS[getRank(groupId,from.id)].name}`); } return res.status(200).send('ok'); }
  if(text.startsWith("/kick") && isGroup){ if(!hasPower(groupId,from.id,'admin') && !isAdmin){ await send(`❌ أدمن فقط`); return res.status(200).send('ok'); } let t=getTarget(); let reason=text.split(" ").slice(2).join(" ")||"بدون سبب"; if(t?.id){ await call('banChatMember',{chat_id:groupId,user_id:t.id}); await call('unbanChatMember',{chat_id:groupId,user_id:t.id}); await send(`👢 طرد ${t.first_name} 📝 ${reason} 👑`); } return res.status(200).send('ok'); }
  if(text.startsWith("/mute") && isGroup){ if(!hasPower(groupId,from.id,'admin') && !isAdmin){ await send(`❌ أدمن فقط`); return res.status(200).send('ok'); } let t=getTarget(); let parts=text.split(" "); let mins=parseInt(parts[2])||60; let reason=parts.slice(3).join(" ")||"بدون سبب"; if(t?.id){ D.groupMutes[`${groupId}_${t.id}`]=Date.now()+mins*60*1000; await send(`🤐 كتم ${t.first_name} ${mins} دقيقة 📝 ${reason} 👑`); } return res.status(200).send('ok'); }
  if(text.startsWith("/unmute") && isGroup){ let t=getTarget(); if(t?.id){ delete D.groupMutes[`${groupId}_${t.id}`]; await send(`🔊 فك كتم ${t.first_name} 👑`); } return res.status(200).send('ok'); }
  if(text.startsWith("/warn") && isGroup){ if(!hasPower(groupId,from.id,'admin') && !isAdmin){ await send(`❌ أدمن فقط`); return res.status(200).send('ok'); } let t=getTarget(); let reason=text.split(" ").slice(2).join(" ")||"بدون سبب"; if(t?.id){ D.warns[`${groupId}_${t.id}`]=(D.warns[`${groupId}_${t.id}`]||0)+1; let w=D.warns[`${groupId}_${t.id}`]; await send(`⚠️ تحذير ${w}/3 لـ ${t.first_name} 📝 ${reason} 👑`); if(w>=3){ await call('banChatMember',{chat_id:groupId,user_id:t.id}); await call('unbanChatMember',{chat_id:groupId,user_id:t.id}); delete D.warns[`${groupId}_${t.id}`]; } } return res.status(200).send('ok'); }
  if(text.startsWith("/rank") && isGroup){ if(!hasPower(groupId,from.id,'superadmin') && !isOwner){ await send(`❌ سوبر أدمن فقط 👑`); return res.status(200).send('ok'); } let parts=text.split(" "); let rn=parts[2]?.toLowerCase(); if(!RANKS[rn]){ await send(`🎖️ الرتب: owner superadmin admin trader power vip member`); return res.status(200).send('ok'); } let t=getTarget(); if(t?.id){ D.groupRanks[groupId]=D.groupRanks[groupId]||{}; D.groupRanks[groupId][t.id]=rn; await send(`🎖️ ${RANKS[rn].name} لـ ${t.first_name} 👑`); } return res.status(200).send('ok'); }
  if(text=="/ranks" && isGroup){ let list=Object.entries(D.groupRanks[groupId]||{}).map(([uid,rank])=>`• ${uid}: ${RANKS[rank]?.name||rank}`).join("\n")||"مفيش رتب"; await send(`🎖️ رتب ${D.groups[groupId]?.title||''} 👑\n${list}`); return res.status(200).send('ok'); }
  if(text.startsWith("/antilink") && isGroup){ let v=text.split(" ")[1]; D.antilink[groupId]=v!=="off"; await send(`🔗 منع اللينكات: ${D.antilink[groupId]?"مفعل":"مقفل"} 👑`); return res.status(200).send('ok'); }
  if(text.startsWith("/antibad") && isGroup){ let v=text.split(" ")[1]; D.antibad[groupId]=v!=="off"; await send(`🚫 منع الشتايم: ${D.antibad[groupId]?"مفعل":"مقفل"} 👑`); return res.status(200).send('ok'); }

  if(text.includes("المتجر")||data.startsWith("store")){ let gid=data.split("_")[1]||groupId; let prods=gid&&D.groupProducts[gid]?D.groupProducts[gid]:D.products; let btns=prods.map((p,i)=>[{text:P(`${p.name} - ${p.price} ⭐${p.avg||0} (${p.ratings?.length||0})`),callback_data:`prod_${i}_${gid||''}`} ]); btns.push([{text:P("👨‍💼 الوسيط @NSEIF"),url:"https://t.me/NSEIF"}]); if(isAdmin||(isGroup&&hasPower(groupId,from.id,'trader'))) btns.push([{text:P("➕ إضافة منتج"),callback_data:`addproduct_${gid||''}`} ]); await send(`🛒 <b>المتجر ${isGroup?D.groups[groupId]?.title||'':''} 👑</b>\n📦 ${prods.length} منتج - تقييم A7B7`,{inline_keyboard:btns}); return res.status(200).send('ok'); }
  if(data.startsWith("prod_")){ let sp=data.split("_"); let i=parseInt(sp[1]); let gid=sp[2]; let prods=gid&&D.groupProducts[gid]?D.groupProducts[gid]:D.products; let p=prods[i]; if(!p) return res.status(200).send('ok'); let last=(p.ratings||[]).slice(-3).reverse().map(r=>`• ${r.name}: ${'⭐'.repeat(r.stars)} - ${r.comment}`).join("\n\n")||"لا يوجد"; await send(`📦 <b>${p.name}</b> 👑\n💰 ${p.price} ${p.currency||'EGP'}\n📝 ${p.desc||'-'}\n📊 مخزون ${p.stock?.length||0}\n⭐ ${p.avg||0} (${p.ratings?.length||0})\n\n<b>آخر تقييمات A7B7:</b>\n${last}\n\n🔑 <code>${p.code||'---'}</code>`,{inline_keyboard:[[{text:P("💳 شراء 👑"),callback_data:`buy_${i}_${gid||''}`}],[{text:P("⭐ 1"),callback_data:`rateprod_${i}_${gid||''}_1`},{text:P("⭐ 5"),callback_data:`rateprod_${i}_${gid||''}_5`}]]}); return res.status(200).send('ok'); }
  if(data.startsWith("buy_")){ let sp=data.split("_"); let i=parseInt(sp[1]); let gid=sp[2]; let prods=gid&&D.groupProducts[gid]?D.groupProducts[gid]:D.products; let p=prods[i]; if(!p||!p.stock||p.stock.length==0) return (await call('answerCallbackQuery',{callback_query_id:cq.id,text:P("❌ نفذ المخزون")}),res.status(200).send('ok')); let code=p.stock.shift(); D.users[from.id].purchases.push(`${gid||'main'}_${i}`); await send(`✅ شراء 👑\n📦 ${p.name}\n🔑 <code>${code}</code>\n\n⭐ قيم:`,{inline_keyboard:[[{text:P("⭐ 5 ممتاز"),callback_data:`rateprod_${i}_${gid||''}_5`}]]}); await call('sendMessage',{chat_id:OWNER_ID,text:`💰 بيع 👑\n👤 ${from.first_name} - ${from.id}\n📦 ${p.name}\n🔑 ${code}`}); return res.status(200).send('ok'); }
  if(data.startsWith("rateprod_")){ let sp=data.split("_"); let i=parseInt(sp[1]); let gid=sp[2]; let stars=parseInt(sp[3]); let key=`${gid||'main'}_${i}`; if(!D.users[from.id]?.purchases?.includes(key)&&!isOwner) return (await call('answerCallbackQuery',{callback_query_id:cq.id,text:P("❌ لازم تشتري الأول")}),res.status(200).send('ok')); D.tempRate[from.id]={prod:i,gid:gid,stars:stars}; await send(`⭐ ${stars} نجوم 👑\n✍️ ابعت تعليقك:`,{inline_keyboard:[[{text:P("⏩ تخطي"),callback_data:`skipcomment_${i}_${gid||''}`}]]}); return res.status(200).send('ok'); }
  if(data.startsWith("skipcomment_")){ let sp=data.split("_"); let i=parseInt(sp[1]); let gid=sp[2]; let tr=D.tempRate[from.id]; if(!tr) return res.status(200).send('ok'); let prods=gid&&D.groupProducts[gid]?D.groupProducts[gid]:D.products; let p=prods[i]; p.ratings=p.ratings||[]; p.ratings.push({user:from.id,name:from.first_name,stars:tr.stars,comment:"بدون تعليق",time:Date.now()}); p.avg=(p.ratings.reduce((a,b)=>a+b.stars,0)/p.ratings.length).toFixed(1); delete D.tempRate[from.id]; await send(`✅ تم التقييم A7B7 👑 ${tr.stars} ⭐ متوسط ${p.avg}`); return res.status(200).send('ok'); }
  if(D.tempRate[from.id] && text && !text.startsWith("/") && !text.includes("المتجر") && !text.includes("تقييم") && !text.includes("تفعيل") && !text.includes("t.me")){ let tr=D.tempRate[from.id]; let prods=tr.gid&&D.groupProducts[tr.gid]?D.groupProducts[tr.gid]:D.products; let p=prods[tr.prod]; if(p){ p.ratings=p.ratings||[]; p.ratings.push({user:from.id,name:from.first_name,stars:tr.stars,comment:text,time:Date.now()}); p.avg=(p.ratings.reduce((a,b)=>a+b.stars,0)/p.ratings.length).toFixed(1); delete D.tempRate[from.id]; await send(`✅ شكرا ${from.first_name} 👑 ${tr.stars} ⭐ "${text}" متوسط ${p.avg}`); return res.status(200).send('ok'); } }

  if(text.includes("تقييم البوت")||data.startsWith("botrates")){ let avg=D.ratings.length?(D.ratings.reduce((a,b)=>a+b.stars,0)/D.ratings.length).toFixed(1):0; let last=(D.ratings||[]).slice(-3).reverse().map(r=>`• ${r.name}: ${'⭐'.repeat(r.stars)}`).join("\n")||"لا يوجد"; await send(`⭐ <b>تقييم البوت A7B7 👑</b>\nمتوسط ${avg}/5 (${D.ratings.length})\n\n${last}`,{inline_keyboard:[[{text:P("⭐"),callback_data:"rate_1"},{text:P("⭐⭐"),callback_data:"rate_2"},{text:P("⭐⭐⭐"),callback_data:"rate_3"}],[{text:P("⭐⭐⭐⭐"),callback_data:"rate_4"},{text:P("⭐⭐⭐⭐⭐"),callback_data:"rate_5"}]]}); return res.status(200).send('ok'); }
  if(data.startsWith("rate_") && !data.startsWith("rateprod_")){ let s=parseInt(data.split("_")[1]); D.ratings.push({user:from.id,name:from.first_name,stars:s,time:Date.now()}); await send(`✅ شكرا ${s} ⭐ 👑`); return res.status(200).send('ok'); }
  if(text.includes("TON")||data.startsWith("ton")){ try{ let r=await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd,egp,eur'); let j=await r.json(); await send(`💰 <b>TON 👑</b>\n$${j['the-open-network'].usd} - ${j['the-open-network'].egp} EGP - €${j['the-open-network'].eur}`); }catch(e){ await send(`❌ خطأ TON`); } return res.status(200).send('ok'); }
  if(text.includes("هدية")||data.startsWith("gift")||text.includes("fragment.com")||text.startsWith("@")){ let frag=text.includes("fragment.com")?text:`https://fragment.com/${text.replace("@","").replace("تقييم هدية","").trim()}`; await send(`🎁 <b>تقييم هدية 👑</b>\n${frag}`,{inline_keyboard:[[{text:P("فتح Fragment"),url:frag}]]}); return res.status(200).send('ok'); }
  if(text.startsWith("/addreply") && (isAdmin || (isGroup && hasPower(groupId,from.id,'admin')))){ let parts=text.replace("/addreply","").split("|").map(s=>s.trim()); if(parts[0]&&parts[1]){ if(isGroup){ D.groupReplies[groupId]=D.groupReplies[groupId]||{}; D.groupReplies[groupId][parts[0]]={text:parts[1],enabled:true}; } else D.replies[parts[0]]={text:parts[1],enabled:true}; await send(`✅ حفظ رد ${isGroup?'للجروب':'عام'}: ${parts[0]} 👑 repIy_ai`); } return res.status(200).send('ok'); }
  if(text.startsWith("/delreply") && (isAdmin || (isGroup && hasPower(groupId,from.id,'admin')))){ let k=text.replace("/delreply","").trim(); if(isGroup){ delete D.groupReplies[groupId]?.[k]; } else delete D.replies[k]; await send(`✅ مسح رد ${k} 👑`); return res.status(200).send('ok'); }
  if(text.includes("ردودي")||data.startsWith("replies")){ let gid=data.split("_")[1]||groupId; let reps=gid&&D.groupReplies[gid]?D.groupReplies[gid]:D.replies; let list=Object.keys(reps).map(k=>`• ${k} = ${reps[k].text}`).join("\n")||"مفيش ردود"; await send(`⚙️ <b>الردود ${gid?'للجروب':''} 👑</b>\n${list}\n/addreply كلمة | رد`); return res.status(200).send('ok'); }
  if(text.includes("محافظ")||data.startsWith("wallets")){ await send(`💳 <b>محافظ كاش 👑</b>\n📱 فودافون: *9*7#\n📱 أورنج: #115#\n📱 اتصالات: *777#`); return res.status(200).send('ok'); }
  if(text=="/setchannel" && isGroup){ D.channels[chatId]={owner:from.id,title:m.chat.title}; await send(`✅ ربط ${m.chat.title} 👑`); return res.status(200).send('ok'); }
  if(text.startsWith("/post")||data.startsWith("publish")){ if(!isAdmin && (!isGroup || !hasPower(groupId,from.id,'admin'))) { await send(`❌ للأدمن فقط`); return res.status(200).send('ok'); } let raw=text.replace("/post","").trim(); if(!raw){ await send(`📢 /post عرض اليوم | اطلب الآن | https://t.me/NSEIF`); return res.status(200).send('ok'); } let parts=raw.split("|").map(s=>s.trim()); let msg=parts[0]; let rows=[]; for(let i=1;i<parts.length;i+=2) if(parts[i]&&parts[i+1]) rows.push([{text:P(parts[i]),url:parts[i+1]}]); rows.push([{text:P("👨‍💼 الوسيط @NSEIF"),url:"https://t.me/NSEIF"}]); let c=0; for(let id in D.channels){ try{ await call('sendMessage',{chat_id:id,text:P(`📢 ${msg} 👑`),parse_mode:'HTML',reply_markup:{inline_keyboard:rows}}); c++; }catch(e){} } for(let gid in D.groups){ if(D.groups[gid].expire>Date.now()||D.groups[gid].paid){ try{ await call('sendMessage',{chat_id:gid,text:P(`📢 ${msg} 👑`),parse_mode:'HTML',reply_markup:{inline_keyboard:rows}}); c++; }catch(e){} } } await send(`✅ نشر في ${c} قناة/جروب 👑`); return res.status(200).send('ok'); }
  if(text.startsWith("/addproduct") && (isAdmin || (isGroup && hasPower(groupId,from.id,'trader')))){ let p=text.replace("/addproduct","").split("|").map(s=>s.trim()); if(p.length>=2){ let obj={name:p[0],price:p[1],currency:p[2]||'EGP',duration:p[3]||'دائم',desc:p[4]||'',type:p[5]||'',code:p[6]||'CODE-'+Date.now(),stock:p[6]?[p[6]]:[],ratings:[],avg:0}; if(isGroup){ D.groupProducts[groupId]=D.groupProducts[groupId]||[]; D.groupProducts[groupId].push(obj); } else D.products.push(obj); await send(`✅ إضافة ${p[0]} 👑 ${isGroup?'للجروب':''}`); } else { await send(`📦 /addproduct اسم | سعر | عملة | مدة | وصف | نوع | كود`); } return res.status(200).send('ok'); }
  if(text.includes("قنواتي")||data=="mygroups"){ let x=P("📋 قنواتك/جروباتك 👑:\n"); for(let id in D.groups){ if(String(D.groups[id].owner)==String(from.id)||isOwner) x+=`📌 ${D.groups[id].title} - ${new Date(D.groups[id].expire).toLocaleDateString()}\n`; } for(let id in D.channels){ if(String(D.channels[id].owner)==String(from.id)||isOwner) x+=`📢 ${D.channels[id].title}\n`; } await send(x||P("مفيش 👑")); return res.status(200).send('ok'); }
  if(text.includes("دعوتي")||data.startsWith("invite")){ await send(`🔗 رابطك:\nhttps://t.me/PowerPnbot?start=${from.id}\nدعواتك: ${D.users[from.id].invites}/20 👑`); return res.status(200).send('ok'); }
  if(text.includes("لوحة التحكم")){ if(!isOwner){ await send(`❌ للمالك فقط`); return res.status(200).send('ok'); } await send(`👑 <b>لوحة V25 COMPLETE</b>\n👥 ${Object.keys(D.users).length}\n📦 ${D.products.length}\n👥 جروبات: ${Object.keys(D.groups).length}\n💬 ${D.stats.msg}\n⭐ بريميوم: ${Object.keys(D.premiumEmojis).length}\n🚫 ${Object.keys(D.warns).length}\n🎖️ رتب: ${Object.keys(D.groupRanks).length}`); return res.status(200).send('ok'); }
  if(text.includes("الراديو")||data.startsWith("radio")){ await send(`📻 <b>راديو POWER BOT 👑</b>\nافتح موقع Vercel هتلاقي زر الراديو العائم`); return res.status(200).send('ok'); }
  if(text.includes("اللغة")||text=="/lang"){ await send(`🌐 اختر لغتك:`,{inline_keyboard:[[{text:"🇪🇬 عربي",callback_data:"lang_ar"},{text:"🇺🇸 English",callback_data:"lang_en"}]]}); return res.status(200).send('ok'); }
  if(data.startsWith("lang_")){ D.langs[from.id]=data.split("_")[1]; await call('answerCallbackQuery',{callback_query_id:cq.id,text:P("✅ تم 👑")}); return res.status(200).send('ok'); }

  return res.status(200).send('ok');
};
