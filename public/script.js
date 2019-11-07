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
                flower_url = "./images/bFlower.png";
            }
            else if (color == "red") {
                flower_url = "./images/rFlower.png";
            }
            else if (color == "yellow") {
                flower_url = "./images/yFlower.png";
            }
            try {
                const response = await axios.post("/api/flowers", {
                    color: color,
                    img: flower_url
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
        deleteAll() {
            this.items.forEach(item => {
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
        dragItem(item) {
            this.drag = item;
        },
        dropItem(item) {
            const indexItem = this.items.indexOf(this.drag);
            const indexTarget = this.items.indexOf(item);
            this.items.splice(indexItem, 1);
            this.items.splice(indexTarget, 0, this.drag);
        },
    }
});
