
FROM node:22-alpine

WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY --chown=node:node . .

# Run as non-root user
USER node

EXPOSE 5000

CMD ["npm", "start"]
