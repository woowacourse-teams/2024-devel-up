FROM openjdk:21

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILE}", "-DLogging.host=${HOSTNAME}", \
                "-jar", "/app.jar"]
