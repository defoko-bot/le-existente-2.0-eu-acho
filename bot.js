const removemarkdown = require('remove-markdown');
const {Client, MessageEmbed} = require('discord.js')
const bot = new Client()
const prefix = "le ";
const geral = require("./geral.json")
const sabio = geral.sabio
const cancelado = geral.cancelamentos

bot.on("error", (err) =>{
    console.log(`WEEEEEEEEEEEEEEEE ERRO WEEEEEEEEEEEEEEE`)
    console.log(err)
});

bot.on("ready", () =>{
    console.log(`vivo caraio`)
    bot.user.setActivity(`Existindo de novo [padero]`)
})

bot.on("rateLimit", (rt) => {
    console.log(`Foda ratelimit :cadeaesposa:\n${rt}`)
});

bot.on("message", (msg) => {
    if(msg.author.bot || msg.channel.type === "dm") return;
    const args = msg.content.substring(prefix.length).split(" ");
    const cmd = args[0].toLowerCase();

    switch(cmd){
        case "sabiaspalavras": //fala um comando foda ae to sem ideia
            const wrdrandom = sabio[Math.floor(Math.random() * sabio.length)]
            console.log(`Sabia palavra invocada: ${wrdrandom}, pos na lista: ${sabio.indexOf(wrdrandom)}`)
            const sbColor = Math.floor(Math.random()*16777215).toString(16);
            const wrdembed = new MessageEmbed()
            .setColor(`#${sbColor}`)
            .setTitle(`Sua palavra sagrada éééé...`)
            .setDescription(`${wrdrandom}`);
            msg.channel.send(wrdembed)
        break;
        case "dado":
            let numero = args[1]
            if(!numero || isNaN(numero) || numero <= 0) return msg.channel.send(`${msg.author} numero invalido carai`)
            if(numero > 100) return msg.channel.send(`${msg.author} numero mto grande, pf apenas entre 3 e 100`)
            if(numero < 3) return msg.channel.send(`${msg.author} numero pequeno dms, se for esse numero melhor usar o \`le monedita\``)
            const random = Math.floor(Math.random() * numero);
            if(numero == 0) numero = 1;
            console.log(`Dado invocado: ${random}`)
            msg.channel.send(`${msg.author} dado saiu ${random}`)
        break;
        case "monedita":
            const numerorandomae = Math.round(Math.random() * 2)
            let moedaa;
            if(numerorandomae == 1) moedaa = "Cara";
            if(numerorandomae == 2) moedaa = "Coroa";
            console.log(`Monedita ${numerorandomae}`)
            const moneditaColor = Math.floor(Math.random()*16777215).toString(16);
            const flipcoin = new msgEmbed()
            .setColor(`#${moneditaColor}`)
            .setTitle(`Monetita ao ar deu...`)
            .attachFiles('./assets/moedita.gif')
            .setImage('attachment://monedita.gif')
            .setDescription(`${moedaa}`)
            msg.channel.send(flipcoin)
        break;
        case "cancelar":
            const pessoacancelada = msg.mentions.members.first();
            if(!pessoacancelada) return msg.channel.send(`${msg.author} menciona alguem pra ser cancelado meu filho`)
            if(pessoacancelada == msg.guild.me) return msg.channel.send(`${msg.author} vsf`)
            if(pessoacancelada == msg.author.id) return msg.channel.send(`${msg.author} vc é uma pessoa linda dms pra ser cancelada o demencia`)
            const cancelrandomico = cancelado[Math.floor(Math.random() * cancelado.length)]
            msg.channel.send(`${pessoacancelada} foi cancelado(a) ${cancelrandomico}`)
            console.log(`Pessoa ${pessoacancelada} foi cancelado(a) ${cancelrandomico}`)
        break;
        case "ppt":
            const armar = ["pedra", "papel", "tesoura"]
            const armarandom = Math.floor(Math.random() * armar.length);
            if(!args[1]) return msg.channel.send(`${msg.author} o muleke usa uma pedra ou papel ou tesoura`)
            let armaautor = args[1].toLowerCase();
            if(!armar.includes(armaautor)) return msg.channel.send(`${msg.author} arma invalida`)
            if (armar[armarandom] === armaautor) {
                console.log(armar[armarandom]);
                return msg.channel.send(`Empate, fui ${armar[armarandom]}`);
            } else if (armaautor === 'pedra') {
                console.log(armar[armarandom]);
                if (armar[armarandom] === 'papel') return msg.channel.send('Ganhei papel');
                else return msg.channel.send(`Vc ganhou fui ${armar[armarandom]}`);
            } else if (armaautor === 'tesoura') {
                console.log(armar[armarandom]);
                if (armar[armarandom] === 'pedra') return msg.channel.send('Ganhei pedra');
                else return msg.channel.send(`Vc ganhou fui ${armar[armarandom]}`);
            } else if (armaautor === 'papel') {
                console.log(armar[armarandom]);
                if (armar[armarandom] === 'tesoura') return msg.channel.send('Ganhei tesoura');
                else return msg.channel.send(`Vc ganhou fui ${armar[armarandom]}`);
            } //desculpe, por algum motivo switch case n ia, esse era o unico jeito q ia
        break;
        case "help":
            const helpColor = Math.floor(Math.random()*16777215).toString(16);
            const helpembed = new MessageEmbed()
            .setTitle(`Ajuda`)
            .setDescription(`Prefixo: \`le \` (com espaço tipo le help)\n\nle sabiaspalavras - aummmmmmmmmmmmm :person_in_lotus_position: ${sabio.length} sabias palavras unicas\nle dado <numero 1-100> - rola um dado\nle monedita - cara ou coroa\nle cancelar <pessoa marcada> - cancela ela que nem esses retardados no twitter com um motivo aleatorio\nle ppt <pedra/papel/tesoura> - o classico pedra papel tesoura\n\nadc ae mermão: https://discord.com/api/oauth2/authorize?client_id=716473594447659099&permissions=51200&scope=bot\nRepo do github: https://github.com/defoko-bot/le-existente-2.0-eu-acho\n\n-padero [pessoa#9583]`)
            .setColor(`#${helpColor}`)
            .setTimestamp();
            msg.channel.send(helpembed)
        break;
    }
});

bot.login(process.env.token)
