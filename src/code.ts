
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(300,500);

// Don't care about invisible
figma.skipInvisibleInstanceChildren = true

// All Variables
enum libraryLocation {
  NONE = 'No Library',
  LOCAL = 'Local Library',
  REMOTE = 'Remote Library',
  MIXED = 'Mixed Styles'
}

type CSVModel = {
  styleType: string,
  nodeName: string,
  styleName: string,
  libraryLocation: libraryLocation
}



const allStyles: CSVModel[] = []

// Get all text nodes within page
const text_nodes = figma.currentPage.findAllWithCriteria({
  types: ['TEXT']
})

// Run through to get all four kinds of Styles, starting with textStyles
// text_nodes.map(node=> node.getStyledTextSegments)
// Check if it's in local styles, if not, it's from a library figma.getLocalTextStyles()

text_nodes.map((node)=>{
  const styleID = node.textStyleId
  if (styleID != '') {
    if (styleID === figma.mixed) {
      allStyles.push({styleType: 'Text Style', nodeName: node.name, styleName: 'Mixed', libraryLocation: libraryLocation.MIXED })
      // console.log("Mixed")
    } else {
      // Else, note the ! on style?.name as it may be undefined.
      const style = figma.getStyleById(styleID)
      const libLoc = style?.remote ? libraryLocation.REMOTE: libraryLocation.LOCAL
      allStyles.push({styleType: 'Text Style', nodeName: node.name, styleName: style?.name!, libraryLocation: libLoc })
      // console.log(style?.name)
    } 
  } else {
    // console.log("No Style")
    allStyles.push({styleType: 'Text Style', nodeName: node.name, styleName: 'None', libraryLocation: libraryLocation.NONE })
  }
})

figma.ui.postMessage(allStyles)

// console.log(allStyles)

// Get all style names figma.getStyleById('S:706615f1239815d9f79401d19c8eed624a9e4a20,62:48').name


// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'submit') {
    console.log("Finished this:", msg.type)
    console.log("Finished this:", msg.fileName)
    // const nodes: SceneNode[] = [];
    // for (let i = 0; i < msg.count; i++) {
      //   const rect = figma.createRectangle();
      //   rect.x = i * 150;
      //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      //   figma.currentPage.appendChild(rect);
      //   nodes.push(rect);
      // }
      // figma.currentPage.selection = nodes;
      // figma.viewport.scrollAndZoomIntoView(nodes);
    }
    
    figma.closePlugin();
    // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
//   figma.closePlugin();
};

/*
    function downloadCSV(csv) {
      let csvContent = "data:text/csv;charset=utf-8,";
      var encodedUri = encodeURI(csvContent + csv);

      window.open(encodedUri);
      downloadBTN.setAttribute("href", encodedUri);
      downloadBTN.setAttribute("download", projectName + ".csv");
    }

    function arrayToCSV(inputObject) {
      if (!inputObject.urlList || !Array.isArray(inputObject.urlList) || inputObject.urlList.length === 0) {
        return ''; // Return an empty string if the input is invalid
      }

      // Create the CSV header row
      const header = '=UPPER("name"),=UPPER("viewport") ,=UPPER("url")\n';

      // Map the urlList array to CSV rows
      const csvData = inputObject.urlList.map(item => {
        const { name, viewport, url } = item;
        // return '=UPPER("' + name + '"), ' + viewport + ',=HYPERLINK("' + url + '")';
        return `${name}, ${viewport},=HYPERLINK("${url}")`;
      }).join('\n');

      // Combine the header and CSV data
      const csvString = header + csvData;

      return csvString;
    }
*/