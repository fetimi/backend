const Thing = require('../models/Thing');
const fs= require('fs');

exports.createThing = (req, res, next)=>{
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

exports.modifyThing = (req, res, next) =>{
    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    Thing.updateOne({_id: req.params.id},{...thingObject, _id:req.params.id})
        .then(() => res.status(200).json({message:'Objet modifié !'}))
        .catch(error => res.status(404).json({error}));
};


exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getOneThing =(req, res, next) =>{
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
};

exports.getThingByUserId =(req, res, next) =>{
    Thing.find({userId: req.params.id})
        .then(things => res.status(200).json(things))
        .catch(error => res.status(404).json({message:'je suis laaaaaa'}));
};

exports.getAllThing = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
};

//https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg
