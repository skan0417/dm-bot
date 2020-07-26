const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
const { promptMessage } = require("./config/functions.js");
const { getMember, formatDate } = require("./config/functions.js");
const { token, prefix, statusm, masterid } = require('./config/bot_info.json')

client.on('ready', () => {
    console.log(`"${client.user.username}" Bot is online`);
    
  client.user.setActivity(statusm, {
            type: "WATCHING"
        });
});

client.on('message', message =>{
	
	try{
	
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
	
	if (!message.content.startsWith(prefix)) return;
	if(message.content.startsWith(prefix+"exit")){
	if(message.author.id !== masterid) return message.channel.send("권한이 없습니다.");
	
	message.channel.send(client.user.username + " Bot is ofline.").then(()=>{
		process.exit();
	});
}
	if(message.content.startsWith(prefix + "dm")){
		if(message.author.id !== masterid) return message.channel.send("권한이 없습니다.");
		var text = message.content.substring(prefix.length + 3);
		
		const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#AAF0D1')
			.setAuthor(message.author.username+"#"+message.author.discriminator
		, message.author.displayAvatarURL(),"", true)
		.setDescription(message.guild.name+'에서 메세지가 전송되었습니다.\n'+'@everyone\n'+text, true)
		.setTimestamp();
		message.channel.bulkDelete(1, true);
		
		const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("1️⃣ - 엄베드 형식으로 디엠을 보냅니다.\n2️⃣ - 일반 텍스트 형식으로 디엠을 보냅니다.\n3️⃣ - 메세지를 보내지 않습니다.\n30초 이내로 선택해주세요.")
            .setDescription(`보내는 내용 : `+text)
		
		message.channel.send(promptEmbed).then(async msg => {
            
            const emoji = await promptMessage(msg, message.author, 30, ["1️⃣", "2️⃣", "3️⃣"]);

            if (emoji === "1️⃣") {
                message.channel.bulkDelete(1, true);
message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.send(exampleEmbed));
                message.reply("성공적으로 엄베드를 보냈습니다.").then(message => message.delete({ timeout: 3000, reason: '' }));
				
            } else if (emoji === "2️⃣") {
                message.channel.bulkDelete(1, true);
message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.send(text));
                message.reply("성공적으로 메세지를 보냈습니다.").then(message => message.delete({ timeout: 3000, reason: '' }));
            }else if (emoji === "3️⃣") {
                message.channel.bulkDelete(1, true);

                message.reply(`취소되었습니다.`)
                    .then(m => m.delete({ timeout: 3000, reason: '' }));
            }
        });
		
	}		
		}catch(err){
	client.users.cache.get(masterid).send("💥 오류가 발생했습니다 ! 💥");
	client.users.cache.get(masterid).send("```"+err+"```");
}
});
client.login(token);