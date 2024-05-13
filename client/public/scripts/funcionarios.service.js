const ambiente = "http://localhost:5000";

const funcionariosService = {
  listarFuncionarios: () => {
    return callApi({
      method: "GET",
      url: `${ambiente}/funcionarios`,
    })
  },
}

function callApi({ method, url, params }) {
  console.log("callApi");

  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        const json = JSON.parse(this.responseText);
        if (this.status != 200) {
          reject(json);
        } else {
          resolve(json);
        }
      }
    };

    xhr.send(JSON.stringify(params));
  })
}