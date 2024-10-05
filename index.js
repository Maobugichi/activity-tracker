let hrs = document.querySelectorAll(".sel")
let header = document.querySelectorAll("h3")
let previous = document.querySelectorAll(".prev")
let listItem = document.querySelectorAll(".list-item")
let ellip = document.querySelector(".red")
let wrkHr = document.querySelector(".work-hrs")
let myItem;
let truth;
let previouslyClickedItem = null
let iniHr;

//fetch json on load to populate UI
window.addEventListener("load", function load() {
    fetch('data.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
       return response.json()
    })
    .then((data) => {
        data.map((item1,index) => {
            hrs[index].innerText = item1.title
            header[index].innerText = `${item1.timeframes.daily.current} ${item1.timeframes.daily.current > 1 ? "hrs" : "hr"}`
            previous[index].innerText = `Yesterday -${item1.timeframes.daily.previous} ${item1.timeframes.daily.previous > 1 ? "hrs" : "hr"}`
        })
    })
    
})

//save the clicked value in the callback
function getItem(myCallBack) {
    listItem.forEach((item,index) => {   
        item.addEventListener("click", function checkValue(e) {
        listItem.forEach((otherItem) => {
            otherItem.classList.remove('active');
            });
            e.target.classList.add('active');

            setTimeout(() => {
              e.target.classList.remove('active');  
            },10000)
        myCallBack(e.target.innerText)
       })
       })
}

//fetch the json data and populate of click
fetch('data.json').then((response) => {
    if (!response.ok) {
        throw new Error('Error fetching data')
    }
    return response.json()
})
.then((data) => {
    getItem((myItem) => {
        //let time; 
        myItem === "Daily" ?  data.map((item1,index) => {
            hrs[index].innerText = item1.title
            header[index].innerText = `${item1.timeframes.daily.current} ${item1.timeframes.daily.current > 1 ? "hrs" : "hr"}`
            previous[index].innerText = `Yesterday -${item1.timeframes.daily.previous} ${item1.timeframes.daily.previous > 1 ? "hrs" : "hr"}`
         }) : myItem === "Weekly" ? data.map((item1,index) => {
            hrs[index].innerText = item1.title
            header[index].innerText = `${item1.timeframes.weekly.current}  ${item1.timeframes.weekly.current > 1 ? "hrs" : "hr"}`
            previous[index].innerText = `Last Week -${item1.timeframes.weekly.previous}  ${item1.timeframes.weekly.previous > 1 ? "hrs" : "hr"}`
         }) : data.map((item1,index) => {
            hrs[index].innerText = item1.title
            header[index].innerText = `${item1.timeframes.monthly.current}  ${item1.timeframes.monthly.current > 1 ? "hrs" : "hr"}`
            previous[index].innerText = `Last Month -${item1.timeframes.monthly.previous}  ${item1.timeframes.monthly.previous > 1 ? "hrs" : "hr"}`
         }) 
    })
    
   
   
    //console.log(data)
}).catch(error => {
    console.log(error.message)
})

