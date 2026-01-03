# Multi-stage build for Spring Boot application

# Stage 1: Build
FROM gradle:8.5-jdk17 AS build
WORKDIR /app

# Copy gradle files
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Download dependencies
RUN ./gradlew dependencies --no-daemon || true

# Copy source code
COPY src ./src

# Build application
RUN ./gradlew build --no-daemon -x test

# Stage 2: Runtime
FROM openjdk:17-jdk-slim
WORKDIR /app

# Create non-root user
RUN groupadd -r spring && useradd -r -g spring spring

# Copy jar from build stage
COPY --from=build /app/build/libs/*SNAPSHOT.jar app.jar

# Change ownership
RUN chown -R spring:spring /app

# Switch to non-root user
USER spring:spring

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

