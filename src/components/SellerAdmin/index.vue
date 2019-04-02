<template>
    <transition name="slide">
        <div class="seller-admin-container">
            <m-header :title="group.name"></m-header>
            <div class="step-wrapper f12" v-if="!loading">
                <step v-model="group.mapStep" background-color='#fbf9fe' gutter="0">
                    <step-item title="平台已收款"></step-item>
                    <step-item title="确认信息"></step-item>
                    <step-item title="缺货/报损"></step-item>
                    <step-item title="订单完成"></step-item>
                </step>
            </div>
            <scroll class="content-wrapper" :data="scrollData">
                <div>
                    <div class="big-info" v-if="[3, 4].includes(group.current_step)">
                        <p>您已确认，请去发货</p>
                        <p>并等待团长下一步操作</p>
                    </div>
                    <div class="prompt" v-if="[3, 4, 5].includes(group.current_step)">
                        <div class="prompt-content">
                            <span class="el-icon-coral-prompt_fill f16"></span>
                            <div class="f12">
                                <p>若36小时内商家未发货，交易将自动取消，钱款会自动
                                    退还至个人账户余额</p>
                                <p><span>还有{{timeDiff.day}}天{{timeDiff.hour}}小时{{timeDiff.minute}}分{{timeDiff.second}}秒</span>交易将自动关闭</p>
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
                        </div>
                        <div class="download">
                            <a class="f12 text" href="javascript: void (0);">下载Excel</a>
                        </div>
                    </div>
                    <div class="user" v-if="![6].includes(group.current_step)">
                        <div class="avatar" >
                            <img :src="group.userAvatar"/>
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
                    <div class="separator" v-if="![6].includes(group.current_step)">
                        <span v-for="_ in 100" :key="_"></span>
                    </div>
                    <div class="input-info" v-if="![6].includes(group.current_step)">
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
                            <span class="f12">{{group.pickup_address}}</span>
                        </div>
                    </div>
                    <div class="separator" v-if="![6].includes(group.current_step)">
                        <span v-for="_ in 100" :key="_"></span>
                    </div>
                    <div class="detail" v-if="![6].includes(group.current_step)">
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
                        <div>
                            <span class="f12">包装费 + 运费</span>
                            <span class="f12">{{group.freight * 100}}%</span>
                            <span class="f12 freight" v-if="group.current_step === 2">
                                <cube-input type="number" autofocus v-model="group.supplier_freight"></cube-input>
                            </span>
                            <span class="f12 freight" v-if="[3, 4].includes(group.current_step)">￥{{group.supplier_freight}}</span>
                        </div>
                    </div>
                    <div class="total" v-if="![6].includes(group.current_step)">
                        <span class="f16">预收总计</span>
                        <span class="f14">￥{{group.sum + group.supplier_freight}}</span>
                    </div>
                </div>
            </scroll>
            <div class="confirm-btn-wrapper"
                 v-if="[2, 5].includes(group.current_step)"
                 @click="toNextStep"
            >
                <div v-if="group.current_step === 5" class="text-wrapper">
                    <a class="f18 no-text"
                       href="javascript: void (0);"
                       @click="confirmGroup(0)"
                    >
                        不认可
                    </a>
                    <a class="f18 yes-text"
                       href="javascript: void (0);"
                       @click="confirmGroup(1)"
                    >
                        认可并确认订单
                    </a>
                </div>
                <a class="f18 text" href="javascript: void (0);" v-else>
                    确认并发货
                </a>
            </div>
            <lost-board :details="details" ref="lostBoard"></lost-board>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
