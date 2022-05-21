const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const userList = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  fsPromises
    .readFile(userList, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

const doesUserExist = (req, res) => {
  const { id } = req.params;
  fsPromises
    .readFile(userList, { encoding: 'utf8' })
    .then((data) => {
      if (!JSON.parse(data).find((user) => user._id === id)) {
        res.status(404).send({ message: 'User not found' });
      }

      return res
        .status(200)
        .json(JSON.parse(data).filter((user) => user._id === id));
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

router.use('/:id', doesUserExist);

router.get('/:id', doesUserExist);

module.exports = router;
