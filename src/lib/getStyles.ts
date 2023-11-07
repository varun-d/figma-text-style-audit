/**
 * @file Func lib for text and fill styles.
 * @author Varun Dhanwantri <varun@thisnameless.com>
 */

// Enum for Library Type. No Lib, Local, Remote (Team Libraries) or Mixed
enum libraryLocation {
  NONE = "No Library",
  LOCAL = "Local Library",
  REMOTE = "Remote Library",
  MIXED = "Mixed Styles",
}

type CSVModel = {
  styleType: string;
  nodeName: string;
  styleName: string;
  libraryLocation: libraryLocation;
};

/**
 * Get text and fill styles for Figma text node from TextNode array,
 * and return a CSV ready object array
 * @param {TextNode[]} textNodeCollection - TextNode Array
 * @returns {CSVModel[]} - The text and fill style object array ready for CSV.
 * @todo fillStyle to be added to the CSV
 */
export function getTextStyles(textNodeCollection: TextNode[]): CSVModel[] {
  const _stylesObjArr: CSVModel[] = [];
  // Run through all nodes on page
  textNodeCollection.map((node) => {
    const txtStyleID = node.textStyleId;
    const fillStyleID = node.fillStyleId;

    console.log(fillStyleID);
    if (txtStyleID != "") {
      if (txtStyleID === figma.mixed) {
        _stylesObjArr.push({
          styleType: "Text Style",
          nodeName: node.name,
          styleName: "Mixed",
          libraryLocation: libraryLocation.MIXED,
        });
        // console.log("Mixed")
      } else {
        // Else, note the ! on style?.name as it may be undefined.
        const style = figma.getStyleById(txtStyleID);
        const libLoc = style?.remote
          ? libraryLocation.REMOTE
          : libraryLocation.LOCAL;
        _stylesObjArr.push({
          styleType: "Text Style",
          nodeName: node.name,
          styleName: style?.name!,
          libraryLocation: libLoc,
        });
        // console.log(style?.name)
      }
    } else {
      // console.log("No Style")
      _stylesObjArr.push({
        styleType: "Text Style",
        nodeName: node.name,
        styleName: "None",
        libraryLocation: libraryLocation.NONE,
      });
    }
  });
  return _stylesObjArr;
}
