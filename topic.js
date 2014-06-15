var glotopic = ""; //topicの保存
var myReg = new RegExp("(http|mms)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?\@&=+\$,%#]+:[0-9]+)");
var prenick, preurl;
var limit = 10;
var ch = "#アリスがシュ！$";

function setTopic(prefix, channel, text){
    if(channel.match(ch)){
	limit++;
	if(myReg.test(text)){
	    prenick = prefix.nick;
	    preurl = myReg.exec(text);
	    limit = 0;
	}
	if(limit >= 10) return;
	var tmp;
	tmp = text.split(' ');

	/* topic発言の判断 */
	for(i = 0; i<tmp.length; i++){
	    if(tmp[i] == "topic"){
		tmp[i+1]!=null ? prenick = tmp[i+1] : prenick = prenick;
		topic(channel, prenick + " " + preurl[0] + " " + glotopic);
	    }
	}
	
    }
}

function event::onTopic(prefix, channel, topic){
    if(channel.match(ch)){
	glotopic = topic;
    }
}

function event::onNumericReply(number, msg){
    if(number == 332){
	var tmpmsg=msg.split(' ');
	if(tmpmsg[0].match(ch)){
	    glotopic = msg.substr(ch.length, msg.length-ch.length);
	}
    }
} 


function event::onChannelText(prefix, channel, text){
    setTopic(prefix, channel, text);
}


function event::onChannelNotice(prefix, channel, text){
    setTopic(prefix, channel, text);
}
