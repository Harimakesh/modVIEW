# modVIEW
 Model Viewer for glb/gltf files. Load any glb/gltf file and be able to switch between its different animations, if present. For further capabilities of model-viewer visit https://modelviewer.dev/
 
## Server
 This folder contains all backend elements.
### Instructions to setup backend
   * `npm install` or `yarn add` to install all the necessary packages.
   * transpile the ts code to js by running `tsc -w` or `yarn watch` or `npm watch` (see package.json).
   * The above command outputs the js into dist dir , you can change the name in tsconfig file.
   * Run the server `nodemon dist/index.js`

## Web 
 This folder contains all the frontend elements.
