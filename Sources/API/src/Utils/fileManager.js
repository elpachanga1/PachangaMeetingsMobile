const fs = require('fs');

const { IMAGE_PATH } = process.env;

function isUrl(s) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}

function deleteFile(fileURI) {
  try {
    const validURL = isUrl(fileURI);
    if (!validURL) throw new Error(`URL ${fileURI} is not valid`);

    const fileArray = fileURI.split('/');
    let fileName = fileArray[fileArray.length - 1];

    fileName = decodeURI(fileName);

    const filePath = `${IMAGE_PATH}\\${fileName}`;
    if (!fs.existsSync(IMAGE_PATH))
      throw new Error(`File ${filePath} doesnt exists`);

    fs.unlinkSync(filePath);
  } catch (error) {
    console.log(error);
  }
}

module.exports = deleteFile;
