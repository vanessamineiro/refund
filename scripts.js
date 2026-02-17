//Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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

//Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
    //Previne o comportamento padrão de recarregar a página
    event.preventDefault()

    //Cria um objeto com os detalhes na nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    //Chama a função que irá adicionar o item na lista 
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        //Cria o elemento para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt",newExpense.category_name)

        //Cria info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona nome e categoria na div
        expenseInfo.append(expenseName, expenseCategory)

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","")}`

        //Cria o ícone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src","img/remove.svg")
        removeIcon.setAttribute("alt","Remover")

        //Adiciona as informações no item
        expenseItem.append(expenseIcon,expenseInfo, expenseAmount, removeIcon)
        expenseList.append(expenseItem)

        //Atualiza totais
        updateTotals()

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

function updateTotals() {
    try {
        //Recupera todos os itens (li) da lista (lu)
        const items = expenseList.children

        //Atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
        
        let total = 0

        for (let item=0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")

            //Remove caracteres não numericos
            let value = itemAmount.textContent.replace(/[^\d,]/g,"").replace(",",".")
            value = parseFloat(value)

            //verifica se é um número válido
            if (isNaN(value)) {
                return alert ("Não foi possível calcular o total. O valor não parece ser um número")

            }

            total += Number(value)
        }

        //Cria a span para adicionar o R$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        //Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
        total = formatCurrencyBRL(total).toUpperCase().replace("R$","")

        expensesTotal.innerHTML = ""

        expensesTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais")
        
    }
}

//Evento que captura clique nos itens da lista
expenseList.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-icon")) {
        //obtem li pai do elemnto clicado
        const item = event.target.closest(".expense")
        item.remove()
    }

    updateTotals()

})