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
    postItem(item){
        return http.post("/items",item);
    }
    uploadItemImage(id, formData) {
        return http.post(`/items/${id}/image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }});
    }
    deleteItemById(id){
        return http.delete(`/items/${id}`);
    }
}

export default new ItemService();