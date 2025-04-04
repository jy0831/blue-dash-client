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
                <!-- <img class="side-logo" :class="isHide ? 'hide' : ''" src="../assets/images/cropped-image.png" alt=""> -->
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
import { ref, onMounted } from 'vue';
const route = useRoute();
const router = useRouter();
const isHide = ref(false);
const isVisibleText = ref(true);
const sideBarEvent = new CustomEvent('side-bar-hide', {});
const observer = new ResizeObserver(() => {
    window.dispatchEvent(sideBarEvent)
});
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
onMounted(() => {
    const sidebar = document.querySelector('.side-bar');
    observer.observe(sidebar);
});
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
    // background-color: #B1E5F2;
    background-color: var(--cg-1);
    height: calc(100% - 10px);
    width: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    transition: width 0.2s;
    box-shadow: 0.5px 0 10px 0px #00000040;
    padding-inline: 10px;
    padding-block: 5px;
    gap: 5px;
    z-index: 1;
}
.side-bar.hide {
    width: 50px;
    padding-inline: 5px;
    >.side-item {
        >div {
            display: none;
        }
    }
    >.side-btn {
        justify-content: center;
    }
}
.side-item {
    cursor: pointer;
    padding-block: 8px;
    padding-inline: 10px;
    width: calc(100% - 20px);
    border-radius: 10px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    transition: all .25s;
    text-decoration: none;
    font: 20px bold;
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
        // color: #4ca8ff;
    }
    &.selected {
        // background-color: #8DD8EB;
        background-color: #c9d9e8;
    }
}
.side-item:hover {
    // background-color: #8DD8EB;
    background-color: var(--cg-1_9);
}
.side-btn {
    position: relative;
    top: 0px;
    right: 0px;
    padding-block: 5px;
    padding-inline: 10px;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: calc(100% - 10px);
    // background-color: #8DD8EB;
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
    background-color: var(--cg-0);
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>