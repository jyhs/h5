<template>
    <transition name="slide">
        <div class="coop-stores-container">
            <m-header title="合作商家"></m-header>
            <div class="button-tab">
                <button-tab :height="35">
                    <button-tab-item :selected="active==='ency'" @on-item-click="handleTabItemChange('ency')">
                        生物批发
                    </button-tab-item>
                    <button-tab-item :selected="active==='equ'" @on-item-click="handleTabItemChange('equ')">
                        设备器材
                    </button-tab-item>
                </button-tab>
            </div>
            <load-more tip="努力加载中" v-if="loading"></load-more>
            <scroll class="content-wrapper" :data="encyStores" v-if="!loading&&active==='ency'">
                <ul>
                    <li class="block-content" v-for="item in encyStores" :key="item.id">
                        <div class="content-main">
                            <div class="avatar">
                                <img :src="item.userAvatar" alt="ency"/>
                            </div>
                            <div class="info">
                                <div class="info-item">
                                    <span class="name f15">{{item.name}}</span>
                                    <span>
                                        <span class="el-icon-coral-coordinates f12 c999"></span>
                                        <span class="f12 c999">{{item.city_name}}</span>
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
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-show="encyStores && !encyStores.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
            <scroll class="content-wrapper" :data="equStores" v-if="!loading&&active==='equ'">
                <ul>
                    <li class="block-content" v-for="item in equStores" :key="item.id">
                        <div class="content-main">
                            <div class="avatar">
                                <img :src="item.userAvatar" alt="equ"/>
                            </div>
                            <div class="info">
                                <div class="info-item">
                                    <span class="name f15">{{item.name}}</span>
                                    <span>
                                        <span class="el-icon-coral-coordinates f12 c999"></span>
                                        <span class="f12 c999">{{item.city_name}}</span>
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
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-show="equStores && !equStores.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="styl" src="./style.styl"></style>
