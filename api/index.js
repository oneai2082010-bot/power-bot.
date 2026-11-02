module.exports = async (req, res) => {
  try {
    const BOT_TOKEN = "9047328284:AAGwbhOK_plflLsJ6_MRa_zG00I2-c4jor4";
    
    // لو حد فتح من المتصفح
    if (req.method === 'GET' || !req.body) {
      return res.status(200).send('<h1>👑 POWER BOT V25 ALIVE ✅</h1><p>Bot is running - go to /api</p>');
    }

    const body = req.body || {};
    const m = body.message;
    const cq = body.callback_query;
    if (!m && !cq) return res.status(200).send('ok');

    const from = m?.from || cq?.from;
    const chatId = m?.chat?.id || cq?.message?.chat?.id;
    const text = m?.text || "";
    const data = cq?.data || "";

    const call = async (mt, pl) => {
      try {
        let r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${mt}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pl)
        });
        return await r.json();
      } catch(e){ return {}; }
    };
    
    const send = (t, kb) => call('sendMessage', { chat_id: chatId, text: t, parse_mode: 'HTML', reply_markup: kb });

    global.D = global.D || { users: {}, products: [{name:"1000 متابع 🔥",price:50,stock:["CODE123"],ratings:[],avg:0},{name:"5000 مشاهدة 👀",price:30,stock:["VIEW1"],ratings:[],avg:0}], tempRate: {} };
    let D = global.D;
    D.users[from.id] = D.users[from.id] || { id: from.id, name: from.first_name, invites: 0, purchases: [] };

    if (text.startsWith("/start")) {
      let kb = { keyboard: [[{text:"🛒 المتجر"},{text:"⭐ تقييم البوت"}],[{text:"🔗 رابط دعوتي"},{text:"💰 سعر TON"}]], resize_keyboard: true };
      await send(`👑 <b>POWER BOT V25 شغال 👑</b>\n🆔 ${from.id}\nدوس 🛒 المتجر هيدخلك علطول`, kb);
      return res.status(200).send('ok');
    }

    if (text.includes("المتجر") || text == "/store" || data === "store") {
      let btns = D.products.map((p,i) => [{ text: `${p.name} - ${p.price} EGP ⭐${p.avg||0}`, callback_data: `prod_${i}` }]);
      btns.push([{text:"👨‍💼 الوسيط @NSEIF", url:"https://t.me/NSEIF"}]);
      await send(`🛒 <b>المتجر - كل الخدمات 👑</b>\n📦 ${D.products.length} خدمة\nدوس على أي خدمة:`, { inline_keyboard: btns });
      return res.status(200).send('ok');
    }

    if (data.startsWith("prod_")) {
      let i = parseInt(data.split("_")[1]); let p = D.products[i]; if(!p) return res.status(200).send('ok');
      let last = (p.ratings||[]).slice(-3).reverse().map(r=>`• ${r.name}: ${r.stars}⭐ - ${r.comment}`).join("\n")||"لا يوجد";
      await send(`📦 <b>${p.name}</b>\n💰 ${p.price}\nمخزون: ${p.stock?.length||0}\n⭐ ${p.avg||0}\n\n<b>تقييمات:</b>\n${last}\n\n🔑 <code>${p.stock[0]||'---'}</code>`, { inline_keyboard: [[{text:"💳 شراء 👑",callback_data:`buy_${i}`}],[{text:"⭐ 5",callback_data:`rate_${i}_5`}]] });
      return res.status(200).send('ok');
    }

    if (data.startsWith("buy_")) {
      let i = parseInt(data.split("_")[1]); let p = D.products[i];
      if (!p || !p.stock.length) { await call('answerCallbackQuery',{callback_query_id:cq.id,text:"❌ نفذ المخزون"}); return res.status(200).send('ok'); }
      let code = p.stock.shift(); D.users[from.id].purchases.push(`main_${i}`);
      await send(`✅ تم الشراء 👑\n📦 ${p.name}\n🔑 <code>${code}</code>\n\n⭐ قيم:`, { inline_keyboard: [[{text:"⭐ 5 ممتاز",callback_data:`rate_${i}_5`}]] });
      return res.status(200).send('ok');
    }

    if (data.startsWith("rate_")) {
      let sp = data.split("_"); let i = sp[1], stars = sp[2];
      D.tempRate[from.id] = { prod: i, stars: stars };
      await send(`⭐ اخترت ${stars} نجوم\n✍️ ابعت تعليقك:`, { inline_keyboard: [[{text:"⏩ تخطي",callback_data:`skip_${i}`}]] });
      return res.status(200).send('ok');
    }

    if (data.startsWith("skip_")) {
      let i = data.split("_")[1]; let tr = D.tempRate[from.id]; if(!tr) return res.status(200).send('ok');
      let p = D.products[i]; p.ratings = p.ratings||[]; p.ratings.push({name:from.first_name,stars:parseInt(tr.stars),comment:"بدون تعليق"});
      p.avg = (p.ratings.reduce((a,b)=>a+b.stars,0)/p.ratings.length).toFixed(1); delete D.tempRate[from.id];
      await send(`✅ تم التقييم ${tr.stars}⭐ متوسط ${p.avg}`); return res.status(200).send('ok');
    }

    if (D.tempRate[from.id] && text && !text.startsWith("/")) {
      let tr = D.tempRate[from.id]; let p = D.products[tr.prod];
      p.ratings = p.ratings||[]; p.ratings.push({name:from.first_name,stars:parseInt(tr.stars),comment:text});
      p.avg = (p.ratings.reduce((a,b)=>a+b.stars,0)/p.ratings.length).toFixed(1); delete D.tempRate[from.id];
      await send(`✅ شكرا ${from.first_name} ${tr.stars}⭐ "${text}" متوسط ${p.avg}`); return res.status(200).send('ok');
    }

    return res.status(200).send('ok');
  } catch (e) {
    console.log("ERROR:", e.message);
    return res.status(200).send('ok');
  }
};
