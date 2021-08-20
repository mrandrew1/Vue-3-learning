import { createApp, useAttrs } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import VFocus from '@/directives/VFocus'
import VIntersection from '@/directives/VIntersection'
import router from '@/router/router'
import store from './store'


const app= createApp(App);



app.directive('focus', VFocus);
app.directive('intersection', VIntersection);



components.forEach(component => {
    app.component(component.name, component)
});

app .use(store)
    .use(router)
    .mount('#app')
