import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../components/HomeView.vue";
import SearchItem from "../components/SearchItem.vue";
import ReportItem from "../components/ReportItem.vue";
import ItemDetail from "../components/ItemDetail.vue";
import ReportItemSuccess from "../components/ReportItemSuccess.vue";
import BatchReport from "../components/BatchReport.vue"; // Import BatchReport component

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
        path: "/batchreport", // Add new route for BatchReport
        name: "BatchReport",
        component: BatchReport
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;