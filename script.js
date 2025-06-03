const agenda = [
  { dia: "Segunda", agendadoPor: null },
  { dia: "Terça", agendadoPor: null },
  { dia: "Quarta", agendadoPor: null },
  { dia: "Quinta", agendadoPor: null },
  { dia: "Sexta", agendadoPor: null }
];

let usuarioAtual = "";
let tipoAtual = "";

document.getElementById("telaLogin").style.display = "block";

function entrar() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const tipo = document.getElementById("tipoUsuario").value;

  if (!usuario || !senha) {
    alert("Preencha os campos.");
    return;
  }

  usuarioAtual = usuario;
  tipoAtual = tipo;

  document.getElementById("telaLogin").style.display = "none";
  document.getElementById("telaAgenda").style.display = "block";
  document.getElementById("notificacoes").style.display = "block";
  renderizarAgenda();
}

function renderizarAgenda() {
  const diasDiv = document.getElementById("diasAgenda");
  diasDiv.innerHTML = "";

  agenda.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "dia " + (item.agendadoPor ? "ocupado" : "vago");

    div.innerHTML = `<strong>${item.dia}</strong><br>`;

    if (item.agendadoPor && tipoAtual === "psicologo") {
      div.innerHTML += `Agendado por: ${item.agendadoPor}<br>`;
    } else if (item.agendadoPor && item.agendadoPor !== usuarioAtual) {
      div.innerHTML += `Horário reservado`;
    } else if (item.agendadoPor === usuarioAtual) {
      div.innerHTML += `Você agendou<br>`;
    }

    if (!item.agendadoPor && tipoAtual === "paciente") {
      const btn = document.createElement("button");
      btn.textContent = "Agendar";
      btn.className = "btn";
      btn.onclick = () => agendar(index);
      div.appendChild(btn);
    }

    if (item.agendadoPor === usuarioAtual && tipoAtual === "paciente") {
      const btnCancel = document.createElement("button");
      btnCancel.textContent = "Cancelar";
      btnCancel.className = "btn";
      btnCancel.onclick = () => cancelar(index);
      div.appendChild(btnCancel);

      const btnAlterar = document.createElement("button");
      btnAlterar.textContent = "Alterar";
      btnAlterar.className = "btn";
      btnAlterar.onclick = () => alterar(index);
      div.appendChild(btnAlterar);
    }

    if (tipoAtual === "psicologo" && item.agendadoPor) {
      const btnDel = document.createElement("button");
      btnDel.textContent = "Deletar";
      btnDel.className = "btn";
      btnDel.onclick = () => deletarComoPsicologo(index);
      div.appendChild(btnDel);
    }

    diasDiv.appendChild(div);
  });
}

function agendar(index) {
  agenda[index].agendadoPor = usuarioAtual;
  notificar(`Paciente ${usuarioAtual} agendou para ${agenda[index].dia}`);
  renderizarAgenda();
}

function cancelar(index) {
  notificar(`Paciente ${usuarioAtual} cancelou o agendamento em ${agenda[index].dia}`);
  agenda[index].agendadoPor = null;
  renderizarAgenda();
}

function alterar(index) {
  const novoIndex = prompt("Digite o número (0-4) do novo dia: ");
  if (agenda[novoIndex] && !agenda[novoIndex].agendadoPor) {
    agenda[novoIndex].agendadoPor = usuarioAtual;
    agenda[index].agendadoPor = null;
    notificar(`Paciente ${usuarioAtual} alterou o agendamento para ${agenda[novoIndex].dia}`);
    renderizarAgenda();
  } else {
    alert("Dia inválido ou já ocupado.");
  }
}

function deletarComoPsicologo(index) {
  const nome = agenda[index].agendadoPor;
  if (nome) {
    notificar(`Psicólogo cancelou o agendamento de ${nome} em ${agenda[index].dia}`);
    agenda[index].agendadoPor = null;
    renderizarAgenda();
  }
}

function notificar(msg) {
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("listaNotificacoes").appendChild(li);
}
