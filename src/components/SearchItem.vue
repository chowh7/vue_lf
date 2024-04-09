<template>

    <!-- Quick Test -->
    <!-- 
    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item.id">
        {{ item.title }} - {{ item.description }}
      </li>
    </ul> 
    <p v-else>No items to display.</p> 
    -->
    <div>
        <div class="container">
            <button :class="{ active: itemType === 'Lost' }" @click="fetchItems('Lost')">Show Lost Items</button>
            <button :class="{ active: itemType === 'Found' }" @click="fetchItems('Found')">Show Found Items</button>
        </div>
        <div class="container">
            <input type="text" v-model="keyword" placeholder="Enter keyword...">
            <button @click="keywordSearch">Search</button>
        </div>
        <div class="container" v-if="items.length > 0">
        <div class="row">
            <div v-for="item in items" :key="item.id">
            <div class="card" @click.prevent="showItemDetail(item.id)">
                <div class="card-body">
                    <img v-if="item.image" :src="'http://localhost:8080/uploads/' + item.image" :alt="item.title" class="card-img">
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.description }}</p>
                    <br />
                    <p v-if="item.location"><small>Location: {{ item.location.name }}</small></p>
                    <p><small>Posted: {{ item.datePosted }}</small></p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
  
<script>
import ItemService from '../services/ItemService';
export default {
    name: 'SearchItem',
    data(){
        return{
            items: [],
            itemType: 'Lost', // Default 'Lost'
            keyword: ''
        };
    },
    methods:{
        fetchItems(itemType){
          this.itemType = itemType;
          ItemService.getItemsByType(itemType, "Active")
            .then(response => {
                this.items = response.data;
            })
            .catch(error => {
                console.error("Error fetching items: ", error);
            });
        }, 
        showItemDetail(id){
          this.$router.push({ name: 'ItemDetail', params: { id: id } });
        },
        keywordSearch(){
          ItemService.getItemsByKeyword(this.itemType, "Active", this.keyword)
          .then(response => {
            this.items = response.data;
          })
          .catch(error => {
            console.error("Error searching items: ", error);
          });
        }
    },
    mounted(){
        this.fetchItems(this.itemType);
    }
}
</script>

<style scoped>

.container {
  width: 960px;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  justify-content: center;
  justify-items: center;
}


.card {
  box-shadow: 0 4px 8px 0 #00000033;
  transition: 0.3s;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  border: 1px solid #87CEFA;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.card-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 #0000004D;
  transform: scale(1.05);
}

.card-body {
    padding: 8px;
}

button {
  background-color: #3498db;
  color: #ffffff;
  border: 1px solid #3079b3; 
  padding: 10px 15px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  font-family: Tahoma, Geneva, Verdana, sans-serif; 
  border-radius: 4px; 
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

button:hover {
  background-color: #3079b3; 
  border-color: #285e8e; 
}

button.active, button:focus {
  background-color: #285e8e; 
  border-color: #1f4d75; 
  outline: none;
}


</style>
  