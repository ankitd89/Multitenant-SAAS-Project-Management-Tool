$( document ).ready(function() {
    
     Metis.formGeneral();
     var windowUrl = window.location.href;
	    var query = windowUrl.split("?");
	    var email_id ={
	      "email_id" : query[1]
     };
     
    //alert(JSON.stringify(email_id)); 
     $.ajax({
    	    type: "POST",
    	    url: "/getProjects",
    	    dataType: 'json',
    	    data : email_id,
    	    async: false,
    	    crossDomain : true,
    	    success: function(o){
    	    var stringjson=JSON.stringify(o);
    	   // console.log("JSON-"+stringjson);
    	    for(var i=0;i<o.length;i++)
    	    {
    	     var test=o[i].projects;
    	     console.log("test print"+JSON.stringify(test));
    	     
    	     console.log(test[0].project_name);
    	     var data='<div class="col-lg-4">'+
                	'<div class="box">'+
                  	'<header>'+
                    	'<h5>'+test[0].project_name+'</h5>'+
                    	'<div class="toolbar">'+
                    	'<button id='+test[0].project_name+' class="btn btn-xs btn-success" onclick="viewstatus(this.id);">Status</button>'+
                      '<button id='+test[0].project_name+' class="btn btn-xs btn-primary" onclick="viewproject(this.id);">View</button>'+
                    	'</div>'+
                  	'</header>'+
              	'</div>'
		             $("#displayProjects").append(data);  
    	    }
    	    
    	    },
    	     error: function(response,text,err){
    	    	 alert(err);
    	 	 }
});
});

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
                    	'<button id='+o.project_name+' class="btn btn-xs btn-success" onclick="viewstatus(this.id);">Status</button>'+
                      '<button id='+o.project_name+' class="btn btn-xs btn-primary" onclick="viewproject(this.id);">View</button>'+
                    	'</div>'+
                  	'</header>'+
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
	console.log("you clicked on view of  project="+id);
	
	}
	function viewstatus(id){
	console.log("you clicked on status of project="+id);
	
	}