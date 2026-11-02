module.exports = async (req, res) => {
  try {
    if (req.method === 'GET' || !req.body) {
      return res.status(200).send('<h1>👑 RADAR VIP ALIVE ✅</h1>');
    }
    const BOT_TOKEN = "9047328284:AAGwbhOK_plflLsJ6_MRa_zG00I2-c4jor4";
    const body = req.body;
    const m = body.message;
    const cq = body.callback_query;
    if (!m && !cq) return res.status(200).send('ok');

    const from = m?.from || cq?.from;
    const chatId = m?.chat?.id || cq?.message?.chat?.id;
    const text = m?.text || "";
    const data = cq?.data || "";

    const call = async (mt, pl) => {
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${mt}`, {
          method: 'POST', headers: {'Content-Type':'application/json'},
          body: JSON.stringify(pl)
        });
      } catch(e){}
    };

    const mainMenu = async () => {
      await call('sendMessage', {
        chat_id: chatId,
        text: "🎁 <b>اكسب اشتراك مجاني!</b> لو أضفت 20 شخص من خلال رابطك\n\n🔧 <b>خدمات تهميه</b>\n\n👇 <b>اختار الخدمة اللي محتاجها:</b>",
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{text:"🔴 أكواد وخدمات شركات المحمول", callback_data:"codes"}],
            [{text:"🧮 حساب نسبة الوساطة", callback_data:"wasta"}],
            [{text:"💰 تحويل العملات", callback_data:"currency"}],
            [{text:"🎂 خدمة كم عمرك", callback_data:"age"}],
            [{text:"🔄 ترجمة", callback_data:"translate"}],
            [{text:"🌟 زخرفة ورموز ببجي", callback_data:"zakhrafa"}],
            [{text:"📻 الراديو", callback_data:"radio"}],
            [{text:"📖 طريقة الاستخدام", callback_data:"howto"}],
            [{text:"⏪ القائمة السابقة", callback_data:"prev"}, {text:"القائمة الرئيسية", callback_data:"main"}
