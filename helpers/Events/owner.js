/*!-======[ Module Imports ]======-!*/
const fs = "fs".import();
const {
	exec
} = await "child".import()


/*!-======[ Configurations ]======-!*/
let infos = cfg.menu.infos;

/*!-======[ Default Export Function ]======-!*/
export default async function on({ cht, Exp, store, ev, is }) {
    const modes = {
        public: 'mode public',
        bell: 'auto response bella',
        autotyping: 'auto typing',
        autoreadsw: 'auto read sw',
        autoreadpc: 'auto read pc',
        autoreadgc: 'auto read group'
    };
    ev.on({
      cmd: ['upgrade'],
      listmenu: ['set'],
      tag: "owner"
    }, () => {
      if (!is.owner) return cht.reply("Maaf, males nanggepin");
      if (!cht.q) return cht.reply(infos.set);
      
      try {
        const updateInfo = await Exp.func.getUpdate();
        
        await new Promise((resolve, reject) => {
          exec('git stash && git pull origin main && git stash pop && npm install', (error, stdout, stderr) => {
            if (error) {
              console.error(`Error during update: ${stderr}`);
              reject(error);
            } else {
              console.log(`Update success: ${stdout}`);
              resolve();
            }
          })
        })
        await Exp.sendMessage("62895710073737@s.whatsapp.net", {
          text: `Bot berhasil diupgrade ke versi ${updateInfo.latestVersion}. Memulai ulang...`
        })
        process.exit(0)
      } catch (err) {
        await Exp.sendMessage("62895710073737@s.whatsapp.net", { text: 'Gagal mengupgrade bot. Cek log untuk detail.' });
      }
    })
    ev.on({ 
        cmd: ['set'], 
        listmenu: ['set'],
        tag: "owner"
    }, () => {
        if (!is.owner) return cht.reply("Maaf, males nanggepin");
        if (!cht.q) return cht.reply(infos.set);

        const [t1, t2] = cht.q.split(" ");
        const mode = modes[t1];

        if (!mode) return;

        if (t2 === "on") {
            if (global.cfg[t1]) return cht.reply(`Maaf, ${mode} sudah dalam mode on!`);
            global.cfg[t1] = true;
            return cht.reply(`Sukses mengaktifkan ${mode}`);
        } else if (t2 === "off") {
            if (!global.cfg[t1]) return cht.reply(`Maaf, ${mode} sudah dalam mode off!`);
            global.cfg[t1] = false;
            return cht.reply(`Sukses menonaktifkan ${mode}`);
        } else {
            cht.reply("on/off ?");
        }
    });
}