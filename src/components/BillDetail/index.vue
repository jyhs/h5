<template>
    <transition name="slide">
        <div class="bill-detail-container">
            <m-header :title="bill.name"></m-header>
            <scroll class="content-wrapper" :data="details">
                <div>
                    <div class="detail">
                        <div>
                            <span class="column f12">
                                <span class="title">组织者：</span>
                                <span>{{bill.contacts}}</span>
                            </span>
                        </div>
                        <div>
                            <span class="column f12">
                                <span class="title">电话：</span>
                                <span>{{bill.phone}}</span>
                            </span>
                        </div>
                        <div>
                            <span class="column f12">
                                <span class="title">截止时间：</span>
                                <span>{{bill.effort_date_format}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="description">
                        <span class="f12" v-html="bill.description"></span>
                    </div>
                    <ul class="items">
                        <li class="item"
                            :class="{active: index%2!==1}"
                            v-for="(item, index) in details"
                            :key="item.id"
                        >
                            <span class="name f15">{{item.name}}</span>
                            <span class="size f15">{{item.size}}</span>
                            <span class="price f15">￥{{item.price}}</span>
                        </li>
                    </ul>
                </div>
            </scroll>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
