const { Car } = require("../models");

//GET all car
const listCar = (req, res) => {
    Car.findAll().then(cars => {
        res.status(200).render("index", { data: cars })
    })
}

//ADD a car
const addCarView = (req, res) => {
    res.render('add')
}

const addCar = (req, res) => {
    Car.create({
        nama: req.body.inputNama,
        sewa: req.body.inputSewa,
        ukuran: req.body.inputUkuran,
        foto: req.file.filename,
    }).then(() => {
        res.redirect("/?msg=add");
    }).catch((err) => {
        res.status(422).json("Can't create Car");
    });
}

//EDIT a car
const editCarView = (req, res) => {
    const id = req.params.id;
    Car.findOne({
        where: {
            id: id,
        },
    }).then((cars) => {
        console.log(cars.id);
        res.status(200).render("update", {
            data: cars.id,
            nami: cars.nama,
            seww: cars.sewa,
            ukur: cars.ukuran,
            photo: cars.foto,
        });
    });
}

const editCar = (req, res) => {
    const id = req.params.id;
    Car.update(
        {
            nama: req.body.inputNama,
            sewa: req.body.inputSewa,
            ukuran: req.body.inputUkuran,
            foto: req.file.filename,
        },
        {
            where: {
                id: id,
            },
        })
        .then(() => {
            res.redirect("/?msg=update");
        })
        .catch((err) => {
            console.log(err);
        });
}

//DELETE a car
const deleteCar = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Car.destroy({
        where: {
            id: id,
        }
    }).then(() => {
        res.redirect('/?msg=delete')
    }).catch((err) => {
        console.log(err);
        res.status(500).send('We failed to delete for some reason');
    });
}

module.exports = {
    listCar,
    addCarView,
    addCar,
    editCarView,
    editCar,
    deleteCar
}