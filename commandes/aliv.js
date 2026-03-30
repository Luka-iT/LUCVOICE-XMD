const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({
    nomCom: 'alive',
    categorie: 'General'
}, async (dest, zk, opts) => {

    const { ms, arg, repondre, superUser } = opts;
    const data = await getDataFromAlive();

    // 🔹 Si kuna arg, show saved alive
    if (!arg || !arg[0] || arg.join('').trim() === '') {

        if (data) {

            const { message, lien } = data;
            const mode = (s.MODE.toLowerCase() === 'yes') ? 'public' : 'private';

            moment.tz.setDefault('Etc/GMT');
            const temps = moment().format('HH:mm:ss');
            const date = moment().format('DD/MM/YYYY');

            const alivemsg = `
╭───【 LUCVOICE-XMD ALIVE 】───╮
│ Owner : ${s.OWNER_NAME}
│ Mode  : ${mode}
│ Date  : ${date}
│ GMT   : ${temps}
╰─────────────────────────────╯

${message}

╰───✦ LUCVOICE-XMD-WABOT ✦───╯`;

            if (lien?.match(/\.(mp4|gif)$/i)) {
                try {
                    await zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
                } catch (e) {
                    console.error("🥵🥵 Alive video error:", e);
                    repondre("🥵🥵 Alive video error: " + e);
                }
            } else if (lien?.match(/\.(jpeg|png|jpg)$/i)) {
                try {
                    await zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
                } catch (e) {
                    console.error("🥵🥵 Alive image error:", e);
                    repondre("🥵🥵 Alive image error: " + e);
                }
            } else {
                repondre(alivemsg);
            }

        } else {
            if (!superUser) return repondre("❌ There is no alive message set for this bot.");
            repondre("⚡ You haven't saved an alive yet. To set it, use:\n.alive Your message;image_or_video_link\nDon't send fake stuff! 😎");
        }

    } else { 
        // 🔹 Only owner can set alive
        if (!superUser) return repondre("❌ Only the bot owner can modify the alive message.");

        const texte = arg.join(' ').split(';')[0];
        const tlien = arg.join(' ').split(';')[1];

        await addOrUpdateDataInAlive(texte, tlien);

        const confirmMsg = `
👋 Hello! I am *LUCVCHUGA-XMD-WABOTive 24/7 Just Like You!*
🌟 Thanks to God 🌟
🤗 Enjoy Life!
✦ LUCVOICE-XMD ✦`;

        repondre(confirmMsg);
    }
});
