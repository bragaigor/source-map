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

#### 1. Clone the repo and initialize the node project if you haven't done already:
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
```sh
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

```sh
Uncaught ReferenceError: sourcemap is not defined
    at index.js:53:18
    at index.js:89:1
    at index.js:97:13
    at index.js:97:13
```

##### What if we want to generate the original source code after the stacktrace is generated?
# Consuming source map

#### I took the liberty to copy paste the source map from above to `src/source_map.js` which is used by `src/index.js`. The interested code is in function `generateOriginalSource()`, the rest is just filler code :)

### 1. Still in the root directory of the repo run:
```
node src/index.js
```

### You should expect the output:
```sh
The sum is: 15
hahahaha [object Object]
Generating original source from line: [object Object]
{
  source: 'webpack://source_maps/src/index.js',
  line: 53,
  column: 17,
  name: 'sourcemap'
}
{
  source: 'webpack://source_maps/src/index.js',
  line: 89,
  column: 0,
  name: 'generateOriginalSource'
}
{
  source: 'webpack://source_maps/src/index.js',
  line: 97,
  column: 12,
  name: 'coolDate'
}
It took 75.8910099864006 milliseconds to process 3 requests
/path/source-map/src/index.js:94
console.log("Is " + num + " a prime number: " + checkPrime(num));
                    ^

ReferenceError: num is not defined
    at Object.<anonymous> (/path/source-map/src/index.js:94:21)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1155:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at node:internal/main/run_main_module:17:47
```

### We're interested in:
```
{
  source: 'webpack://source_maps/src/index.js',
  line: 53,
  column: 17,
  name: 'sourcemap'
}
{
  source: 'webpack://source_maps/src/index.js',
  line: 89,
  column: 0,
  name: 'generateOriginalSource'
}
{
  source: 'webpack://source_maps/src/index.js',
  line: 97,
  column: 12,
  name: 'coolDate'
}
```

#### If you look at the code we have the following calls:
```javascript
  var consumer = sourcemap.SourceMapConsumer(sourceMapData);

  console.log(
    consumer.originalPositionFor({
      line: 2,
      column: 2145534,
    })
  );
  console.log(
    consumer.originalPositionFor({
      line: 2,
      column: 2145831,
    })
  );
  console.log(
    consumer.originalPositionFor({
      line: 2,
      column: 2146142,
    })
  );
```
### Where `sourceMapData` is the source-map read from `src/source_map.js`. Here we ask "Heeeeey `SourceMapConsumer` what is the original line, column and file name given this line and column". Very handy if you don't have the ability to generate source maps when the stacktrace was generated.