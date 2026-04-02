"use strict";

module.exports = async (zk, conf) => {
  if (conf.AUTO_REACT_STATUS !== "yes") return; // Auto-react off

  zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;

    for (const message of messages) {
      try {
        // Determine which emoji to use
        let emojiToReact;
        if (conf.RANDOM_REACT) {
          const emojis = conf.REACT_EMOJIS || ["💚","❤️","🔥","👍","😂","😮","😢","🤔","👏","🎉","🤩"];
          emojiToReact = emojis[Math.floor(Math.random() * emojis.length)];
        } else {
          emojiToReact = conf.REACT_EMOJI || "💚";
        }

        // Handle status updates
        if (message.key?.remoteJid === "status@broadcast") {
          await zk.readMessages([message.key]);
          await new Promise(r => setTimeout(r, 500)); // small delay
          await zk.sendMessage(message.key.remoteJid, { react: { text: emojiToReact, key: message.key } });
          console.log(`✅ Reacted to status from ${message.key.participant} with ${emojiToReact}`);
          await new Promise(r => setTimeout(r, conf.REACT_DELAY || 3000));
          continue;
        }

        // Handle quoted media (images/videos) in chat
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (quoted?.imageMessage || quoted?.videoMessage || quoted?.stickerMessage) {
          await new Promise(r => setTimeout(r, 300)); // small delay
          await zk.sendMessage(message.key.remoteJid, { react: { text: emojiToReact, key: message.key } });
          console.log(`✅ Reacted to media message from ${message.key.participant} with ${emojiToReact}`);
          continue;
        }

        // React to text messages
        if (message.message?.conversation || message.message?.extendedTextMessage) {
          await new Promise(r => setTimeout(r, 300)); // small delay
          await zk.sendMessage(message.key.remoteJid, { react: { text: emojiToReact, key: message.key } });
          console.log(`✅ Reacted to text from ${message.key.participant} with ${emojiToReact}`);
        }

      } catch (err) {
        console.error(`❌ Failed to react to ${message.key.participant}:`, err.message);
      }
    }
  });
};
