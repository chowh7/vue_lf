<template>
    <div>
        <div class="container">
            <form>
                <h2>Report a {{ itemTypeTitle }} Item</h2>
                <h3>Item Details</h3>
                <div class="row">
                    <div class="container-text">
                        <label for="itemType">Type*:</label></div>
                    <div class="container-box">
                        <select id="itemType" name="itemType" v-model="itemType">
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="container-text">
                        <label for="title">Item Name*:</label>
                    </div>
                    <div class="container-box">
                        <input id="title" name="title" type="text" v-model="title" required>
                    </div>
                </div>
                <div class="row">
                    <div class="container-text">
                        <label for="description">Description:</label>
                    </div>
                    <div class="container-box">
                        <input id="description" type="text" v-model="description">
                    </div>
                </div>
                <div class="row">
                    <div class="container-text">
                        <label for="color">Color:</label>
                    </div>
                    <div class="container-box">
                        <input id="color" type="text" v-model="color">
                    </div>
                </div>
                <div class="row">
                    <div class="container-text">
                        <label for="category">Category:</label>
                    </div>
                    <div class="container-box">
                        <select id="category" name="category" v-model="category">
                            <option value="Books">Books</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Foods">Foods</option>
                            <option value="PA">Personal Accessories</option>
                            <option value="Pets">Pets</option>
                            <option value="Sports">Sports & Outdoors</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="container-text">
                        <label for="itemDateTime">Item Lost Time*:</label>
                    </div>
                    <div class="container-box">
                        <input id="itemDateTime" type="datetime-local" v-model="itemDateTime" required>
                    </div>
                </div> -->


                <div class="container">
                    <h3>{{ itemTypeTitle }} Location</h3>
                    <div class="row">
                        <div class="container-text">
                            <label for="locationName">Location*:</label>
                        </div>
                        <div class="container-box">
                            <input id="locationName" name="locationName" type="text" v-model="locationName" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="container-text">
                            <label for="locationDescription">Location Description:</label>
                        </div>
                        <div class="container-box">
                            <input id="locationDescription" name="locationDescription" type="text" v-model="locationDescription">
                        </div>
                    </div>
                    <div class="row">
                        <div class="container-text">
                            <label for="address">Address*:</label>
                        </div>
                        <div class="container-box">
                            <input id="address" name="address" type="text" v-model="address" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="container-text">
                            <label for="country">Country*:</label>
                        </div>
                        <div class="container-box">
                            <input id="country" name="country" type="text" v-model="country" required>
                        </div>
                    </div>
                </div>


                <div class="container">
                    <h3>Contact</h3>
                    <div class="row">
                        <div class="container-text">
                            <label for="fName">First Name*:</label>
                        </div>
                        <div class="container-box">
                            <input id="fName" type="text" v-model="fName" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="container-text">
                            <label for="lName">Last Name*:</label>
                        </div>
                        <div class="container-box">
                            <input id="lName" type="text" v-model="lName" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="container-text">
                            <label for="phone">Contact number*:</label>
                        </div>
                        <div class="container-box">
                            <input id="phone" type="tel" @input="validatePhone" v-model="phone" required>
                        </div>
                    </div>
                        <div class="container-error">
                        <span v-if="!isNumeric" class="errorMessage">Please enter a valid phone number</span>
                    </div>
                    <div class="row">
                        <div class="container-text">
                            <label for="email">Email Address:</label>
                        </div>
                        <div class="container-box">
                            <input id="email" type="email" required v-model="email">
                        </div>
                    </div>
                </div>
            </form>
            <div class="container">
                <button @click="handleSubmit">Submit</button>
                <br/>
                <label class="errorMessage" id=resultMessage>{{ resultMessage }}</label>
            </div>
        </div>
    </div>
</template>

<script>
import ItemService from '@/services/ItemService';
export default {
    name: 'ReportItem',
    data() {
        return {
            item: {
                title: "",
                description: "",
                datePosted: "",
                color: "",
                category: "",
                status: "",
                itemType: "",
                itemDateTime: "",
                contact: "",
                location: ""
            },
            contact: {
                fName: "",
                lName: "",
                phone: "",
                email: ""
            },
            location: {
                name: "",
                address: "",
                country: "",
                description: ""
            },

            isNumeric: true,
            resultMessage: "",
            itemType:"",
            itemTypeTitle: "",
            category: ""
        };
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();
            this.item.title = this.title;
            this.item.description = this.description;
            this.item.datePosted=this.getCurrentTime();
            this.item.color = this.color;
            this.item.category = this.category;
            this.item.status = "Active";
            this.item.itemType = this.itemType;
            this.item.itemDateTime=this.getItemDateTime();

            this.item.contact = this.setContactDetails();
            this.item.location = this.setLocationDetails();

            if(this.item.itemType==null || this.item.title == null || this.location.name == null || this.location.address == null || this.location.country == null || this.contact.fName == null || this.contact.lName == null || this.contact.phone == null || this.isNumeric == false){
                this.resultMessage = "*Please fill in all the required fields."
            }else{
                ItemService.postItem(this.item)
                .then(response => {
                    this.resultMessage = "item submitted";
                    console.log(response.data);
                    this.$router.push({ name: "ReportItemSuccess"});
                })
                .catch(error => {
                    console.error(error)
                });
            }
        },
        setContactDetails() {
            this.contact.fName = this.fName;
            this.contact.lName = this.lName;
            this.contact.phone = this.phone;
            this.contact.email = this.email;
            return this.contact;
        },
        validatePhone() {
            const numericRegex = /^\d+$/;
            this.isNumeric = numericRegex.test(this.phone);
        },
        setLocationDetails() {
            this.location.name = this.locationName;
            this.location.address = this.address;
            this.location.country = this.country;
            this.location.description = this.locationDescription;
            return this.location;
        },
        getCurrentTime() {
            const now = new Date();
            const formattedDate = now.toISOString().slice(0, 10);
            return formattedDate;
        },
        getItemDateTime(){
            const now = new Date();
            const isoString = now.toISOString();
            const microseconds = String(now.getMilliseconds()).padStart(6, '0');
            return isoString.slice(0, -1) + microseconds + 'Z';
        },
        refreshItemTypeTitle(){
            console.log("refreshItemTypeTitle method called");
            if(this.itemType==="Lost"){
                this.itemTypeTitle = "Lost";
            }else{
                this.itemTypeTitle = "Found";
            }
        }
    },
    watch:{
        itemType(){
            this.refreshItemTypeTitle();
        }
    }
}
</script>

<style scoped>
.container {
    width: 500px;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.container-text {
    width: 200px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: right;
}

.container-box {
    width: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: left 0%;
    margin-right: auto;
    text-align: left;
}

.container-error {
    width: 300px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-left: 210px;
    margin-right: auto;
    text-align: left;
}

.row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    justify-content: center;
    justify-items: center;
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

button.active,
button:focus {
    background-color: #285e8e;
    border-color: #1f4d75;
    outline: none;
}

.errorMessage{
    color: red;
}
</style>