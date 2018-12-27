const debounce = require('lodash.debounce');

export default {
  mounted() {
    this._resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 200)

    window.addEventListener('resize', this._resizeHandler);
    const element = document.getElementById('side-nav')
    if(!element)return;
    element.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._resizeHandler);
    const element = document.getElementById('side-nav')
    if(!element)return;
    element.removeEventListener('transitionend', this.sidebarResizeHandler)
  },
  methods:{
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this._resizeHandler()
      }
    }
  }

}
