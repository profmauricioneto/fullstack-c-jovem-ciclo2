# backend
FROM node:20-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]

# frontend

# FROM node:18-alpine as builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .
# RUN npm run build

# FROM nginx:alpine

# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]