function showMachines() {
  const permission = () => {
    return {
      MASTER: "",
      ADMIN: "",
      ANALYST: "disabled",
    }[sessionStorage.OFFICE_USER];
  };

  showLoading();
  const fkCompanyVar = sessionStorage.COMPANY_USER;

  fetch("/machine/showMachines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkCompanyServer: fkCompanyVar,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          dispositivos_content.innerHTML = "";

          for (let i = 0; i < json.length; i++) {
            const disableData = json[i].isUsing === "not" && "disabled";
            const classIsUsing = json[i].isUsing === "yes" && ".isUsing";
            dispositivos_content.innerHTML += `             
              <div class="card-info ${classIsUsing}" id="machine${
              json[i].idMachine
            }">
              
              <div class="div-mini-hard">
                <ion-icon name="hardware-chip" class="mini-hard mini-hard-disabled" id="cpu${
                  json[i].idMachine
                }"></ion-icon>
                <ion-icon name="file-tray-full" class="mini-hard mini-hard-disabled" id="ram${
                  json[i].idMachine
                }"></ion-icon>
              </div>

              <ion-icon name="desktop-outline"></ion-icon>
              <div class="card-buttons card-buttons-top">
                <button 
                ${permission()}
                onclick="formView(true, 'Editar máquina', 'machine', 'edit', '${
                  json[i].idMachine
                }')"
                class="btn-special">
                  <ion-icon name="create-outline"></ion-icon>
                  <p>EDITAR</p>
                </button>
                <button 
                ${permission()}
                onclick="setYes('Remover máquina', 'deleteMachine', '${
                  json[i].idMachine
                }')" class="btn-special">
                  <ion-icon name="trash-outline"></ion-icon>
                  <p>REMOVER</p>
                </button>
              </div>
              <h3 id="family_machine${json[i].idMachine}" class="${json[i].idFamily}">
                COLEÇÃO: ${json[i].familyName || "não adicionada"}
              </h3>
              <h2 id="name_machine${json[i].idMachine}">
                nome: ${json[i].machineName}
              </h2>
              <p>
                <strong>Sala: </strong><span id="classroom_machine${
                  json[i].idMachine
                }">${json[i].classroom}</span><br />
                <strong>Adicionado em: </strong>${
                  json[i].dtAdded.split("-")[0]
                }<br />
                <strong>Às: </strong>${json[i].dtAdded.split("-")[1]}<br />
                <strong>Por: </strong>${
                  json[i].consumerName || "USUÁRIO REMOVIDO"
                }
              </p>
              <div class="card-buttons card-buttons-bottom">
              <button 
              onclick="formView(true, '${
                json[i].machineName
              }', 'machineDash', 'show', '${json[i].idMachine}')"
              class="btn-special" ${disableData}>
              <ion-icon name="bar-chart-outline"></ion-icon>
                <p style="margin-left: 4%">DADOS</p>
              </button>
                <div class="copy-token">
                  <div>
                    <div>
                      <p class="token-blur" id="token${json[i].idMachine}">
                        ${json[i].idMachine}
                      </p>
                    </div>                  
                    <ion-icon name="key-outline" 
                      onclick="copyToken(${json[i].idMachine})" 
                      id="key${json[i].idMachine}">
                    </ion-icon>
                  </div>
                </div>
              </div>
            </div> 
        `;
          }
          dispositivos.style.display = "grid";
          getFamily();
          getMachinesData(fkCompanyVar);
        });
      } else {
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregavam as máquinas!"
        );
        throw "There was an error while getting the machines";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregavam as máquinas!"
      );
    });
  setTimeout(() => {
    hideLoading();
  }, 2000);
  return false;
}
