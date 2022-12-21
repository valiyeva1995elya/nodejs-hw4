const usersBlock = document.querySelector(".users_block");
const carsBlock = document.querySelector(".cars_block");
const createUserBtn = document.querySelector("#create_user_btn")
const createCarBtn = document.querySelector("#create_car_btn")

const BASE_URL = "http://localhost:8080";
const loadData = async () => {
    const responseUsers = await fetch(BASE_URL + "/users");
    const responseCars = await fetch(BASE_URL + "/cars");
    const users = await responseUsers.json();
    const cars = await responseCars.json();

    usersBlock.innerHTML = "";
    carsBlock.innerHTML = "";

    for (const user of users) {
        usersBlock.innerHTML += `
            <p>
                ${user.name} 
                <button onclick="deleteUser(${user.id})">Delete</button>
            </p>
        `;
    }

    for (const car of cars) {
        
        carsBlock.innerHTML += `
            <p>
                ${car.model} 
                <button onclick="deleteCar(${car.id})">Delete</button>
            </p>
        `;
    }
};
loadData();

createUserBtn.addEventListener("click", () => {
    const newUserName = document.querySelector("#new_user_name").value;
    const payload = {
        name: newUserName,
    };
    fetch(BASE_URL + "/users", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => loadData())
        .catch(() => alert("User create error"));
});



createCarBtn.addEventListener("click", () => {
    const newCarModel = document.querySelector("#new_car_model").value;
    const payload = {
        model: newCarModel,
    };
    fetch(BASE_URL + "/cars", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => loadData())
        .catch(() => alert("Car create error"));
})

const deleteUser = id => {
    fetch(BASE_URL + "/users/" + id, { method: "delete" })
        .then(() => loadData())
        .catch(() => alert("User delete error"));
}
const deleteCar = id => {
    fetch(BASE_URL + "/cars/" + id, { method: "delete" })
        .then(() => loadData())
        .catch(() => alert("Car delete error"));
}
// const clearUsers = () => {
//     fetch(BASE_URL + "/users/" , { method: "delete" })
//         .then(() => loadData())
//         .catch(() => alert("Users clear error"));
// }