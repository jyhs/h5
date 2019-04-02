<template>
    <div class="loading" v-show="showFlag">
        <div>
            <img width="60" src="./loading.svg"/>
            <p class="desc">{{title}}</p>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: '努力加载中...'
            }
        },
        data() {
            return {
                showFlag: false
            }
        },
        methods: {
            show() {
                this.showFlag = true;
            },
            hide() {
                this.showFlag = false;
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable";

    .loading
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        display flex
        justify-content center
        align-items center
        text-align center
        background rgba(0, 0, 0 , 0.1)
        z-index 300
        .desc
            line-height: 20px
            font-size: $font-size-small
            color: $color-text-l
</style>
