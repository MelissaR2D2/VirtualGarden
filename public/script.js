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
    },
});

var dragItem = document.querySelector("#item");
var contain = document.querySelector("#contain");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

contain.addEventListener("touchstart", dragStart, false);
contain.addEventListener("touchend", dragEnd, false);
contain.addEventListener("touchmove", drag, false);

contain.addEventListener("mousedown", dragStart, false);
contain.addEventListener("mouseup", dragEnd, false);
contain.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    }
    else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        }
        else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
