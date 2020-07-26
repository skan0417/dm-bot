const readline = require('readline'); 
const fs = require("fs");
const rl = readline.createInterface({ input: process.stdin, 
output: process.stdout 
});
var timeout = 0; 
 
rl.question('봇 토큰을 입력해주세요.\n> ', answer => {
	var tokena = answer;
	   rl.question('Prefix를 입력해주세요. ( Prefix 예시 : !dm의 "!")\n> ', answer => {
	var prefixa = answer;
	   rl.question('상태메세지를 입력해주세요.\n> ', answer => {
	var message = answer;
	   rl.question('관리자 아이디를 입력해주세요.\n> ', answer => {
	var id = answer;
	console.log("관리자 아이디 : "+id+"\n봇 토큰 : "+tokena+"\nPrefix : "+prefixa+"\n상태메세지 : "+message +"\n\n저장되었습니다.")
let 	botinfo = {
	
	token: tokena,
	prefix: prefixa,
	statusm: message,
	masterid: id
	
}
	
	fs.writeFile("./bot_info.json", JSON.stringify(botinfo), err => {
                    if (err) throw err;
                });
				
		 
	 setInterval(function() {
		 if(timeout == 0){
			 timeout = timeout + 1 ;
		 }else{
			 rl.close();
			 process.exit();
			}
		 }, 1000)
 });
 });
 });
 });
	 
	