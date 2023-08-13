const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

/* clock function*/
var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)

var tickState = true

function updateTime() {
    var now = new Date

    var lastHours = last.getHours().toString()
    var nowHours = now.getHours().toString()
    if (lastHours !== nowHours) {
        updateContainer(hoursContainer, nowHours)
    }

    var lastMinutes = last.getMinutes().toString()
    var nowMinutes = now.getMinutes().toString()
    if (lastMinutes !== nowMinutes) {
        updateContainer(minutesContainer, nowMinutes)
    }

    var lastSeconds = last.getSeconds().toString()
    var nowSeconds = now.getSeconds().toString()
    if (lastSeconds !== nowSeconds) {
        //tick()
        updateContainer(secondsContainer, nowSeconds)
    }

    last = now
}

function tick() {
    tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer(container, newTime) {
    var time = newTime.split('')

    if (time.length === 1) {
        time.unshift('0')
    }

    var first = container.firstElementChild
    if (first.lastElementChild.textContent !== time[0]) {
        updateNumber(first, time[0])
    }

    var last = container.lastElementChild
    if (last.lastElementChild.textContent !== time[1]) {
        updateNumber(last, time[1])
    }
}

function updateNumber(element, number) {
    //element.lastElementChild.textContent = number
    var second = element.lastElementChild.cloneNode(true)
    second.textContent = number

    element.appendChild(second)
    element.classList.add('move')

    setTimeout(function () {
        element.classList.remove('move')
    }, 990)
    setTimeout(function () {
        element.removeChild(element.firstElementChild)
    }, 990)
}

setInterval(updateTime, 100);



/*list products games*/
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'JASA-Laptop',
    user: 'admin',
    password: 'Danizock1708',
    database: 'ggdatabase',
    port: '3306',
    multipleStatements: true,
    sql: true
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

connection.query('SELECT * FROM products_games', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Query results:', results);
});


const gamesTable = document.querySelector('products');
const rowId = document.querySelector('product-id');
const rowName = document.querySelector('product-name');
const rowPrice = document.querySelector('product-price');
const rowDescription = document.querySelector('product-description');
const rowImage = document.querySelector('product-image');
getProducts = () => {
    fetch
}
listProducts = () => {
    const products = getProducts();
    products.forEach(product => {
        const row = document.createElement('tr');
        rowId.textContent = product.id;
        rowName.textContent = product.name;
        rowPrice.textContent = product.price;
        rowDescription.textContent = product.description;
        rowImage.src = product.image;
        gamesTable.appendChild(row);
    });


}

listProducts();
