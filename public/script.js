var app = new Vue({
    el: '#app',
    data: {
        items: [],
        flower_color: '',
        show: 'all',
    },
    created: function() {
        this.getItems();
    },
    computed: {

    },
    methods: {
        async addItem(color) {
            this.flower_color = color;
            var flower_url;
            if (color == "blue") {
                flower_url = "";
            }
            else if (color == "red") {
                flower_url = "";
            }
            else if (color == "yellow") {
                flower_url = "";
            }
            try {
                const response = await axios.post("/api/flowers", {
                    color: color,
                    completed: flower_url
                });
                this.flower_color = "";
                this.getItems();
            }
            catch (error) {
                console.log(error);
            }
        },
        async deleteItem(item) {
            try {
                const response = await axios.delete("/api/flowers/" + item.id);
                this.getItems();
            }
            catch (error) {
                console.log(error);
            }
        },
        showAll() {
            this.show = 'all';
        },
        showActive() {
            this.show = 'active';
        },
        showCompleted() {
            this.show = 'completed';
        },
        deleteCompleted() {
            this.items.forEach(item => {
                if (item.completed)
                    this.deleteItem(item);
            });
        },
        async getItems() {
            try {
                const response = await axios.get("/api/flowers");
                this.items = response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
    }
});
