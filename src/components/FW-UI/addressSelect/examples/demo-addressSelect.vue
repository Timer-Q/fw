<template>
    <div>




        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane name="!警告" label="!警告">
                <el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="插件依赖于el-table，请务必保证el-table中data是嵌套结构的数据" type="error" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="暂不支持异步远程加载数信息（基于需求要求的灵活度，实现此功能将会非常复杂）；后续有需求再考虑" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="若想支持勾选，请务必确保渲染tree table挂载前checked属性已存在且开启enable-check" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="父节点数据和子组件表格数据未建立起双向绑定关系，若建立，则开发难度非常大，
                甚至不一定能实现;初始数据仅作为tree table入口数据，后续所有需要访问的数据（例如源数据中可能变化的数据）
                请务必以getCheckedNodes getAllNodes方法获取的为准" type="error" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="由于性能 技术 实现难度等各种考量，源数据 视图树 虚拟树三者无法建立起相互
双向绑定关系，若您的业务数据中存在非只读的值，请确保值变化后手动调用updateRows方法更新相关状态;
例如：" type="error" :closable="false">
                    <pre>
                        @change = "$refs.treeGrid.updateRows([scope.row],['testBool'])"

                    </pre>
                </el-alert>
                <el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning" :closable="false"></el-alert>

            </el-tab-pane>
            <el-tab-pane name="demo" label="demo">

                <el-form>
                    tab facade:
                    <el-form-item label="label1" prop="invoiceAddress">
                        <fw-address-select :show-detail="false" facade="TAB" ref="tabModeAddressSelect" key-prefix="invoice" class="address" label="发货地址"
                                            v-model="fd1"></fw-address-select>
                    </el-form-item>

                    select facade:
                    <el-form-item label="label2" prop="invoiceAddress">
                        <fw-address-select ref="selectModeAddressSelect" facade="SELECT"  key-prefix="invoice" class="address" label="发货地址"
                                            v-model="fd"></fw-address-select>
                    </el-form-item>


                    <el-button @click="$refs.tabModeAddressSelect.reset();$refs.selectModeAddressSelect.reset()">重置测试</el-button>

                </el-form>

                <el-button @click="modifyDataTest()">通过修改id修改选中的元素测试</el-button>

                <fw-vm-data-viewer :vm="_self" :keys="'fd'.split(' ')"></fw-vm-data-viewer>





            </el-tab-pane>
            <el-tab-pane label="docs">
                <iframe class="no-border-iframe" src="https://www.zybuluo.com/dbx142857/note/934054"></iframe>
            </el-tab-pane>

            <!--<el-tab-pane label="下载demo代码">-->
            <!--<a target="_blank" download="fwTreeGrid.vue" href="/downloadSource/fwSmarterTree.vue">下载源码(若点击无效请在请窗口打开)</a><br>-->
            <!--<a target="_blank" download="demo.vue" href="/downloadDemo/demo-fwSmarterTree.vue">下载demo(若点击无效请在请窗口打开)</a><br>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="软件依赖">
                <el-alert :closable="false" style="margin-bottom:10px;" title="fwTreeGrid.js以及这个依赖的东西所依赖的所有东西" type="success"></el-alert>
            </el-tab-pane>
        </el-tabs>







    </div>

</template>
<style lang="less" type="text/less" scoped>

</style>
<script>
    export default {
        data(){
            return {
                activeName:'!警告',
                searchStr:'',
                fd:{


            //         this.fd.invoiceProvId=1112
            //     this.fd.invoiceCityId=1172
            // this.fd.invoiceDistrictId=1183
            // this.fd.invoiceStreetId=17126

                    "invoiceProvId": 1112,
                    "invoiceProvName": "",
                    "invoiceCityId": 1172,
                    "invoiceCityName": "",
                    "invoiceDistrictId": 1183,
                    "invoiceDistrictName": "",
                    "invoiceStreetId": 17126,
                    "invoiceStreetName": "",
                    "invoiceAddress": "",
                    "invoiceAddressId": "",
                },
                fd1:{


                    //         this.fd.invoiceProvId=1112
                    //     this.fd.invoiceCityId=1172
                    // this.fd.invoiceDistrictId=1183
                    // this.fd.invoiceStreetId=17126

                    "invoiceProvId": 1112,
                    "invoiceProvName": "",
                    "invoiceCityId": 1172,
                    "invoiceCityName": "",
                    "invoiceDistrictId": 1183,
                    "invoiceDistrictName": "",
                    "invoiceStreetId": 17126,
                    "invoiceStreetName": "",
                    "invoiceAddress": "",
                    "invoiceAddressId": "",
                }
            }
        },
        mounted(){

            let parseUrl= function (href) {
                var url = href || location.href
                var a = document.createElement('a')
                a.href = url
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue
                    }
                    s = seg[i].split('=')
                    ret[s[0]] = s[1]
                }
                return ret
            }
            let urlQueryMap=parseUrl()
            this.activeName=urlQueryMap.tab||'!警告'
            console.log('urlQueryMap-:',urlQueryMap)
            console.log("$refs.treeGrid",this.$refs.treeGrid)
            this.constructor.prototype.BX&&this.BX.call(this,'setCurrentVM')
        },
        methods:{
            modifyDataTest(){

                this.fd.invoiceProvId=497
                this.fd.invoiceCityId=525
                this.fd.invoiceDistrictId=528
                this.fd.invoiceStreetId=9321


                // this.fd.invoiceProvId=1112
                // this.fd.invoiceCityId=1172
                // this.fd.invoiceDistrictId=1183
                // this.fd.invoiceStreetId=17126

                this.fd.invoiceAddress='ccc'

            },
            handleDetailChange(){
                console.log('detail address has been changed:',arguments)
            }
        }
    }
</script>
