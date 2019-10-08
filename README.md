### Sails Modular App

This plugin allows you to create modular application using sailsjs library.

![Licence](https://img.shields.io/github/license/learn2torials/sails-modular)
![Issues](https://img.shields.io/github/issues/learn2torials/sails-modular)
![Forks](https://img.shields.io/github/forks/learn2torials/sails-modular)
![Stars](https://img.shields.io/github/stars/learn2torials/sails-modular)

### Requirements

- sailsjs >= 1.0

### How to install this plugin

```bash
npm install sails-modular --save
```

### How to use this plugin

Create a directory called modules in your app directory. All folders within
modules directory will be loaded as a module in your application.

Following is a sample directory structure for you new module.

You can add things as per your needs. Have a look at these sample files in
modules directory in this repo to get the idea.

```bash
app
  |-- modules
        |-- test
            |-- configs
                |-- routes.js
                |-- policies.js
            |-- controllers
                |-- TestController.js
            |-- models
                |-- TestModel.js
            |-- policies
                |-- isTest.js
            |-- services
                |-- TestService.js
```

### How to test this module

Once your hook is loaded your new test module will be available.
Access one of the routes defined in your new configs/routes.js file.
