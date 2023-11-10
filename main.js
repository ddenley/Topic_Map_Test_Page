
const dataDirectory = './data/test/';
const urls = {
    mainMap : dataDirectory + 'mainMap.json',
    subMaps : dataDirectory + 'subMaps.json',
    mainModel : dataDirectory + 'mainModel.json',
    subModel : dataDirectory + 'subModel.json',
    labelsIndex : dataDirectory + 'labelIndex.json',
    documents : dataDirectory + 'model.csv',
    distributionCoordinatorCountry : dataDirectory + 'distributionCoordinatorCountry.json',
    distributionCoordinatorName: dataDirectory + 'distributionCoordinatorName.json',
    distributionProjectStatus: dataDirectory + 'distributionProjectStatus.json',
    distributionEndDate: dataDirectory + 'distributionEndDate.json',
    trend: dataDirectory + 'distributionStartDate.json',
}

//Bar values x, y, left-margin
//distMax - max labels taken from distribution
const distribution_names = [
    {distName: 'Coordinator Country', distURL: 'distributionCoordinatorCountry', distMax: 10, barValues: [400, 150, 100]},
    {distName: 'Coordinator Name', distURL: 'distributionCoordinatorName', distMax: 10, barValues: [700, 150, 450]},
    {distName: 'Project Status', distURL: 'distributionProjectStatus', distMax: 2, barValues: [400, 150, 100]}
]

//****Managers****

let PM = tMap.PageManager('div#app', 'E', '2-4-2-l', 'div#header', 'div#footer', 700, 700);
let DM = tMap.DataManager();
let SM = tMap.StateManager();

//**** Main Visualizations****

//Main map
//TODO: Would like to show the normalized distribution as this is more informative
let mainMap = tMap.BubbleMap(PM.panel1.c, PM.panel1.w, PM.panel1.h)
    .toggleTitle('Main Topics')
    .setBubbleClick(selectMainTopic)
    .addDefaultText('Loading...', 2, true)
    .setTooltipChart((t,d)=>{
        let distNameEntries = getDistNameEntries(SM.state('distrib'));
        console.log(distNameEntries);
        let distURL = distNameEntries.distURL;
        let distMax = distNameEntries.distMax;
        let barValues_x = distNameEntries.barValues[0];
        let barValues_y = distNameEntries.barValues[1];
        let barValues_leftMargin = distNameEntries.barValues[2];
        let topEntries = topEntriesOnly(DM.getMainTopicDistribEntry(d.topicId, distURL), distMax);
        tMap.HorizontalBarChart(t, barValues_x, barValues_y)
            .setMarginLeft(barValues_leftMargin)
            .render(topEntries);
})


//Sub map
let subMap = tMap.BubbleMap(PM.panel2.c, PM.panel2.w + 50, PM.panel2.h)
    .setMargin([30, 20, 20, 20])
    .toggleTitle('Sub Topics')
    .setBubbleClick(selectSubTopic)
    .addDefaultText('Click on a bubble to see more topics.', 1, true)
    .setTooltipChart((t,d)=>{
        let distNameEntries = getDistNameEntries(SM.state('distrib'));
        console.log(distNameEntries);
        let distURL = distNameEntries.distURL;
        let distMax = distNameEntries.distMax;
        let barValues_x = distNameEntries.barValues[0];
        let barValues_y = distNameEntries.barValues[1];
        let barValues_leftMargin = distNameEntries.barValues[2];
        let topEntries = topEntriesOnly(DM.getSubTopicDistribEntry(d.topicId, distURL), distMax);
        tMap.HorizontalBarChart(t, barValues_x, barValues_y)
            .setMarginLeft(barValues_leftMargin)
            .render(topEntries);
    })

//Word cloud
let wordcloud = tMap.WordCloud(PM.panel3.c, PM.panel3.w + 50, PM.panel3.h)
    .setMargin([20, 10, 10, 10])
    .toggleTitle('Topic Labels')
    .addDefaultText('Click on a bubble to see more labels.', 1, true)

//----Table tooltip----
let tableTooltip = d => {
    let fields = [];
    fields.push(`Relevance: ${Math.floor(d.weight*100)}%`);
    return fields.join(' - ');
}

//Document view
let table = tMap.DocTable(PM.panel4.c, PM.panel4.w + 50, PM.panel4.h)
    .addDefaultText('Click on a bubble to see the topic top documents.',1,true)
    .toggleTitle('Top Documents')
    .setColumnsInfo([
        //{title: 'Acronym', accessor: d=>d.docData.project_acronym, tooltip:tableTooltip},
        {title:'Title',accessor:d=>d.docData.title, tooltip:tableTooltip},
        {title:'Objective',accessor:d=>shortenText(d.docData.objective, 200), tooltip:tableTooltip}
    ])
    .rowsFilter([0,20,60,90],(e,d)=>{table.render(DM.getTableRows(50, d2=>Math.floor(d2.weight*100)>=d),d)},'Min Relevance')

function shortenText(text, length){
    return text.length > length ? text.slice(0,length-3) + '...' : text;
}

