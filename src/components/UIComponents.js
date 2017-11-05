import Vue from 'vue'

/*一、ElementUI组件按需加载*/

import 'element-ui/lib/theme-default/index.css'
// 按需引入
import {
    Row ,
    Col,
    Icon,
    Button,
    ButtonGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    Upload,
    Select,
    Option,
    OptionGroup,
    TimePicker,
    DatePicker,
    Form,
    FormItem,
    Table,
    TableColumn,
    Tree,
    Progress,
    Pagination,
    Alert,
    Loading,
    Message,
    MessageBox,
    Notification,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Dialog,
    Tabs,
    TabPane,
    Badge,
    Popover,
    Tooltip,
    Transfer,
    Collapse,
    CollapseItem,
    Tag,
} from 'element-ui'

const elementComponents = {
    Row,
    Col,
    Icon,
    Button,
    ButtonGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    Upload,
    Select,
    Option,
    OptionGroup,
    TimePicker,
    DatePicker,
    Form,
    FormItem,
    Table,
    TableColumn,
    Tree,
    Progress,
    Pagination,
    Alert,
    Loading,
    Message,
    MessageBox,
    Notification,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Dialog,
    Tabs,
    TabPane,
    Badge,
    Popover,
    Tooltip,
    Transfer,
    Collapse,
    CollapseItem,
    Tag,
}


Object.keys(elementComponents).forEach((key) => {
    Vue.component(key, elementComponents[key])
    Vue.component(`el${key}`, elementComponents[key])
})


// 解决组件自动弹出问题
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

// 自定义提示
Vue.prototype.$customMessage = function (message,type) {
    let iconClass=''
    switch (type){
        case 'success':{iconClass = 'icon-chenggong'}break
        case 'error':{iconClass = 'icon-shanchuxx'}break
        case 'warning':{iconClass = 'icon-jingshi'}break
        case 'info':{iconClass = 'icon-bangzhu'}break
    }

    this.$message({
        iconClass: `iconfont ${iconClass}`,
        message: message
    })
}


/*二、蜂网自定义通用组件按需加载*/



import vmDataViewer from '@/components/FW-UI/vmDataViewer'
Vue.use(vmDataViewer)


import fwTreeGrid from '@/components/FW-UI/treeGrid'

Vue.use(fwTreeGrid)

import fwKeyboardControl from '@/components/FW-UI/keyboardControl'
Vue.use(fwKeyboardControl)

import fwTextareaLimiter from '@/components/FW-UI/textareaLimiter'
Vue.use(fwTextareaLimiter)
import fwDivResizer from '@/components/FW-UI/divResizer'

import '@/components/FW-UI/divResizer/src/divResizer.css'
Vue.use(fwDivResizer)

import '@/components/FW-UI/divExpander/src/divExpander.css'
Vue.use(fwDivResizer)
import fwDivExpander from '@/components/FW-UI/divExpander'
Vue.use(fwDivExpander)



import fwSmarterTree from '@/components/FW-UI/smarterTree'
Vue.use(fwSmarterTree)
import addressSelect from '@/components/FW-UI/addressSelect'
Vue.use(addressSelect)
import smarterInputSelect from '@/components/FW-UI/smarterInputSelect'

Vue.use(smarterInputSelect)
