<template>
    <transition name="slide">
        <div class="fish-stores-container">
            <m-header title="鱼店列表"></m-header>
            <div class="button-tab">
                <button-tab :height="35">
                    <button-tab-item :selected="active==='lss'" @on-item-click="handleTabItemChange('lss')">
                        本地鱼店
                    </button-tab-item>
                    <button-tab-item :selected="active==='pfs'" @on-item-click="handleTabItemChange('pfs')">
                        本地渔场
                    </button-tab-item>
                </button-tab>
            </div>
            <load-more tip="努力加载中" v-if="loading"></load-more>
            <scroll class="content-wrapper" :data="LSS" v-if="!loading&&active==='lss'">
                <ul>
                    <li class="block-content" v-for="item in LSS" :key="item.id">
                        <div class="content-main">
                            <div class="avatar">
                                <img :src="item.userAvatar" alt="lss"/>
                            </div>
                            <div class="info">
                                <div class="info-item">
                                    <span class="name f15">{{item.name}}</span>
                                    <span>
                                    <span class="el-icon-coral-coordinates f12 c999"></span>
                                    <span class="f12 c999">{{item.city}}</span>
                                </span>
                                </div>
                                <div class="info-item">
                                <span>
                                    <span class="el-icon-coral-people f12 c999"></span>
                                    <span class="f12 c999">
                                        {{item.phone}}
                                        <span v-if="item.contacts && item.contacts.trim()">({{item.contacts}})</span>
                                    </span>
                                </span>
                                <span>
                                    <span class="el-icon-coral-qrcode f12 c999">二维码</span>
                                </span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-show="LSS && !LSS.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
            <scroll class="content-wrapper" v-if="!loading&&active==='pfs'">
                <ul>
                    <li class="block-content" v-for="item in PFS" :key="item.id">
                        <div class="content-main">
                            <div class="avatar">
                                <img :src="item.userAvatar" alt="pfs"/>
                            </div>
                            <div class="info">
                                <div class="info-item">
                                    <span class="name f15">{{item.name}}</span>
                                        <span>
                                        <span class="el-icon-coral-coordinates f12 c999"></span>
                                        <span class="f12 c999">{{item.city}}</span>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span>
                                        <span class="el-icon-coral-people f12 c999"></span>
                                        <span class="f12 c999">
                                            <span>{{item.phone}}</span>
                                            <span v-if="item.contacts && item.contacts.trim()">({{item.contacts}})</span>
                                        </span>
                                    </span>
                                    <span>
                                        <span class="el-icon-coral-qrcode f12 c999">二维码</span>
                                        <span class="f12 c999"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-show="PFS && !PFS.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
