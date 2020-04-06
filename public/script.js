function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

function checkFilds(event){
    const valuesToCkeck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    const isEmpty = valuesToCkeck.find((value)=> {
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if( checkIfIsString && checkIfIsEmpty){
            return true;
        }
    })
    
    if(isEmpty){
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }
}