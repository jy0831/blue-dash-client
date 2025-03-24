<template>
    <header>
        <div class="wh-btn">
            ㅡ
        </div>
        <div class="wh-btn">
            ㅁ
        </div>
        <div class="wh-btn">
            X
        </div>
    </header>
</template>

<script setup>

</script>

<style scoped>

header {
    width: 100%;
    -webkit-app-region: drag;
    cursor: pointer;
    background-color: antiquewhite;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
}
.wh-btn {
    padding-block: 5px;
    padding-inline: 16px;
    -webkit-app-region: no-drag;
}
.wh-btn:hover {
    background-color: rgba(0, 0, 0, 0.075);
}

</style>