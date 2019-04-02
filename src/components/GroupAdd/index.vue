<template>
    <transition name="slide">
        <div class="group-add-container">
            <m-header :title="bill.name"></m-header>
            <scroll class="content-wrapper" :data="[currentUser]">
                <div>
                    <div class="input-container">
                        <div class="input-item">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">团单名</span>
                            </div>
                            <input placeholder="请输入" v-model="form.name"/>
                        </div>
                        <div class="input-item m-t-10">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">联系人姓名</span>
                            </div>
                            <input placeholder="请输入" v-model="form.contacts"/>
                        </div>
                        <div class="input-item m-t-10">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">联系人手机</span>
                            </div>
                            <input placeholder="请输入" v-model="form.phone" maxlength="11"/>
                        </div>
                        <div class="input-item m-t-10">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">截止时间</span>
                            </div>
                            <group>
                                <datetime
                                        placeholder="请选择"
                                        :start-date="startDate"
                                        format="YYYY-MM-DD HH:mm"
                                        v-model="form.end_date"
                                >
                                </datetime>
                            </group>
                        </div>
                        <div class="input-item m-t-10" v-if="isLss">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">开团范围</span>
                            </div>
                            <group>
                                <selector placeholder="请选择" :options="scopes" v-model="form.scope"></selector>
                            </group>
                        </div>
                        <div class="input-item m-t-10" v-if="form.scope==='province'">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">开团城市</span>
                            </div>
                            <group>
                                <selector placeholder="请选择" :options="cities" v-model="form.city"></selector>
                            </group>
                        </div>
                        <div class="m-t-10">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">运费(%)</span>
                            </div>
                            <div class="freight">
                                <inline-x-number v-model="form.freight" :min="0" :max="50" align="left" width="80px"></inline-x-number>
                                <div class="has-top" v-if="form.freight !== 0">
                                    <span style="margin-right: 4px; font-size: 14px;">单品运费是否封顶</span><inline-x-switch v-model="form.hasTop"></inline-x-switch>
                                </div>
                            </div>
                        </div>
                        <div class="m-t-10" v-if="form.hasTop">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">单品运费封顶额(元)</span>
                            </div>
                            <div>
                                <inline-x-number v-model="form.top_freight" :min="1" align="left" width="80px"></inline-x-number>
                            </div>
                        </div>
                        <div class="input-item m-t-10">
                            <div class="title f14">
                                <span class="rect"></span>
                                <span class="title-text f14">其他信息</span>
                            </div>
                            <!--
                            <quill-editor :options="editorOption" v-model="form.description"></quill-editor>
                            -->
                            <group>
                                <x-textarea name="description" placeholder="其他信息" v-model="form.description"></x-textarea>
                            </group>
                        </div>
                        <x-button :gradients="['#2382F0', '#2D9AE7']" @click.native="submit" style="margin-top: 10px;">确认开团</x-button>
                    </div>
                </div>
            </scroll>
            <toast ref="toast"></toast>
            <loading ref="loading"></loading>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
