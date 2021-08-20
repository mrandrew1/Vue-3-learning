import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import About from '@/pages/About'
import PostIdPage from '@/pages/PostIdPage'
import PostsPageWithStore from '@/pages/PostsPageWithStore'
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path:'/',
        component: Main
    },
    {
        path:'/postpage',
        component: PostPage
    },
    {
        path:'/about',
        component: About
    }
    ,
    {
        path:'/postpage/:id',
        component: PostIdPage
    },
    {
        path:'/store',
        component: PostsPageWithStore
    }
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
}
)
export default router;