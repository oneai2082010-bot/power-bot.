// V29 MEGA FINAL - ALL FEATURES A7B7 + repIy_ai + FragmentTooon - Premium Inline - Redis
import { Redis } from '@upstash/redis'
const BOT_TOKEN = process.env.BOT_TOKEN
const redis = Redis.fromEnv()

async function getD(){
  let d = await redis.get('POWER_DB_V29')
  return d || {
    users:{}, admins:{}, vips:{}, groups:{}, groupRanks:{}, groupCats:{}, products:[], groupProducts:{},
    replies:{}, groupReplies:{}, randomReplies:{}, mediaReplies:{},
    antilink:{}, antibad:{}, antibot:{}, antifwd:{}, antimeda:{}, antispam:{},
    welcome:{}, goodbye:{}, rules:{}, warns:{}, mutes:{}, bans:{},
    wallets:{}, balances:{}, referrals:{}, invoices:{}, purchases:{},
    trackWallets:{}, premiumEmojis:{}, temp:{}, stats:{msg:0}, langs:{}, channels:{}
  }
}
async function saveD(d){ await redis.set('POWER_DB_V29', d) }

const RANKS = {owner:{n:"👑 مالك",p:100},superadmin:{n:"💎 سوبر",p:90},admin:{n:"⚙️ أدمن",p:80},trader:{n:"💰 تاجر",p:70},vip:{n:"⭐ VIP",p:50},member:{n:"👤 عضو",p:10}}
function getRank(D,gid,uid){ if(String(D.groups[gid]?.owner)==String(uid)) return "owner"; if(D.groupRanks[gid]?.[uid]) return D.groupRanks[gid][uid]; if(D.admins[uid]) return "admin"; if(D.vips[uid]) return "vip"; return "member" }
function hasPower(D,gid,uid,need){ return (RANKS[getRank(D,gid,uid)]?.p||0) >= (RANKS[need]?.p||0) }

function savePremium(msg,D){
  let ents=[...(msg.entities||[]),...(msg.caption_entities||[])]
  let c=0
  for(let e of ents){ if(e.type=='custom_emoji'&&e.custom_emoji_id){ if(!D.premiumEmojis[e.custom_emoji_id]){ D.premiumEmojis[e.custom_emoji_id]=true; c++ } } }
  return c
}
function P(t,D){
  let ids=Object.keys(D.premiumEmojis||{})
  if(ids.length==0||!t) return t
  let i=0
  return t.replace(/👑|💎|🔥|⭐|🛒|💰|💳|🎁|📦|⚙️|📢|✅|❌|👋|💬|🚫|🔨|🤖|⚠️|👮|🎖️|📻|🔗|👛|👤|💸|⚡|📖|💵|🏦|📊|🎲|📌|🛡️|👋|📜/g,m=>{
    let id=ids[i++%ids.length]
    return `<tg-emoji emoji-id="${id}">${m}</tg-emoji>`
  })
}

