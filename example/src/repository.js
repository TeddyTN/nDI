var data = {
  '1': {
    'id': 1,
    'name': 'John'
  },
  '2': {
    'id': 2,
    'name': 'Homer'
  }
};

function Repository() {}

module.exports = Repository;

Repository.prototype.findAll = function() {
  var result = [];

  for (var id in data) {
    result.push(data[id]);
  }

  return result;
};

Repository.prototype.findOneById = function(id) {
  return data.hasOwnProperty(id) ? data[id] : null;
};
