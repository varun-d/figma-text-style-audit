import { getTextNodeStyles } from "./lib/getTextNodeStyles.ts";
// Show the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(300, 500);

// Don't care about invisible
figma.skipInvisibleInstanceChildren = true;

// On current page, findAllWithCriteria for text_nodes, as defined by TEXT types.
// Currently, you will need to run this page by page
const text_nodes = figma.currentPage.findAllWithCriteria({
  types: ["TEXT"],
});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // my HTML page is to use an object with a "type" property like this.
  if (msg.type === "text-styles") {
    console.log("Getting Text Styles");
    // Running function to get Text Styles here
    const txtStyleData = getTextNodeStyles(text_nodes);
    // After getting the text styles, post to UI for download
    figma.ui.postMessage({ status: "txtStyleDone", csvdata: txtStyleData });
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  if (msg.type === "cancel") {
    console.log("Closing Plugin");
    figma.closePlugin();
  }
};
