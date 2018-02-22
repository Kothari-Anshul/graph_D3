
function read_file(){
	var LineByLineReader = require('line-by-line');
    
    

	var file_names = ["India2011.csv", "IndiaSC2011.csv", "IndiaST2011.csv"];
	var labels = ["GEN","ST","SC"];
	var dict = {};
	var edu_category = {};
	var fileRead = 0;
	
	var i  = 0;
	for(i=0; i<file_names.length; i++){
		
		var lr = new LineByLineReader(file_names[i]);
		lr.line_count = 0;
		lr.label = labels[i];
		lr.on('line', function (line) {
			this.line_count++;
			if(this.line_count == 1){
				/* do nothing its header section */
			}
			else{
				var values = line.split(",");
				if(values[4] == "Total" && values[5] != "Age not stated" && values[5] != "All ages")
				{	if(values[5] in dict){
						dict[values[5]] += parseInt(values[12]);
					}
					else{
						dict[values[5]] = parseInt(values[12]);
					}
					
				}
				 /*for reading data according to education category */
				 
				
				 if(this.label in edu_category){
				 	//console.log(this.label);
				 	edu_category[this.label] += parseInt(values[12]);
					
				}else{
					edu_category[this.label] = parseInt(values[12]);

					
					
				}

			}
			
			

		});

		lr.on('end', function () {
			fileRead++;
			
			if(fileRead == 3){
				
				
				/* Create first file to plot for i.e agegroup versus number of literate persons*/
				var fs = require('fs');
				fs.writeFile("plot1.json", JSON.stringify(dict), function(err) {
	    		if(err) {
	        		return console.log(err);
	    		}

	    		
				}); 
				/* Create second file to plot for category versus number of literate persons*/
				var fs = require('fs');
				fs.writeFile("plot2.json", JSON.stringify(edu_category), function(err) {
	    		if(err) {
	        		return console.log(err);
	    		}

	    		
				}); 
			}

		});
	}




	


}
read_file();