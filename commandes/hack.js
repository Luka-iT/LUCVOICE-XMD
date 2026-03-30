const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "hack",
  categorie: "Fun",
  reaction: '😈'
}, async (dest, zk, opts) => {
  const { repondre, arg, prefixe, nomAuteurMessage } = opts;

  try {
    // 🔹 Steps za prank
    const hackSteps = [
      "```😈 LUCVOICE-XMD Injecting malware... 😈```",
      "```🔐 Accessing target device...\n0%```",
      "```♻️ Transferring photos\n█ 10%```",
      "```♻️ Transfer successful\n█ █ 20%```",
      "```♻️ Transferring videos\n█ █ █ 30%```",
      "```♻️ Transfer successful\n█ █ █ █ 40%```",
      "```♻️ Transferring audio files\n█ █ █ █ █ 50%```",
      "```♻️ Transfer successful\n█ █ █ █ █ █ 60%```",
      "```♻️ Transferring hidden files\n█ █ █ █ █ █ █ 70%```",
      "```♻️ Transfer successful\n█ █ █ █ █ █ █ █ 80%```",
      "```♻️ Transferring WhatsApp chats\n█ █ █ █ █ █ █ █ █ 90%```",
      "```♻️ Transfer successful\n█ █ █ █ █ █ █ █ █ █ 100%```",
      "```📲 System hijacking in progress...\nConnecting to server```",
      "```🔌 Device connected successfully\nReceiving data...```",
      "```💡 Data hijacked 100% completed\nCleaning traces & malwares...```",
      "```🔋 HACKING COMPLETED```",
      "```📤 Sending documents to LUCVOICE-XMD server...```",
      "```😈 KEEP USING LUCVOICE-XMD 😈```"
    ];

    for (const step of hackSteps) {
      await repondre(step);
      await new Promise(resolve => setTimeout(resolve, 2000)); // suspense
    }

    // 🔹 Final files message
    await repondre("```🗂️ ALL FILES TRANSFERRED SUCCESSFULLY```");

    // 🔹 Countdown effect
    const countdown = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
    for (const num of countdown) {
      await repondre(````❇️ SUCCESSFULLY SENT DATA! Disconnecting... 📤 [${num}]````);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // 🔹 Dramatic final message
    await repondre("😈 *VICTIM SYSTEM DEMOLISHED!* 😈");
    await repondre("💡 *Powered by LUCVOICE-XMD*");
    
  } catch (err) {
    console.error("Critical error in LUCVOICE-XMD prank script:", err);
    await repondre("_🥺 A critical error occurred during the LUCVOICE-XMD prank 😂_");
  }
});
