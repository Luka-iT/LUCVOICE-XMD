const os = require("os");

module.exports = {
  name: "menu",
  alias: ["help"],
  description: "Show bot menu",

  async execute(client, message, args) {

    const pushname = message.pushName || "User";

    // Runtime
    const runtime = process.uptime();
    const hours = Math.floor(runtime / 3600);
    const minutes = Math.floor((runtime % 3600) / 60);
    const seconds = Math.floor(runtime % 60);

    // RAM
    const used = process.memoryUsage().heapUsed / 1024 / 1024;

    // Readmore
    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);

    const menu = `
╭━━━〔 🎤 LUCVOICE XMD BOT 〕━━━⬣
┃ 👤 User: *${pushname}*
┃ ⚡ Status: *Online*
┃ ⏱️ Runtime: *${hours}h ${minutes}m ${seconds}s*
┃ 💾 RAM: *${used.toFixed(2)} MB*
╰━━━━━━━━━━━━━━━━⬣
${readmore}

╭━━━〔 📂 GENERAL 〕━━━⬣
┃ 🏓 .ping
┃ 🤖 .alive
┃ 📜 .menu
┃ 📊 .runtime
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 🤖 AI MENU 〕━━━⬣
┃ 💬 .ai
┃ 🧠 .gpt
┃ 🎨 .imagine
┃ 📸 .image
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 🎵 DOWNLOAD 〕━━━⬣
┃ 🎶 .song
┃ 📥 .ytmp3
┃ 🎬 .ytmp4
┃ 📀 .play
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 👥 GROUP MENU 〕━━━⬣
┃ ➕ .add
┃ ❌ .kick
┃ 🔇 .mute
┃ 🔊 .unmute
┃ 🔒 .close
┃ 🔓 .open
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 ⚙️ OWNER 〕━━━⬣
┃ 🚫 .block
┃ ✅ .unblock
┃ 🔁 .restart
┃ 🧹 .clear
╰━━━━━━━━━━━━━━━━⬣

╭━━━━━━━━━━━━━━━━━━⬣
┃ ✨ Powered by *LUKA iT*
┃ 🚀 Speed • Power • Style
╰━━━━━━━━━━━━━━━━━━⬣
`;

    await client.sendMessage(message.from, {
      text: menu
    }, { quoted: message });
  }
};
