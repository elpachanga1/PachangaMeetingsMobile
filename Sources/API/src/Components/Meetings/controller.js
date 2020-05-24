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
    return await store.list(DATA_TABLE_MEETINGS);
  }

  async function get(id) {
    return await store.get(DATA_TABLE_MEETINGS, id);
  }

  async function insert(body) {
    const event = {
      title: body.title,
      description: body.description,
      //picture: body.picture,
      location_name: body.location_name,
      created_by: body.created_by,
      created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      latitude: body.latitude,
      longitude: body.longitude,
      id: nanoid(),
    };

    return await store.insert(DATA_TABLE_MEETINGS, event);
  }

  //funcion para crear sesiones ante el controller de sesiones
  async function update(body) {
    validateField('event_id', body.event_id);

    const event = {
      id: body.event_id,
    };

    if (body.title) event.title = body.title;
    if (body.description) event.description = body.description;
    //if (body.picture) event.picture = body.picture;
    if (body.location_name) event.location_name = body.location_name;
    if (body.latitude) event.latitude = body.latitude;
    if (body.longitude) event.longitude = body.longitude;

    return await store.update(DATA_TABLE_MEETINGS, event);
  }

  async function meeting_follow(body) {
    validateField('meeting_id', body.meeting_id);
    validateField('user_id', body.user_id);

    await store.insert(DATA_TABLE_MEETINGS_FOLLOW, {
      meeting_id: body.meeting_id,
      user_id: body.user_id,
    });
  }

  async function meeting_following(meeting_id) {
    const query = {
      meeting_id: meeting_id,
    };
    return await store.query(DATA_TABLE_MEETINGS_FOLLOW, query);
  }

  async function upload_image(req) {
    const picture = encodeURI(
      `http://${req.hostname}:${process.env.API_PORT}/${req.file.filename}`
    );
    console.log(`Storage location is ${picture}`);

    const event = {
      id: req.params.id,
      picture,
    };

    if (req.meeting && req.meeting.picture) deleteFile(req.meeting.picture);

    return await store.update(DATA_TABLE_MEETINGS, event);
  }

  return {
    list,
    get,
    insert,
    update,
    meeting_follow,
    meeting_following,
    upload_image,
  };
};