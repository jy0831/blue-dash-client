<template>
    <WindowHeader></WindowHeader>
    <div class="window-body">
        <div 
            class="side-bar" 
            :class="isHide ? 'hide' : ''"
            @transitionend.stop="test2($event)"
        >
            
            <div class="side-btn" @click="test">
                <img v-if="isHide" src="../assets/icons/arrow_forward.svg" alt="">
                <img v-else src="../assets/icons/arrow_back.svg" alt="">
                <img class="side-logo" :class="isHide ? 'hide' : ''" src="../assets/images/cropped-image.png" alt="">
            </div>
            <router-link to="/dashboard" class="side-item" :class="{ selected: route.path == '/dashboard' }" @click="movePage('/dashboard')">
                <img src="../assets/icons/dashboard.svg" alt="">
                <div v-if="isVisibleText" >대쉬보드</div>
            </router-link>
            <router-link to="/test" class="side-item" :class="{ selected: route.path == '/test' }">
                <img src="../assets/icons/bar_chart.svg" alt="" @click="movePage('/test')">
                <div v-if="isVisibleText" >테스트</div>
            </router-link>
        </div>
        <div class="app-body">
            <router-view :key="route.path"></router-view>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import WindowHeader from './WindowHeader.vue';
import { ref } from 'vue';
const route = useRoute();
const router = useRouter();
const isHide = ref(false);
const isVisibleText = ref(true);
const test = (e) => {
    isHide.value = !isHide.value;
}
const test2 = (e) => {
    if (e.propertyName !== 'width') {
        return;
    }
    console.log('event', e);
    if (!isHide.value) {
        isVisibleText.value = true;
    } else {
        isVisibleText.value = false;
    }
    e.stopPropagation();
    
}
const movePage = (path) => {
    router.push(path);
}
</script>

<style lang="scss" scoped>
* {
    font-family: Interop;
}
.window-body {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: calc(100% - 31px);
    overflow-y: auto;
}
.side-bar {
    background-color: #B1E5F2;
    height: 100%;
    width: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    transition: width 0.2s;
}
.side-bar.hide {
    width: 50px;
    >.side-item>div {
        display: none;
    }
}
.side-item {
    width: calc(100% - 10px);
    padding-block: 12px;
    font: 20px bold;
    padding-left: 10px;
    transition: all .25s;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #000000;
    >img {
        width: 25px;
        height: 25px;
    }
    >div {
        font-size: 20px;
        font-weight: 600;
        user-select: none;
        -webkit-user-select: none;
    }
    &.selected {
        background-color: #8DD8EB;
    }
}
.side-item:hover {
    background-color: #8DD8EB;
}
.side-btn {
    position: relative;
    top: 0px;
    right: 0px;
    padding-block: 5px;
    padding-inline: 12px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8DD8EB;
    gap: 5px;
    >img {
        height: 25px;
    }
    >.side-logo {
        height: 38px;
        transition: all 0.15s;
    }
    >img.hide {
        transform: translateX(-200px);
    }
}
.app-body {
    width: 100%;
    background-color: #f6f7f8;
}
</style>