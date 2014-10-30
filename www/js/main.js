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