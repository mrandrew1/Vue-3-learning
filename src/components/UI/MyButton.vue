<template>
    <button class="btn">
        <slot> </slot>   
    </button>
</template>
<script>
export default {
    name: 'my-button'
}
</script>
<style scoped>
    .btn {
        align-self: flex-end;
        background: none;
        color: green;
        border: 2px solid green;
        padding: 5px;
    }
</style>