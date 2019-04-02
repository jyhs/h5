<template>
    <transition name="slide">
        <div class="my-groups-container">
            <m-header title="我开的团"></m-header>
            <scroll class="content-wrapper" :data="groups">
                <ul>
                    <li class="block-content" v-for="group in groups" :key="group.id">
                        <div class="content-main group-content-main"
                             @click="toPath(`/group/${group.id}/${currentInfo.userId}/admin`)"
                        >
                            <div class="info">
                                <div class="info-item">
                                    <div class="group-name f15">
                                        <span class="name">{{group.name}}</span>
                                        <div class="icons">
                                            <span v-if="group.status===1" class="group-status f11">热团中</span>
                                            <span class="group-status group-status-disabled f11" v-else>已结束</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="el-icon-coral-naozhong f12"></span>
                                        <span class="f12 c999">{{group.end_date_format}}</span>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div>
                                        <span class="el-icon-coral-coordinates f12 c999"></span>
                                        <span class="f12 c999">{{group.city_name}}</span>
                                    </div>
                                    <div>
                                        <span class="el-icon-coral-caiwu-xianxing f12"></span>
                                        <span class="f12 c999">{{group.sum}}</span>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div>
                                        <span class="el-icon-coral-people f12 c999"></span>
                                        <span class="f12 c999">{{group.supplier_name}}</span>
                                    </div>
                                    <div style="color: #0082D5;">
                                        <span @click.stop="toPath(`/group/${group.id}/edit`)" style="margin-right: 10px;">
                                            <span class="el-icon-coral-editor f18"></span>
                                            <span class="f10" style="position: relative; top: -2px;">编辑</span>
                                        </span>
                                        <!--
                                        <span @click.stop="handleDownload(group)" style="margin-right: 10px;">
                                            <span class="el-icon-coral-smallscreen f18"></span>
                                            <span class="f10" style="position: relative; top: -2px;">下载</span>
                                        </span>
                                        -->
                                        <span class="el-icon-coral-lock f20"
                                              @click.stop="finishGroup(group)"
                                              v-if="group.status===1"
                                        >
                                            <span class="f10" style="position: relative; top: -2px;">截止</span>
                                        </span>
                                        <span @click.stop="reopenGroup(group)" v-else>
                                            <span class="el-icon-coral-unlock f20"></span>
                                            <span class="f10" style="position: relative; top: -2px;">重开</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <load-more tip="努力加载中" v-if="loading"></load-more>
            </scroll>
            <confirm ref="confirm" @confirm="confirmFinish"></confirm>
            <loading ref="loading"></loading>
            <toast ref="toast"></toast>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
