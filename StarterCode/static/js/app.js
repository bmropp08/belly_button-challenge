
const optionChanged = async (id) => {
    let {metadata,samples} = await d3.json('./static/Resource/samples.json');
    let meta = metadata.filter(obj => obj.id == id)[0];
    let sample = samples.filter(obj => obj.id == id)[0];

    // metadata
    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key,val])=>{
        d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`)
    });
}
    // Bar Chart
    //let {otu_ids,sample_values,otu_labels} = sample;
    function init(){
        let data = [{
            values: sample_values,
            labels: otu_ids,
            type: 'bar',
            options:{
                indexAxis: 'y'
            }
        }];
        let layout = {
            height: 600,
            width: 800
        };
        Plotly.newPlot('bar',data,layout);
    }
    

(async () => {
    let {names} = await d3.json('./static/Resource/samples.json');

    names.forEach(id => {
        d3.select('select').append('option').text(id)
    });

    optionChanged(names[0])
    
    // console.log(names);
})();




