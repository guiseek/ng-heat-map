# ng-svg-styling-map
## SVG styling maps with angular 1.x

### Manipulate styles in svg images with javascript entries

## Demo
#### Click [(here/demo)](http://guiseek.js.org/ng-svg-styling-map/examples/) to see examples

## Preview
![SVG Map PR highlight](http://guiseek.js.org/ng-svg-styling-map/images/ng-svg-style-map-pr.png)

## Install
```shell
$ npm i ng-svg-styling-map --save
```

## Example
```javascript
angular
  .module('app', ['ngSvgStylingMap'])
  .controller('AppController', ['$scope','$timeout',function($scope,$timeout) {
    $scope.base = {
      '#br path': {
        fill: '#F9EDBE',
        stroke: 'black'
      },
      '#br text': {
        fill: 'black',
        stroke: 'black'
      }
    }
    $timeout(function() {
      $scope.map = {
        '#mt path': {
          fill: '#F0C36D'
        }
      }
    }, 2500)
    $timeout(function() {
      $scope.map = {
        '#pr path': {
          fill: '#F0C36D'
        }
      }
    }, 5000)
    $timeout(function() {
      $scope.map = {
        '#sc path': {
          fill: '#F0C36D'
        },
        '#mt path': {
          fill: '#F0C36D'
        }
      }
    }, 7500)
    $timeout(function() {
      $scope.map = {
        '#rs path': {
          fill: '#F0C36D'
        }
      }
    }, 10000)
  }])
```