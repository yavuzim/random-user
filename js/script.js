
let localValue = []
const submit_btn = () => {
    let textValue = document.getElementById("counter").value;
    let gender = document.getElementById("gender").value;
    if (textValue <= 0) alert("Boş")
    else {
        document.getElementById("users-sec").style.display = "block"
        document.getElementById("form-sec").style.display = "none"
        fetch(`https://randomuser.me/api/?results=${textValue}&gender=${gender.toLowerCase()}`)
            .then(
                response => {
                    return response.json()
                }
            )
            .then(responseJson => {
                responseJson.results.map(e => {
                    let userDOM = document.querySelector(".filter-list")
                    let divDOM = document.createElement("div")
                    divDOM.classList.add("image-filed")
                    divDOM.innerHTML += `<span class="image">
                        <img src="${e.picture.large}" alt="">
                        </span>
                        <span class="image-content">${e.name.title} ${e.name.first} ${e.name.last}</span>`
                    userDOM.appendChild(divDOM)
                    localValue.push(e)
                    localStorage.setItem("users", JSON.stringify(localValue));
                });
            })
    }
}

const userFilter = () => {
    if (document.getElementById("min-input").value >= document.getElementById("max-input").value)
        alert("Minumu Yaş, Maximum Yaştan Büyük Olamaz")
    else {
        let localFilter = [], localGet = []
        localFilter = (JSON.parse(localStorage.getItem("users")))
        console.log(localFilter);
        console.log(localFilter[1]);

        localFilter.forEach((e, i) => {
            if (e.dob.age > document.getElementById("min-input").value && e.dob.age < document.getElementById("max-input").value
                && document.getElementsByClassName("cityValue").value === e.location.city
            ) {
                let userDOM = document.querySelector(".filter-list")
                let divDOM = document.createElement("div")
                divDOM.classList.add("image-filed")
                divDOM.innerHTML += `<span class="image">
                <img src="${e.picture.large}" alt="">
                </span>
                <span class="image-content">${e.name.title} ${e.name.first} ${e.name.last}</span>`
                userDOM.appendChild(divDOM)

            }

        });
    }
}

const newQuery = () => {
    localStorage.clear()
    document.getElementById("users-sec").style.display = "none"
    document.getElementById("form-sec").style.display = "block"
}

const minChange = () => {
    let textValue = document.getElementById("min-input").value
    document.getElementById("min").innerHTML = textValue
}
const maxChange = () => {
    let textValue = document.getElementById("max-input").value
    document.getElementById("max").innerHTML = textValue
}

/* combobox'a şehir çekme */

fetch("https://randomuser.me/api/?results=500")
    .then(response => {
        return response.json()
    })
    .then(responseJson => {
        let cityDOM = document.querySelector(".city-filter")
        let selectDOM = document.createElement("select")
        selectDOM.setAttribute("name", "city")
        selectDOM.setAttribute("id", "city")
        responseJson.results.map(e => {
            selectDOM.innerHTML += `<option class="cityValue" value="${e.location.city}">${e.location.city}</option>`
            cityDOM.appendChild(selectDOM)
        })
    })


if (!localStorage.getItem("users")) {
    document.getElementById("users-sec").style.display = "none"
    document.getElementById("form-sec").style.display = "block"
}
else {
    document.getElementById("users-sec").style.display = "block"
    document.getElementById("form-sec").style.display = "none"
    localGet = []
    localGet = (JSON.parse(localStorage.getItem("users")))

    localGet.forEach((e, i) => {
        let userDOM = document.querySelector(".filter-list")
        let divDOM = document.createElement("div")
        divDOM.classList.add("image-filed")
        divDOM.innerHTML += `<span class="image">
            <img src="${e.picture.large}" alt="">
            </span>
            <span class="image-content">${e.name.title} ${e.name.first} ${e.name.last}</span>`
        userDOM.appendChild(divDOM)
    });
}