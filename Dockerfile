# Usa a imagem oficial do Node.js 22
FROM node:22

# Define o diretório de trabalho no container
WORKDIR /workspace/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia os demais arquivos da aplicação
COPY . .

# Expõe a porta (ajuste se for diferente)
EXPOSE 3000

# Comando padrão para iniciar o servidor (ajuste se for outro)
CMD ["npm", "run", "dev"]
