'use strict';

document
  .getElementById("form-clima")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const cidade = document.getElementById("cidade").value;
    const apiKey =  "..";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cidade
    )}&appid=${apiKey}&lang=pt_br&units=metric`;

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.style.display = "none";
    resultadoDiv.innerHTML = "Buscando...";

    try {
      const resposta = await fetch(url);
      if (!resposta.ok) throw new Error("Cidade não encontrada");
      const dados = await resposta.json();

      resultadoDiv.innerHTML = `
                    <strong>${dados.name}, ${dados.sys.country}</strong><br>
                    Temperatura: ${dados.main.temp}°C<br>
                    Sensação térmica: ${dados.main.feels_like}°C<br>
                    Clima: ${dados.weather[0].description}<br>
                    Umidade: ${dados.main.humidity}%<br>
                    Vento: ${dados.wind.speed} m/s
                `;
      resultadoDiv.style.display = "block";
    } catch (erro) {
      resultadoDiv.innerHTML = "Erro: " + erro.message;
      resultadoDiv.style.display = "block";
    }
  });
