import http from "../http-common";

class ItemService {
    getItemsByType(itemType, status){
        return http.get("/items", {params: {itemType, status}});
    }
    getItemById(id){
        return http.get(`/items/${id}`);
    }
    getItemsByKeyword(itemType, status, keyword){
        return http.get("/items/search", {
            params: { 
              itemType: itemType,
              status: status,
              keyword: keyword
            } });
    }
}

export default new ItemService();