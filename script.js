const fases = [
    {
      id: 'fase1',
      opcoes: [
        { texto: "A = {2, 4, 6, 8}", correta: true },
        { texto: "B = {grande, bonito, legal}", correta: false },
        { texto: "C = {azul, verde, cor preferida}", correta: false }
      ]
    },
    {
      id: 'fase2',
      opcoes: [
        { texto: "{a, b, c, d}", correta: true },
        { texto: "{b, c}", correta: false },
        { texto: "{a, d}", correta: false }
      ]
    },
    {
      id: 'fase3',
      opcoes: [
        { texto: "{x, z}", correta: true },
        { texto: "{x, y, z, w}", correta: false },
        { texto: "{y}", correta: false }
      ]
    },
    {
      id: 'fase4',
      opcoes: [
        { texto: "{1, 3, 5}", correta: true },
        { texto: "{2, 4}", correta: false },
        { texto: "{1, 2, 3, 4, 5}", correta: false }
      ]
    },
    {
      id: 'fase5',
      opcoes: [
        { texto: "{1, 3}", correta: true },
        { texto: "{3, 4}", correta: false },
        { texto: "{1, 2, 4}", correta: false }
      ]
    },
    {
      id: 'fase6',
      opcoes: [
        { texto: "{1, 3}", correta: true },
        { texto: "{2, 4}", correta: false },
        { texto: "{1, 2, 3, 4}", correta: false }
      ]
    },
    {
      id: 'fase7',
      opcoes: [
        { texto: "{1, 4}", correta: true },
        { texto: "{2, 3}", correta: false },
        { texto: "{1, 2, 3, 4}", correta: false }
      ]
    },
    {
      id: 'fase8',
      opcoes: [
        { texto: "{{}, {1}, {2}, {1,2}}", correta: true },
        { texto: "{{1,2}, {2}}", correta: false },
        { texto: "{{1}, {2}}", correta: false }
      ]
    }
  ];
  
  let faseAtual = 0;
  let timerInterval;
  let timeLeft = 60;

  function iniciarTimer() {
    const timerElement = document.getElementById("timer");
    timeLeft = 60;
    timerElement.textContent = `Tempo restante: ${timeLeft}s`;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Tempo restante: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        Swal.fire({
          title: "⏰ Tempo esgotado!",
          text: "Você não respondeu a tempo.",
          icon: "error",
          confirmButtonText: "Tentar novamente"
        }).then(() => {
          mostrarProximaFase();
        });
      }
    }, 1000);
  }

  function atualizarContador() {
    const counterElement = document.getElementById("question-counter");
    counterElement.textContent = `Questão ${faseAtual + 1} de ${fases.length}`;
  }
  
  function mostrarProximaFase() {
    if (faseAtual > 0) {
      document.getElementById(fases[faseAtual - 1].id).style.display = "none";
    } else {
      document.getElementById("inicio").style.display = "none";
    }
  
    if (faseAtual < fases.length) {
      const fase = fases[faseAtual];
      const container = document.getElementById(fase.id);
      const divOpcoes = document.getElementById("opcoes" + (faseAtual + 1));
      divOpcoes.innerHTML = "";
  
      _.shuffle(fase.opcoes).forEach(opcao => {
        const btn = document.createElement("button");
        btn.textContent = opcao.texto;
        btn.className = "btn";
        btn.onclick = () => respostaCorreta(opcao.correta);
        divOpcoes.appendChild(btn);
      });
  
      container.style.display = "block";
      atualizarContador();
      iniciarTimer();
    } else {
      clearInterval(timerInterval);
      Swal.fire({
        title: "🎉 Parabéns!",
        text: "Você completou todas as fases!",
        icon: "success",
        confirmButtonText: "Recomeçar"
      }).then(() => {
        window.location.reload();
      });
    }
  }
  
  function respostaCorreta(correta) {
    clearInterval(timerInterval);
    Swal.fire({
      title: correta ? "Muito bem! 🎉" : "Tente novamente 😅",
      icon: correta ? "success" : "error",
      confirmButtonText: "Continuar"
    }).then(() => {
      if (correta) {
        faseAtual++;
        mostrarProximaFase();
      } else {
        iniciarTimer();
      }
    });
  }
