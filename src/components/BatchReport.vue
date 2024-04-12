<template>
    <div class="container">
        <h2>Batch Report</h2>
        <form @submit.prevent="handleSubmit">
            <input type="file" accept=".json" @change="handleFileUpload">
            <br>
            <button @click="downloadSampleJSON">Download Sample JSON</button>
            <br>
            <button type="submit">Submit</button>
        </form>
        <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import ItemService from "@/services/ItemService"; // Import ItemService

export default {
    data() {
        return {
            file: null,
            errorMessage: ''
        };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        handleSubmit() {
            if (!this.file) {
                this.errorMessage = 'Please select a JSON file.';
                return;
            }

            const reader = new FileReader();
            reader.readAsText(this.file);
            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    this.uploadData(jsonData);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    this.errorMessage = 'Error parsing JSON file.';
                }
            };
            reader.onerror = () => {
                console.error('Error reading file:', reader.error);
                this.errorMessage = 'Error reading file.';
            };
        },
        uploadData(data) {
            ItemService.postBatchItems(data) // Use ItemService method for batch item upload
                .then(response => {
                    console.log('Batch report submitted successfully:', response.data);
                    this.$router.push({ name: 'ReportItemSuccess' }); // Navigate to ReportItemSuccess route
                })
                .catch(error => {
                    console.error('Error submitting batch report:', error);
                    this.errorMessage = 'Error submitting batch report.';
                });
        },
        downloadSampleJSON() {
            const sampleData = [
                {
                    "title": "Demo Item 1",
                    "description": "Description of Item 1",
                    "datePosted": "2024-04-11",
                    "color": "Black",
                    "category": "Electronics",
                    "status": "Active",
                    "itemType": "Lost",
                    "itemDateTime": "2024-04-11T10:38:28.751604-07:00",
                    "contact": {
                        "firstName": "John",
                        "lastName": "Doe",
                        "phone": "1234567890",
                        "email": "john.doe@example.com"
                    },
                    "location": {
                        "name": "Coffee Shop",
                        "address": "123 Main St",
                        "country": "USA",
                        "description": "Near the downtown area"
                    }
                },
                {
                    "title": "Demo Item 2",
                    "description": "Description of Item 2",
                    "datePosted": "2024-04-11",
                    "color": "Black",
                    "category": "Personal Accessories",
                    "status": "Active",
                    "itemType": "Found",
                    "itemDateTime": "2024-04-11T10:38:28.752129-07:00",
                    "contact": {
                        "firstName": "Jane",
                        "lastName": "Doe",
                        "phone": "9876543210",
                        "email": "jane.doe@example.com"
                    },
                    "location": {
                        "name": "Park",
                        "address": "456 Oak St",
                        "country": "USA",
                        "description": "Near the fountain"
                    }
                }
            ];

            const jsonString = JSON.stringify(sampleData, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "sample_data.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    color: #3498db;
}

button {
    background-color: #3498db;
    color: #ffffff;
    border: 1px solid #3079b3;
    padding: 10px 15px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 30px;
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

.errorMessage {
    color: red;
}
</style>