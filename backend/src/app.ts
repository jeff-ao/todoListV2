import express,{Request,Response} from 'express'


const app = express()
const port:number = 3000;

app.use(express.json());

app.get('/',(req:Request,res:Response):void=>{
    res.send("focionando")
})

app.listen(port,()=>{
    console.log(`rodando na porta ${port}`)
})