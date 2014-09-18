function Controller(repository) {
  this._repository = repository;
  this._router = require('express').Router();

  this._initialize();
}

module.exports = Controller;

Controller.prototype._initialize = function() {
  this._router.get('/', this.list.bind(this));
  this._router.get('/:id', this.item.bind(this));
};

Controller.prototype.getRouter = function() {
  return this._router;
};

Controller.prototype.list = function(req, res) {
  res.send(this._repository.findAll());
};

Controller.prototype.item = function(req, res) {
  var item = this._repository.findOneById(req.params.id);

  res.status(item ? 200 : 404).send(item ? item : 'Item not found');
};
