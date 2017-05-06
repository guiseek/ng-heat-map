export default {
  bindings: {
    src: '@',
    init: '<',
    props: '<',
    events: '<',
    onEvent: '&'
  },
  template: `<object type="image/svg+xml" ng-attr-data="{{$ctrl.src}}"></object>`,
  controller: function ($element) {
    let ctrl = this, svg

    let getNodesAndProps = obj => {
      return Object.keys(obj).map(selector => {
        let nodes = []
        try {nodes = svg.querySelectorAll(selector)} catch (e) {}
        return {nodes, props: obj[selector], selector}
      })
    }
    let updateProps = props => {
      getNodesAndProps(props).forEach(control => {
        control.nodes.forEach(node => {
          Object.keys(control.props).forEach(prop => {
            node.style[prop] = control.props[prop]
          })
        })
      })
    }
    let applyProps = () => {
      if (!svg) return

      if (ctrl.init) updateProps(ctrl.init)
      if (ctrl.props) updateProps(ctrl.props)
    }
    let applyEvents = () => {
      if (!svg || !ctrl.events || !ctrl.onEvent) return false

      getNodesAndProps(ctrl.events).forEach(control => {
        control.nodes.forEach(node => {
          Object.keys(control.props).forEach(prop => {
            node.addEventListener(prop, e => {
              ctrl.onEvent({name: prop, element: e.target, selector: control.selector})
            }, false)
          })
        })
      })
    }
    ctrl.$onChanges = () => applyProps()
    ctrl.$doCheck = () => applyProps()
    ctrl.$postLink = () => {
      let object = $element[0].querySelector('object');
      object.addEventListener('load', () => {
        svg = object.contentDocument
        applyProps()
        applyEvents()
      }, false)
    }
  }
}
