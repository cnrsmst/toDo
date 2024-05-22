const { authenticate } = require("../middlewares/AuthMiddlewares");
const ToDoModel = require("../models/ToDoModel");

// Kullanıcının kendi todo'larını al
module.exports.getToDos = async (req, res) => {
    try {
      // Kullanıcıyı doğrula
     authenticate(req, res, async () => {
        // authenticate işlevi başarılı olduğunda buraya ulaşılır
        const userId = req.user._id;
        console.log('Fetching todos for user:', userId);
        const toDos = await ToDoModel.find({ userID: userId });
        res.json(toDos);
        // Kullanıcı bilgileri kontrolü
        if (!req.user || !req.user._id) {
          return res.status(400).json({ error: 'Kullanıcı bilgileri bulunamadı.' });
        }


      });
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'An error occurred while fetching todos.' });
    }
};

// Yeni bir todo oluştur ve kullanıcıya ata
module.exports.saveToDo = async (req, res) => {

    
    try {
        authenticate(req,res, async ()=> {
            const userId = req.user._id;
        const { toDo } = req.body;

        if (!toDo || toDo.trim() === '') {
            throw new Error('ToDo cannot be empty');
        }

        const newToDo = await ToDoModel.create({ userID: userId, toDo: toDo });
        console.log("Saved Successfully...");
        res.status(201).send(newToDo);
        })
        
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

module.exports.updateToDo = async (req, res) => {
    try {
        authenticate(req, res, async () => {
            const { id } = req.params;
            const { completed } = req.body;

            // Kullanıcı bilgileri kontrolü
            if (!req.user || !req.user._id) {
                return res.status(400).json({ error: 'Kullanıcı bilgileri bulunamadı.' });
            }

            const userId = req.user._id;

            // Veritabanında belirtilen ID'ye sahip todo'yu bul ve güncelle
            const updatedTodo = await ToDoModel.findOneAndUpdate(
                { _id: id, userID: userId },
                { completed },
                { new: true }
            );

            if (!updatedTodo) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            res.json(updatedTodo);
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'An error occurred while updating todo' });
    }
};


// Belirli bir todo'yu sil
module.exports.deleteToDo = async (req, res) => {
    try {
        authenticate(req, res, async () => {
            const userId = req.user._id;
            const { id } = req.params;

            const deletedToDo = await ToDoModel.findOneAndDelete({ _id: id, userID: userId });

            if (!deletedToDo) {
                return res.status(404).send({ error: 'Todo not found or not authorized' });
            }

            console.log("Deleted Successfully...");
            res.send("Deleted Successfully...");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while deleting the todo.' });
    }
};

