var db = "";
|Zmb ¿
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

    $('#ver').on('click',function(){
        $.getJSON( "563.json", function( data ) {
            var text="";
            contenido=data.decreto.contenido.split(/\n/g);
            contenido.forEach(function(i){
                text+='<p>'+i+'</p>';
            });
            $('#parrafo').html(text);
            //alert(contenido.length);
        });//getJson
    });//ver.click

    $('#busca').on('keyup',function(){
        $('#parrafo').find('p').removeClass('oculto');
        text=$('#busca').val();
        text=text.replace(/a/g,'[aàáâãäåÀÁÂÃÄÅÆA]');
        text=text.replace(/e/g,'[eèéêëÈÉÊËE]');
        text=text.replace(/i/g,'[iìíîïÌÍÎÏI]');
        text=text.replace(/o/g,'[oòóôõöøÒÓÔÕÖØO]');
        text=text.replace(/u/g,'[uùúûüÙÚÛÜU]');

        var filtro=new RegExp(text,'gi');


        $('#parrafo').find('p').each(function(i){
            if($(this).html().trim()!=""){
                if($(this).html().match(filtro)==null){
                    $(this).addClass('oculto');
                }
            }
        });

    });//busca.keyup

    $('#guardajugador').on('click',function(){
        
//Guarda pero genera error que evita vista
        db.transaction(function(tx) {
            tx.executeSql(
                'INSERT INTO SoccerPlayer(Name, Club) VALUES (?,?)'
                ,[$('#jugador').val(), $('#club').val()]
                ,function(tx){
                        alert('Creado Corrrectamente');
                        queryDB(tx);
                }
                ,errorCB);
        });
    });

    /////////////////////////////////
    $('#descarga').on('click',function(){
       try{
           handleDocumentWithURL(
           function() {alert('success');},
           function(error) {
                alert('failure');
                if(error == 53) {
                     alert('No app that handles this file type.');
                     }
                   },
                   'http://www.emsavalles.com/nsjp/pdf/562.pdf'
           );
           }
       catch(e){
           alert(e.message);
           }
    });//descarga
////////////////
    
    $('#borra').on('click',function(){
        alert(1);
        db.transaction(function(tx){
            tx.executeSql('DROP TABLE IF EXISTS SoccerPlayer');
            tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');
           queryDB(tx); 
        },errorCB);
    });//borra
});

function populateDB(tx) {
//   tx.executeSql('DROP TABLE IF EXISTS SoccerPlayer');
   tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');
//   tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Alexandre Pato", "AC Milan")');
 
}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM SoccerPlayer order by id desc', [], querySuccess, errorCB);
}

function querySuccess(tx,result){
    var len = result.rows.length;
    
    $('#jugador,#club').val('');    
        var playerlist = document.getElementById("SoccerPlayerList");
        var players = "";
        for (var i=0; i<len; i++){
            players = players + '<li><a href="#"><p class="record">'+result.rows.item(i).Name+'</p><p class="small">'+result.rows.item(i).Club+'</p></a></li>';
        }   

        playerlist.innerHTML = players;
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

////////ACTION SHEET
var callback = function(buttonIndex) {
    setTimeout(function() {
        // like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
        alert('button index clicked: ' + buttonIndex);
    });
};

function testShareSheet() {
    var options = {
        'title': 'What do you want with this image?',
        'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
        'androidEnableCancelButton' : true, // default false
        'winphoneEnableCancelButton' : true, // default false
        'addCancelButtonWithLabel': 'Cancel',
        'addDestructiveButtonWithLabel' : 'Delete it'
    };
    // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
    // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
    window.plugins.actionsheet.show(options, callback);
};

function testDeleteSheet() {
    var options = {
        'addCancelButtonWithLabel': 'Cancel',
        'addDestructiveButtonWithLabel' : 'Delete note'
    };
    window.plugins.actionsheet.show(options, callback);
};

function testLogoutSheet() {
    var options = {
        'buttonLabels': ['Log out'],
        'androidEnableCancelButton' : true, // default false
        'winphoneEnableCancelButton' : true, // default false
        'addCancelButtonWithLabel': 'Cancel'
    };
    window.plugins.actionsheet.show(options, callback);
};

