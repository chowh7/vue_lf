import http from "../http-common";

class ItemService {
    getItemsByType(itemType, status){
        return http.get("/items", {params: {itemType, status}});
    }
}

export default new ItemService();