export default {
  bindings: {
    path: '@',
    map: '<'
  },
  template: `<object type="image/svg+xml" ng-attr-data="{{$ctrl.path}}"></object>`,
  controller: function ($element) {
    let ctrl = this, svg, map

    let apply = () => {
      if (svg && ctrl.map) {
        Object.keys(ctrl.map).map(selector => {
          return {
            nodes: svg.querySelectorAll(selector),
            props: ctrl.map[selector]
          }
        }).map(control => {
          control.nodes.forEach(node => {
            for (let prop in control.props) {
              node.style[prop] = control.props[prop]
            }
          })
        })
      }
    }
    ctrl.$onChanges = () => apply()
    ctrl.$doCheck = () => apply()
    ctrl.$postLink = () => {
      let object = $element[0].querySelector('object')
      object.addEventListener('load', () => {
        svg = object.contentDocument
        map = angular.copy(ctrl.map)
        apply()
      }, false)
    }
  }
}