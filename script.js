
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getLivros = async () => {
    let url = 'http://127.0.0.1:5000/livros';
    fetch(url, {
        method: 'get'
    }).then((response) => response.json())
        .then((data) => {
           console.log(data);
            data.livros.forEach(item => insertList(item.nome, item.autor, item.valor,item.editora,item.tipo_livro))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
// getLivros()
/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, autor,editra,tipo e valor 
  --------------------------------------------------------------------------------------
*/
const adicionarLivro = () => {
    let livro = document.getElementById("nomeDoLivro").value;
    let autor = document.getElementById("autorDoLivro").value;
    let valor = document.getElementById("valorDoLivro").value;
    let editora = document.getElementById("editoraDoLivro").value;
    let tipoLivro = document.getElementById("tipoLivro").value;
  console.log(tipoLivro);
    if (livro === '' && autor === '') {
        alert("Escreva o nome do livro e do autor!");
    } else if (isNaN(valor)) {
        alert("valor precisa ser número!");
    } else {
        insertList(livro, autor, valor, editora, tipoLivro)
        postLivro(livro, autor, valor, editora, tipoLivro)
        alert("Item adicionado!")
    }
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postLivro = async (livro, autor, valor, editora, tipoLivro) => {
    console.log(tipoLivro);
    const formData = new FormData();
    formData.append('nome', livro);
    formData.append('autor', autor);
    formData.append('valor', valor);
    formData.append('editora', editora);
    formData.append('tipoLivro', tipoLivro);
    let url = 'http://127.0.0.1:5000/livro';
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => {
            response.json()
            getLivros()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}
/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/livro?nome=' + item;
    fetch(url, {
        method: 'delete'
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}
/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const nomeItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm("Você tem certeza?")) {
                div.remove()
                deleteItem(nomeItem)
                alert("Removido!")
            }
        }
    }
}
/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (livro, autor, valor, editora, tipoLivro) => {
    var item = [livro, autor, valor, editora, tipoLivro]
    var table = document.getElementById('tabela');
    var row = table.insertRow();
    for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = item[i]

    }
    insertButton(row.insertCell(-1))
    document.getElementById("nomeDoLivro").value = "";
    document.getElementById("editoraDoLivro").value = "";
    document.getElementById("valorDoLivro").value = "";
    document.getElementById("autorDoLivro").value = "";
    document.getElementById("tipoLivro").value = "";
    removeElement();
}