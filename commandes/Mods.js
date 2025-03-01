const { zokou } = require('../framework/zokou');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const conf = require("../set");
const fs = require('fs');
const sleep =  (ms) =>{
  return new Promise((resolve) =>{ setTimeout (resolve, ms)})
  
  } ;


let banUser = JSON.parse(fs.readFileSync('./bdd/banUser.json'));
let banGroup = JSON.parse(fs.readFileSync('./bdd/banGroup.json'));

zokou({ nomCom: "tgs", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Commande reservée au propriétaire du bot'); return;
  }
  const apikey = conf.APILOLHUMAIN

  if (apikey === null || apikey === 'null') { repondre('Veillez vérifier votre apikey ou si vous en avez pas , veiller crée un compte sur api.lolhuman.xyz et vous en procurer une.'); return; };

  if (!arg[0]) {
    repondre("veuillez insérer un lien de sticker Telegram svp");
    return;
  }

  let lien = arg.join(' ');

  let api = 'https://api.lolhuman.xyz/api/telestick?apikey=' + apikey + '&url=' + lien;

  try {
    const response = await axios.get(api);
    const img = response.data.result.sticker;

    for (let i = 0; i < img.length; i++) {
      const sticker = new Sticker(img[i], {
        pack: nomAuteurMessage,
        author: "Zokou-md",
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await sticker.toBuffer(); // Convertit l'autocollant en tampon (Buffer)

      await zk.sendMessage(
        dest,
        {
          sticker: stickerBuffer, // Utilisez le tampon (Buffer) directement dans l'objet de message
        },
        { quoted: ms }
      );
    }
  } catch (e) {
    repondre("erreur lors de la procédure \n", e);
  }
});

zokou({ nomCom: "crew", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage, superUser, auteurMsgRepondu, msgRepondu } = commandeOptions;

  if (!superUser) { repondre("Reserver au modérateur "); return };

  if (!arg[0]) { repondre('Veillez entrez le nom du groupe à creer'); return };
  if (!msgRepondu) { repondre('Veillez mentionner un membre a ajouté '); return; }

  const name = arg.join(" ")

  const group = await zk.groupCreate(name, [auteurMessage, auteurMsgRepondu])
  console.log("created group with id: " + group.gid)
  zk.sendMessage(group.id, { text: `Bienvenue dans ${name}` })

});

zokou({ nomCom: "bye", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;
  if (!verifGroupe) { repondre("commande reserver au groupe uniquement"); return };
  if (!superUser) {
    repondre("commande reservée au propriétaire");
    return;
  }

  await zk.groupLeave(dest)
});

zokou({ nomCom: "rejoindre", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
  let result = arg[0].split('https://chat.whatsapp.com/')[1] ;
 await zk.groupAcceptInvite(result) ;
  
      repondre(`Succes`).catch((e)=>{
  repondre('Erreur inconnus')
})

})


zokou({ nomCom: "jid", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
              if(!msgRepondu) {
                jid = dest
              } else {
                jid = auteurMsgRepondu
              } ;
   zk.sendMessage(dest,{text : jid },{quoted:ms});

        }) ;

  zokou({ nomCom: "envoi", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

       if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  } 
    
   if (!msgRepondu) {
    repondre("Veiller mentionner le message svp");
    return; };
     if (!arg[0]) {
    repondre('Veiller mettre le jid du destinataire');
    return; } ;

   const jid = arg.join(' ')
     

    /*const msg = getMessageFromStore(auteurMsgRepondu, msgRepondu) */
await zk.sendMessage( jid, { forward: msgRepondu }) // WA forward the message!

  })
;

