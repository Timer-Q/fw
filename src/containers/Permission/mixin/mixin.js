// 重置二级tab mixin
export const commonTabConfig = {
    methods: {
        clickByEdit (name, tag, content) {
            let flag = false
            let obj = {
                name,
                tag,
                content
            }
            this.selectTabCode = obj.tag
            for (let i = 0; i < this.tabsList.length; i++) {
                if (this.tabsList[ i ].tag == obj.tag) {
                    flag = true
                    return
                }
            }
            if (!flag) {
                this.tabsList.push(obj)
            }
        }
    },
    mounted () {
        this.$root.bus.$on(this.busSign, (name, tag, tabType, content) => {
            this.clickByEdit(name, tag, content)
            this.tabType = tabType
        })

        this.$root.bus.$on(`${this.busSign}updated`, (closeTargetName, toTargetName) => {
            this.selectTabCode = toTargetName
            this.removeTab(closeTargetName)
        })

        this.$root.bus.$on(`${this.busSign}close`, (closeTargetName, toTargetName, tabType) => {
            this.removeTab(`${closeTargetName}`)
        })

    }
}
// 滚动区域
export const scrollMixin = {
    mounted () {
        const { clientHeight } = document.querySelector('body')
        this.$refs.listOutBox.style.height = `${clientHeight - 90}px`
        this.$refs.listOutBox.style.overflow = `scroll`
    }
}
// 默认首行点击
export const firstRowClickMixin = {
    mounted () {
        var firstRowRect
        setTimeout(() => {
            firstRowRect = this.$refs[ this.tableRef ].$el.getElementsByClassName('el-table__row')[ 0 ].getBoundingClientRect()
            let width = parseInt(window.getComputedStyle(this.$refs[ this.tableRef ].$el.getElementsByClassName('el-table__row')[ 0 ]).width)
            this.rowClick(this.tableData[ 0 ], { clientX: (width + 16) / 2, clientY: firstRowRect.top + 20 })
            this.$refs[ this.tableRef ].setCurrentRow(this.tableData[ 0 ])
        }, 300)
    }
}