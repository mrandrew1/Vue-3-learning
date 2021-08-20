import axios from "axios"
export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        isPostRemoved: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {value: 'title', name: "by name"},
            {value: 'body', name: "by body"}
            ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort( (post1, post2) => {
            return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
        } )
        },
        sortedAndSerchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setPostsLoading(state, isPostsLoading) {
            state.isPostsLoading = isPostsLoading;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
    },
    actions: {
        async fetchPosts({state, commit}){
            try {
                 commit('setPostsLoading', true); 
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', { 
                params: {
                    _page: state.page,
                    _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil( response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);
                                
            } catch (e) {
                console.log('error :',e)
            } finally {
                commit('setPostsLoading', false); 
            }
        },
        async loadMorePosts({state, commit}){
            try {
                commit('setPage', state.page += 1); 
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', { 
                params: {
                    _page: state.page,
                    _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil( response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
                                
            } catch (e) {
                console.log('error :',e)
            } 
        }
    },
    namespaced: true
}