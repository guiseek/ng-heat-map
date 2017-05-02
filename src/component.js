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
      getNodesAndProps(props).map(control => {
        control.nodes.forEach(node => {
          for (let prop in control.props) {
            node.style[prop] = control.props[prop]
          }
        })
      })
    }
    let applyProps = () => {
      if (svg && ctrl.init) updateProps(ctrl.init)
      if (svg && ctrl.props) updateProps(ctrl.props)
    }
    let applyEvents = () => {
      if (svg && ctrl.events && ctrl.onEvent) {
        getNodesAndProps(ctrl.events).map(control => {
          control.nodes.forEach(node => {
            control.props.map(prop => {
              node.addEventListener(prop, function(e) {
                ctrl.onEvent({name: prop, element: e.target, selector: control.selector})
              }, false)
            })
          })
        })
      }
    }
    ctrl.$onChanges = () => applyProps()
    ctrl.$doCheck = () => applyProps()
    ctrl.$postLink = () => {
      let object = $element[0].querySelector('object')
      object.addEventListener('load', () => {
        svg = object.contentDocument
        applyProps()
        applyEvents()
      }, false)
    }
  }
}
