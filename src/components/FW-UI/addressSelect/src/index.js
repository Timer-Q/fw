import main from './addressSelect.vue'

/* istanbul ignore next */
main.install = function(Vue) {
    Vue.component(main.name, main)
}

export default main
