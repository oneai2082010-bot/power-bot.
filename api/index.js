// POWER BOT V25 ULTIMATE FULL - ALL 17 FEATURES - module.exports FIXED
const BOT_TOKEN = "9047328284:AAGwbhOK_plflLsJ6_MRa_zG00I2-c4jor4";
const OWNER_ID = "7655594746";
let D = global.D || {
  users:{}, vips:{}, admins:{}, bans:{},
  products:[{name:"🔥 1000 متابع",price:50,currency:"EGP",desc:"متابعين حقيقي",code:"DEMO-123",stock:["CODE1","CODE2"],ratings:[],avg:0}], 
  groupProducts:{}, ratings:[], replies:{}, groupReplies:{},
  groups:{}, channels:{}, langs:{}, tempRate:{}, tempGroupLink:{},
  stats:{msg:0}, premiumEmojis:{}, warns:{}, groupRanks:{}, groupMutes:{}, groupBans:{}, antilink:{}, antibad:{}
};
global.D = D;
function extractPremium(msg){ if(!msg?.entities) return; for(let e of msg.entities){ if(e.type=='custom_emoji'){ D.premiumEmojis[e.custom_emoji_id]=true; } } }
function P(t){ let ids=Object.keys(D.premiumEmojis); if(ids.length<2) return t; let i=0; return t.replace(/👑|🔥|⭐|🛒|💰|💳|🎁|📻|🔗|⚙️|📢|✅|❌|👋|💬|🚫|🔨|🤖|📦|⚠️|💎|👮|🎖️|🌐|👥/g,(m)=>{ let id=ids[i++%ids.length]; return `<tg-emoji emoji-id="${id}">${m}</tg-emoji>`; }); }
const BAD_WORDS = ["كس","شرموط","عرص","متناك","لبوة","خول","زبي","نيك","قحبة","احا","كسمك","fuck","shit","bitch","porn","xxx"];
const LINK_REGEX = /(t\.me\/|telegram\.me\/|@\w+|https?:\/\/|www\.|\.com|\.net|\.org|joinchat|fragment\.com)/i;
const isBad = (t)=> t && BAD_WORDS.some(w=>t.toLowerCase().includes(w));
const isLink = (t)=> t && LINK_REGEX.test(t);
const RANKS = { owner:{name:"👑 مالك",power:100}, superadmin:{name:"💎 سوبر",power:90}, admin:{name:"⚙️ أدمن",power:80}, trader:{name:"💰 تاجر",power:70}, power:{name:"🔥 سطوة",power:60}, vip:{name:"⭐ VIP",power:50}, member:{name:"👤 عضو",power:10} };
function getRank(gid,uid){ if(String(D.groups[gid]?.owner)==String(uid)) return "owner"; if(D.groupRanks[gid]?.[uid]) return D.groupRanks[gid][uid]; if(D.admins[uid]) return "admin"; if(D.vips[uid]) return "vip"; return "member"; }
function hasPower(gid,uid,need){ return (RANKS[getRank(gid,uid)]?.power||0) >= (RANKS[need]?.power||0); }

module.exports = async (req, res) => {
  if(req.method!=='POST'){
    let gList = Object.values(D.groups).map(g=>`<tr><td>${g.title}</td><td>${g.id}</td><td>${new Date(g.expire).toLocaleDateString('ar-EG')}</td><td>${g.trial?'مجاني':'مدفوع'}</td></tr>`).join("")||"<tr><td colspan=4>مفيش</td></tr>";
    let rList = Object.entries(D.groupR
