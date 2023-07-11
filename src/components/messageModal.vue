<script>
export default {
    methods: {
        push() {
            this.$emit("getReady")
        }
    }
}
</script>

<template>
    <div class="frame">
        <div class="modal">
            <slot></slot>
            <button type="button" class="btn btn-success mt-3" @click="push">確認</button>
        </div>
        <div class="bg"></div>
    </div>
</template>

<style lang="scss" scoped>
.frame {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        width: 25vw;
        height: 25vh;
        background-color: white;
        border-radius: 0.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        padding: 10vw 0vw;
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        background-color: black;
        opacity: 0.8;
        z-index: -1;
    }
}
</style>