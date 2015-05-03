$( document ).ready(function() {
     $("#divLoading").addClass('show');
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
    	    setTimeout( "$('#divLoading').removeClass('show');",3000 );
    	    
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
    	    url: "/createTaskKanban",
    	    dataType: 'json',
    	    data : o,
    	    async: false,
    	    crossDomain : true,
    	    success: function(data){
    	    
		
            $("#closemodel").click();
			       console.log("User task successfully");
			       location.reload();
    	    },
    	     error: function(response,text,err){
    	    	 alert(err);
    	 	 }
    	   });
    
	}
function viewproject(id){
	console.log("you clicked on view of  project="+id);
	var windowUrl = window.location.href;
	var query = windowUrl.split("?");
	    
	window.open("/taskKanban.html?" + query[1] + "?" + id, "_self");
	
	}
	
function viewstatus(id){
    console.log("you clicked on status of project="+id);
    var windowUrl = window.location.href;
	var query = windowUrl.split("?");
    ///getQueue
    var reqData = {
        "email_id" : query[1],
        "project_name" : id
    };
    $.ajax({
	    type: "POST",
	    url: "/getQueue",
	    dataType: 'json',
	    data : reqData,
	    async: false,
	    crossDomain : true,
	    success: function(data){
	    	document.getElementById("colorPickerBlock1").innerHTML = "";
		    var doneArray = data[0].Done;
		    var inProgressArray = data[1].InProgress;
		    var requestedArray = data[2].Requested;
		    if(doneArray.length !=0){
			    var data1 = '<h4>Done</h4>' + '<ul>';
			    for(var i=0;i<doneArray.length;i++)
			    {
			    	data1 += '<li>' + doneArray[i] + '</li>';
			    }
			    data1+='</ul>';
			    alert(data1);
			       		
			    $("#testi").append(data1);
		    }
		    if(requestedArray.length !=0){
			    var data1 = '<h4>Requested</h4>' + '<ul>';
			    for(var i=0;i<requestedArray.length;i++)
			    {
			    	data1 += '<li>' + requestedArray[i] + '</li>';
			    }
			    data1+='</ul>';
			    alert(data1);
			       		
			    $("#testi").append(data1);
		    }
		    var pieData = [
				{
					value: 3,
					color:"hsla(60,100%,50%,0.75)",
					highlight: "hsla(58,100%,50%,0.5)",
					label: "Requested"
				},
				{
					value: 2,
					color: "hsla(210,100%,60%,0.75)",
					highlight: "hsla(210,100%,60%,0.5)",
					label: "In Progress"
				},
				{
					value: 1,
					color: "hsla(90,100%,60%,0.75)",
					highlight: "hsla(90,100%,60%,0.5)",
					label: "Done"
				},
				
			];

		
				var ctx = document.getElementById("chart-area").getContext("2d");
				window.myPie = new Chart(ctx).Pie(pieData);
		


		   /* if(inProgressArray.length !=0){
			    var data1 = '<h4>In Progress</h4>' + '<ul>';
			    for(var i=0;i<inProgressArray.length;i++)
			    {
			    	data1 += '<li>' + inProgressArray[i] + '</li>';
			    }
			    data1+='</ul>';
			    alert(data1);
			       		
			    $("#colorPickerBlock1").append(data1);
		    }*/
		    
		    
	
	    },
	     error: function(response,text,err){
	    	 alert(err);
	 	 }
	   });
	   
	   //$("#hiddenDiv").click();
	}
	
	function navigateToDashboard()
	{
	    var windowUrl = window.location.href;
	    var query = windowUrl.split("?");
	    window.open("/dashboardKanban.html?" + query[1], "_self");
	}