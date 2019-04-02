<template>
    <transition name="slide">
        <div class="my-carts-container">
            <m-header title="我的订单" :back-to-home="true"></m-header>
            <scroll class="content-wrapper" :data="carts">
                <ul>
                    <li class="block-content" v-for="cart in carts" :key="cart.id"
                        @click="toPath(`/cart/${cart.group_bill_id}/${cart.id}/update`)">
                        <div class="content-main group-content-main">
                            <!--
                            <div class="avatar">
                                <img v-lazy="cart.userAvatar" alt="同省商家头像">
                            </div>
                            -->
                            <div class="info">
                                <div class="info-item">
                                    <span class="group-name f15">{{cart.group_name}}</span>
                                    <div class="group-status-wrapper">
                                        <span v-if="cart.group_status===1" class="group-status f11">热团中</span>
                                        <span class="group-status group-status-disabled f11" v-else>已结束</span>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <span>
                                        <span class="el-icon-coral-naozhong f12"></span>
                                        <span class="f12 c999">{{cart.insert_date_format}}购买</span>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span>
                                        <span class="el-icon-coral-caiwu-xianxing f14"></span>
                                        <span class="f12 c999">{{cart.sum + cart.freight}}</span>
                                    </span>
                                    <span class="el-icon-coral-trash f18" v-if="cart.group_status===1"
                                          @click.stop="deleteCart(cart)"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <load-more tip="努力加载中" v-if="loading"></load-more>
                <div v-show="carts && !carts.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
            <toast ref="toast"></toast>
            <loading ref="loading"></loading>
            <confirm ref="confirm" @confirm="confirmDelete"></confirm>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
