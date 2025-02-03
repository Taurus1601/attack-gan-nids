# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app/backend

# Copy the requirements file into the container
COPY ../backend/requirements.txt ./

# Install the dependencies specified in the requirements file
RUN pip install -r requirements.txt

# Copy the rest of the backend code into the container
COPY ../backend/ ./

# Expose the port the backend service will run on
EXPOSE 8000

# Command to run the backend service
CMD ["python", "-m", "http.server", "8000"]