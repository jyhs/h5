<template>
    <transition name="slide">
        <div class="group-admin-container">
            <m-header :title="group.name"></m-header>
            <div class="step-wrapper f12" v-if="!loading && carts.length">
                <step v-model="group.current_step" background-color='#fbf9fe' gutter="5px">
                    <step-item title="支付"></step-item>
                    <step-item title="缺货"></step-item>
                    <step-item title="报损"></step-item>
                    <step-item title="完成"></step-item>
                </step>
            </div>
            <scroll :data="carts" class="content-wrapper">
                <ul>
                    <li class="block-content"
                        v-for="cart in carts"
                        :key="cart.id"
                        @click="toCartAdmin(cart)"
                    >
                        <div class="content-main cart-content-main">
                            <div class="avatar">
                                <img v-lazy="cart.userAvatar" alt="用户头像"/>
                            </div>
                            <div class="info">
                                <div class="info-item">
                                    <span class="f16 c666">{{cart.user_name}}</span>
                                    <span>
                                        <span class="el-icon-coral-mobilephone_fill f12 c999"></span>
                                        <a class="f14 c999" :href="cart.telTo">{{cart.phone}}</a>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span>
                                        <span class="el-icon-coral-caiwu-xianxing f12"></span>
                                        <span class="f14 c999" style="margin-left:4px;">
                                            <span>应收款<span style="color: #ee735c;">￥{{cart.total}}</span></span>
                                            <span class="f10">(含运费)</span>
                                        </span>
                                    </span>
                                </div>
                                <div class="info-item" v-if="group.current_step===0">
                                    <div style="display: flex; align-items: center;" @click.stop>
                                        <inline-x-switch v-model="cart.hasPay" @on-change="changeCartPay(cart)"></inline-x-switch>
                                        <span>
                                            <span v-if="cart.is_pay===2" class="f16">有变动</span>
                                            <span v-if="cart.is_pay===1" class="f16">已付款</span>
                                            <span v-if="cart.is_pay===0" class="f16">未付款</span>
                                        </span>
                                    </div>
                                    <span class="el-icon-coral-trash f20" @click.stop="deleteCart(cart)"></span>
                                </div>
                                <div v-if="group.current_step!==0">
                                    <span class="f14 c999" style="display: flex; flex-direction: row; align-items: center;">
                                        <span class="el-icon-coral-caiwu-xianxing f12"></span>
                                        <span style="margin-left:4px; display: flex; flex-direction: row; align-items: center;" @click.stop>
                                            <span>应退款<span style="color: #ee735c">￥{{cart.lost_back + cart.damage_back}}</span></span>
                                            <popover placement="right" v-if="cart.lost_back + cart.damage_back">
                                                <span slot="content" class="popover-demo-content">
                                                    <div v-if="cart.lost_back">
                                                        <span>缺货应退款<span>￥{{cart.lost_back}}</span></span>
                                                    </div>
                                                    <div v-if="cart.damage_back" style="margin-top: 3px;">
                                                        <span>报损应退款<span>￥{{cart.damage_back}}</span></span>
                                                    </div>
                                                </span>
                                                <button>
                                                    <span class="el-icon-coral-feedback f16 c999" style="position: relative; top: 1px;"></span>
                                                </button>
                                            </popover>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-show="!loading && carts.length" style="padding: 0.1rem 0.05rem;">
                        <x-button :gradients="['#2382F0', '#2D9AE7']" @click.native="toNextStep()">
                            <span v-if="[0, 1, 2].includes(group.current_step)">下一步</span>
                            <span v-if="[3].includes(group.current_step)">下载报表</span>
                            <span v-if="[4].includes(group.current_step)">回首页</span>
                        </x-button>
                    </li>
                </ul>
                <load-more tip="努力加载中" v-if="loading"></load-more>
                <div v-show="!loading && !carts.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
            <confirm ref="confirm" @confirm="confirmDelete"></confirm>
            <confirm ref="confirmNext" @confirm="confirmToNext"></confirm>
            <loading ref="loading"></loading>
            <toast ref="toast"></toast>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
