var app = new Vue({

    el: '#app',
    data: {
        items: [],
        positions: [],
        flower_color: '',
        show: 'all',
        active: false,
        currentX: 0,
        currentY: 0,
        initialX: 0,
        initialY: 0,
        xOffset: 0,
        yOffset: 0,
        init: true
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
                    img: flower_url,
                    initialX: 0,
                    initialY: 0,
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
        async updateItem(item, posX, posY) {
            console.log("updating");
            console.log(posX, posY);
            try {
                const response = await axios.put("/api/flowers/" + item.id, {
                    color: item.color,
                    img: item.img,
                    initialX: posX,
                    initialY: posY,
                });
                console.log("updated");
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
                //zeroes positions on page load
                if (this.init) {
                    this.init = false;
                    this.zeroPositions();
                }

            }
            catch (error) {
                console.log(error);
            }
        },
        dragStart(e, item) {
            console.log("in dragstart");
            //getting current item position
            this.xOffset = item.initialX;
            this.yOffset = item.initialY;

            if (e.type === "touchstart") {
                this.initialX = e.touches[0].clientX - this.xOffset;
                this.initialY = e.touches[0].clientY - this.yOffset;
            }
            else {
                this.initialX = e.clientX - this.xOffset;
                this.initialY = e.clientY - this.yOffset;
            }


            this.active = true;
        },

        dragEnd(e, item) {
            this.initialX = this.currentX;
            this.initialY = this.currentY;
            this.active = false;
            //we want to set all variables back to 0 and update item position
            this.updateItem(item, this.currentX, this.currentY);

            this.initialX = 0;
            this.initialY = 0;
            this.currentX = 0;
            this.currentY = 0;
            this.xOffset = 0;
            this.yOffset = 0;
        },

        drag(e, item) {
            if (this.active) {

                e.preventDefault();

                if (e.type === "touchmove") {
                    this.currentX = e.touches[0].clientX - this.initialX;
                    this.currentY = e.touches[0].clientY - this.initialY;
                }
                else {
                    this.currentX = e.clientX - this.initialX;
                    this.currentY = e.clientY - this.initialY;
                }

                this.xOffset = this.currentX;
                this.yOffset = this.currentY;

                this.setTranslate(this.currentX, this.currentY, e.target);
            }
        },

        setTranslate(xPos, yPos, el) {
            console.log(el);
            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        },
        zeroPositions() {
            console.log("called");
            console.log(this.items.length)
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].initialX = 0;
                this.items[i].initialY = 0;
            }
        }
    },

});

/*var contain = document.querySelector("#contain");

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
    console.log("in dragstart");

    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    }
    else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }


    active = true;
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

        setTranslate(currentX, currentY, e.target);
    }
}

function setTranslate(xPos, yPos, el) {
    console.log(el);
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
*/
