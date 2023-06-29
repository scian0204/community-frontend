import axios from 'axios';

axios.defaults.withCredentials = true;

function Request(reqData, excute) {
  const req = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
  };

  req[reqData.method](
    `http://haniumdb.kro.kr:8080/api/${reqData.query}`,
    reqData?.body
  ).then((res) => {
    excute(res);
  });
}

export default Request;
