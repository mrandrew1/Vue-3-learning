<template>
   <div 
   class="post" >
   <div>
       <div>{{post.id}}</div>
    <div><strong> Name: </strong>{{post.title}}</div>
    <div><strong> Description: </strong>{{post.body}}</div>
    </div>
    <div class="post__btns">
        <my-button
        @click="$router.push('/postpage/' + post.id)"
        >open</my-button>
        <my-button
        @click="$emit('remove', post)">delete</my-button>
        
    </div>
</div> 
</template>
<script>

export default {
  
    props: {
        post: {
            type: Object,
            required: true
        }
    }
    
}
</script>
<style scoped>

 .post{
        padding: 15px;
        border: 2px solid green;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post__btns{
        display: flex;
    }
</style>