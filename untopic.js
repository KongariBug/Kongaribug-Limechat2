var glotopic = ""; //topicの保存
var myReg = new RegExp("(http|mms)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?\@&=+\$,%#]+:[0-9]+)");
var myReg2 = new RegExp("[0-9]+");
var prenick, preurl;
var limit = 10;
var ch = "#アリスがシュ！$";

function unTopic(prefix, channel, text){
    if(channel.match(ch)){
	var tmp;
	var tarnum=0;
	tmp = text.split(' ');
	
	/* untopic発言の判断 */
	for( i=0; i<tmp.length-1; i++){
	    if(tmp[i] == "untopic"){
		if(tmp[i+1] != null) {
		    var target = tmp[i+1];
		    if(myReg2.test(tmp[i+1])){
			tarnum = parseInt(tmp[i+1]);
		    }
		    var tmptopic = "";
		    glotopic = glotopic.split('　').join(' ');
		    tmp = glotopic;
		    tmp = tmp.split(' ');
		    for(i=0,j=0; j<tmp.length; i++,j++){
			if(tmp[j]==target && j!=tmp.length-1)
			    if(myReg.test(tmp[j+1])){
				j++;
				continue;
			    }
			if(tarnum==1 && j!=tmp.length-1){
			    j++;
			    tarnum--;
			    continue;
			}
			if(myReg.test(tmp[j])) tarnum--;
			if(tmptopic == "") tmptopic = tmp[j];
			else tmptopic = tmptopic + " " +tmp[j];
		    }
		    if(i != j){
			glotopic = tmptopic;
			if(tmptopic == "") topic(channel, " ");
			else topic(channel, glotopic);
		    }
		    return;
		}
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
    unTopic(prefix, channel, text);
}


function event::onChannelNotice(prefix, channel, text){
    unTopic(prefix, channel, text);
}