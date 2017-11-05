export default {
    data() {
        return {
            tabState: {}
        }
    },
    methods: {
        // 添加二级tab
        clickByEdit(name, tag, content) {
            console.log(name, tag)
            let flag = false
            let obj = {
                name,
                tag,
                content
            }
            this.selectTabCode = obj.tag
            for (let i = 0; i < this.tabsList.length; i++) {
                if (this.tabsList[i].tag == obj.tag) {
                    flag = true
                    return
                }
            }
            if (!flag) {
                this.tabsList.push(obj)
            }
        },
        // 二级tab点击事件
        handleTabClick(tab, event) {
            let tabState = {
                active: tab.active,
                closable: tab.closable,
                disabled: tab.disabled,
                index: tab.index,
                isClosable: tab.isClosable,
                label: tab.label,
                name: tab.name
            }
            this.tabState = Object.assign({}, tabState)
        }
    },
    mounted() {
        // bus on 添加二级tab事件
        let triggerName = this.tabTriggerName ? this.tabTriggerName : 'wmsTab'

        this.$root.bus.$on(triggerName, (name, tag, content) => {
            this.clickByEdit(name, tag, content)
            this.tabState.name = tag
        })
        // bus on 删除二级tab事件
        this.$root.bus.$on('removeTwoLevelTab', (targetName) => {
            this.removeTab(targetName)
        })
    }
}
