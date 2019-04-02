<template>
    <transition name="slide">
        <div class="city-comm-container">
            <m-header title="各地交流"></m-header>
            <load-more tip="努力加载中" v-if="loading"></load-more>
            <scroll class="content-wrapper" :data="userList" v-if="!loading">
                <ul>
                    <li class="block-content" v-for="item in userList" :key="item.id">
                        <div class="content-main f12">
                            <div class="avatar">
                                <img :src="item.userAvatar" alt="qq">
                            </div>
                            <div class="info">
                                <div class="info-item">
                                <span class="name f15">
                                    <span>{{item.name}}</span>
                                    <popover
                                            v-if="item.description"
                                            placement="right"
                                            @on-show="onShow"
                                            @on-hide="onHide"
                                    >
                                        <span slot="content" class="f12">
                                            {{item.desc}}
                                        </span>
                                        <button>
                                            <span class="el-icon-coral-feedback f15 c999"></span>
                                        </button>
                                    </popover>
                                    </span>
                                        <span>
                                        <span class="el-icon-coral-coordinates f12 c999"></span>
                                        <span class="f12 c999">{{item.province_name}}</span>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span>
                                        <span class="el-icon-coral-label f12 c999"></span>
                                        <span class="f12 c999">{{item.id}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-show="userList && !userList.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
