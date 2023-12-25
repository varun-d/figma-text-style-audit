# Style Audit

A Figma plugin to export CSV for text styles and fill styles across TextNodes, for the current page.

## Why do we need this plugin?

We have a primary design system serving 80+ projects. Every year we update our design system.
It's difficult to track what styles are being used, and what styles aren't.

Knowing what styles are least used or most used, we can have a plan to purge or keep styles.

## Challenges with auditing styles

Some challenges still remain. For example, running this plugin across multiple files. Even running across pages will exponentially increase complexity.
We run the plugin on one design file, and a selected page in Figma.
This way we can skip over drafts, trials and random archive pages.

## Contributing

Feel free to contribute to this plugin. Checkout CONTRIBUTING.md.

## Resources

https://forum.figma.com/t/how-to-perform-asynchronous-functions-in-plugin/48424
https://www.figma.com/plugin-docs/api/properties/nodes-findallwithcriteria/
https://forum.figma.com/t/how-to-process-nodes-asynchronously-in-batches/48304/8
https://forum.figma.com/t/figma-layers-tree-traversal-estimating-size/551

# Notes on contribution

**Critical!**

Figma plugin needs two files. A code.ts (logic), and an index.html (UI).

Both files can be built with the following command:
`bun run build`

For dev needs, you can "watch" some changes using the other build commands in package.js like:
`build:js` or `build:codewatch`

Secondly, note the target command (es2019) in build. Needed for '?' optional chaining to work. Bless the JS world...
`esbuild src/code.ts --target=es2019 --bundle --outfile=dist/code.js`

## What's Audited

NodeType: Text (as of Dec 2023)
Styles: Text Style, Fill Style
Style Locale: Local Style, External Library, Mixed Style

### Todos and Future

2. Text Node - textStyleId, fillStyleId for text. These are critical!
3. Fix UI. Have a simple button to Download CSV of text stles/ fill styles
   Install tailwind
4. Future: Have a place to ADD IDs... This could be vital to connect the dots. ID, properties like
5. Future: Can I pull in font size, spacing and line height too? Would that help?
6. Future: Have a Pie Chart, and a small table with name/number of Styles and top 5 used, and least used styles
