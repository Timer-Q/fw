import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

const generate = function (view, viewOptions) {
    let defaultContainerOptions = {
        keepAlive: true,
        system: '/wms',
        titleName: '',
        tag: '',
        mixOne: true,
        mixTwo: false
    }
    viewOptions = Object.assign(defaultContainerOptions, viewOptions)
    let mixins = new Array()
    if (viewOptions.mixOne === true) {
        mixins.push(oneLevelTabMixins)
    }
    if (viewOptions.mixTwo === true) {
        mixins.push(twoLevelTabMixins)
    }
    let component = {
        name: 'viewContainerFor' + viewOptions.tag,
        render: function (createElement) {
            if (this.isCache) {
                return createElement(
                    'div', null, [
                        createElement('fact-view', {
                            props: {'keep-alive': 'keepAlive'}
                        })
                    ]
                )
            }
        },
        mixins,
        data() {
            return {
                tag: viewOptions.tag,
                system: viewOptions.system,
                titleName: viewOptions.titleName,
                keepAlive: viewOptions.keepAlive
            }
        },
        components: {
            'fact-view': view
        }
    }
    return component
}
export default generate
