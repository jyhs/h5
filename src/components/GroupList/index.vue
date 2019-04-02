<template>
    <ul class="group-list">
        <li class="block-content" v-for="group in data" :key="group.id" @click="toGroupShop(group)">
            <div class="content-main group-content-main">
                <div class="avatar">
                    <div class="avatar-wrapper">
                        <img v-lazy="group.userAvatar" alt="同省商家头像">
                        <!--
                        <div class="mask"></div>
                        <span class="has-no-auth">已认证</span>
                        -->
                    </div>
                </div>
                <div class="info">
                    <div class="info-item">
                        <span class="group-name f15">{{group.name}}</span>
                    </div>
                    <div class="info-item">
                        <span v-if="group.activity_name" class="status f11">{{group.activity_name}}</span>
                        <span v-else class="status status-now f11">热团中</span>
                        <span>
                            <span class="el-icon-coral-naozhong f12"></span>
                            <span class="f12 c999">{{group.end_date_format}}截止</span>
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
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
