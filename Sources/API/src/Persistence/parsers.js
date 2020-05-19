//archivo para parsear mi query dinamico de insert y update
function parseInsertData(arrayData) {
    let arrayOutputData = [];
  
    arrayData.map(data => {
      arrayOutputData.push("'" + data + "'");
    });
  
    return arrayOutputData;
  }
  
  function parseQueryData(data) {
    let arrayOutputData = [];
  
    for (const prop in data) {
      arrayOutputData.push(`${prop} = '${data[prop]}'`);
    }
  
    return arrayOutputData;
  }
  
  module.exports = {
    parseInsertData,
    parseQueryData
  };
  