/*
===========Form validation and alert box===========
*/

//User information field object
const donationFields = {
    firstName : document.getElementById("fname"),
    lastName : document.getElementById("lname"),
    emailAddress : document.getElementById("email"),
    city : document.getElementById("city"),
    zipCode : document.getElementById("zip"),
    country : document.getElementById("country"),
    address : document.getElementById("address"),
    donation : document.getElementById("donates"),
    cardNumber : document.getElementById("card"),
    paymentType : document.getElementById("types"),
    expirationDate : document.getElementById("edate"),
    securityCode : document.getElementById("code")
}

//Logic that fires when the proceed button is clicked
const donationBtn = document.getElementById("proceed")
donationBtn.addEventListener("click", event => {
    event.preventDefault()

//Logic validating the user information fields
if (donationFields.firstName.value === "") {
    alert("Please enter your first name")
} 
if (donationFields.lastName.value === ""){
    alert("Please enter your last name")
}    
if (donationFields.emailAddress.value === ""){
    alert("Please enter your email address")
}
if (donationFields.city.value === ""){
    alert("Please enter your city name")
}
if (donationFields.zipCode.value === ""){
    alert("Please enter your zip code")
}
if (donationFields.country.value === ""){
    alert("Please enter your country name")
}
if (donationFields.address.value === ""){
    alert("Please enter your address")
}
if (donationFields.donation.value === ""){
    alert("Please select a donation amount")
}
if (donationFields.cardNumber.value === ""){
    alert("Please enter your card number")
}
if (donationFields.paymentType.value === ""){
    alert("Please select your payment type")
}
if (donationFields.expirationDate.value === ""){
    alert("Please enter your card's expiration date")
}
if (donationFields.securityCode.value === ""){
    alert("Please enter your card's security code")
}
else{
    alert("Your donation has been received successfully.\nThank YOU!")

    donationFields.firstName.value = ""
    donationFields.lastName.value = ""
    donationFields.emailAddress.value = ""
    donationFields.city.value = ""
    donationFields.zipCode.value = ""
    donationFields.country.value = ""
    donationFields.address.value = ""
    donationFields.donation.value = ""
    donationFields.cardNumber.value = ""
    donationFields.paymentType.value = ""
    donationFields.expirationDate.value = ""
    donationFields.securityCode.value = ""
}   
})


//Storing purchase items to localStorage
const addFavouriteBtn = document.getElementById("addFav")

const purchaseFields = {
    gem : document.getElementById("gem-quantity"),
    ceylon : document.getElementById("tea-quantity"),
    mask : document.getElementById("mask-quantity"),
    stick : document.getElementById("stick-quantity")
}

const storeToLocalStorage = () => {
    const purchasedQuantity = {}

    Object.entries(purchaseFields).forEach(([key, field]) => {
        purchasedQuantity[key] = field.value
    })

    localStorage.setItem("purchasedQuantity", JSON.stringify(purchasedQuantity))
}


addFavouriteBtn.addEventListener("click", () => {
    storeToLocalStorage()
    
    purchaseFields.gem.value = ""
    purchaseFields.ceylon.value = ""
    purchaseFields.mask.value = ""
    purchaseFields.stick.value = ""
    cost.innerText = ""

})


//Retrieving items from local storage
const getFavouriteBtn = document.getElementById("getFav")

const retrieveFromLocalStorage = () => {
    const retrievedValue = JSON.parse(localStorage.getItem("purchasedQuantity"))
    if(retrievedValue){
        Object.entries(retrievedValue).forEach(([key, value]) => {
            purchaseFields[key].value = value
        })
    }
}

getFavouriteBtn.addEventListener("click", () => {
    retrieveFromLocalStorage()
})


//Calculation for the items 
const checkOrderBtn = document.getElementById("check")

checkOrderBtn.addEventListener("click", () => {
    setCurrentPrice()
})

const calPrice = () => {
    const gems = purchaseFields.gem.value*1785000
    const teas = purchaseFields.ceylon.value*5000
    const masks = purchaseFields.mask.value*2000
    const sticks = purchaseFields.stick.value*9000
  
    return { gems, teas, masks, sticks }
}


const calculatePrice = formData => {
    const {gems, teas, masks, sticks} = formData
    return ( gems + teas + masks + sticks)
}

const setCurrentPrice = () => {
    const price = calculatePrice(calPrice())
    cost.innerText = ("LKR: " + price) || "\n"
}

const cost = document.getElementById("current-order-cost")


/*
===========Loyalty points logic===========
*/
const form = document.getElementById("purchase-form")

//Function to retrieve the number of items input by the user and user it to calculate the points to be displayed
const setPoints = () => {
    const inputs = Array.from(form.elements)
    
    const totalItemCount = inputs.reduce((acc, input) => {
        if (input.nodeName === "INPUT" && input.type === "number") {
            return acc + parseInt(input.value)
        }
        return acc
    }, 0)
    const points = totalItemCount > 3 ? totalItemCount * 20 : 0

    document.getElementById(
        "loyalty-display"
    ).innerText = `${points.toString()} points`
}

//Event listener which calls the loyalty points function
const btnLoyalty = document.getElementById("loyalty-button")

btnLoyalty.addEventListener("click", event  => {
    event.preventDefault()

    setPoints()
    
})

