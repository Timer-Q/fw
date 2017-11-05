<style lang="scss" scoped>
    .step {
        position: relative;
        height: 52px;
        margin-bottom: 20px;
    }

    .step-box {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .one-step {
        float: left;
    }

    .step-top {
        float: left;
        color: #eee;
        .step-name {
            margin-top: 12px;
            font-size: 12px;
        }
        .step-num {
            width: 24px;
            height: 24px;
            margin: 0 auto;
            border: 1px solid #eee;
            box-sizing: border-box;
            border-radius: 50%;
            line-height: 24px;
            text-align: center;
            font-size: 14px;
        }
    }

    .step-transition {
        float: left;
        width: 80px;
        height: 2px;
        margin: 11px 22px 0 22px;
        background-color: #eee;
    }
</style>
<template>
    <div class="step">
        <div class="step-box clearfix">
            <div
                class="one-step clearfix"
                v-for="(item, index) in _stepList"
                :key="item.name"
            >
                <div class="step-top" :style="item.style">
                    <div class="step-num" :style="item.style">{{ index + 1 }}</div>
                    <div class="step-name">{{ item.name }}</div>
                </div>
                <div class="step-transition" v-if="index !== stepList.length - 1"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Step',
        props: ['stepList', 'active'],
        data() {
            return {
                _stepList: []
            }
        },
        watch: {
//            监听步骤条的变化，更改样式
            active(val, oldVal) {
//                传入的数字减一，获得索引值
                const _active = val - 1
                if (!this._stepList[_active]) return
//                将所有步骤条变灰
                for (let item of this._stepList) {
                    this.$set(item, 'style', {
                        borderColor: '#eee',
                        color: '#eee'
                    })
                }
//                当前步骤变颜色
                this.$set(this._stepList[_active], 'style', {
                    borderColor: '#28a7e1',
                    color: '#28a7e1'
                })
            }
        },
        created() {
            this._stepList = [...this.stepList]
//            初始化步骤颜色，第一个步骤添加蓝色，其他置灰
            for (let item of this._stepList) {
                this.$set(item, 'style', {
                    borderColor: '#eee',
                    color: '#eee'
                })
            }
            this.$set(this._stepList[0], 'style', {
                borderColor: '#28a7e1',
                color: '#28a7e1'
            })
        }
    }
</script>
