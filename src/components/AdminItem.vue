<template>
    <div class="container">
      <label class="menu-label">Admin Item Menu</label>

      <!-- Super admin password input -->
      <div v-if="!showItems">
        <input class="super-admin-password-input" type="password" v-model="superAdminPassword" placeholder="Enter super admin password...(Default is super)">
        <button @click="validateSuperAdminPassword">Submit</button>
      </div>
      <div v-if="showItems">
        <label class="super-admin-label">You are now Super Admin</label>
        <button class="button-superadmin" @click="quitSuperAdmin">Super Admin Quit</button>
      </div>
      <hr />
      <!-- Super admin password input End -->

    <div v-if="showItems">
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
          
          <div v-else>
            <p>Item not found.</p>
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
            keyword: '',
            superAdminPassword: '',
            showItems: false,
        };
    },
    methods:{
        fetchItems(itemType){
          this.itemType = itemType;
          ItemService.getItemsByType(itemType, 'Active')
            .then(response => {
                this.items = response.data;
            })
            .catch(error => {
                console.error("Error fetching items: ", error);
            });
        }, 
        showItemDetail(id){
          this.$router.push({ name: 'AdminItemDetail', params: { id: id } });
        },
        keywordSearch(){
          ItemService.getItemsByKeyword(this.itemType, 'Active', this.keyword)
          .then(response => {
            this.items = response.data;
          })
          .catch(error => {
            console.error("Error searching items: ", error);
          });
        },
        validateSuperAdminPassword() {
          // Check if the entered super admin password is correct
          if (this.superAdminPassword === 'super') {
            this.showItems = true;
            localStorage.setItem("admin", "true");
          } else {
            this.showItems = false;
            localStorage.setItem("admin", "false");
          }
        },
        readAdminStatus() {
          // Read the value of "admin" from localStorage when the page starts
          const adminStatus = localStorage.getItem("admin");
          if (adminStatus === "true") {
            this.showItems = true;
          } else {
            this.showItems = false;
          }
        },
        quitSuperAdmin(){
          localStorage.setItem("admin", "false");
          this.readAdminStatus();
        }
    },
    mounted(){
        this.fetchItems(this.itemType);
        this.readAdminStatus();
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

.menu-label {
  display: block;
  padding: 8px 12px;
  background-color: #14b665; 
  color: #fff; 
  border-radius: 4px; 
  text-transform: uppercase; 
  font-weight: bold; 
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
}

.button-superadmin {
  background-color: #94128d;
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

.button-superadmin:hover {
  background-color: #9b6520; 
  border-color: #285e8e; 
}

.super-admin-password-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 40%;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: inline-block;
}

/* Placeholder text style */
.super-admin-password-input::placeholder {
  color: #999;
}

.super-admin-label {
  /* display: inline-block;
  padding: 10px;
  color: #fff; 
  border-radius: 5px;
  text-align: center; */

  /* display: inline-block; */
  display: block;
  padding: 8px 12px;
  background-color: #cf97c8; 
  color: #000; 
  border: 1px solid #218838; 
  border-radius: 0px;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
  /* margin-right: 300px; */

}

</style>
  