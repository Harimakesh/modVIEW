# modVIEW
 Model Viewer for glb/gltf files. Load any glb/gltf file and be able to switch between its different available, if present. Made possible using `<model-viewer>` which runs on top of three js. For further capabilities of model-viewer visit https://modelviewer.dev/.
 


 
## Server
### Instructions to setup the backend
   * `npm install` or `yarn add` to install all the necessary packages.
   * transpile the ts code to js by running `tsc -w` or `yarn watch` or `npm watch` (see package.json).
   * The above command outputs the js into '\dist' directory.You can change the name in the tsconfig file.
   * Run the server `nodemon dist/index.js`.

## Web 
 ### Instructions to setup the backend
   * `npm install` or `yarn install` to install packages.
   * `yarn dev` or `next` to run the viewer.
   
## Further Improvements
   * Can clean up the code in index.tsx for readability.
   * Certain types are omitted.         
    /(-_-) /  `<any>`  \ (-\_-)\
   * Can add session or token authentication.
   * Can add more features by directly implementing the viewer using three js.

##Thanks to 
   * benawad for this tut https://youtu.be/I6ypD7qv3Z8 on graphql.
