const BOT_TOKEN = '9047328284:AAGwbhOK_plflLsJ6_MRa_zG00I2-c4jor4';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('Bot is running');
  
  try {
    const update = req.body;
    const msg = update.message || update.callback_query?.message;
    const chatId = msg?.chat?.id;
    const text = update.message?.text || update.callback_query?.data || '';
    
    if (!chatId) return res.status(200).send('ok');

    const send = async (text, keyboard) => {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML',
          reply_markup: keyboard
        })
      });
    };

    if (text === '/start' || text === 'start') {
      await send(
        `👑 <b>أهلاً بيك في بوت POWER BOT</b> 👑\n\nاختار من القائمة:`,
        {
          inline_keyboard: [
            [{ text: '🛒 متجر A7B7', callback_data: 'shop' }],
            [{ text: '⚙️ الردود', callback_data: 'replies' }],
            [{ text: '🎁 Fragment', callback_data: 'fragment' }]
          ]
        }
      );
    } else {
      await send(`✅ البوت شغال تمام!\n\nانت بعت: ${text}\n\nدوس /start`);
    }

    return res.status(200).send('ok');
  } catch (e) {
    return res.status(200).send('ok');
  }
}
