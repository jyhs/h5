<template>
    <transition name="slide">
        <div class="order-detail-container">
            <m-header title="订单详情"></m-header>
            <div class="content-wrapper">
                <div class="group-info">
                    <div class="group-opener">
                        <img v-if="group.userAvatar" :src="group.userAvatar">
                        <div class="group-opener-info f12">
                            <p>
                                <span class="el-icon-coral-people_fill"></span>
                                <span>{{group.contacts}}</span>
                            </p>
                            <p>
                                <span class="el-icon-coral-coordinates_fill"></span>
                                <span>{{group.city}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="group-more f14">
                        <span class="order-no">订单号:CORAL{{group.id}}</span>
                        <span class="time">{{group.end_date_format}}</span>
                    </div>
                </div>
                <scroll class="ency" :data="cartDetails">
                    <ul>
                        <li class="ency-item" v-for="detail in cartDetails" :key="detail.id">
                            <img :src="detail.encyImage">
                            <div class="ency-info f14">
                                <p class="ency-info-detail">
                                    <span class="name">{{detail.name}}</span>
                                    <span class="size">{{detail.size}}</span>
                                    <span class="price">￥{{detail.price * detail.count}}</span>
                                </p>
                                <p>X {{detail.count}}</p>
                            </div>
                        </li>
                    </ul>
                </scroll>
                <div class="statistics">
                    <div class="detail f12">
                        <p class="item">
                            <span>订单</span>
                            <span>{{realCount + lostNum + damageNum}}件</span>
                            <span>{{totalPrice}}</span>
                        </p>
                        <p class="item">
                            <span>运费</span>
                            <span></span>
                            <span>{{totalFreight}}</span>
                        </p>
                        <p class="item">
                            <span>缺货</span>
                            <span>{{lostNum}}件</span>
                            <span>-{{lostPay}}</span>
                        </p>
                        <p class="item">
                            <span>报损</span>
                            <span>{{damageNum}}件</span>
                            <span>-{{damagePay}}</span>
                        </p>
                    </div>
                    <div class="total f16">
                        <span>实付</span>
                        <span class="count">¥{{realPay + realFreight}}</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
