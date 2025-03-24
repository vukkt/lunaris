# Stage 1: Build the application
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the Next.js app for production
RUN yarn build

# Stage 2: Production image
FROM node:16-alpine AS runner

WORKDIR /app

# Copy built application and dependencies from the builder stage
COPY --from=builder /app ./

# Expose the port Next.js will run on
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV production

# Start the application
CMD ["yarn", "start"]
