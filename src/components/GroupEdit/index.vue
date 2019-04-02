<template>
    <transition name="slide">
        <div class="group-edit-container">
            <m-header :title="group.name"></m-header>
            <div class="content-wrapper m-t-10">
                <div class="input-item">
                    <div class="title f14">
                        <span class="rect"></span>
                        <span class="title-text f14">团单名</span>
                    </div>
                    <input placeholder="请输入" v-model="form.name" disabled/>
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
                <x-button :gradients="['#2382F0', '#2D9AE7']"  @click.native="submit" style="margin-top: 10px;">
                    提交
                </x-button>
            </div>
            <loading ref="loading"></loading>
            <toast ref="toast"></toast>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
