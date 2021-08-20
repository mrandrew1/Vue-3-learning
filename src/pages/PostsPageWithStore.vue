<template>
<div >
     <h2>Posts page with Store (VUEX)</h2>
     <my-input 
    v-focus
    :model-value="searchQuery"
    @update:model-value="setSearchQuery"
    aria-placeholder="search ..."
    /> 
    <div class="app__btns">
        <my-button class="addingButton" @click="showDialog"> Add new post? click here </my-button>
       <my-select 
       :model-value="selectedSort"
       @update:model-value="setSelectedSort"
       :options="sortOptions"/>
    </div>
    
    <my-dialog v-model:show="dialogVisible">  
         <post-Form @create="addPost" />
    </my-dialog>
 
    <post-List 
    :posts="sortedAndSerchedPosts"
    @remove="removePost"
    v-if="!isPostsLoading" />
    <div v-else> Loading Posts...</div>
    <div v-intersection="loadMorePosts" class="observer"></div> 
    <div class="page__wrapper">
        <div v-for="pageNumber in totalPages" 
        :key="pageNumber" 
        :class="{
            'current-page': page === pageNumber
        }"
        @click="changePage(pageNumber)"
        class="page">{{pageNumber}}</div>
         
    </div> 
</div>

</template>
<script>
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import PostList from '@/components/PostList'
import PostForm from '@/components/PostForm'
import axios from 'axios'

export default{
    components: {
        PostList, PostForm
      
    },
    data() {
        return{
           
            dialogVisible: false,
            
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        addPost(post){
            this.posts.push(post),
            this.dialogVisible = false
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== this.posts.id)
        },
        showDialog(){
            this.dialogVisible = true
        }
        
    } ,
    mounted() {
         this.fetchPosts(); 
        

    },
    computed: {
        ...mapState({
             posts: state => state.post.posts,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSerchedPosts: 'post/sortedAndSerchedPosts', 
        })
        
    }
   

}    
</script>
<style scoped>
  
    .app__btns {
        margin: 5px;
        display: flex;
        justify-content: space-between;
    }
    .page__wrapper {
        display: flex;
        margin-top: 15px;

    }
    .page{
        border: 1px solid black;
        padding: 10px;
    }
    .current-page {
        border: 2px solid green;
    }
    .observer {
        height: 30px;
        background: green;
    }
</style>
