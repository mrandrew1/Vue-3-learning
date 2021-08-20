<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            
            <my-button @click="$router.push('/postpage')">Posts</my-button>
            <my-button style="margin-left: 20px" @click="$router.push('/about')">About</my-button>
            <my-button style="margin-left: 20px" @click="$router.push('/store')">store</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .navbar{
        height: 50px;
        background-color: lightgray;
        box-shadow: inset 2px 2px 4 gray;
        display: flex;
        align-items: center;
        padding: 0 15px;

    }
    .navbar__btns{
        margin-left: auto;
       
    }
</style>