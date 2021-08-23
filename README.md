# Webpack

webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from.

## Modules

In modular programming, developers break programs up into discrete chunks of functionality called a module which makes the verification, debugging, and testing trivial. Well-written modules provide solid abstractions and encapsulation boundaries, so that each module has a coherent design and a clear purpose within the overall application. Node.js has supported modular programming almost since its inception. On the web, however, support for modules has been slow to arrive. Webpack applies the concept of modules to any file in your project.

## Webpack Modules

Webpack modules can express their dependencies in a variety of ways. A few examples are:

- An ES2015 import statement
- A CommonJS require() statement
- An AMD define and require statement
- An @import statement inside of a css/sass/less file.
- An image url in a stylesheet url(...) or HTML `<img src=...>` file.

## Core Concepts

### Entry

An entry point indicates which module webpack should use to begin building out its internal dependency graph. webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).By default its value is "./src/index.js", but you can specify a different (or multiple entry points) by setting an entry property in the webpack configuration

### Output

The output property tells webpack where to emit the bundles it creates and how to name these files. It defaults to "./dist/main.js" for the main output file and to the "./dist" folder for any other generated file. You can configure this part of the process by specifying an "output" field in your configuration

### Loaders

Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.  
Webpack supports modules written in a variety of languages and preprocessors via loaders. It has loaders for a variety of popular languages and processors, including TypeScript, ESNext, Sass and Less. Loaders have two properties in your webpack configuration:

- test property identifies which files should be transformed.
- use property indicates which loader should be used to do the transforming.

### Plugins

Plugins are used to extend webpack's capabilities. It perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

### Mode

By setting the mode parameter to either "development", "production" or "none", you can enable webpack's built-in optimizations that correspond to each environment. The default value is "production"

### Browser Compatibility

webpack supports all browsers that are ES5-compliant (IE8 and below are not supported). webpack needs "Promise" for "import()" and "require.ensure()". If you want to support older browsers, you will need to load a polyfill before using these expressions.

## Basic Setup

First let's initialize npm, install webpack and webpack-cli locally

```javascript
npm init -y
npm install webpack webpack-cli --save-dev
```

Create "src/index.js" file which contains the code to be bundled

```javascript
import _ from "lodash";

function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  return element;
}
document.body.appendChild(component());
```

As of version 4, webpack doesn't require any configuration, but most projects will need a more complex setup, which is why webpack supports a configuration file. Create a config file named "webpack.config.js" in your root project directory with the following config

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
};
```

create an html file "public/index.html" with a script that references the "bundle.js" as its source

```html
<body>
  <script src="../dist/bundle.js"></script>
</body>
```

To run webpack, execute the following command

```javascript
npx webpack
```

Open "index.html" in your browser and, if everything went right, you should see the following text: "Hello webpack".

## Loading CSS

In order to import a CSS file from within a JavaScript module, you need to install and add the style-loader and css-loader to your module configuration:

```javascript
npm install --save-dev style-loader css-loader
```

In webpack config file, add the following rule

```javascript
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
  ],
},
```

Module loaders can be chained, each loader in the chain applies transformations to the processed resource. Now let's add a new "src/style/style.css" file to our project and import it in our "index.js"

```css
.hello {
  color: darkblue;
}
```

In the component function, add a styling class to the element

```javascript
element.classList.add("hello");
```

Finally, run the build command and open up "index.html" in your browser again and you should see that "Hello webpack" has the style from css file. Webpack has loaders for pretty much any flavor of CSS you can think of – postcss, sass, and less to name a few.

## Loading Images

As of webpack 5, using the built-in Asset Modules we can easily incorporate images in our system. Add the following rule to the config file

```javascript
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
},
```

Add an icon "src/assets/icon.svg", import it to "index.js" file and append it to the div element in the component function

```javascript
// Add the image to our existing div.
const myIcon = new Image();
myIcon.src = Icon;
element.appendChild(myIcon);
```

Let's create a new build and open up the index.html file, if all went well, you should now see your icon.

The complete code for this post is hosted in a [git repository](https://github.com/mustafa-saleh/webpack). To learn more about webpack loaders, plugins code splitting, dependancy graph and much more, refer to [webpack documantation](https://webpack.js.org/guides/).
