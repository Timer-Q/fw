<template>
    <div>
        <div id="allmap" style="width: 100%;height:575px;"></div>


        <div class="block">
            <div class="s_block">
                <p>{{title}}</p>
                <h3>{{plase}}</h3>
                <button @click="btn_add">{{btn}}</button>
            </div>

        </div>
    </div>
</template>
<script>
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    export default{
        data(){
            return {
                title: '目前您并没有区块数据',
                plase: '请添加区块',
                btn: '添加区块',
                pointArr:[]
            }
        },
        mounted(){
            this.$nextTick(function () {
                let _this = this
                //在此调用api
                let map = new BMap.Map("allmap")             // 创建Map实例
                map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
                let local = new BMap.LocalSearch(map, {
                    renderOptions: {map: map, autoViewport: true}
                })

                //回调获得覆盖物信息
                let overlaycomplete = function(e){
                    let item=[]
                    let path=e.overlay.getPath()//返回多边形的点数组
                    for(var i=0;i<path.length;i++){
                        console.log("lng:"+path[i].lng+"lat:"+path[i].lat)
                        let obj={}
                        obj.lng=path[i].lng
                        obj.lat=path[i].lat
                        item.push(obj)
                    }
                    _this.pointArr.push(item)
                    console.log(_this.pointArr)
                    localStorage['mapPoint']=JSON.stringify(_this.pointArr)
                }



             //展示区域
                let BMapPoint1=[]
                if(localStorage['mapPoint']!=''){
                    let mapPoint=JSON.parse(localStorage['mapPoint'])
                    console.log(mapPoint)


             mapPoint.forEach((item)=>{
                 item.forEach((val,i)=>{
                     console.log(val,i)
                     let point=new BMap.Point(item[i].lng,item[i].lat)
                     BMapPoint1.push(point)
                 })

             })
                }


                var polygon = new BMap.Polygon(BMapPoint1, {strokeColor:"#438bd2", strokeWeight:3, strokeOpacity:0.8,strokeStyle: 'dashed'})  //创建多边形
                map.addOverlay(polygon)   //增加多边形



                let styleOptions = {
                    strokeColor: "#438bd2",    //边线颜色。
                    strokeWeight: 3,       //边线的宽度，以像素为单位。
                    strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'dashed' //边线的样式，solid或dashed。
                }
                //实例化鼠标绘制工具
                let drawingManager = new BMapLib.DrawingManager(map, {
                    isOpen: false, //是否开启绘制模式
                    enableDrawingTool: true, //是否显示工具栏
                    drawingToolOptions: {
                        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                        offset: new BMap.Size(5, 5), //偏离值
                    },
                    polygonOptions: styleOptions, //多边形的样式
                })
                //添加鼠标绘制工具监听事件，用于获取绘制结果
                drawingManager.addEventListener('overlaycomplete', overlaycomplete)


            })


        },
        methods: {

            btn_add(){
                if (this.btn == '添加区块') {
                    this.title = ''
                    this.plase = "请保存添加区块"
                    this.btn = "保存"
                } else {
                    this.title = '目前您并没有区块数据',
                        this.plase = '请添加区块',
                        this.btn = '添加区块'
                }


            }

        }
    }
</script>
<style>
    .BMapLib_marker,.BMapLib_circle,.BMapLib_polyline,.BMapLib_rectangle {
        display: none;
    }
</style>
<style lang="scss" scoped>
    .block {

        width: 318px;
        height: 100%;
        background: #f2f2f2;
        position: absolute;
        left: 0;
        top: 0;
        box-shadow: 3px 3px 3px #ccc;
        color: #ccc;
        .s_block {
            width: 318px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            text-align: center;
            line-height: 30px;
            button {
                background: #328ff7;
                color: #fff;
                border: none;
                border-radius: 5px;
                height: 25px;
                cursor: pointer;
            }

        }
    }
</style>
     
