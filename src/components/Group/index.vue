<template>
    <div class="group">
        <div class="button-tab">
            <button-tab :height="35">
                <button-tab-item :selected="active==='group'" @on-item-click="handleTabItemChange('group')">
                    同省热团
                </button-tab-item>
                <button-tab-item :selected="active==='bill'" @on-item-click="handleTabItemChange('bill')">
                    最新出单
                </button-tab-item>
            </button-tab>
        </div>
        <load-more tip="努力加载中" v-if="loading"></load-more>
        <scroll class="content-wrapper" :data="groups" v-if="active==='group'">
            <ul>
                <li class="block-content"
                    v-for="group in groups"
                    :key="group.id" @click="toPath(`/group/${group.id}`)"
                >
                    <div class="content-main group-content-main">
                        <div class="avatar">
                            <img v-lazy="group.userAvatar" alt="同省商家头像"/>
                        </div>
                        <div class="info">
                            <div class="info-item">
                                <span class="group-name f15">{{group.name}}</span>
                            </div>
                            <div class="info-item">
                                <span class="status status-activity f11" v-if="group.activity_name">
                                    {{group.activity_name}}
                                </span>
                                <div v-else>
                                    <span v-if="group.status===1" class="status f11">热团中</span>
                                    <span class="status status-disabled f11" v-else>已结束</span>
                                </div>
                                <span v-if="group.status===1">
                                    <span class="el-icon-coral-naozhong f12"></span>
                                    <span class="f12 c999">{{group.end_date_format}}</span>
                                </span>
                            </div>
                            <div class="info-item">
                                <span>
                                    <span class="el-icon-coral-people f12 c999"></span>
                                    <span class="f12 c999">{{group.contacts}}</span>
                                </span>
                                <span>
                                    <span class="el-icon-coral-coordinates f12 c999"></span>
                                    <span class="f12 c999">{{group.city_name}}</span>
                                </span>
                                <span>
                                    <span class="el-icon-coral-caiwu-xianxing f12"></span>
                                    <span class="f12 c999">{{group.sum}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </scroll>
        <scroll class="content-wrapper" :data="bills" v-else>
            <ul>
                <li class="block-content">
                    <div class="content-main bill-content-main"
                         v-for="item in bills"
                         :key="item.id"
                         @click="toPath(`/bill/${item.id}/detail`)"
                    >
                        <div class="bill-first-word" :style="{backgroundColor: firstWordColor[item.id%5]}">
                            <span class="f13">{{item.name[0]}}</span>
                        </div>
                        <div class="info">
                            <span class="bill-name f15">{{item.name}}</span>
                            <span class="upload-time f13">{{item.contacts}}上传于{{item.upload_date.split('T')[0]}}</span>
                        </div>
                        <div class="open-btn" v-if="item.status===1&&currentUser.type!=='yy'" @click.stop="openGroup(item)">
                            <span class="f13">我要开团</span>
                        </div>
                    </div>
                </li>
            </ul>
        </scroll>
        <confirm ref="confirm" @confirm="toPath('/user/entry')"></confirm>
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
