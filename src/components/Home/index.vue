<template>
    <div class="home">
        <scroll class="home-content" :data="groups" ref="scroll">
            <div>
                <div class="slider-wrapper">
                    <swiper loop auto :aspect-ratio="306/750" :interval="5000">
                        <swiper-item v-for="(item, index) in list" :key="index">
                            <img :src="item.img" @load="loadImage" @click="handleSwapperImageClick(item)"/>
                        </swiper-item>
                    </swiper>
                </div>
                <div class="city-selector">
                <span class="wrapper" @click="handleShowProvinces">
                    <span class="el-icon-coral-coordinates f15"></span>
                    <span class="city-name f13" v-text="currentInfo.provinceName"></span>
                    <span class="el-icon-coral-biaotou-daoxu f20 c999 m-r-4"></span>
                </span>
                </div>
                <div class="tab-icons">
                    <div class="tab-icon" @click="toPath('cityComm')">
                        <img src="../../assets/tabIcon/gdzz.png" alt="各地交流"/>
                        <span class="f12">各地交流</span>
                    </div>
                    <div class="tab-icon" @click="toPath('fishStores')">
                        <img src="../../assets/tabIcon/ydlb.png" alt="鱼店列表"/>
                        <span class="f12">鱼店列表</span>
                    </div>
                    <div class="tab-icon" @click="toPath('coopStores')">
                        <img src="../../assets/tabIcon/hzsj.png" alt="合作商家"/>
                        <span class="f12">合作商家</span>
                    </div>
                    <div class="tab-icon" @click="toUrl('https://game.huanjiaohu.com')">
                        <img src="../../assets/tabIcon/jyry.jpg" alt="礁岩荣耀"/>
                        <span class="f12">礁岩荣耀</span>
                    </div>
                    <div class="tab-icon" @click="toPath('groupHelp')">
                        <img src="../../assets/tabIcon/tggz.png" alt="团购规则"/>
                        <span class="f12">团购帮助</span>
                    </div>
                </div>
                <load-more tip="努力加载中" v-if="loading"></load-more>
                <div class="block" v-if="!loading">
                    <div class="block-title">
                        <span class="rect"></span>
                        <span class="title-text f16">团购</span>
                    </div>
                    <div class="has-no-active" v-if="!activeGroups.length">
                        <span class="f13">亲，热团都结束了哟，摆架去
                            <span class="link" @click="toPath(`/group`)">团购</span>
                            看看？
                        </span>
                    </div>
                    <group-list :data="activeGroups" @groupChange="handleGroupChange" v-else></group-list>
                </div>
                <div style="margin: 10px 0;">
                    <swiper loop auto :aspect-ratio="140/750" :interval="6000">
                        <swiper-item v-for="(item, index) in provinceAdList" :key="index">
                            <img style="vertical-align: top;" :src="item.img" @load="loadImage"
                                 @click="handleSwapperImageClick(item)"
                            />
                        </swiper-item>
                    </swiper>
                </div>
                <div class="block" v-if="!loading&&activeLingShows.length">
                    <div class="block-title">
                        <span class="rect"></span>
                        <span class="title-text f16">零售</span>
                    </div>
                    <group-list :data="activeLingShows"></group-list>
                </div>
            </div>
        </scroll>
        <group>
            <popup-picker
                    :show.sync="showProvincesPicker" :show-cell="false" :data="provinces"
                    :columns="2" @on-change="handleProvinceChange" v-model="curProvince">
            </popup-picker>
        </group>
        <m-dialog ref="imageDialog" :closable="dialogClosable" :hide-on-blur="dialogHideOnBlur">
            <div class="dialog-content-wrapper">
                <img :src="dialogImage" @load="loadDialogImage"/>
                <div style="padding: 10px;" v-if="!dialogClosable">
                    <x-button :gradients="['#2382F0', '#2D9AE7']" @click.native="hasReadNotice">
                        已阅读并关闭
                    </x-button>
                </div>
            </div>
        </m-dialog>
        <toast ref="toast"></toast>
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
