<template>
    <transition name="slide">
        <div class="open-admin-container">
            <m-header :title="group.name"></m-header>
            <div class="step-wrapper f12" v-if="!loading">
                <step v-model="group.mapStep" background-color='#fbf9fe' gutter="0">
                    <step-item title="平台已收款"></step-item>
                    <step-item title="商家确认"></step-item>
                    <step-item title="缺货"></step-item>
                    <step-item title="报损"></step-item>
                    <step-item title="订单完成"></step-item>
                </step>
            </div>
            <scroll class="content-wrapper" :data="scrollData">
                <div>
                    <div class="prompt" v-if="[2, 5].includes(group.current_step)">
                        <div class="prompt-content">
                            <span class="el-icon-coral-prompt_fill f16"></span>
                            <div class="f12">
                                <p>已通知商家，请耐心等待商家确认订单信息</p>
                                <p><span>还有{{timeDiff.day}}天{{timeDiff.hour}}小时{{timeDiff.minute}}分{{timeDiff.second}}秒</span>若商家没有响应自动确认</p>
                            </div>
                        </div>
                    </div>
                    <div class="complete" v-if="[6].includes(group.current_step)">
                        <span class="el-icon-coral-success_fill"></span>
                        <p class="f20">交易已完成</p>
                        <p class="f12">商家已收到款，鱼友缺货报损钱已退，您的佣金已到账。如有疑问，请及时联系我们。电话13918961783</p>
                        <div class="btn">
                            <a class="f12 text" href="javascript: void (0);">查看账户</a>
                        </div>
                    </div>
                    <div class="order">
                        <div class="no-time">
                            <div class="f14 no">订单号：CORAL{{group.id}}</div>
                            <div class="f14 time">{{group.end_date_format}}</div>
                            <div class="f12" v-if="[3, 4, 5].includes(group.current_step)">参团人数：{{group.cart_count}}</div>
                            <div class="f12" v-if="[3, 4, 5].includes(group.current_step)">总件数：{{group.detail_count}}</div>
                        </div>
                        <div class="download">
                            <a class="f12 text" href="javascript: void (0);">下载Excel</a>
                        </div>
                    </div>
                    <div class="carts" v-if="[3, 4, 5].includes(group.current_step)">
                        <div class="item" v-for="item in carts" :key="item.id">
                            <div class="item-main">
                                <div class="avatar">
                                    <img :src="item.userAvatar">
                                </div>
                                <div class="cart-detail">
                                    <p class="f15">{{item.user_name}}</p>
                                    <p class="f13">{{item.sum}}</p>
                                </div>
                                <div class="lost-damage"
                                     v-if="[3, 4].includes(group.current_step)"
                                     :class="group.current_step === 3 ? 'lost' : 'damage'"
                                     @click="showLostBoard(item)"
                                >
                                    <a class="f16" href="javascript: void (0);" v-if="group.current_step === 3">缺</a>
                                    <a class="f16" href="javascript: void (0);" v-if="group.current_step === 4">损</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="user" v-if="[1, 2].includes(group.current_step)">
                        <div class="avatar" >
                            <img :src="group.userAvatar">
                        </div>
                        <div class="info">
                            <p class="f12">
                                <span class="el-icon-coral-people_fill"></span><span>{{group.contacts}}</span>
                            </p>
                            <p class="f12">
                                <span class="el-icon-coral-coordinates_fill"></span><span>{{group.city}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="separator" v-if="[1, 2].includes(group.current_step)">
                        <span v-for="_ in 100" :key="_"></span>
                    </div>
                    <div class="input-info" v-if="[1, 2].includes(group.current_step)">
                        <div>
                            <span class="f12">收货人：</span>
                            <span class="f12">{{group.contacts}}</span>
                        </div>
                        <div>
                            <span class="f12">联系方式：</span>
                            <span class="f12">{{group.phone}}</span>
                        </div>
                        <div>
                            <span class="f12">收货地址：</span>
                            <span class="f12" v-if="group.current_step === 2">{{group.pickup_address}}</span>
                            <cube-input v-if="group.current_step === 1" v-model="group.pickup_address"></cube-input>
                        </div>
                    </div>
                    <div class="separator" v-if="[1, 2].includes(group.current_step)">
                        <span v-for="_ in 100" :key="_"></span>
                    </div>
                    <div class="detail" v-if="[1, 2].includes(group.current_step)">
                        <div>
                            <span class="f12">生物</span>
                            <span class="f12">{{group.detail_count}}件</span>
                            <span class="f12">{{group.sum}}</span>
                        </div>
                        <div>
                            <span class="f12">运费</span>
                            <span class="f12">{{group.freight * 100}}%</span>
                            <span class="f12 freight">￥{{group.top_freight}}</span>
                        </div>
                    </div>
                    <div class="total" v-if="[1, 2].includes(group.current_step)">
                        <span class="f16">平台已收</span>
                        <span></span>
                        <span class="f14">￥{{group.sum}}</span>
                    </div>
                    <div class="total" v-if="[3, 4, 5].includes(group.current_step)">
                        <span class="f16">缺货总计</span>
                        <span class="f16">{{lost.count}}件</span>
                        <span class="f16">￥{{lost.sum}}</span>
                    </div>
                    <div class="total" v-if="[4, 5].includes(group.current_step)">
                        <span class="f16">报损总计</span>
                        <span class="f16">{{damage.count}}件</span>
                        <span class="f16">￥{{damage.sum}}</span>
                    </div>
                    <div class="upload" v-if="[4, 5].includes(group.current_step)">
                        <p class="title f16">提交报损凭证</p>
                        <div>
                            <cube-upload v-model="files" :action="action"></cube-upload>
                        </div>
                    </div>
                </div>
            </scroll>
            <div class="confirm-btn-wrapper"
                 v-if="![2, 5, 6].includes(group.current_step)"
                 @click="toNextStep"
            >
                <a class="f18 text" href="javascript: void (0);">
                    <span v-if="group.current_step === 1">确认信息并提交给商家</span>
                    <span v-if="group.current_step === 3">下一步</span>
                    <span v-if="group.current_step === 4">确认提交</span>
                </a>
            </div>
            <lost-board
                    :details="details"
                    ref="lostBoard"
                    @cartAdd="cartAdd"
                    @cartDecrease="cartDecrease"
            ></lost-board>
            <confirm ref="confirm" @confirm="toPath(`/user/entry`)"></confirm>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
