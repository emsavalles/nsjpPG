var db = "";
if (!String.prototype.trim) {
  (function(){
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function () {
      return this.replace(rtrim, "");
    }
  })();
}
$(document).ready(function(){
    $("#sidebar").css({
        'left':"-50%",
        'width':'50%'
        });

    $('#menuslide').on('click',function(){
        var sidebar = $("#sidebar");
        if(parseInt(sidebar.css('left')) < "0"){
            sidebar.css('left',"0px");
            $("#container").css('left',"50%");
        }else{
           sidebar.css('left',"-50%");
           $("#container").css('left',"0px"); 
        }
    });
/*    
            $("#sidebar").css('left',"-200px");
            $('#menuslide').on('click',function(){
                
            var sidebar = $("#sidebar");
            
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
*/



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

/////////////////////////////////////

$.ajax({
    url:'paginas/inicio.html',
    encoding:"UTF-8",
    dataType:"html", 
    contentType: "text/html; charset=utf-8",
    }).done(function(data){
        $('#content').html(data);
        funcionesvarias()
    });

    $('#sidebar a').on('click',function(e){
        e.preventDefault();
        //$('#content').load();
        var link=$(this).attr('href');
        $('#content').fadeOut('fast', function(){
            $('#content').load(link, function(){
                $('#content').fadeIn('fast');
            });
});
    }); 
    
//////////////////////////////////
       
});//JQuery

function populateDB(tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');
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

function funcionesvarias(){
/////////////////////////////////////
   $('#ver').on('click',function(){
        $.getJSON( "562.json", function( data ) {
            var text="";
            contenido=data.decreto.contenido.split(/\n/g);
            contenido.forEach(function(i){
                if(i.trim()!=""){
                    text+='<p>'+i+'</p>';
                }
            });
            $('#parrafo').html(text);
        });//getJson
    });//ver.click
/////////////////////////    
    $('.busca').on('keyup',function(){
        if($(this).val().length>0){
        $('#parrafo').find('p').removeClass('oculto');
        $('#parrafo').find('p').removeClass('fdo');
        text=$('#busca').val();
        text=text.replace(/a/g,'[aàáâãäåÀÁÂÃÄÅÆA]');
        text=text.replace(/e/g,'[eèéêëÈÉÊËE]');
        text=text.replace(/i/g,'[iìíîïÌÍÎÏI]');
        text=text.replace(/o/g,'[oòóôõöøÒÓÔÕÖØO]');
        text=text.replace(/u/g,'[uùúûüÙÚÛÜU]');

        var filtro=new RegExp(text,'gi');
        $('#parrafo').find('p').each(function(i){
                if($(this).html().match(filtro)==null){
                    $(this).addClass('oculto');
                }else{
                   $(this).addClass('fdo'); 
                }
            
        });
        }else{
                    $('#parrafo').find('p').removeClass('fdo');
        }
        
});

  
}