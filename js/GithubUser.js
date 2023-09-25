export class GithubUser {
    static search(username){
        const endPoint = `https://api.github.com/users/${username}`
        //passando o data como parametro e retornando um objeto json,
        //em seguida eu to desestruturando o data em 4 propiedades e retornando elas em seguida
        return fetch(endPoint)
        .then(data => data.json())
        .then(({login , name ,public_repos, followers}) => ({
            login ,
            name ,
            public_repos, 
            followers,

        }))
    }
    
}