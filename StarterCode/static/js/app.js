
const optionChanged = async (id) => {
    let {metadata,samples} = await d3.json('./static/Resource/samples.json');
    let meta = metadata.filter(obj => obj.id == id)[0];
    let sample = samples.filter(obj => obj.id == id)[0];
    bar_chart(id);
    // metadata
    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key,val])=>{
        d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`)
    });
}
    // Bar Chart
    
    function bar_chart(id){
        d3.json('./static/Resource/samples.json').then((data) =>{
            let samples = data.samples;
        let sample = samples.filter(obj => obj.id == id)[0];
        let values = sample.sample_values.slice(0,10).reverse();
        let ids = sample.otu_ids.slice(0,10).reverse();
        let yticks = ids.map(d => 'OTU ' + d);
        console.log(yticks);
        let bar_data = [{
            x : values,
            y : yticks,
            text: sample.otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];
        let layout = {
            height: 600,
            width: 800,
            title: 'Top 10 OTUs'
        };
        Plotly.newPlot('bar',bar_data,layout);
    })}

        // Bubble Chart
    
        function bubble_chart(id){
            d3.json('./static/Resource/samples.json').then((data) =>{
                let samples = data.samples;
            let sample = samples.filter(obj => obj.id == id)[0];
            let ids = sample.otu_ids;
            let values = sample.sample_values;
            let bubble_data = [{
                x : ids,
                y : values,
                mode: 'markers',
                marker: {
                    size: values,
                    color: ids,
                    sizemode: 'diameter'
                },
                text: sample.otu_labels,
                type: 'scatter',
            }];
            let layout = {
                height: 600,
                width: 800,   
            };
            Plotly.newPlot('bubble',bubble_data,layout);
        })}
    

(async () => {
    let {names} = await d3.json('./static/Resource/samples.json');

    names.forEach(id => {
        d3.select('select').append('option').text(id)
    });

    optionChanged(names[0])
    bar_chart(names[0])
    bubble_chart(names[0]);
})();




