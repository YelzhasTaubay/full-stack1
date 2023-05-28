const express =  require("express");
const app = express();
const cors =  require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// POST REQUEST

app.post("/todos", async (req,res) =>{
    try {
        const {description} = req.body;
        const newToDo = await pool.query("insert into todo (description)" +
            "values($1) returning *",[description]);

        res.json(newToDo.rows[0]);

    }catch (err){
        console.error(err.message);
    }
})

// GET REQUEST

app.get("/todos", async(req,res) =>{
    try {
        const allTodos = await pool.query("select * from todo");
        res.json(allTodos.rows);
    }catch (err){
        console.error(err.message);
    }
})

// GET/{ID} REQUEST

app.get("/todos/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("select * from todo where todo_id = $1",[id]);

        res.json(todo.rows[0]);
    }catch (err){
        console.error(err.message);
    }
})

// PUT/{ID} FOR UPDATE REQUEST

app.put("/todos/:id",async(req,res) =>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("update todo set description = $1 where todo_id = $2",
            [description,id]);

        res.json("ToDo was updated");
    }catch (err){
        console.error(err.message);
    }
})

//DELETE/{ID} REQUEST

app.delete("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("delete from todo where todo_id = $1",
            [id]);

        res.json("ToDo was been deleted!!!");
    }catch (err){
        console.error(err.message);
    }
})




app.listen(5000, () => {
    console.log("server has started on port 5000")
})