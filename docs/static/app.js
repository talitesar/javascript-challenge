//Module 14 Challenge
//Tali Tesar
//February, 2023


/////////////////////// Setting up data *NOTE: data variable from data.js file ///////////////////////

// Set a variable for all the different possible ids to be used in dropdown menu
var options = data.names.map((index,id)=>[index,id])

// Use a for loop to append all the ids as options in the dropdown menu where the value is the index for easy lookup
// and the display is the id number for visualization
for (let i=0;i<options.length;i++){
    d3.select('#selDataset').append('option').text(options[i][0]).attr("value",options[i][1])
};

// Set a variable for the inital display that is the first id value and index
var initId = options[0][0]
var initIndex = options[0][1]

/////////////////////// Creating Bar chart ///////////////////////

// Initialize a function to create the inital bar chart
function initBar() {

    // Create a variable storing all the information for the bar chart
    let barChart = [{
        type: 'bar',
        // Use the initial index to store the appropriate information for x, y, and text, taking only 
        //top 10 values and reordering them
        x: data.samples[initIndex].sample_values.slice(0,10).reverse(),
        y: data.samples[initIndex].otu_ids.slice(0,10).reverse().map(item => `OTU ${item}`),
        text: data.samples[initIndex].otu_labels.slice(0,10).reverse(),
        // Make the orientation horizontal
        orientation: 'h'
    }];

    // Create a layout variable to add a title to the chart
    let layout = {
        title: {
            text:"Top Operational Taxonomic Units (OTU) Present in Subject's Bellybutton",
            font:{
                size:12}}
    }
    // Create a plot under the id "bar" with this information
    Plotly.newPlot("bar",barChart,layout);
}

// Run the function
initBar();

/////////////////////// Creating Bubble chart ///////////////////////

// Initialize a function to create an intial bubble chart
function initBubble(){

    // Create a variable to store all the information for the chart
    let bubbleChart = [{
        mode: "markers",
        // Use the initial index to store the appropriate information for x, y, marker, and text
        x: data.samples[initIndex].otu_ids,
        y: data.samples[initIndex].sample_values,
        marker: {
            size: data.samples[initIndex].sample_values,
            color: data.samples[initIndex].otu_ids
        },
        text: data.samples[initIndex].otu_labels
    }]

    // Create a layout variable to add title and x-axis label
    let layout ={
        title: "Prevalence of each Operational Taxonomic Unit (OTU) in Subject's Bellybutton",
        xaxis: {title:"OTU ID"}
    }
    // Create a plot under the id "bubble" with this information
    Plotly.newPlot("bubble",bubbleChart,layout)
};

// Run the function
initBubble();

/////////////////////// Populating Demographic Info Table ///////////////////////

// Initialize a function to populate the demographic info table
function initInfo(){

    // Use the initial index to store the keys and values of the metadata object
    let values = Object.values(data.metadata[initIndex])
    let keys = Object.keys(data.metadata[initIndex])

    // Loop through the values and keys and append them to the panel under the id "sample-metadata",
    // creating a new class for each div
    for (let i=0;i<keys.length;i++){
        d3.select("#sample-metadata").append('div').text(`${keys[i]}: ${values[i]}`).attr("class",`el${i}`)
    }
};

// Run the function
initInfo();

/////////////////////// Updating charts based on drop down results ///////////////////////

// Set up to trigger the newData function when the dropdown menu value is changed
d3.selectAll("#selDataset").on("change",newData);

// Initialize the function to gather new data based on the new values
function newData() {

    // Store a variable that is the index associated with the id number selected
    let index = d3.select('#selDataset').property("value");

    // Store new x, y, and text variables for the bar chart using the new index value
    let barX= data.samples[index].sample_values.slice(0,10).reverse();
    let barY= data.samples[index].otu_ids.slice(0,10).reverse().map(item => `OTU ${item}`);
    let barText= data.samples[index].otu_labels.slice(0,10).reverse();

    // Input the new information into the function to update the bar chart
    updatePlotlyBar(barX,barY,barText);

    // Store new x, y, marker, and text variables for the bubble chart using the new index value
    let bubX= data.samples[index].otu_ids;
    let bubY =data.samples[index].sample_values;
    let bubMarker= {
            size: data.samples[index].sample_values,
            color: data.samples[index].otu_ids
        };
    let bubText=data.samples[index].otu_labels;

    // Input the new information into the function to update the bubble chart
    updatePlotlyBubble(bubX,bubY,bubMarker,bubText);

    // Store updated metadata keys and values using the index variable
    let values = Object.values(data.metadata[index])
    let keys = Object.keys(data.metadata[index])

    // Use a for loop to update the text within the demographic info table
    for (let i=0;i<keys.length;i++){
        d3.select("#sample-metadata").select(`.el${i}`).text(`${keys[i]}: ${values[i]}`)
    };
};

// Initialize a function to update the bar chart with a new given x, y, and text value
function updatePlotlyBar(x,y,text){
    Plotly.restyle("bar",'x',[x]);
    Plotly.restyle("bar",'y',[y]);
    Plotly.restyle("bar",'text',[text])};

// Initialize a function to update the bubble chart with a new given x, y, marker, and text value
function updatePlotlyBubble(x,y,marker,text){
    Plotly.restyle("bubble",'x',[x]);
    Plotly.restyle("bubble",'y',[y]);
    Plotly.restyle("bubble",'marker',[marker])
    Plotly.restyle("bubble",'text',[text])};
