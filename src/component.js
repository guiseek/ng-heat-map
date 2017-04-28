export default {
  bindings: {
    path: '@',
    base: '<',
    map: '<'
  },
  template: `<object type="image/svg+xml" ng-attr-data="{{$ctrl.path}}"></object>`,
  controller: function ($element) {
    let ctrl = this, svg

    let update = map => {
      Object.keys(map).map(selector => {
        return {
          nodes: svg.querySelectorAll(selector),
          props: map[selector]
        }
      }).map(control => {
        control.nodes.forEach(node => {
          for (let prop in control.props) {
            node.style[prop] = control.props[prop]
          }
        })
      })
    }
    let apply = () => {
      if (svg && ctrl.base) update(ctrl.base)
      if (svg && ctrl.map) update(ctrl.map)
    }
    ctrl.$onChanges = () => apply()
    ctrl.$doCheck = () => apply()
    ctrl.$postLink = () => {
      let object = $element[0].querySelector('object')
      object.addEventListener('load', () => {
        svg = object.contentDocument
        apply()
      }, false)
    }
  }
}