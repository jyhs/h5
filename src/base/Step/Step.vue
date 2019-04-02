<template>
    <div class="my-step">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'MyStep',
        props: {
            value: Number,
            backgroundColor: {
                type: String,
                default: '#fff'
            },
            gutter: {
                type: String,
                default: '10px'
            }
        },
        data() {
            return {
                current: 0
            }
        },
        created() {
            this.current = this.value;
        },
        mounted() {
            this._mapPropsToChildComponent()
        },
        methods: {
            _mapPropsToChildComponent() {
                const _this = this;
                const len = this.$children.length - 1;
                this.$children.forEach((child, index) => {
                    child.currentStepNumber = (index + 1).toString();
                    child.currentStepLast = index === len;
                    if (index === _this.current) {
                        child.currentStatus = 'process';
                    } else if (index < _this.current) {
                        child.currentStatus = 'finish';
                    } else {
                        child.currentStatus = 'wait';
                    }
                })
            }
        },
        watch: {
            value(val) {
                this.current = val
            },
            current(val) {
                this._mapPropsToChildComponent();
                this.$emit('input', val)
            }
        }
    }
</script>
<style lang="stylus">
    .my-step
        display flex
        justify-content center
    .my-step-item
        display inline-block
        position relative
        overflow hidden
    .my-step-item-with-tail
        flex: 1
    .my-step-item-tail
        height 2px
        position absolute
        left 0
        top 20px
        padding 0 0
        transition all 0.4s ease 0s
    .my-step-item-tail-finish
        background: #09bb07 none repeat scroll 0 0
    .my-step-item-tail-process, .my-step-item-tail-wait
        background: #CCC none repeat scroll 0 0
    .my-step-item-icon
        width: 40px;
        height: 40px;
        display: inline-block;
        text-align: center;
    .my-step-item-checked::before
        font-size: 24px !important;
        line-height: 40px;
        margin: 0 !important;
        transform: translateY(-4px);
    .my-step-item-head
        position: relative;
        display: inline-block;
        text-align center
        .my-step-item-head-inner
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 100%;
            text-align: center;
            font-size: 14px;
            transition: all 0.4s ease 0s;
            background: #fff none repeat scroll 0 0;
        .my-step-item-title
            font-size: 10px;
            margin-top 8px
            color #666
    .my-step-item-head-finish .my-step-item-head-inner
        border: 1px solid #09bb07;
        color: #09bb07;
    .my-step-item-head-process .my-step-item-head-inner
        border: 1px solid #09bb07;
        color: #FFF;
        background: #09bb07 none repeat scroll 0 0;
    .my-step-item-head-wait .my-step-item-head-inner
        border: 1px solid #888;
        color: #888;
    .my-step-item-main
        display: inline-block;
        position: relative;
        vertical-align: top;
        color: #888;
    .my-step-item-main-process
        font-weight: bold;
        color: #666;
</style>
