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
    	    url: "/getScrumProjects",
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
    	    var pname=query[2].split("#");
    	    if(test.length != 0 && test[0].project_name==pname[0])
    	    {
    	    
    	      for(var j = 0;j<test.length;j++)
    	      {
    	         if(j==0)
    	         {
    	           $("#projectNameSet").append(test[j].project_name);
    	         }
    	         
    	         console.log("this is=>"+JSON.stringify(test[j]));
    	           var passdata=(test[j]);
    	           var stdate=test[j].start_date.split("T");
    	           var etdate=test[j].end_date.split("T");
    	           var data='<tr id="'+j+'">'+
                          '<td><a title="'+j+'" data-original-title="" href="#" class="btn btn-primary btn-xs" onclick="editTask(this.title)"><i class="fa fa-edit" > Edit</i></a></td>'+
                          '<td>'+test[j].project_name+'</td>'+
                          '<td>'+test[j].task_name+'</td>'+
                          '<td>'+stdate[0]+'</td>'+
                          '<td>'+etdate[0]+'</td>'+
                          '<td>'+test[j].Team_velocity+'</td>'+
                          '<td>'+test[j].Actual_points+'</td>'+
                          '<td>'+test[j].Points_Expected+'</td>'+
                          '<td>'+test[j].Point_Completed+'</td>'+
                          '</tr>';
    	            
    	             $("#scrumdataSet").append(data);
    	             
    	              $("#"+j).data("test",test[j]);
    	   
    	         
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
    	    url: "editScrumTask",
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
	 window.open("/dashboardEasyBacklog.html?" + query[1], "_self");
	 
	}
	function editTask(data){
	console.log("called");
	 var getthus=$("#"+data).data("test");
	// alert(JSON.stringify(getthus));
	 $("#project_name").val(getthus.project_name);
	 $("#task_name").val(getthus.task_name);
	 $("#dp1").val(getthus.start_date);
	 $("#dp2").val(getthus.end_date);
	 $("#Team_velocity").val(getthus.Team_velocity);
	 $("#Actual_points").val(getthus.Actual_points);
	 $("#Points_Expected").val(getthus.Points_Expected);
	 $("#Point_Completed").val(getthus.Point_Completed);
	 
	 $("#dataModalButton").click();
	}