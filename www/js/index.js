/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db;
var updateurl ="http://www.emsavalles.com/nsjp/app.php";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        db = window.openDatabase("main","1","Main DB",1000000);
        db.transaction(initDB,dbError,dbReady);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       // db=window.openDatabase("Database","1.0","Demo",2*1024*1024);
       // db.transaction(createDB,errorCB,successCB);
/*        
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
*/        
    }
};

function initDB(tx) {
    alert('Init');
}
function dbError(e) {
    alert("SQL ERROR"+e);
}
function dbReady(){
    alert("DB initialization done.");    
}
/*
function dbError(e) {
    console.log("SQL ERROR");
    console.dir(e);
}

function initDB(tx) {
tx.executeSql("create table if not exists NSPE(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, fecha TEXT, contenido, archivo TEXT)");
}

function dbReady() {
    console.log("DB initialization done.");
    //begin sync process
    if(navigator.network && navigator.network.connection.type != Connection.NONE) 
        syncDB();
    else 
        displayDocs();
}
function syncDB() {
//    $("#docs").html("Refreshing documentation...");
    
    var date = localStorage["lastdate"]?localStorage["lastdate"]:'';
    console.log("Will get items after "+date);

    $.get(updateurl, {date:date}, function(resp,code) {
    console.log("back from getting updates with "+resp.length + " items to process.");
    
    resp.forEach(function(ob) {
        db.transaction(function(ctx) {
            ctx.executeSql("select id from docs where token = ?", [ob.token], function(tx,checkres) {
                if(checkres.rows.length) {
                    console.log("possible update/delete");
                    if(!ob.deleted) {
                        console.log("updating "+ob.title+ " "+ob.lastupdated);
                        tx.executeSql("update docs set title=?,body=?,lastupdated=? where token=?", [ob.title,ob.body,ob.lastupdated,ob.token]);
                    } else {
                        console.log("deleting "+ob.title+ " "+ob.lastupdated);
                        tx.executeSql("delete from docs where token = ?", [ob.token]);
                    }
                } else {
                //only insert if not deleted
                console.log("possible insert");
                    if(!ob.deleted) {
                        console.log("inserting "+ob.title+ " "+ob.lastupdated);
                        tx.executeSql("insert into docs(title,body,lastupdated,token) values(?,?,?,?)", [ob.title,ob.body,ob.lastupdated,ob.token]);
                    }
                }
            });
        });
    });    
    }
}

function displayDocs() {
    db.transaction(function(tx) {
    tx.executeSql("select title from docs order by title asc", [], function(tx, results) {
        var s = "<h2>Docs</h2>";
        for(var i=0; i<results.rows.length; i++) {
            s += results.rows.item(i).title + "";
        }
        $("#docs").html(s);
        });
    });
}
/*
function primero(){
    db.transaction(insertDB,errorCB);
}

function createDB(tx){
    tx.executeSql('DROP TABLE IF EXISTS Demo');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Demo(id unique,titulo,fecha,descripcion,archivo)');
}

function errorCB(err){
    alert('Error Procesando SQL: '+err.code);
}

function successCB(){
    alert('La tabl se cre+o correctamente');
}

function insertDB(tx){
    var _titulo="";
    var _fecha="";
    var _descripcion="";
    var _archivo="";
    
    var sql='INSERT INTO Demo(titulo,fecha,descripcion,archivo) VALUES(?,?,?,?)';
    tx.executeSql(sql,[_titulo,_fecha,_descripcion,_archivo],successQueryDB,errorCB);
}

function successQueryDB(tx){
    tx.executeSql('SELECT * FROM Demo',[],renderList,errorCB);
}

function renderList(tx,result){
    var htmlString='';
    var len=results.rows.length;
    
    for(var i=0;i<len;i++){
        htmlString+='<li>'+result.rows.item(i).titulo+'</li>';
    }
    
    //$('#listView').html(htmlString);
    //$('#listView').listView('refresh');
    
}
*/