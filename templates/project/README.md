# <%= projectName %>

EDIT ME

## Building components

<p>We use <a href="http://davglass.github.com/shifter/">shifter</a> to build YUI modules.</p>

<p>To install shifter :</p>

```terminal
$ [sudo] npm install -g shifter
```

<p>To build the 'container' module :</p>

```terminal
$ cd src/container
$ shifter
```

<p>To build all modules at once :</p>

```terminal
$ cd src
$ shifter --walk
```

## Building user guides and examples pages

<p>We are using <a href="http://rgrove.github.com/selleck/">selleck</a> to build the examples and user guide pages.</p>


<p>To install shifter :</p>

```terminal
$ [sudo] npm install -g selleck
```

<p>To build all docs :</p>

```terminal
$ selleck --out docs
```

## Building the API documentation

<p>The API documentation is build using <a href="https://github.com/yui/yuidoc">YUIDocJS</a>.</p>


<p>To install YUIDocJS :</p>

```terminal
$ [sudo] npm install -g yuidocjs
```

<p>From the main directory, type :</p>

```terminal
$ yuidoc
```

<p>It should generate the doc in the api/ folder.</p>


## How to run the tests

<p>Tests are executed with <a href="https://github.com/yui/yeti">Yeti</a>.</p>


<p>To install Yeti :</p>

```terminal
$ [sudo] npm install -g yeti
```

<p>From the main directory, type :</p>

```terminal
$ yeti src/*/tests/unit/*.html
```

<p>This command creates a one shot server and return you an adress which you have to connect a browser in order to run the tests. You can also invoke the same command with "--server" in order to have a persistent server  </p>

```terminal
$ yeti src/*/tests/unit/*.html --server
```

<p>Testing with coverage :</p>

```terminal
$ yeti src/*/tests/unit/*.html --server --query 'filter=coverage'
```