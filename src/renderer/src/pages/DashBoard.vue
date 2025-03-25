<template>
    <div class="page-wrap">
        <div class="page-dashboard"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

</script>

<style scoped>
.page-wrap {
    display: flex;
    flex-direction: column;

}
.page-dashboard {
    width: 100%;
    height: 30vh;
    background-color: var(--cg--0_3);
    border: 1px solid var(--cg-0_7);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #00000010;
}
</style>