let sumByMonth = DM.getTrendSumByFunction('%Y-%m-%d', '%Y-%m'),
    sumByYear = DM.getTrendSumByFunction('%Y-%m-%d', '%Y'),
    trendsRange = ['%Y-%m-%d', '2011-01-01', '2021-01-01'];

//Trend view
let trend = tMap.TrendChart(PM.panel5.c, PM.panel5.w + 50, PM.panel5.h)
    .toggleTitle('Topic Trend')
    .setDateTicks('%Y')
    .setValueTicks(6, '.1f')
    .addDefaultText('Click on a bubble to see the topic trend.',1,true)
    .setMargin([30, 40, 30, 10])


//**** Controls****

//Labels Search
let search = tMap.Search(PM.control1.c, PM.control1.w, PM.control1.h)
    .setSearchCB(searchLabels)

//Distribution dropdown
let dropdown = tMap.Dropdown(PM.control2.c, PM.control2.w, PM.control2.h)
    .setSelectCB(selectDistribution);


//****Functions****

//Main topic click function
function selectMainTopic(e,d){
    mainTopic = d.topicId;
    console.log("Selected main topic: ", d);
    //Update state
    SM.state('mainTopic', d.topicId);
    //Render new sub map
    renderSubMap();
    //Render wordcloud
    wordcloud.render(d.labels)
    //Show table documents
    DM.setTableRowsMainTopic(SM.state('mainTopic'));
    table.render(DM.getTableRows(50));

    //Rehighlight from search
    highlightFromLabelSearch();

    console.log("mainTopic:", mainTopic);
    console.log("sumByYear:", sumByYear);
    console.log("trendsRange:", trendsRange);

    // Ensure that sumByYear is a function that formats dates.
    sumByYear = DM.getTrendSumByFunction('%Y-%m-%d', '%Y');

    // Ensure that trendRange is an array specifying the format, start date, and end date.
    let trendRange = ['%Y-%m-%d', '2011-01-01', '2024-01-01'];

    // Use sumByYear and trendRange correctly in the call to getMainTopicTrend.
    trend.render([DM.getMainTopicTrend(mainTopic, sumByYear, trendRange)
        .map(d => { return { date: d.date, value: d.value, layer: 'main' }; })]).adjustTicks();
}

//Sub topic click function
function selectSubTopic(e,d){
    subTopic = d.topicId;
    console.log("Selected sub topic: ", d);
    //Show wordcloud
    SM.state('subTopic', d.topicId);
    wordcloud.render(d.labels);
    //Show table documents
    DM.setTableRowsSubTopic(SM.state('subTopic'));
    table.render(DM.getTableRows(50));

    //Rehighlight from search
    highlightFromLabelSearch();

    // Ensure that sumByYear is a function that formats dates.
    sumByYear = DM.getTrendSumByFunction('%Y-%m-%d', '%Y');

    // Ensure that trendRange is an array specifying the format, start date, and end date.
    let trendRange = ['%Y-%m-%d', '2011-01-01', '2024-01-01'];

    // Use sumByYear and trendRange correctly in the call to getMainTopicTrend.
    trend.render([DM.getSubTopicTrend(subTopic, sumByYear, trendRange)
        .map(d => { return { date: d.date, value: d.value, layer: 'sub' }; })]).adjustTicks();
}

//Function to render new sub map
function renderSubMap(){
    //Set state of subtopic back to none
    SM.state('subTopic', null);
    subMap.render(DM.getSubMap(SM.state('mainTopic')));
}

//Search function
function searchLabels(query){
    SM.state('search', query.length > 0 ? query : null);
    DM.setSearchTerm(SM.state('search'));
    highlightFromLabelSearch()
}

//Distribution dropdown function
function selectDistribution(){
    console.log("Selected distribution: ", dropdown.getSelected().value);
    SM.state('distrib', dropdown.getSelected().value);
}

//Function to highlight from search
function highlightFromLabelSearch(){
    let {mainTopicIds, subTopicIds} = DM.getTopicIdsFromSearch();
    mainMap.highlightBubbles(mainTopicIds);
    subMap.highlightBubbles(subTopicIds);
    let labels = DM.getLabelsFromSearch();
    wordcloud.highlightTexts(labels);
    let docIds = DM.getDocIdsFromSearch();
    table.highlightDocs(docIds);
}

//Helper functions
function getDistNameEntries(distName){
    //Get distribution values from distribution_names
    let dist = distribution_names.find(d=>d.distName==distName);
    return dist;
}

function topEntriesOnly(entries, n=10){
    entries.sort((a,b)=>b.value-a.value);
    return entries.slice(0,n);
}


//****Load and Process Data****

DM.loadAndProcessDataFromUrls(urls).then(()=>{
    //console.log(DM.data);
    mainMap.render(DM.data.mainMap);

    // Load distribution into dropdown control
    dropdown.setOptions(distribution_names.map(d=>{return {value:d.distName, text:d.distName}}));

    //Set default distribution
    SM.state('distrib', distribution_names[0].distName);

})