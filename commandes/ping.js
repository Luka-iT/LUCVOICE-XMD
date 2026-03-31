const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "ping",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {

  const { ms } = commandeOptions;

  // Step 1
  let start = new Date().getTime();
  let msg = await zk.sendMessage(dest, { text: "🏓 Pinging..." }, { quoted: ms });

  // Step 2 (edit message)
  let speed = new Date().getTime() - start;
  await zk.sendMessage(dest, {
    text: `⚡ Speed: ${speed}ms`
  }, { edit: msg.key });

  // Step 3 (another change)
  await new Promise(r => setTimeout(r, 1000));
  await zk.sendMessage(dest, {
    text: "🚀 LUCVOICE-XMD is Alive!"
  }, { edit: msg.key });

  // Step 4 (final style)
  await new Promise(r => setTimeout(r, 1000));
  await zk.sendMessage(dest, {
    text: `
╭───〔 🤖 LUCVOICE-XMD 〕───
│ 🏓 Pong!
│ ⚡ Speed: ${speed}ms
│ 💻 Status: Online
╰───────────────
`
  }, { edit: msg.key });

});
