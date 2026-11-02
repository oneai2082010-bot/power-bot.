// V29 MEGA FINAL - FIXED + TOKEN
import { Redis } from '@upstash/redis'

const BOT_TOKEN = "9047328284:AAGwbhOK_plflLsJ6_MRa_zG00I2-c4jor4"
let redis;
try { redis = Redis.fromEnv() } catch(e) {}

async function getD(){
  try {
    if(!redis) throw "no redis"
    let d = await redis.get('POWER_DB_V29')
    if(d) return d
  } catch(e){}
  return {
    users:{}, admins:{}, vips:{}, groups:{}, groupRanks:{}, groupCats:{}, products:[], groupProducts:{},
    replies:{}, groupReplies:{}, randomReplies:{}, mediaReplies:{},
    antilink:{}, antibad:{}, antibot:{}, antifwd:{}, antimeda:{}, antispam:{},
    welcome:{}, goodbye:{}, rules:{}, warns:{}, mutes:{}, bans:{},
    wallets:{}, balances:{}, referrals:{}, invoices:{}, purchases:{},
    trackWallets:{}, premiumEmojis:{}, temp:{}, stats:{msg:0}, langs:{}, channels:{}
  }
}
async function saveD(d){ try{ if(redis) await redis.set('POWER_DB_V29', d) }catch(e){} }

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
  return t.replace(/👑|💎|🔥|⭐|🛒|💰|💳|🎁|📦|⚙️|📢|✅|❌|👋|💬|🚫|🔨|🤖|⚠️|👮|🎖️|📻|🔗|👛|👤|💸|⚡|📖|💵|🏦|📊|🎲|📌|🛡️/g,m=>{
    let id=ids[i++%ids.length]
    return `<tg-emoji emoji-id="${id}">${m}</tg-emoji>`
  })
}

export default async (req,res)=>{
  try{
    if(req.method!=='POST') return res.status(200).send(`<html dir="rtl" style="background:#0f172a;color:#fff;padding:20px"><h1>👑 V29 READY - TOKEN OK</h1></html>`)
    const body=req.body||{}
