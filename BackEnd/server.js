const express=require('express');
const cors=require('cors');
const TodoItemsRoute=require('./Routes/TodoItemsRoute');

const app=express();
const PORT=8000

app.use(cors({origin:'*',}))
app.use(express.json()); 
app.use('/',TodoItemsRoute);






app.listen(PORT,()=>{
    console.log('server running...')

})