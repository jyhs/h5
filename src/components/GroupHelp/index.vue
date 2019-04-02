<template>
    <transition name="slide">
        <div class="group-help-container">
            <m-header title="团购帮助"></m-header>
            <div class="button-tab">
                <button-tab :height="35">
                    <button-tab-item :selected="active==='openGroup'" @on-item-click="handleTabItemChange('openGroup')">
                        我要开团
                    </button-tab-item>
                    <button-tab-item :selected="active==='groupManage'" @on-item-click="handleTabItemChange('groupManage')">
                        团购管理
                    </button-tab-item>
                </button-tab>
            </div>
            <scroll class="content-wrapper" ref="openScroller" v-if="active==='openGroup'">
                <div class="block-content">
                    <img :src="require('../../assets/help/openGroup/1.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/openGroup/2.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/openGroup/3.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/openGroup/4.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/openGroup/5.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/openGroup/6.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/openGroup/7.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/openGroup/8.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/openGroup/9.jpg')" @load="loadImage"/>
                </div>
            </scroll>
            <scroll class="content-wrapper" ref="manageScroller" v-else>
                <div class="block-content">
                    <img :src="require('../../assets/help/groupManage/1.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/2.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/3.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/4.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/5.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/6.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/7.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/8.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/9.jpg')" @load="loadImage"/>
                    <img :src="require('../../assets/help/groupManage/10.jpg')" @load="loadImage"/>
                </div>
            </scroll>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
