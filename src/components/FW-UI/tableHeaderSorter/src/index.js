import main from './tableHeaderSorter.vue'

/* istanbul ignore next */
main.install = function(Vue) {
    Vue.component(main.name, main)
}

export default main
