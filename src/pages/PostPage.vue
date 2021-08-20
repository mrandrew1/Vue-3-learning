<template>
<div >
    <h1>Posts page</h1>
    <my-input 
    v-focus
    v-model="searchQuery"
    aria-placeholder="search ..."
    />
    <div class="app__btns">
        <my-button class="addingButton" @click="showDialog"> Add new post? click here </my-button>
        <my-select
        v-model="selectedSort" :options="sortOptions"
        /> 
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
   <!--  <div class="page__wrapper">
        <div v-for="pageNumber in totalPages" 
        :key="pageNumber" 
        :class="{
            'current-page': page === pageNumber
        }"
        @click="changePage(pageNumber)"
        class="page">{{pageNumber}}</div>
         
    </div> -->
</div>

</template>
<script>
import PostList from '@/components/PostList'
import PostForm from '@/components/PostForm'
import axios from 'axios'

export default{
    components: {
        PostList, PostForm
      
    },
    data() {
        return{
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: "by name"},
                {value: 'body', name: "by body"}
                ]
        }
    },
    methods: {
        addPost(post){
            this.posts.push(post),
            this.dialogVisible = false
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog(){
            this.dialogVisible = true
        },
        /* changePage(pageNumber){
            this.page = pageNumber;
        }, */
        async fetchPosts(){
            try {
                 this.isPostsLoading = true; 
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', { 
                params: {
                    _page: this.page,
                    _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil( response.headers['x-total-count'] / this.limit)
                this.posts = response.data;
                                
            } catch (e) {
                alert('Error')
            } finally {
                this.isPostsLoading = false; 
            }
        },
        async loadMorePosts(){
            try {
                this.page += 1; 
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', { 
                params: {
                    _page: this.page,
                    _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil( response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
                                
            } catch (e) {
                alert('Error')
            } finally {
                
            }
        }
    } ,
    mounted() {
        this.fetchPosts();
        

      /*   const options = {
    rootMargin: '0px',
    threshold: 1.0
}
const callback = (entries, observer) => {
    if (entries[0].isIntersecting && this.page < this.totalPages){
        this.loadMorePosts()
    }
};
const observer = new IntersectionObserver(callback, options);
observer.observe(this.$refs.observer);
 */
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort( (post1, post2) => {
            return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        } )
        },
        sortedAndSerchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
        
    },
    watch:{
        /* page(){
            this.fetchPosts()
        } */
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
