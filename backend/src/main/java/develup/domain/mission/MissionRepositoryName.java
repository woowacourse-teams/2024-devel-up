package develup.domain.mission;

import java.util.Arrays;

public enum MissionRepositoryName {

    JAVA_GUESSING_NUMBER("java-guessing-number"),
    JAVA_WORD_PUZZLE("java-word-puzzle"),
    JAVA_SMOKING("java-smoking");

    private final String name;

    MissionRepositoryName(String name) {
        this.name = name;
    }

    public static boolean contains(String name) {
        return Arrays.stream(values()).anyMatch(repositoryName -> repositoryName.getName().equals(name));
    }

    public String getName() {
        return name;
    }
}
