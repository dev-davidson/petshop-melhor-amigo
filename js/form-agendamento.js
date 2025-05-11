document.getElementById("agendamento-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const data = document.getElementById("data").value;
    const mensagem = document.getElementById("mensagem").value;
  
    try {
      const resposta = await fetch("http://localhost:3001/enviar-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, telefone, data, mensagem })
      });
  
      const resultado = await resposta.json();
  
      if (resultado.sucesso) {
        mostrarAlerta(" 🐕 Mensagem enviada com sucesso! 🐈", "success");
        this.reset();
      } else {
        mostrarAlerta("Erro ao enviar mensagem: " + resultado.erro, "danger");
      }
  
    } catch (erro) {
      mostrarAlerta("Erro ao conectar ao servidor: " + erro.message, "danger");
    }
  });
  
  function mostrarAlerta(mensagem, tipo) {
    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} alert-dismissible fade show mt-3`;
    alerta.role = "alert";
    alerta.innerHTML = `
      ${mensagem}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    `;
  
    const form = document.getElementById("agendamento-form");
    form.appendChild(alerta);
  
    // Remove o alerta após 5 segundos automaticamente (opcional)
    setTimeout(() => {
      alerta.classList.remove("show");
      alerta.classList.add("fade");
      setTimeout(() => alerta.remove(), 500);
    }, 5000);
  }
  