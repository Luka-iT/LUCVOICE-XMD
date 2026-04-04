const { zokou } = require("../framework/zokou");

zokou({ nomCom: "restart", categorie: "Mods", reaction: "📴" }, async (dest, z, com) => {

    const { repondre, superUser } = com;

    if (!superUser) {
        return repondre("❌ This command is for owner only");
    }

    const { exec } = require("child_process");

    repondre("*♻️ Lucvoice-XMD bot is restarting...*");

    exec("pm2 restart lucvoice-xmd", (error, stdout, stderr) => {

        if (error) {
            console.log(error);
            return;
        }

        if (stderr) {
            console.log(stderr);
            return;
        }

        console.log("Restart success:", stdout);
    });

});
