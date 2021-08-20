<template> 
<div>
<div v-if="posts.length > 0">
    <h3>humans list</h3>
    <transition-group name="post-list">
     <post-item 
     v-for="post in posts" :key="post.id" 
        @remove='$emit("remove", post)'
    :post="post"/> 
    </transition-group>
</div>
<h4 v-if="posts.length < 1"> No Posts, let's create one!</h4>
</div>
</template>
<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>
<style scoped>
h4{
    color: red;
}
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
.post-list-move{
    transition: transform 0.4s ease;
}
</style>