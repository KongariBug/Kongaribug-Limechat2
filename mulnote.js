// play sound from "userScriptFilePath/se" directory randomly

// -- excerpt from official document
// > void playSound(String filename) 
// > wav ファイルを再生します。 
// > 相対パスの場合には、userScriptFilePath を起点とします。 

function mulse(channel){
    var fso, f, e, i, n;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    f = fso.GetFolder(userScriptFilePath+"/se");
    n = Math.floor(Math.random()*f.files.count);
    e = new Enumerator(f.files);

    for (i=0; i<n; e.moveNext(), i++){ }
    playSound( "./se/" + e.item().name );

}

function event::onHighlight(prefix, command,  channel, text){
    mulse(channel);
}
