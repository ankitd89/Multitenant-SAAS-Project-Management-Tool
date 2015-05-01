$( document ).ready(function() {
    
       var windowUrl = window.location.href;
	var query = windowUrl.split("?");
	var email_id ={
	 name:"email_id",
 value : query[1]
};
     
    alert(email_id); 
     $.ajax({
    	    type: "GET",
    	    url: "/getGantterProjects",
    	    dataType: 'json',
    	    data : email_id,
    	    async: false,
    	    crossDomain : true,
    	    success: function(o){
    	     var data='<div class="col-lg-4">'+
                	'<div class="box">'+
                  	'<header>'+
                    	'<h5>'+o.project_name+'</h5>'+
                    	'<div class="toolbar">'+
                      '<button id='+o.project_name+' class="btn btn-xs btn-primary" onclick="viewproject(this.id);">View</button>'+
                    	'</div>'+
                  	'</header>'+
                  	'<div class="body">'+
                    	'<pre class="prettyprint linenums">'+o.Desc+'</pre>'+
                  	'</div>'+
                	'</div>'+
              	'</div>'
		$("#displayProjects").append(data);
		
$("#closemodel").click();
			       console.log("User added successfully");
			       alert("Task Added");
			      
    	    },
    	     error: function(response,text,err){
    	    	 alert(err);
    	 	 }
    	   });
});
    
    
/*	for(var i=0;i<5;i++)
	{
		var data='<div class="col-lg-4">'+
                	'<div class="box">'+
                  	'<header>'+
                    	'<h5>Project '+i+'</h5>'+
                    	'<div class="toolbar">'+
                      '<button class="btn btn-xs btn-primary" onclick="viewproject('+i+');">View</button>'+
                    	'</div>'+
                  	'</header>'+
                  	'<div class="body">'+
                    	'<pre class="prettyprint linenums">This project is about some thing about project '+i+'</pre>'+
                  	'</div>'+
                	'</div>'+
              	'</div>'
		$("#displayProjects").append(data);	
	}*/

function newProjectSubmit(){
 var data=$("#newProject").serializeArray();
 var windowUrl = window.location.href;
	var query = windowUrl.split("?");
	var email_id ={
	 name:"email_id",
 value : query[1]
};
data.push(email_id);

 var o = {};
  // o["email_id"].push(query[1]);
  // var a = this.serializeArray();
   $.each(data, function() {
       if (o[this.name] !== undefined) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
});

 alert(JSON.stringify(o));
   $.ajax({
    	    type: "POST",
    	    url: "/createGantterTask",
    	    dataType: 'json',
    	    data : o,
    	    async: false,
    	    crossDomain : true,
    	    success: function(data){
    	     var data='<div class="col-lg-4">'+
                	'<div class="box">'+
                  	'<header>'+
                    	'<h5>'+o.project_name+'</h5>'+
                    	'<div class="toolbar">'+
                      '<button id='+o.project_name+' class="btn btn-xs btn-primary" onclick="viewproject(this.id);">View</button>'+
                    	'</div>'+
                  	'</header>'+
                  	'<div class="body">'+
                    	'<pre class="prettyprint linenums">'+o.Desc+'</pre>'+
                  	'</div>'+
                	'</div>'+
              	'</div>'
		$("#displayProjects").append(data);
		
$("#closemodel").click();
			       console.log("User added successfully");
    	    },
    	     error: function(response,text,err){
    	    	 alert(err);
    	 	 }
    	   });
     
       
       
	}
function viewproject(id){
	alert("you clicked on project="+id);
	}