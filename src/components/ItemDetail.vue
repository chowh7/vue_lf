<template>
  <div class="item-detail-container">
    <div v-if="item" class="item-detail">
      <img v-if="item.image" :src="'http://localhost:8080/uploads/' + item.image" :alt="item.title" class="item-image">
      <h2>{{ item.title }}</h2>
      <p><strong>Description:</strong> {{ item.description }}</p>
      <p><strong>Color:</strong> {{ item.color }}</p>
      <p><strong>Category:</strong> {{ item.category }}</p>
      <p><strong>Status:</strong> {{ item.status }}</p>
      <p><strong>Type:</strong> {{ item.itemType }}</p>
      <p><strong>Posted:</strong> {{ item.datePosted }}</p>
      <div v-if="item.location">
        <h3>Location</h3>
        <p><strong>Name:</strong> {{ item.location.name }}</p>
        <p><strong>Address:</strong> {{ item.location.address }}</p>
        <p><strong>Country:</strong> {{ item.location.country }}</p>
        <p><strong>Description:</strong> {{ item.location.description }}</p>
      </div>
      <div v-if="item.contact">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> {{ item.contact.firstName }} {{ item.contact.lastName }}</p>
        <p><strong>Email:</strong> <a :href="`mailto:${item.contact.email}`">{{ item.contact.email }}</a></p>
        <p><strong>Phone:</strong> {{ item.contact.phone }}</p>
      </div>
    </div>
    <div v-else>
      <p>Item not found.</p>
    </div>
  </div>

</template>
  
<script>
import ItemService from '../services/ItemService';
export default {
    name: 'ItemDetail',
    data() {
        return {
            item: null
        };
    },
    mounted() {
        this.fetchItemById(this.$route.params.id);
    },
    methods: {
        fetchItemById(id) {
            ItemService.getItemById(id)
            .then(response => {
                this.item = response.data;
                })
            .catch(error => {
                console.error("Error fetching items: ", error);
            });
        }
    }
}
</script>

<style scoped>
.item-detail-container {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 20px;
}

.item-detail {
  max-width: 600px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #007bff; 
  border-radius: 5px;
  padding: 20px;
  background-color: #f0f8ff;
}

.item-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 5px;
}

h2 {
  color: #007bff;
  margin-bottom: 20px;
}

h3 {
  color: #0056b3;
  margin-top: 20px;
}

p {
  color: #03396c;
  font-size: 16px;
}
</style>
  