zokou({ nomCom: "block", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
             
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('Veillez mentionner la personne a bloquer'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes'))   } ;

  });

zokou({ nomCom: "deblock", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('Veillez mentionner la personne a debloquer'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes'))   } ;
  
    });

zokou({ nomCom: "purge", categorie: "Groupe", reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { auteurMessage ,ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser,prefixe } = commandeOptions

  const metadata = await zk.groupMetadata(dest) ;
 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿cette commande est réservée aux groupes ❌"); return; }
  if (superUser || auteurMessage == metadata.owner) { 
  
   repondre('Les membres non admins seront retiré du groupe vous avez 5 secondes pour revandiquer votre choix en redemarrant le bot') ;
   await sleep(5000)
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
try {
  let users = membresGroupe.filter((member) => !member.admin)

  for (const membre of users) {

    

   
    
await zk.groupParticipantsUpdate(
        dest, 
        [membre.id],
        "remove" 
    ) 
    await sleep(500)
    
  }  
} catch (e) {repondre("j'ai besoins des droit d'administration")} } else {
  repondre("Commande reserver au proprietaire du groupe pour des raisons de securitée"); return
}
});

zokou({
    nomCom: 'ban',
    categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;

    
  if (!superUser) {repondre('Reste a ta place morveux cette commande n\'est permis qu\'au proprietaire du bot') ; return}
    if (!arg[0]) {
        // Fonction 'repondre' doit être définie pour envoyer une réponse.
        repondre(`mentionner la victime een tappant ${prefixe}ban add/del pour bannir/debannir la victime`);
        return;
    };

    if (msgRepondu) {
        switch (arg.join(' ')) {
            case 'add':

            const alreadyBan = banUser.includes(auteurMsgRepondu)

            if(alreadyBan) {repondre('Ce utilisateur est deja bannis') ; return}
               
            banUser.push(auteurMsgRepondu);

                // Enregistrez les modifications dans le fichier JSON
                fs.writeFileSync('./bdd/banUser.json', JSON.stringify(banUser, null, 2));
                repondre("cet utilisateur est desormais bannis des commandes du bots");
                break;
                case 'del':
    const index = banUser.indexOf(auteurMsgRepondu);

    if (index === -1) {
        repondre('Cet utilisateur n\'est pas banni.');
    } else {
        banUser.splice(index, 1);
        // Enregistrez les modifications dans le fichier JSON
        fs.writeFileSync('./bdd/banUser.json', JSON.stringify(banUser, null, 2));
        repondre('Cet utilisateur est maintenant libre.');
    }
    break;


            default:
                repondre('mauvaise option');
                break;
        }
    } else {
        repondre('mentionner la victime')
        return;
    }
});



zokou({
    nomCom: 'bangroup',
    categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser,verifGroupe } = commandeOptions;

    
  if (!superUser) {repondre('Reste a ta place morveux cette commande n\'est permis qu\'au proprietaire du bot') ; return};
  if(!verifGroupe) {repondre('commande reserver pour les groupes' ) ; return };
    if (!arg[0]) {
        // Fonction 'repondre' doit être définie pour envoyer une réponse.
        repondre(`taper ${prefixe}bangroup add/del pour bannir/debannir le groupe`);
        return;
    };
        switch (arg.join(' ')) {
            case 'add':

            const groupalreadyBan = banGroup.includes(dest)

            if(groupalreadyBan) {repondre('Ce groupe est deja bannis') ; return}
               
            banGroup.push(dest);

                // Enregistrez les modifications dans le fichier JSON
                fs.writeFileSync('./bdd/banGroup.json', JSON.stringify(banGroup, null, 2));
                repondre("ce groupe est desormais bannis des commandes du bots");
                break;
                case 'del':
    const index = banGroup.indexOf(dest);

    if (index === -1) {
        repondre('Ce groupe n\'est pas banni.');
    } else {
        banGroup.splice(index, 1);
        // Enregistrez les modifications dans le fichier JSON
        fs.writeFileSync('./bdd/banGroup.json', JSON.stringify(banGroup, null, 2));
        repondre('Cet groupe est maintenant libre.');
    }
    break;


            default:
                repondre('mauvaise option');
                break;
        }
    
});