export default async (req,res)=>{
  if(req.method!=='POST') return res.send(`<html dir="rtl" style="background:#0f172a;color:#fff;padding:20px"><h1>👑 V29 MEGA FINAL READY - ALL FEATURES</h1></html>`)
  const body=req.body; const m=body.message; const cq=body.callback_query
  if(!m && !cq) return res.send('ok')
  const from=m?.from||cq?.from; const chatId=m?.chat?.id||cq?.message?.chat?.id; const text=m?.text||""; const data=cq?.data||""
  const isGroup = m?.chat?.type?.includes("group") || cq?.message?.chat?.type?.includes("group")
  const groupId = isGroup ? (m?.chat?.id || cq?.message?.chat?.id) : null
  let D = await getD()
  D.users[from.id]=D.users[from.id]||{id:from.id,name:from.first_name,purchases:[],balance:0,invites:0}
  D.balances[from.id]=D.balances[from.id]||0
  D.wallets[from.id]=D.wallets[from.id]||{ton:0,stars:0}

  if(m){ let cnt=savePremium(m,D); if(cnt>0){ await saveD(D); await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:P(`✅ تم حفظ ${cnt} بريميوم 👑🔥`,D),parse_mode:'HTML'})}); return res.send('ok') } }

  const call=async(mt,pl)=>{ let r=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${mt}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(pl)}); return r.json(); }
  const send=(t,kb)=>call('sendMessage',{chat_id:chatId,text:P(t,D),parse_mode:'HTML',reply_markup:kb})
  const edit=(t,kb)=>call('editMessageText',{chat_id:chatId,message_id:cq.message.message_id,text:P(t,D),parse_mode:'HTML',reply_markup:kb})

  const startKB = { inline_keyboard:[
    [{text:P("🇪🇬 العربية 👑",D),callback_data:"lang_ar"},{text:P("🏴 English 👑",D),callback_data:"lang_en"}],
    [{text:P("👑 مالك البوت 👑",D),callback_data:"owner"}],
    [{text:P("🤔 مساعدة 👑",D),callback_data:"help"}]
  ]}
  const mainKB = { inline_keyboard:[
    [{text:P("🛒 متجر A7B7 👑",D),callback_data:"store"},{text:P("⚙️ ردود repIy_ai 👑",D),callback_data:"replies"}],
    [{text:P("🎁 Fragment 👑",D),callback_data:"fragment"},{text:P("💰 TON 👑",D),callback_data:"ton"}],
    [{text:P("👤 محفظتي 👑",D),callback_data:"wallet"},{text:P("👛 تتبع 👑",D),callback_data:"track"}],
    [{text:P("🛡️ حماية الجروب 👑",D),callback_data:"protection"},{text:P("👋 ترحيب 👑",D),callback_data:"welcome_set"}],
    [{text:P("📊 إحصائيات 👑",D),callback_data:"stats"},{text:P("📢 نشر 👑",D),callback_data:"publish"}],
    [{text:P("🔗 تفعيل 👑",D),callback_data:"activate"},{text:P("🔙 رجوع 👑",D),callback_data:"back_start"}]
  ]}

  // ===== حماية repIy_ai كاملة =====
  if(isGroup && D.groups[groupId] && m && !text.startsWith("/")){
    let isAdm=false; try{ let a=await call('getChatMember',{chat_id:groupId,user_id:from.id}); isAdm=['administrator','creator'].includes(a.result?.status) || hasPower(D,groupId,from.id,'admin') }catch(e){}
    if(!isAdm){
      let del=false
      if(D.antilink[groupId] && /(t\.me\/|telegram\.me\/|@\w+|https?:\/\/|www\.|\.com)/i.test(text)) del=true
      if(D.antibad[groupId] && ["كس","شرموط","عرص","متناك","لبوة","خول","زبي","نيك","قحبة"].some(w=>text.toLowerCase().includes(w))) del=true
      if(D.antifwd[groupId] && m.forward_from) del=true
      if(D.antibot[groupId] && from.is_bot) del=true
      if(D.antimeda[groupId] && (m.photo||m.video||m.sticker)) del=true
      if(D.antispam[groupId]){
        D.temp[groupId]=D.temp[groupId]||{}
        D.temp[groupId][from.id]=D.temp[groupId][from.id]||{c:0,t:Date.now()}
        if(Date.now()-D.temp[groupId][from.id].t<3000) D.temp[groupId][from.id].c++; else D.temp[groupId][from.id]={c:1,t:Date.now()}
        if(D.temp[groupId][from.id].c>5) del=true
      }
      if(del){ await call('deleteMessage',{chat_id:groupId,message_id:m.message_id}).catch(()=>{}); return res.send('ok') }
    }
    // ردود + عشوائي + ميديا
    let reps=D.groupReplies[groupId]||{}
    if(reps[text]){ await send(reps[text]); await saveD(D); return res.send('ok') }
    for(let k in reps){ if(text.includes(k)){ await send(reps[k]); await saveD(D); return res.send('ok') } }
    let rnd=D.randomReplies[groupId]||[]; if(rnd.length>0 && Math.random()<0.2){ await send(rnd[Math.floor(Math.random()*rnd.length)]); }
  }

  // ترحيب
  if(body.message?.new_chat_members){
    let g=groupId; if(D.welcome[g]){ await send(D.welcome[g]); }
    await saveD(D); return res.send('ok')
  }

  if(text.startsWith("/start")){
    // احالة
    let args=text.split(" ")[1]; if(args && args!=String(from.id) && D.users[args]){ D.balances[args]=(D.balances[args]||0)+5; D.referrals[args]=D.referrals[args]||[]; D.referrals[args].push(from.id); }
    await saveD(D)
    return (await send(`أهلاً، <b>${from.first_name}</b> 👑\n\n🛒 A7B7 + ⚙️ repIy_ai + 🎁 Fragment\n⭐ بريميوم: ${Object.keys(D.premiumEmojis).length}\n💰 رصيدك: ${D.balances[from.id]} 👑\n\n👑 Forward رسائل من الـ 3 بوتات هنا عشان البريميوم 👑`, startKB), res.send('ok'))
  }

  if(cq){
    if(data.startsWith("lang_")){ D.langs[from.id]=data.split("_")[1]; await saveD(D); await edit(`✅ تم
