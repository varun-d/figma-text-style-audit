import { getTextStyles } from "./lib/getStyles.ts";
// Show the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(300, 500);

// Don't care about invisible
figma.skipInvisibleInstanceChildren = true;

// Enum for Library Type. No Lib, Local, Remote (Team Libraries) or Mixed
// enum libraryLocation {
//   NONE = "No Library",
//   LOCAL = "Local Library",
//   REMOTE = "Remote Library",
//   MIXED = "Mixed Styles",
// }

// CSVModel to hold all the CVS Data that would be exported. Currently only Text Styles
// type CSVModel = {
//   styleType: string;
//   nodeName: string;
//   styleName: string;
//   libraryLocation: libraryLocation;
// };

// Const array for the object data
// const allStyles: CSVModel[] = [];

// All Find functions here. This may take a LOT of time?
// Get all text nodes within page
// TODO: Traverse PAGES!
const text_nodes = figma.currentPage.findAllWithCriteria({
  types: ["TEXT"],
});

// Run through to get all four kinds of Styles, starting with textStyles
// text_nodes.map(node=> node.getStyledTextSegments)
// Check if it's in local styles, if not, it's from a library figma.getLocalTextStyles()
// function getTextStyles() {
//   // Run through all nodes on page
//   text_nodes.map((node) => {
//     const txtStyleID = node.textStyleId;
//     const fillStyleID = node.fillStyleId;

//     console.log(fillStyleID);
//     if (txtStyleID != "") {
//       if (txtStyleID === figma.mixed) {
//         allStyles.push({
//           styleType: "Text Style",
//           nodeName: node.name,
//           styleName: "Mixed",
//           libraryLocation: libraryLocation.MIXED,
//         });
//         // console.log("Mixed")
//       } else {
//         // Else, note the ! on style?.name as it may be undefined.
//         const style = figma.getStyleById(txtStyleID);
//         const libLoc = style?.remote
//           ? libraryLocation.REMOTE
//           : libraryLocation.LOCAL;
//         allStyles.push({
//           styleType: "Text Style",
//           nodeName: node.name,
//           styleName: style?.name!,
//           libraryLocation: libLoc,
//         });
//         // console.log(style?.name)
//       }
//     } else {
//       // console.log("No Style")
//       allStyles.push({
//         styleType: "Text Style",
//         nodeName: node.name,
//         styleName: "None",
//         libraryLocation: libraryLocation.NONE,
//       });
//     }
//   });
// }

// Debug Section
// console.log(allStyles)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "text-styles") {
    console.log("Getting Text Styles");
    // Running function to get Text Styles here
    const txtStyleData = getTextStyles(text_nodes);
    // After getting the text styles, post to UI for download
    figma.ui.postMessage(txtStyleData);
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  if (msg.type === "cancel") {
    console.log("Closing Plugin");
    figma.closePlugin();
  }
};
