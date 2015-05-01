$( document ).ready(function() {
    
     Metis.formGeneral();
     var windowUrl = window.location.href;
	var query = windowUrl.split("?");
	var email_id ={
	 name:"email_id",
 value : query[1]
};
     
    alert(email_id); 
    /* $.ajax({
    	    type: "GET",
    	    url: "/getProjects",
    	    dataType: 'json',
    	    data : email_id,
    	    async: false,
    	    crossDomain : true,
    	    success: function(o){
    	     var data='<div class="col-lg-4">'+
                	'<div class="box">'+
                  	'<header>'+
                    	'<h5>'+o.projectName+'</h5>'+
                    	'<div class="toolbar">'+
                      '<button id='+o.projectName+' class="btn btn-xs btn-primary" onclick="viewproject(this.id);">View</button>'+
                    	'</div>'+
                  	'</header>'+
                  	'<div class="body">'+
                    	'<pre class="prettyprint linenums">'+o.description+'</pre>'+
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
    	   });*/
});

function newProjectSubmit(){
 alert("called?");
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
   //return o;
     
   alert(JSON.stringify(o));
   $.ajax({
    	    type: "POST",
    	    url: "/createTaskKanban",
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
			       alert("Task Added");
			      
    	    },
    	     error: function(response,text,err){
    	    	 alert(err);
    	 	 }
    	   });
     
       
       
	}
function viewproject(id){
	alert("you clicked on project="+id);
	}