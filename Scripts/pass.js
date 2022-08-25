/*
==========Current order logics==========
*/

//Current order

//Formfields object
const formFields = {
  type : document.getElementById("ticket-type"),
  quantity : document.getElementById("quantity"),
  duration : document.getElementById("duration"),
  extra : document.getElementById("extra"),
}

//Current order object
const currentOrderField = {
  type : document.getElementById("current-order-type"),
  quantity : document.getElementById("current-order-quantity"),
  duration : document.getElementById("current-order-duration"),
  extra : document.getElementById("current-order-extra"),
}

const currentOrderCost = document.getElementById("current-order-cost")

//Ticket types object
//It is assumed that foreign children have to buy the foreign child pass regardless of their age while local children have to buy either the child15 or child06 pass depending on their age
const TICKET_TYPES = {
  local : 2500,
  foreign : 3000,
  foreignChild : 2500,
  child15 : 1000,
  child06 : 500,
}

//Extra options object
const EXTRA_OPTIONS = {
  Annual_Pass : 5000,
  Food_Pass : 500
}

//Getting the form data and assigning it to constants
const getFormData = () => {
  const type = formFields.type.value
  const quantity = formFields.quantity.value
  const duration = formFields.duration.value
  const extra = formFields.extra.value

  return { type, quantity, duration, extra }
}

//Calculation logics
const calculatePrice = formData => {
  const {type, quantity, extra, duration} = formData
  return ((TICKET_TYPES[type] * quantity) + EXTRA_OPTIONS[extra] + durationConditions(type, duration))
}

//Ticket type and duration logic
const durationConditions = (ticketTypes, durations) => {

  if (ticketTypes === "local" && durations === "3 hours") {
    return 0
  } 
  else if ((ticketTypes === "child15" && durations === "3 hours") || (ticketTypes === "child06" && durations === "3 hours")) {
    return 0
  }
  else if ((ticketTypes === "foreign" && durations === "3 hours") || (ticketTypes === "foreignChild" && durations === "3 hours")) {
    return 1000
  }
  else if (ticketTypes === "local" && durations === "1/2 day") {
    return 250
  }
  else if ((ticketTypes === "child15" && durations === "1/2 day") || (ticketTypes === "child06" && durations === "1/2 day")) {
    return 250
  }
  else if ((ticketTypes === "foreign" && durations === "1/2 day") || (ticketTypes === "foreignChild" && durations === "1/2 day")) {
    return 500
  }
  else if (ticketTypes === "local" && durations === "1 day") {
    return 500
  }
  else if ((ticketTypes === "child15" && durations === "1 day") || (ticketTypes === "child06" && durations === "1 day")) {
    return 500
  }
  else if ((ticketTypes === "foreign" && durations === "1 day") || (ticketTypes === "foreignChild" && durations === "1 day")) {
    return 1000
  }
  /*no requirements given for 2 days in the assignment so I added my own requirements*/
  else if (ticketTypes === "local" && durations === "2 days") {
    return 1000
  }
  else if ((ticketTypes === "child15" && durations === "2 days") || (ticketTypes === "child06" && durations === "2 days")) {
    return 1000
  }
  else if ((ticketTypes === "foreign" && durations === "2 days") || (ticketTypes === "foreignChild" && durations === "2 days")) {
    return 2000
  }
  
}


//Returning values to current order div
const setCurrentPrice = () => {
  const price = calculatePrice(getFormData())
  currentOrderCost.innerText = ("LKR: " + price) || "\n"
}

formFields.type.addEventListener("change", event => {
  const options = event.target.options
  const selectedOption = options[options.selectedIndex]
  const optionText = selectedOption.innerText

  currentOrderField.type.innerText = ("Ticket type: " + optionText)
  setCurrentPrice()
})

formFields.quantity.addEventListener("keyup", event => {
  currentOrderField.quantity.innerText = ("Quantity: " + event.target.value) || '\n'
  setCurrentPrice()
})

formFields.duration.addEventListener("change", event => {
  currentOrderField.duration.innerText = ("Duration: " + event.target.value) || '\n'
  setCurrentPrice()
})

formFields.extra.addEventListener("change", event => {
  currentOrderField.extra.innerText = ("Extras: " + event.target.value) || '\n'
  setCurrentPrice()
})
 

//Total order logics
const form = document.getElementById("order-form")
const overallOrderField = document.getElementById("overall-order-field")
const overallOrderCost = document.getElementById("overall-order-cost")

const overallOrder = []

const calculateTotalPrice = () => {
  return overallOrder.reduce((acc, curr) => acc + calculatePrice(curr), 0)
}

//Event listener and function which adds the value to the overall order div
form.addEventListener("submit", event => {
  event.preventDefault()

  const formData = getFormData()
  overallOrder.push(formData)

  const order = document.createElement('li')
  Object.values(formData).forEach(value => {
    const p = document.createElement('p')
    p.innerText = value
    order.appendChild(p)
  })
  overallOrderField.append(order)
  overallOrderCost.innerText = ("LKR: " + calculateTotalPrice())

  currentOrderField.type.innerText = ""
  currentOrderField.quantity.innerText = ""
  currentOrderField.duration.innerText = ""
  currentOrderField.extra.innerText = ""

  formFields.type.value= ""
  formFields.quantity.value= ""
  formFields.duration.value= ""
  formFields.extra.value= ""
})

//User information field object
const infoFields = {
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

//Event listener which displays "the payment was successful" message
const btnPlaceOrder = document.getElementById("place-order")

btnPlaceOrder.addEventListener("click", () => {

  alert("Thank YOU!\nYour order was placed successfully.")

  currentOrderField.type.innerText = ""
  currentOrderField.quantity.innerText = ""
  currentOrderField.duration.innerText = ""
  currentOrderField.extra.innerText = ""

  formFields.type.value= ""
  formFields.quantity.value= ""
  formFields.duration.value= ""
  formFields.extra.value= ""

  overallOrderCost.innerText= ""
  overallOrderField.innerText= ""
  currentOrderCost.innerText= ""
  
  infoFields.firstName.value = ""
  infoFields.lastName.value = ""
  infoFields.emailAddress.value = ""
  infoFields.city.value = ""
  infoFields.zipCode.value = ""
  infoFields.country.value = ""
  infoFields.address.value = ""
  infoFields.donation.value = ""
  infoFields.cardNumber.value = ""
  infoFields.paymentType.value = ""
  infoFields.expirationDate.value = ""
  infoFields.securityCode.value = ""
})

