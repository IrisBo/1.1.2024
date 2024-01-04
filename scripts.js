// connections

const itemName = document.querySelector(".item_name")
const itemPrice = document.querySelector(".item_price")
const itemCategory = document.querySelector(".item_category")
const itemPicture = document.querySelector(".item_pic")
const btnAddItem = document.querySelector("#Btn_add_item")
const tableAllItems = document.querySelector(".item_atribut")
// const tableHeaderConst= document.querySelector(".table_head-category")


let allAddedItems = getItemsFromLocalStorage()

window.addEventListener('load', function () {
    getTableFromLocalStorage();
});

btnAddItem.addEventListener("click", function () {

    let itemNameText = itemName.value
    let itemPriceText = itemPrice.value
    let itemCategoryText = itemCategory.value
    let itemPictureText = itemPicture.value
    let newItemAll = {
        name: itemNameText,
        price: itemPriceText,
        category: itemCategoryText,
        picture: itemPictureText,

    }

    createHtmlItems(newItemAll)


    allAddedItems.push(newItemAll)

    keepItemsInLocalStorage(allAddedItems)

    itemName.value = ""
    itemPrice.value = ""
    itemCategory.value = ""
    itemPicture.value = " "

})







// creating new item in html

function createHtmlItems(item) {
    const newItem = document.createElement("tr");
    for (const key in item) {
        const newThItem = document.createElement("td")
        if (key == 'picture') {
            const itemImg = document.createElement("img")
            itemImg.setAttribute('src', item[key])
            itemImg.setAttribute('height', '50px')
            itemImg.setAttribute('width', '50px')
            newThItem.appendChild(itemImg)
            console.log(item['picture']);

        } else {
            const newNode = document.createTextNode(item[key])
            newThItem.appendChild(newNode);
        }
        newItem.appendChild(newThItem);
    }

    const element = document.getElementById("table_items");
    element.appendChild(newItem);
}



// to keep it in local storage

function keepItemsInLocalStorage(array) {
    const myItemsString = JSON.stringify(array);
    localStorage.setItem("allitems", myItemsString);


}

// to get from local storage

function getItemsFromLocalStorage() {
    const storedItemsString = localStorage.getItem("allitems");

    if (storedItemsString) {

        return JSON.parse(storedItemsString);
    } else {

        return [];
    }
}

// to display all items stored after refresh



function getTableFromLocalStorage() {
    const storedItems = getItemsFromLocalStorage();
    const tableElement = tableAllItems

    // Clear existing content in the table
    // tableElement.innerHTML =""

    storedItems.forEach(item => {
        const newRow = document.createElement("tr");

        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const newCell = document.createElement("td");

                //  the picture link
                if (key === 'picture') {
                    const itemImg = document.createElement("img");
                    itemImg.setAttribute('src', item[key]);
                    itemImg.setAttribute('height', '50px');
                    itemImg.setAttribute('width', '50px');
                    newCell.appendChild(itemImg);
                } else {
                    const cellText = document.createTextNode(item[key]);
                    newCell.appendChild(cellText);
                }

                newRow.appendChild(newCell);
            }
        }

        tableElement.appendChild(newRow);
    });
}

