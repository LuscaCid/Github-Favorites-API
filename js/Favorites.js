import { GithubUser } from "./GithubUser.js"

/**
 * API --> application programing interface
 * 
 * comunicacao entre apis para conseguir dados os quais utilizarei em minhas aplicacoes
 */

/*
treinando criacao de elementos com classes em javascript, coisa mnt louca de se aprender, to feliz
*/
/**
 * class que vai conter a logica dos dados
 */
export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.tbody = document.querySelector('table tbody')
        this.load()
        this.update()
        //GithubUser.search('pedro').then(user => console.log(user))
        this.searchingForUser()
        
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    /**carregamento dos dados */
    /**mudando para pegar o localStorage pqvou adicionar la a partir das buscas */
    load(){
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
        /**se ele nao conseguir pegar um elemento do localstorage, ele pega um vetor */
        
        
    }
    delete(user){
        const index = this.entries.indexOf(user)
        this.entries.splice(index, 1)
        this.update()
        this.save()
    }
    
  

    searchingForUser(){
    
        
        const buttonSearch = this.root.querySelector('#button-search')
        buttonSearch.addEventListener('click', () =>{
             
            const { value } = this.root.querySelector('#input-search')         
                if (value != '')this.add(value)
                    
            })
        }

        async add(username){//vai tentar, caso haja algum erro ele vai pegar e imprimir o erro
            try{

                const userExistis = this.entries.find(entry => entry.login === username)
                
                if(userExistis) {
                    alert('Usuário já presente na tabela')
                    return
                }

                const user = await GithubUser.search(username)
                console.log(user)
                if(user.login === undefined){
                    throw new Error('usuario nao encontrado')
                }
            
                this.entries = [user, ...this.entries]
                this.update()
                this.save()
 

                console.log(this.entries)
            } catch(error){
                alert(error.message)
            }
        }
}

//class que vai criar a visualização e eventos do html

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)
        
    }
    update(){
        this.removeAllTr()

        this.entries.forEach(user =>{
            const row = this.createRow()
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').innerText = `${user.name}`
            row.querySelector('.user span').innerText = `${user.login}`
            row.querySelector('.repositories').innerText = `${user.public_repos}`
            row.querySelector('.followers').innerText = `${user.followers}`

            row.querySelector('.remove-element').addEventListener('click', () => {
                console.log('click')
                const isOK = confirm('tem certeza que quer deletar?')
                if(isOK)this.delete(user)
                

            } )

            this.tbody.appendChild(row)
        })

    }
    createRow(){
        const tableRow = document.createElement('tr')
        const data = `
     
            <td class="user">
                
                <img src="https://github.com/LuscaCid.png" alt="imagem de lucas cid">
                <a href="https://github.com/LuscaCid" target="_blank">
                    <p> Cid</p>
                    <span>luscacid</span>
                </a>
            </td>
            <td class="repositories">30</td>
            <td class="followers">90</td>
            <td><button class="remove-element">&times;</button></td>
      
    `

    tableRow.innerHTML = data
    return tableRow
    }
    removeAllTr(){
        
        const allTr = this.tbody.querySelectorAll('tr')
        allTr.forEach(item =>{
            item.remove()
        })
    }
}