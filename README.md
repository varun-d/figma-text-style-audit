# Style Audit

A simple Figma plugin to track all styles across a file & and the current page.

## Why do we need this plugin?

We have a primary design system serving about 80+ projects. Every year we update our design system.
It's difficult to track what styles are being used, and what styles aren't.

Knowing what styles are least used / most used, we can have a plan to purge or keep styles.

## Challenges with auditing styles

Some challenges still remain. For example, running this plugin across multiple files.
We sorted this out by running the plugin on ONE big file with a copy of our main design files. Think of this file like our case study. One advantage of this is we skip over drafts, trials and random archive pages within our normal design files.

## Contributing

Feel free to contribute to this plugin. TODO: I will create a CONTRIBUTING.md file for fellow collaborators.

## Resources

https://forum.figma.com/t/how-to-perform-asynchronous-functions-in-plugin/48424
https://www.figma.com/plugin-docs/api/properties/nodes-findallwithcriteria/
https://forum.figma.com/t/how-to-process-nodes-asynchronously-in-batches/48304/8
https://forum.figma.com/t/figma-layers-tree-traversal-estimating-size/551

# Notes

textStyleId 1 -> WIP
fillStyleId 3 -> WIP
strokeStyleId -> WIP
effectStyleId -> Todo
gridStyleId -> Todo

This is critical! "build:js": "esbuild src/code.ts --target=es2019 --bundle --outfile=dist/code.js",
Or else your ? optional chaining will not work. Fuck the JS world...

## What's being Audited

NodeType: Text or Object (shapes, frames, etc)
Styles: Text Styles, fillColor and strokeColor
Style Locale: Local Style, External Library, Mixed Style

### Todo and WIP

2. Text Node - textStyleId, fillStyleId for text. These are critical!
3. Fix UI. Have a simple button to Download CSV of text stles/ fill styles
   Install tailwind
4. Have a place to ADD IDs too... This could be vital to connect the dots. ID, properties like
5. Can I pull in font size, spacing and line height too? Would that help?
6. Create image for Plugin
7. Write writeup for Plugin
8. Publish!!

### Future / Draft

Component Node? How do we track styles

UI
! Please note, this can take upto a minute based on the number of nodes you have!
"Audit Text Styles"
When Done -> "Download CSV"

Release V1
As we have today after the ui update
Release V2
Have a Pie Chart, and a small table with name/number of Styles and top 5 used, and least used styles
