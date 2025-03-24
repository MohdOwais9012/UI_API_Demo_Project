# Use the official Node.js image as a base
FROM mcr.microsoft.com/playwright:v1.42.0-focal

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Install Playwright dependencies (browsers)
RUN npx playwright install --with-deps

# Command to run tests and generate an HTML report
CMD ["npx", "playwright", "test", "--reporter=html"]
