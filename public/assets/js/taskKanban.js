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
    	    console.log("JSON-"+stringjson);
    	  //  alert("JSON-"+stringjson);
    	    for(var i=0;i<o.length;i++)
    	    {
    	     var test=o[i].projects;
    	     console.log("test print"+JSON.stringify(test));
    	    var pname=query[2].split("#");
    	    if(test.length != 0 && test[0].project_name==pname[0])
    	    {
    	    
    	      for(var j = 0;j<test.length;j++)
    	      {
    	         if(j==0)
    	         {
    	           $("#projectNameSet").append(test[j].project_name);
    	         }
    	         if(test[j].Status=="In Progress")
    	         {
    	           var passdata=(test[j]);
    	            var data='<div id="'+j+'" style="background-color:hsla(210,100%,60%,0.5); border:1px solid #ccc; border-radius:4px; padding:3px; margin:2px;" >'+
    	            '<div align="right"><a title="'+j+'" data-original-title="" href="#" class="btn btn-primary btn-xs" onclick="editTask(this.title)"><i class="fa fa-edit" > Edit</i></a></div>'+
                   '<p><span class="label label-default">Task Name</span> : '+test[j].task_name+'</p>'+
                    '<p><span class="label label-info">Description</span> : '+test[j].Desc+'</p>'+
                    '<p><span class="label label-primary">Assignee</span> : '+test[j].Assignee+'</p>'+
                    '<p><span class="label label-default">Priority</span> : '+test[j].Priority+'</p>'+
                  '</div>';
    	       
    	             $("#inProgresSet").append(data);
    	              $("#"+j).data("test",test[j]);
    	   
    	         }
    	         else if(test[j].Status=="Done")
    	         {
    	           var passdata=JSON.stringify(test[j]);
    	            var data='<div id="'+j+'" style="background-color:hsla(90,100%,60%,0.5); border:1px solid #ccc; border-radius:4px; padding:3px; margin:2px;" >'+
    	            '<div align="right"><a title="'+j+'" data-original-title="" href="#" class="btn btn-primary btn-xs" onclick="editTask(this.title)"><i class="fa fa-edit" > Edit</i></a></div>'+
                   '<p><span class="label label-default">Task Name</span> : '+test[j].task_name+'</p>'+
                    '<p><span class="label label-info">Description</span> : '+test[j].Desc+'</p>'+
                    '<p><span class="label label-primary">Assignee</span> : '+test[j].Assignee+'</p>'+
                    '<p><span class="label label-default">Priority</span> : '+test[j].Priority+'</p>'+
                  '</div>';
    	       
    	             $("#doneSet").append(data);
    	              $("#"+j).data("test",test[j]);
    	   
    	         }
    	          else if(test[j].Status=="Requested")
    	         {
    	          var passdata=JSON.stringify(test[j]);
    	          
    	            var data='<div id="'+j+'" style="background-color:hsla(60,100%,50%,0.5); border:1px solid #ccc; border-radius:4px; padding:3px; margin:2px;" >'+
    	            '<div align="right"><a title="'+j+'" data-original-title="" href="#" class="btn btn-primary btn-xs" onclick="editTask(this.title)"><i class="fa fa-edit" > Edit</i></a></div>'+
                   '<p><span class="label label-default">Task Name</span> : '+test[j].task_name+'</p>'+
                    '<p><span class="label label-info">Description</span> : '+test[j].Desc+'</p>'+
                    '<p><span class="label label-primary">Assignee</span> : '+test[j].Assignee+'</p>'+
                    '<p><span class="label label-default">Priority</span> : '+test[j].Priority+'</p>'+
                  '</div>';
    	       
    	             $("#requestedSet").append(data);
    	             $("#"+j).data("test",test[j]);
    	         }
    	      }
           
    	    }
    	     
    	     
    	   
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
  
     
  
   $.ajax({
    	    type: "POST",
    	    url: "editTask",
    	    dataType: 'json',
    	    data : o,
    	    async: false,
    	    crossDomain : true,
    	    success: function(data){
    	    
		
$("#closemodel").click();
			       console.log("Update successfully");
			       location.reload();
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
	function navigateToDashboard()
	{
	 var windowUrl = window.location.href;
	 var query = windowUrl.split("?");
	 window.open("/dashboardKanban.html?" + query[1], "_self");
	 
	}
	function editTask(data){
	console.log("called");
	 var getthus=$("#"+data).data("test");
	 $("#project_name").val(getthus.project_name);
	 $("#task_name").val(getthus.task_name);
	 $("#dp1").val(getthus.start_date);
	 $("#dp2").val(getthus.end_date);
	 $("#Desc").val(getthus.Desc);
	 $("#Task_Type").val(getthus.Task_Type);
	 $("#Assignee").val(getthus.Assignee);
	 $("#Status").val(getthus.Status);
	 $("#Priority").val(getthus.Priority);
	 $("#dataModalButton").click();
	}