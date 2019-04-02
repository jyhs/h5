<template>
    <transition name="slide">
        <div class="my-orders-container">
            <m-header title="我的订单" :back-to-home="true"></m-header>
            <tab class="tab" active-color="#F66937">
                <tab-item selected @on-item-click="handleTabItemChange('all')">
                    全部订单
                </tab-item>
                <tab-item @on-item-click="handleTabItemChange('group')">
                    团购
                </tab-item>
                <tab-item @on-item-click="handleTabItemChange('noGroup')">
                    零售
                </tab-item>
                <!--<tab-item @on-item-click="handleTabItemChange">-->
                    <!--退款/售后-->
                <!--</tab-item>-->
            </tab>
            <scroll class="content-wrapper" :data="carts" ref="detailScroll">
                <ul>
                    <li class="order"
                        v-for="cart in carts" :key="cart.id"
                        @click="toPath(`/order/${cart.group_bill_id}/${cart.id}/detail`)">
                        <div class="header f14">
                            <div class="description">
                                <span class="el-icon-coral-people_fill"></span>
                                <span class="name">{{cart.group_user_name}}</span>
                                <span class="group-name">{{cart.group_name}}</span>
                                <span class="el-icon-coral-enter"></span>
                            </div>
                            <span class="status" v-if="cart.is_confirm">订单完成</span>
                        </div>
                        <div class="main">
                            <img v-lazy="cart.userAvatar" alt="avatar">
                            <div class="info f14">
                                <p>¥{{cart.total}}</p>
                                <p>{{cart.insert_date_format}}</p>
                            </div>
                        </div>
                        <div class="footer f12">
                            <span class="type" v-if="cart.is_group">团购</span>
                            <span class="type" v-else>零售</span>
                            <span class="order-no">订单号：CORAL{{cart.id}}</span>
                        </div>
                    </li>
                </ul>
                <load-more tip="努力加载中" v-if="loading"></load-more>
                <div v-show="carts && !carts.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
            <loading ref="loading"></loading>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
