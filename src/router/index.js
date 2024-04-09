import {createWebHistory, createRouter} from "vue-router";
import HomeView from "../components/HomeView.vue";
import SearchItem from "../components/SearchItem.vue";
import ReportItem from "../components/ReportItem.vue";
import ItemDetail from "../components/ItemDetail.vue";

const routes = [
    {
        path: "/",
        alias: "/home",
        name: "HomeView",
        component: HomeView
    }, 
    {
        path: "/searchitem",
        name: "SearchItem",
        component: SearchItem
    }, 
    {
        path: "/reportitem",
        name: "ReportItem",
        component: ReportItem
    },
    {
        path: '/itemdetail/:id', // :id is a dynamic segment
        name: 'ItemDetail',
        component: ItemDetail
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;