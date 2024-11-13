FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Accept build argument for VITE_BACKEND_URL
ARG BACKEND_URL

# Set environment variable for Vite build
ENV VITE_BACKEND_URL=${BACKEND_URL}

# Echo the BACKEND_URL to verify it during build
RUN echo "BACKEND_URL is set to: ${VITE_BACKEND_URL}"

# Build the Vite project
RUN npm run build

FROM nginx:1.23.3-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]