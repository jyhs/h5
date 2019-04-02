<template>
    <div class="login-block">
        <div class="login f13 box-sizing p-l-20 p-r-20 clearfix">
            <input class="box-sizing input m-t-9 m-b-9 f14"
                   placeholder="请输入用户名"
                   v-model="loginForm.name"
            />
            <input type="password"
                   class="box-sizing input m-b-9 f14"
                   minlength="6"
                   maxlength="20"
                   placeholder="请输入密码"
                   v-model="loginForm.password"
            />
            <div v-if="loginHasError" style="position: relative">
                <input class="box-sizing input m-b-9 f14 phone-input"
                       minlength="11"
                       maxlength="11"
                       placeholder="请输入手机号"
                       v-model="loginForm.phone"
                />
                <button class="verify-code-btn"
                        :disabled="countDown.isStart"
                        @click.prevent.stop="sendVerifyCode"
                >
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
            <input v-if="loginHasError"
                   class="box-sizing input m-b-9 f14"
                   minlength="4"
                   maxlength="4"
                   placeholder="请输入短信验证码"
                   v-model="loginForm.auth"
            />
            <x-button :gradients="['#2382F0', '#2D9AE7']"
                      @click.native="handleLogin"
                      :show-loading="!loginEnabled"
            >
                <span class="f16" v-if="loginEnabled">马上登录</span>
                <span class="f16" v-else>正在登录</span>
            </x-button>
            <toast ref="toast"></toast>
            <loading ref="loading"></loading>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
