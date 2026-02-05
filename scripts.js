//Seleciona os elementos do formulário
const amount = document.getElementById("amount")

//Captura o evento de input para formatar o valor
amount.oninput = () => {
    //Obtem valor atual do input e remove caracteres não numericos
    let value = amount.value.replace(/\D/g, "")

    //Transforma valor em centavos
    value = Number(value)/100

    //atualiza valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    //Formata o valor no padrão BRL (real brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    //Retorna valor formatado
    return value
}