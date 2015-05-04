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
    	    console.log("JSON-"+stringjson);
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
                  	'<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>'+
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
     
   $.ajax({
    	    type: "POST",
    	    url: "/createScrumTask",
    	    dataType: 'json',
    	    data : o,
    	    async: false,
    	    crossDomain : true,
    	    success: function(data){
    	    
		
    $("#closemodel").click();
			       console.log("User added successfully");
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
	    
	window.open("/taskEasyBacklog.html?" + query[1] + "?" + id, "_self");
	
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
	    url: "/getScrumStatus",
	    dataType: 'json',
	    data : reqData,
	    async: false,
	    crossDomain : true,
	    success: function(data){
	    
	    	console.log(data);
	    	var dateArray =[];
	    	var pointCompletedArray =[];
	    	var pointExpectedArray =[];
	    	var expectedDate ;
	    	for(var j=0; j<data.length;j++)
	    	{
	    	    if(data[j].name == "end_date")
	    	    dateArray = data[j].value;
	    	    if(data[j].name == "Point_Completed")
	    	    pointCompletedArray = data[j].value;
	    	    if(data[j].name == "Points_Expected")
	    	    pointExpectedArray = data[j].value;
	    	    if(data[j].name == "Expected_Completion_Date")
	    	    expectedDate = data[j].value;
	    	}
	        
	        var splitDateArray = []
	        for(var i =0 ; i< dateArray.length ; i++)
	        {
	            var first;
	            first = (dateArray[i].split("T"));
	            splitDateArray.push(first[0]);
	           
	        }
	        
	        var finalintCompletedArray = [];
	        for(var l =0 ; l<pointCompletedArray.length; l++)
	        {
	            finalintCompletedArray.push(parseInt(pointCompletedArray[l]));
	        }
	        
	    	var intpointExpectedArray = [];
	    	for(var k =0 ;k <pointExpectedArray.length;k++)
	    	{
	    	   intpointExpectedArray.push(parseInt(pointExpectedArray[k]));
	    	}
            
	    	console.log(dateArray);
	    	console.log(finalintCompletedArray);
	    	console.log(intpointExpectedArray);
	    	$('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Burn Down Chart'
        },
        subtitle: {
            text: 'Expected Completion Date:' + expectedDate
        },
        xAxis: {
            categories: splitDateArray
        },
        yAxis: {
            title: {
                text: 'Points'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Point Completed',
            data: finalintCompletedArray
        }, {
            name: 'Point Expected',
            data: intpointExpectedArray
        }]
    });

	    },
	     error: function(response,text,err){
	    	 alert(err);
	 	 }
	   });
	}
	
	function navigateToDashboard()
	{
	 var windowUrl = window.location.href;
	 var query = windowUrl.split("?");
	 window.open("/dashboardKanban.html?" + query[1], "_self");
	 
	}