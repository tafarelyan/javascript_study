# Use uma imagem base Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do Node.js DENTRO DO CONTAINER
RUN npm install

# Copie o resto dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação Node.js irá usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]