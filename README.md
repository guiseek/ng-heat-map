# ng-svg-styling-map
## SVG styling maps with angular 1.x

### Manipulate styles in svg images with javascript objects

## Demo
#### Click [(here/demo)](http://guiseek.js.org/ng-svg-styling-map/examples/) to see examples

## Install
```shell
$ npm i ng-svg-styling-map --save
```

## Example

### View
```html
<svg-map src="svgs/br.svg" init="init" props="props" events="events" on-event="event(name, element, selector)"></svg-map>
```

### Controller
```javascript
angular
  .module('app', ['ngSvgStylingMap'])
  .controller('AppController', ['$scope','$timeout',function($scope,$timeout) {
    $scope.props = {}
    var start = function () {
      $scope.init = {
        '#br path': {
          fill: '#F9EDBE',
          stroke: 'black'
        },
        '#br text': {
          fill: 'black',
          stroke: 'black'
        }
      }
    }
    start()
    $scope.changeProps = function () {
      $scope.props = {
        '#sp path': { fill: '#F0C36D' },
        '#ms path': { fill: '#F0C36D' }
      }
    }
    $scope.events = {
      '.estado': ['click'],
      '#pr': ['click'],
      '#rs': ['click']
    }
    $scope.event = function(name, element, selector) {
      // Example of native application
      // element.style.fill = 'red'

      // Example of props application
      // Because i assigned #br property
      if (selector == '.estado') {
        // Do somethind in parent context
        $scope.props[selector + ' path'] = {
          fill: '#FFF'
        }
        $scope.props['#' + element.parentNode.id + ' path'] = {
          fill: '#F0C36D'
        }
        // You may need to use the $apply method
        $scope.$apply()
      } else {
        $scope.props['#' + element.parentNode.id + ' path'] = {
          fill: '#F0C36D'
        }
        // You may need to use the $apply method
        $scope.$digest()
      }
    }
    $timeout(function() {
      $scope.props = {
        '#mt path': { fill: '#F0C36D' }
      }
    }, 2500)
    $timeout(function() {
      $scope.props = {
        '#pr path': { fill: '#F0C36D' }
      }
    }, 5000)
    $timeout(function() {
      $scope.props = {
        '#mt path': { fill: '#F0C36D' },
        '#ms path': { fill: '#F0C36D' }
      }
    }, 7500)
    $timeout(function() {
      $scope.props = {
        '#sc path': { fill: '#F0C36D' }
      }
    }, 10000)
  }])
```