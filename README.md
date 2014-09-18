# nDI

nDI is a simple Dependency Injection framework.


## Installation

```sh
npm install ndi
```

## Example

```javascript
var nDI = require('ndi');
var container = new nDI.Container();

container.setParameter('greeting.name', 'John');
container.set(
  'service.geeter',
  new nDI.FactoryWrapper(
    container,
    function(name) {
      return function() {
        return 'Hello ' + name + '!';
      };
    },
    ['$greeting.name']
  )
);

console.log(container.get('service.geeter')());
```

Example with express, see the example folder:

```sh
> git clone https://github.com/TeddyTN/nDI.git

> cd nDI
> npm install

> cd example
> npm install
> npm start

```

## Define a parameter

The `container.setParameter(name, value)` method is used to define a parameter.

### Arguments

  * name: The name of parameter
  * value: The value of the parameter

## Define a service

The `container.set(id, value)` method is used to define a service.

### Arguments

  * id: The id of the service
  * value: The value of the service

## Load definitions from config file

You can load parameter and service definitions from a json file with the `nDI.Loader` class.

### Usage

```javascript
  var loader = new Loader(container, baseDir);

  loader.load(filePath);
```

### Constructor arguments

  * container: must be an instance of nDI.Container
  * baseDir: is the path for loading files

### `loader.load` arguments

  * filePath: is the path of the json config file (file path must relative to baseDir)

### Config structure

```json
{
  "parameters": {
    "greeting.name": "John"
  },
  "services": {
    "service.geeter": {"type": "factory", "file": "greeter", "arguments": ["$greeting.name"]}
  }
}
```

Parameter entries are very simple, there are key value pairs.

#### Service definition fields

  * type: The type of the service
    * class: Mark service as a reference to an constructor
    * factory: Mark service to wrapp an factory function
    * instance: Create a new instance of the given constructor
  * file: The path to the service (file path must be relative to baseDir)
  * arguments: The list of arguments for the service (will be ignored when type is class)
    * @...: Inject the service (must be the service id)
    * $...: Inject the parameter (must be the parameter name)
