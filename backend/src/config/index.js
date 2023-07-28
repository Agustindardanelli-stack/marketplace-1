const app = require ('./app')
const database = require ('./database')

const main = () =>{
    database.connect((err)=>{
        if(err) throw err
        console.log('Coneccion BD')
    })
    app.listen(3000, ()=>{
    console.log ('servidor port 3000')
})

}
main()