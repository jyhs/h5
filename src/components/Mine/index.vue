<template>
    <div class="mine-tab-container">
        <div class="top-img">
            <img src="../../assets/mine/setting_top.jpg"/>
        </div>
        <div class="content">
            <div class="wrap">
                <div class="user-info">
                    <div class="avatar">
                        <img :src="avatarImgPath" alt="用户头像"/>
                    </div>
                    <div class="others">
                        <span class="name f20">{{currentUser.name}}</span>
                        <div class="role-city">
                            <span class="role f13">鱼友</span>
                            <span class="city f13">{{currentUser.cityName}}</span>
                        </div>
                        <div class="about">
                            <div class="up-seller">
                                <span class="f18">0</span>
                                <span class="f11">关注商家</span>
                            </div>
                            <div class="up-ency" @click="toPath('encyFocus')">
                                <span class="f18">{{currentUser.focusNo}}</span>
                                <span class="f11">生物收藏</span>
                            </div>
                            <div class="point">
                                <span class="f18">0</span>
                                <span class="f11">我的积分</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="items">
                    <div class="item border-bottom-1 border-top-1" @click="toPath('myOpen')">
                        <div class="icon">
                            <img src="../../assets/mine/setting_icon1.svg"/>
                        </div>
                        <div class="group">
                            <span>我开的团</span>
                        </div>
                        <div class="arrow">
                            <span class="el-icon-coral-enter"></span>
                        </div>
                    </div>
                    <div class="item border-bottom-1" @click="toPath('myOrders')">
                        <div class="icon">
                            <img src="../../assets/mine/setting_icon2.svg"/>
                        </div>
                        <div class="group">
                            <span>我的订单</span>
                        </div>
                        <div class="arrow">
                            <span class="el-icon-coral-enter"></span>
                        </div>
                    </div>
                    <div class="item border-bottom-1" @click="toPath('meSeller')">
                        <div class="icon">
                            <img src="../../assets/mine/setting_icon7.png"/>
                        </div>
                        <div class="group">
                            <span>我是商家</span>
                        </div>
                        <div class="arrow">
                            <span class="el-icon-coral-enter"></span>
                        </div>
                    </div>
                    <div class="item border-bottom-1" @click="toPath('mySetting')">
                        <div class="icon">
                            <img src="../../assets/mine/setting_icon4.svg"/>
                        </div>
                        <div class="group">
                            <span>我的设置</span>
                        </div>
                        <div class="arrow">
                            <span class="el-icon-coral-enter"></span>
                        </div>
                    </div>
                    <div class="item border-bottom-1" @click="showLogoutConfirm">
                        <div class="icon">
                            <img src="../../assets/mine/setting_icon6.svg"/>
                        </div>
                        <div class="group">
                            <span>退出登录</span>
                        </div>
                        <div class="arrow">
                            <span class="el-icon-coral-enter"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <confirm ref="confirm" @confirm="confirmLogout"></confirm>
        <router-view></router-view>
    </div>
</template>
<script src="./script.js"></script>
<style lang="styl" src="./style.styl"></style>
