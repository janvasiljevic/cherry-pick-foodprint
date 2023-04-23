export const createFormData = (item) => {
  var data = new FormData();
  if (item && item.uri) {
    //images are the key that accesses or get from the request input from the server-side.

    data.append("images", {
      // @ts-ignore
      name: "img",
      type: item.type,
      uri: item.uri,
    });
    delete item.imageObject;
  }
  //below code to append the all other key/value pair except image object. because we already append above.
  Object.keys(item).forEach((key) => {
    data.append(key, item[key]);
  });

  return data;
};
