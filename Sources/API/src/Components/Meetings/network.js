//archivo de configuracion de capa de red
const express = require('express');

const Controller = require('./index');
const response = require('../../Entities/response');

const upload = require('../../Utils/uploadImage');
const secure = require('../../Auth/secure');

const router = express.Router();

//Routes
router.get('/', list);
router.get('/:id', get);
router.post('/follow', secure('update'), meeting_follow);
router.get('/:id/following', meeting_following);
router.post('/', secure('update'), insert);
router.put('/', secure('update'), update);
router.post('/:id/image', secure('create'), upload, upload_image);
router.delete('/:id', secure('create'), remove);

//internal functions
function list(req, res, next) {
  Controller.list()
    .then((lista) => response.success(req, res, lista, 200))
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => response.success(req, res, user, 200))
    .catch(next);
}

function insert(req, res, next) {
  Controller.insert(req.body)
    .then((user) => response.success(req, res, user, 200))
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.body)
    .then((user) => response.success(req, res, user, 200))
    .catch(next);
}

function meeting_follow(req, res, next) {
  Controller.meeting_follow(req.body)
    .then((data) => response.success(req, res, data, 201))
    .catch(next);
}

function meeting_following(req, res, next) {
  Controller.meeting_following(req.params.id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}

function upload_image(req, res, next) {
  Controller.upload_image(req)
    .then((data) => response.success(req, res, data, 201))
    .catch(next);
}

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((user) => response.success(req, res, user, 201))
    .catch(next);
}

module.exports = router;