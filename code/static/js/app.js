//Module 14 Challenge
//Tali Tesar
//February, 2023


//////////// Setting up data *NOTE: data variable from data.js file
 
var options = data.names.map((index,id)=>[index,id])

console.log(data)
console.log(options)

let testData = options[0][0]
let testDataIndex = options[0][1]

console.log(testData)
console.log(testDataIndex)

//////////// Creating Bar chart
function initBar() {

    let barChart = [{
        type: 'bar',
        x: data.samples[testDataIndex].sample_values.slice(0,10).reverse(),
        y: data.samples[testDataIndex].otu_ids.slice(0,10).reverse().map(item => `OTU ${item}`),
        text: data.samples[testDataIndex].otu_labels.slice(0,10).reverse(),
        orientation: 'h'
    }];

    let layout = [{
        title: "Top operational taxonomic units (OTU)s"
    }]

    Plotly.newPlot("bar",barChart, layout);
}

initBar()
//////////// Creating Bubble chart

function initBubble(){
    let bubbleChart = [{
        mode: "markers",
        x: data.samples[testDataIndex].otu_ids,
        y: data.samples[testDataIndex].sample_values,
        marker: {
            size: data.samples[testDataIndex].sample_values,
            color: data.samples[testDataIndex].otu_ids
        },
        text: data.samples[testDataIndex].otu_labels
    }]

    let layout =[{
        xaxis: {title: "OTU ID"}
    }]

    Plotly.newPlot("bubble",bubbleChart, layout)
}

initBubble()
////////////