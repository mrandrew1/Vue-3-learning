<template>
 <navbar/>
    <div class="app">
       <router-view/>
    </div>
</template>

<script>
import Navbar from '@/components/navbar'
    export default {
        components: {
            Navbar
        }
    }
</script>

<style>
    *{
        margin: 0pxz;
        padding: 0px;
        box-sizing: border-box;
    }
    .app {
        padding: 20px;
    }
</style>