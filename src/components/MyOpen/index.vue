<template>
    <transition name="slide">
        <div class="my-open-container">
            <m-header title="我开的团"></m-header>
            <tab class="tab" active-color="#F66937">
                <tab-item @on-item-click="handleTabItemChange('no')">
                    未截单
                </tab-item>
                <tab-item selected @on-item-click="handleTabItemChange('now')">
                    进行中
                </tab-item>
                <tab-item @on-item-click="handleTabItemChange('out')">
                    已完成
                </tab-item>
                <tab-item @on-item-click="handleTabItemChange('all')">
                    全部
                </tab-item>
            </tab>
            <scroll class="content-wrapper" :data="groups" ref="detailScroll">
                <ul>
                    <li class="order"
                        v-for="group in groups" :key="group.id"
                        @click="toPath(`/open/${group.id}/${currentInfo.userId}/admin`)"
                    >
                        <div class="header f14">
                            <div class="description">
                                <span class="el-icon-coral-people_fill"></span>
                                <span class="name">{{group.contacts}}</span>
                                <span class="group-name">{{group.name}}</span>
                                <span class="el-icon-coral-enter"></span>
                            </div>
                            <span class="status" v-if="group.status === 1" @click.stop>
                                <span>截单？</span>
                                <inline-x-switch
                                        :disabled="group.hasFinished"
                                        v-model="group.hasFinished"
                                        @on-change="finishGroup(group)"
                                ></inline-x-switch>
                            </span>
                            <span class="status" v-if="group.status === 0 && group.current_step === 1">进行中</span>
                            <span class="status" v-if="group.status === 0 && group.current_step !== 1">已完成</span>
                        </div>
                        <div class="main">
                            <img v-lazy="group.userAvatar" alt="avatar">
                            <div class="info f14">
                                <p>¥{{group.sum}}</p>
                                <p>{{group.end_date_format}}</p>
                            </div>
                        </div>
                        <div class="footer f12">
                            <span class="type" v-if="group.is_group">团购</span>
                            <span class="type" v-else>团购</span>
                            <span class="order-no">订单号：CORAL{{group.id}}</span>
                        </div>
                    </li>
                </ul>
                <load-more tip="努力加载中" v-if="loading"></load-more>
                <div v-show="groups && !groups.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
            </scroll>
            <loading ref="loading"></loading>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
