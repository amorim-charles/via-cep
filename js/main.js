const cep = document.getElementById("cep")
const logradouro = document.getElementById("logradouro")
const bairro = document.getElementById("bairro")
const cidade = document.getElementById("cidade")
const estado = document.getElementById("estado")
const messageError = document.getElementById("message-error")

cep.addEventListener("focusout", () => getAddress(cep.value));

async function getAddress(cepValue) {
    try {
        messageError.textContent = ""
        cep.classList.remove("input__erro")
        cep.classList.add("campo__escrita")
        const responseAddress = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const responseAddressJson = await responseAddress.json();
        
        if (responseAddressJson.erro) {
            logradouro.value = ""
            bairro.value = ""
            cidade.value = ""
            estado.value = ""
            messageError.textContent = "CEP inválido"
            cep.classList.add("input__erro")
            cep.classList.remove("campo__escrita")
            throw Error("Request Error");
        }
        console.log(responseAddressJson);
        logradouro.value = responseAddressJson.logradouro
        bairro.value = responseAddressJson.bairro
        cidade.value = responseAddressJson.localidade
        estado.value = responseAddressJson.uf

    } catch (erro) {
        throw erro
    }
}
