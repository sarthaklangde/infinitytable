import jsonData from "../data/jsonData";

let processedData = jsonData;

export function getTableData (offset = 0, count = 50) {
    const sliceEnd = offset + count;

    if(offset >= jsonData.length) {
      return -1;
    }
    console.log("Data Fetched For : ", offset, count);
    return processedData.slice(offset, sliceEnd);
}

export function getSearchData (key, searchStr = '') {
  const searchStrLower = searchStr.toLowerCase();
  //const regex = new RegExp(searchStr, "i");
  const searchedData = [];
  let i, l = processedData.length;
  for (i = 0; i < l; i++) {
    //Case insensitive search on key
    let keyValue = processedData[i][key].toString().toLowerCase();
    if(keyValue && keyValue.indexOf(searchStrLower) !== -1) {
      searchedData.push(processedData[i]);
    }
  }
  processedData = searchedData;
  // const searchedData = jsonData.filter((item) => {
  //   if (item.firstname.includes(search)) {
  //     return true;
  //   }
  //   return false;
  // })

  return searchedData.slice(0, 50);
}

export function resetProcessedData () {
  processedData = jsonData;
}
