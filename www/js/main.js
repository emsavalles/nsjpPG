var db = "";
/*
$(document).ready(function(){
            $("#sidebar").css('left',"-200px");
            $('#menuslide').on('click',function(){
                
            var sidebar = $("#sidebar");
            
            console.log(sidebar.css('left'));
           
            if(sidebar.css('left') == "-200px")
            {
                sidebar.css('left',"0px");
                $("#container").css('left',"200px");
                
            }
            else
            {
                sidebar.css('left',"-200px");
                $("#container").css('left',"0px");
            }                
            });


});
*/
function populateDB(tx) {
//    tx.executeSql('DROP TABLE IF EXISTS SoccerPlayer');
//    tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');
//    tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Alexandre Pato", "AC Milan")');

    $('#guardajugador').on('click',function(){
        db.transaction(function(tx) {
        tx.executeSql( 
                'INSERT INTO SoccerPlayer(Name, Club) VALUES (?,?)' 
                ,[$('#jugador').val(), $('#club').val()]
                ,//queryDB
                function(tx){
                    tx.executeSql('SELECT * FROM SoccerPlayer order by id desc');
                } 
                ,errorCB);
        });             
    });    

}

function queryDB(tx) {
    $('#jugador,#club').val('');
    tx.executeSql('SELECT * FROM SoccerPlayer order by id desc', [], querySuccess, errorCB);
}

function querySuccess(tx,result){
        var playerlist = document.getElementById("SoccerPlayerList");
        var players = "";
        var len = result.rows.length;
        for (var i=0; i<len; i++){
            players = players + '<li><a href="#"><p>'+result.rows.item(i).id+'<p><p class="record">'+result.rows.item(i).Name+'</p><p class="small">Club '+result.rows.item(i).Club+'</p></a></li>';
        }   

        playerlist.innerHTML = players;
        $("#SoccerPlayerList").listview("refresh");
}

function errorCB(err) {
    alert("Error processing SQL: "+err.message);
}

function successCB() {
    db.transaction(queryDB, errorCB);
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}