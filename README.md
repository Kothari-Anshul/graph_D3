# PLOT GRAPH USING NODEJS D3 LIBRARY
INPUT: India Census 2011 survey data, according to category(GEN/SC/ST) 
OUTPUT: Plot Bar Graph (1) Number of Literate Persons Vs Age-Group (2) Number of Literate Persons Vs Category

## Project Structure Used:
The main folder graph_D3 contains the following:
* css: contains style.css file for styling index.html
* js: contains initial.js file to generate JSON files from give CSV files
* index.html: this files contains the markup of the display page and also scripts to plot the grpah using the JSON file.
* other files: contains nodejs module information and also eslint config file used in the project

## Steps to execute the scripts on your local machine are as follows:
* clone the repository by executing git clone "this project URL"
* copy your 3 CSV files in the **js** directory 
* change directory to the **js** folder and execute node initial.js (This should create 2 JSON files in the graph_D3 directory)
* change directory to the **graph_D3** and execute http-server
* copy the URL address generated by the http server in your browswer  (Ensure you have good Internet Connectivity)
* Kudos! you have got your graphs displayed on your screen based on the data provided.

