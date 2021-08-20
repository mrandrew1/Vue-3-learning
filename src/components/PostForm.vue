<template>
    <form @submit.prevent class="addingPostForm">
    <h4>Add new Post</h4>
    <my-input v-focus v-model="post.title"
     type="text" placeholder="name"/>
    <my-input v-model="post.body"
     type="text" placeholder="description"/>
    <my-button @click="addPost">click to add</my-button>
</form>
</template>

<script>

export default {
  
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        addPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post)
            this.post= {
                title: '',
                body: ''
            }
        }
    }
}
</script>

<style scoped>
    form{
        display: flex;
        flex-direction: column;
    }
    
</style>