export default{
    data() {
        return {
            // 选中的二级tab
            selectTabCode: "",
            // 打开的二级tab集合
            tabsList: []
        }
    },
    mounted(){
        // 默认为list页
        this.selectTabCode = this.tag
    },
    methods: {
        // 删除二级tab
        removeTab(targetName){
            let tabs = this.tabsList
            let activeName = this.selectTabCode
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.tag === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        activeName = nextTab ? nextTab.tag : this.tag
                    }
                })
            }
            this.selectTabCode = activeName
            this.tabsList = tabs.filter(tab => tab.tag !== targetName)
        },
        // 新增/修改/详情下的跳转
        clickByEdit(state){
            let flag = false
            let obj = {
                name: `${this.titleName}-` + (state == "add" ? "新增" : state == "update" ? "修改" : "详情"),
                tag: `${this.tag}_` + state
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
        }
    }
}
