const { authenticate } = require("../middlewares/AuthMiddlewares");
const ToDoModel = require("../models/ToDoModel");

module.exports.getToDos = async (req,res) => {
    try {
        const toDos = await ToDoModel.find();
        res.send(toDos);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching todos.' });
    }
}

module.exports.saveToDo = (req, res) => {
    try {
        const { toDo } = req.body;
        if (!toDo || toDo.trim() === '') {
            throw new Error('ToDo cannot be empty');
            console.log("ToDo cannot be empty")
        }

        // const userId = req.userData.userId; 

        ToDoModel.create({ toDo })
            .then(data => {
                console.log("Saved Succesfully...");
                res.status(201).send(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ error: 'An error occurred while saving the todo.' });
            });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

module.exports.updateToDo = async (req, res) => {
    const { id } = req.params;
    const {toDo} = req.body;

    ToDoModel.findByIdAndUpdate(id, {toDo})
    .then(() => {
        res.send("Updated Succesfully...");

    })
    .catch( (err) => {
        console.log(err);
    } )
}

module.exports.deleteToDo = async (req, res) => {
    const { id } = req.params;

    ToDoModel.findByIdAndDelete(id)
    .then(() => {
        console.log("Deleted Succesfully...")
        res.send("Deleted Succesfully...");

    })
    .catch( (err) => {
        console.log(err);
    } )
}

// module.exports.getUserToDo = (req,res) => {
//     ToDoModel.find({ userId: req.user.id }) // Kullanıcının todo'larını userId'e göre filtrele
//     .then(todos => res.json(todos))
//     .catch(err => res.status(500).json({ message: err.message }));
// }