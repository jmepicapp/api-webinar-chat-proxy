FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar código
COPY src/ ./src/

# Puerto de Render
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

CMD ["npm", "start"]
