<template>
    <div class="register-block">
        <div class="register f13 box-sizing p-l-20 p-r-20 clearfix">
            <input class="box-sizing input m-t-9 m-b-9 f14" placeholder="请输入用户名"
                   v-model="registerForm.name" @blur="handleCheckName"
            />
            <input type="password" class="box-sizing input m-b-9 f14" minlength="6"
                   maxlength="20" placeholder="请输入密码(8-20位)"
                   v-model="registerForm.password1"
            />
            <input type="password" class="box-sizing input m-b-9 f14" minlength="6"
                   maxlength="20" placeholder="请再次输入密码"
                   v-model="registerForm.password2"
            />
            <div style="position: relative">
                <input class="box-sizing input m-b-9 f14 phone-input" minlength="11" maxlength="11"
                       placeholder="请输入手机号" v-model="registerForm.phone"
                />
                <button class="verify-code-btn" :disabled="countDown.isStart"
                        @click.prevent.stop="sendVerifyCode">
                    <CountDown
                            :is-start="countDown.isStart"
                            :seconds="120"
                            initContent="获取短信验证码"
                            afterContent="重新获取验证码"
                            :on-count-end="handleCountEnd"
                    >
                    </CountDown>
                </button>
            </div>
            <input class="box-sizing input m-b-9 f14" minlength="4" maxlength="4"
                   placeholder="请输入短信验证码" v-model="registerForm.auth"
            />
            <x-button :gradients="['#2382F0', '#2D9AE7']"
                      @click.native="handleRegister"
                      :show-loading="!registerEnabled"
            >
                <span class="f16" v-if="registerEnabled">立即注册</span>
                <span class="f16" v-else>正在注册</span>
            </x-button>
            <toast ref="toast"></toast>
            <loading ref="loading"></loading>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
