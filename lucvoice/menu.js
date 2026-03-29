const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({
  nomCom: "menu",
  categorie: "Menu"
}, async (jid, sock, ctx) => {
  let { repondre } = ctx;
  let { cm } = require(__dirname + "/../framework/zokou");

  // Group commands by category
  let grouped = {};
  cm.map(cmd => {
    if (!grouped[cmd.categorie]) grouped[cmd.categorie] = [];
    grouped[cmd.categorie].push(cmd.nomCom);
  });

  // Mode check
  let mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

  // Date
  moment.tz.setDefault("Etc/GMT");
  const date = moment().format("DD/MM/YYYY");

  // Header
  let header = `

╭━━━〔 ✦ LUCVOICE-XMD ✦ 〕━━━◆
┃ ◎ *OWNER*: ${s.OWNER_NAME}
┃ ◎ *PREFIX*    : None
┃ ◎ *MODE*      : ${mode}
┃ ◎ *RAM*       : 8/132 GB
┃ ◎ *DATE*      : ${date}
┃ ◎ *PLATFORM* : ${os.platform()}
┃ ◎ *CREATOR*  : PK Driller
┃ ◎ *COMMANDS* : ${cm.length}
┃ ◎ *THEME*     : LUCVOICE-XMD
╰━━━━━━━━━━━━━━━━━━━━━━━◆
`;

  // Body
  let body = `\n✨ *Available Categories & Commands* ✨\n`;
  for (const cat in grouped) {
    body += `\n╭───❖ *${cat.toUpperCase()}* ❖───╮\n`;
    grouped[cat].forEach(cmd => {
      body += `│ • *${cmd}*\n`;
    });
    body += `╰───────────────────────◆\n`;
  }

  // Footer
  let footer = `\n🚀 Powered by *LUKA iT* | 2026💎`;

  try {
    // Send menu image with caption
    await sock.sendMessage(jid, {
      image: { url: "https://files.catbox.moe/t21l69.png" },
      caption: header + body + footer,
      contextInfo: {
        mentionedJid: [sock.user.id],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363417804135599@newsletter",
          newsletterName: "LUCVOICE-XMD",
          serverMessageId: -1
        }
      }
    });
  } catch (err) {
    console.error("Menu error: ", err);
    repondre("Menu error: " + err);
  }
});
