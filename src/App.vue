<template>
    <div id="app" @touchmove.prevent>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <div class="tabs">
            <tab-bar></tab-bar>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import TabBar from './base/TabBar/index';
    import MHeader from './components/MHeader/index';
    export default {
        name: 'App',
        components: {
            MHeader,
            TabBar
        },
        created() {
            this.getProvinces();
            this.getChinaCities();
        },
        methods: {
            ...mapActions([
                'getProvinces',
                'getChinaCities'
            ])
        }
    }
</script>

<style scoped lang="stylus">
    @import "common/stylus/variable.styl";
    #app
        color $color-text
        height 100%
        .tabs
            position fixed
            left 0
            bottom 0
            width 100%
            height 60px
            background #f7f7fa
</style>
