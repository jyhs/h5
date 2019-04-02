<template>
    <transition name="slide">
        <div class="my-setting-container">
            <m-header title="我的设置"></m-header>
            <div class="user-name">
                <div class="name-title f14">
                    <span class="rect"></span>
                    <span>昵称</span>
                </div>
                <div class="f14">{{user.name}}</div>
            </div>
            <div>
                <group>
                    <group-title slot="title" class="group-title">
                    <span>
                        <span class="rect"></span>
                        <span>头像</span>
                    </span>
                    </group-title>
                    <div class="img-uploader">
                        <label class="uploader-wrap">
                            <input type="file" @change="uploadAvatar($event)"/>
                            <span class="el-icon-coral-add"></span>
                            <img :src="avatarImgPath" v-if="avatarImgPath"/>
                        </label>
                    </div>
                </group>
                <group>
                    <group-title slot="title" class="group-title">
                    <span>
                        <span class="rect"></span>
                        <span>我的信息</span>
                    </span>
                    </group-title>
                    <x-input class="f14" title="手机号码" placeholder="请填写手机号码" is-type="china-mobile" v-model="user.phone"></x-input>
                    <popup-picker class="f14" title="所在城市" :data="chinaCities" :columns="2" v-model="nowCity" value-text-align="left" show-name></popup-picker>
                    <x-textarea class="f14" v-if="isSeller" title="详细地址" placeholder="请填写详细地址" :rows="3" v-model="user.address"></x-textarea>
                    <x-input class="f14" v-if="isSeller" title="联系人名" placeholder="请填写联系人名" v-model="user.contacts"></x-input>
                    <x-textarea class="f14" v-if="isSeller" title="自我介绍" placeholder="请填写自我介绍" :rows="4" v-model="user.description"></x-textarea>
                </group>
                <div style="padding: 0 0.1rem; margin-top: 0.1rem;">
                    <x-button :gradients="['#2382F0', '#2D9AE7']" @click.native="handleSubmit">提交</x-button>
                </div>
            </div>
            <loading ref="loading"></loading>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
