//logica de negocios
const {
  nanoid
} = require('nanoid');
const moment = require('moment');

const validateField = require('../../Utils/validateFields');
const deleteFile = require('../../Utils/fileManager');

const DATA_TABLE_MEETINGS = 'meetings';
const DATA_TABLE_MEETINGS_FOLLOW = 'meetings_follow';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../Persistence/postgres');
  }

  async function list() {
    const query = {
      active: true
    };

    return await store.query(DATA_TABLE_MEETINGS, query);
  }

  async function get(id) {
    return await store.get(DATA_TABLE_MEETINGS, id);
  }

  async function insert(body) {
    validateField('user_id', body.user_id);

    const event = {
      title: body.title,
      description: body.description,
      location_name: body.location_name,
      created_by: body.user.aud,
      created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      latitude: body.latitude,
      longitude: body.longitude,
      id: nanoid(),
    };

    return await store.insert(DATA_TABLE_MEETINGS, event);
  }

  //funcion para crear sesiones ante el controller de sesiones
  async function update(body) {
    validateField('meeting_id', body.meeting_id);
    validateField('user_id', body.user_id);

    const event = {
      id: body.meeting_id,
    };

    if (body.title) event.title = body.title;
    if (body.description) event.description = body.description;
    if (body.location_name) event.location_name = body.location_name;
    if (body.latitude) event.latitude = body.latitude;
    if (body.longitude) event.longitude = body.longitude;

    return await store.update(DATA_TABLE_MEETINGS, event);
  }

  async function meeting_follow(body) {
    validateField('meeting_id', body.meeting_id);
    validateField('user_id', body.user_id);

    let event = {
      meeting_id: body.meeting_id,
      user_id: body.user.aud,
      nickname: body.user.nickname,
    };

    if (body.user.picture) event.picture = body.user.picture;

    return await store.insert(DATA_TABLE_MEETINGS_FOLLOW, event);
  }

  async function meeting_following(meeting_id) {
    const query = {
      meeting_id: meeting_id,
    };
    return await store.query(DATA_TABLE_MEETINGS_FOLLOW, query);
  }

  async function upload_image(req) {
    const picture = encodeURI(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/${req.file.filename}`
    );
    console.log(`Storage location is ${picture}`);

    const event = {
      id: req.params.id,
      picture,
    };

    if (req.meeting && req.meeting.picture) deleteFile(req.meeting.picture);

    return await store.update(DATA_TABLE_MEETINGS, event);
  }

  async function remove(id) {
    return await store.remove(DATA_TABLE_MEETINGS, id);
  }

  return {
    list,
    get,
    insert,
    update,
    meeting_follow,
    meeting_following,
    upload_image,
    remove
  };
};