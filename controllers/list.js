const List = require('../models/List');
const fs= require('fs');

exports.createNewThing = (req, res, next)=>{
    delete req.body._id;
    const thing = new List({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteThing = (req, res, next) => {
    List.findOne({ _id: req.params.id })
      .then(list => {
            list.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.getOneThing =(req, res, next) =>{
    List.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
};

  exports.getThingByUserId =(req, res, next) =>{
    List.find({userId: req.params.id})
        .then(things => res.status(200).json(things))
        .catch(error => res.status(404).json({message:'je suis laaaaaa'}));
};

  exports.getAllThing = (req, res, next) => {
    List.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
};