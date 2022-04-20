# Source Maps, an Example

## This project tries to educate on how to use/generate Source Maps for better debugging.

#### 0. Install dependencies
- Node
- Source maps for node (https://github.com/mozilla/source-map)
- Webpack
```
npm install source-map
npm install webpack webpack-cli --save-dev
```

#### 1. 
```
git clone 
cd source-map
npm init
```

#### 2. Comment the first 2 lines of `src/index.js` Run the following to bundle our code:
```
npx webpack --config webpack.config.js
```

#### 3. Open a browser with inspector console opened at:
```
file:///path/source-map/dist/index.html
```

#### You'll notice an error that looks like:
```
main.js:2 Uncaught ReferenceError: sourcemap is not defined
    at main.js:2:2145534
    at main.js:2:2145831
    at main.js:2:2146142
    at main.js:2:2146146
```

##### This is the stacktrace generated using the minified version of `index.js`. But where exactly does it point to in the code? We could trace it back to line 53 however wouldn't it be nice to have the stacktrace point that for us? That's where source maps come in, so lets add that!

#### 4. Add the folloing to `webpack.config.js`:
```
devtool: 'source-map',
```

#### 5. Run the following to generate re-bundle:
```
npx webpack --config webpack.config.js
```

#### 6. Open that same browser that pointed to the below path and refresh:
```
file:///path/source-map/dist/index.html
```

#### Now the stacktrace will look like the following. Voila, stacktrace is now pointing to the original source code:

```
Uncaught ReferenceError: sourcemap is not defined
    at index.js:53:18
    at index.js:89:1
    at index.js:97:13
    at index.js:97:13
```

##### What if we want to generate the original source code after the stacktrace is generated?
# Consuming source map

#### I took the liberty to copy paste the source map from above to ``