<template>
    <transition name="slide">
        <div class="cart-detail-container">
            <m-header :title="group.name"></m-header>
            <scroll class="content-wrapper" :data="selectDetails">
                <div>
                    <ul>
                        <li class="block-content m-b-10" v-for="(item, index) in selectDetails" :key="index">
                            <div class="img-container">
                                <img :src="item.encyImage" alt="生物图片"/>
                            </div>
                            <div class="info">
                                <div>
                                    <span class="name f15">{{item.name}}<span v-if="item.size" class="size f12">({{item.size}})</span></span>
                                </div>
                                <div v-if="group.status===0">
                                    <span class="f16">缺货<span style="color: #ee735c;">{{item.lost_num}}</span>条 应退<span style="color: #ee735c;">{{item.lost_back_freight}}</span>元</span>
                                </div>
                                <div v-if="group.status===0">
                                    <span class="f16">报损<span style="color: #ee735c;">{{item.damage_num}}</span>条 应退<span style="color: #ee735c;">{{item.damage_back_freight}}</span>元</span>
                                </div>
                                <div style="line-height: 20px;">
                                    <span class="f12">X <span class="f13">{{item.count}}</span></span>
                                    <span class="price f16">￥{{item.price * item.count}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <load-more tip="努力加载中" v-if="loading"></load-more>
                    <div class="total-count" v-if="!loading">
                        <div class="f18">合计
                            <span style="font-weight: bold;">
                                <span style="color: #ee753c;">￥{{((totalCount + totalFreight) || 0).toFixed(2)}}</span>
                                <span class="f14">(商品<span style="color: #ee735c;">￥{{(totalCount || 0).toFixed(2)}}</span> 运费<span style="color: #ee735c;">￥{{(totalFreight || 0).toFixed(2)}}</span>)</span>
                            </span>
                        </div>
                    </div>
                    <div v-if="!loading">
                        <group>
                            <x-input
                                    v-if="group.user_type==='lss'||group.user_type==='cjlss'"
                                    placeholder="联系人"
                                    v-model="contacts" :readonly="group.status===0"
                            ></x-input>
                            <x-input
                                    placeholder="联系电话" is-type="china-mobile" :max="11"
                                    v-model="phone" :readonly="group.status===0"
                            ></x-input>
                            <popup-picker
                                    v-if="group.user_type==='lss'||group.user_type==='cjlss'"
                                    :data="chinaCities"
                                    :columns="2"
                                    v-model="nowCity"
                                    value-text-align="left"
                                    show-name>
                            </popup-picker>
                            <x-textarea
                                    v-if="group.user_type==='lss'||group.user_type==='cjlss'"
                                    :max="50" name="address" placeholder="详细地址" :rows="1"
                                    v-model="address" :readonly="group.status===0"
                            ></x-textarea>
                            <x-textarea
                                    :max="200" name="description" placeholder="备注"
                                    v-model="remark" :readonly="group.status===0"
                            ></x-textarea>
                        </group>
                    </div>
                </div>
            </scroll>
            <div class="submit" v-if="!loading&&group.status===1">
                <x-button :gradients="['#2382F0', '#2D9AE7']" @click.native="handleSubmit">确认购买</x-button>
            </div>
            <loading ref="loading"></loading>
            <toast ref="toast"></toast>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
