const path = require('path');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Função para obter dados climáticos
const fetchWeatherData = async (city) => {
    const API_KEY = process.env.OPENWEATHERMAP_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;
    // Faz a requisição para a API
    const response = await fetch(url);
    // Verifica se a requisição foi bem sucedida
    if (!response.ok) {
      throw new Error('Erro ao buscar dados climáticos');
    }
    const data = await response.json();
    return data;
  };
  
  // Função principal para obter dados climáticos
  const getWeatherData = async (city) => {
    try {
      const data = await fetchWeatherData(city);
      console.log(data);
    } catch (error) {
      console.error('Erro:', error.message);
    }
  };
  
  // Chama a função principal para obter dados climáticos
  getWeatherData("Sao Paulo");
  getWeatherData("Fortaleza");
  getWeatherData("Recife");