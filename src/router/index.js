import {createWebHistory, createRouter} from "vue-router";
import HomeView from "../components/HomeView.vue";
import SearchItem from "../components/SearchItem.vue";
import ReportItem from "../components/ReportItem.vue";
import ItemDetail from "../components/ItemDetail.vue";
import ReportItemSuccess from "../components/ReportItemSuccess.vue"
import AdminItem from "../components/AdminItem.vue";
import AdminItemDetail from "../components/AdminItemDetail.vue";
import AdminItemDeleteSuccess from "../components/AdminItemDeleteSuccess.vue";

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
    },
    {
        path: "/reportitemsuccess",
        name: "ReportItemSuccess",
        component: ReportItemSuccess
    },
    {
        path: "/adminitem",
        name: "AdminItem",
        component: AdminItem
    }, 
    {
        path: '/adminitemdetail/:id', // :id is a dynamic segment
        name: 'AdminItemDetail',
        component: AdminItemDetail
    },
    {
        path: '/adminitemdeletesuccess', // :id is a dynamic segment
        name: 'AdminItemDeleteSuccess',
        component: AdminItemDeleteSuccess
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;