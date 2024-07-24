package develup.support.data;

import develup.domain.submission.Pair;
import develup.domain.submission.PairStatus;
import develup.domain.submission.Submission;

public class PairTestData {
    public static PairBuilder defaultPair() {
        return new PairBuilder()
                .withMain(SubmissionTestData.defaultSubmission().withId(Long.MAX_VALUE - 1).build())
                .withOther(SubmissionTestData.defaultSubmission().withId(Long.MAX_VALUE).build())
                .withStatus(PairStatus.MATCHED);
    }

    public static PairBuilder otherPair(Pair main) {
        return new PairBuilder()
                .withMain(main.getOther())
                .withOther(main.getMain())
                .withStatus(main.getStatus().toOtherStatus());
    }

    public static final class PairBuilder {
        private Long id;
        private Submission main;
        private Submission other;
        private PairStatus status;

        private PairBuilder() {
        }

        public PairBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public PairBuilder withMain(Submission main) {
            this.main = main;
            return this;
        }

        public PairBuilder withOther(Submission other) {
            this.other = other;
            return this;
        }

        public PairBuilder withStatus(PairStatus status) {
            this.status = status;
            return this;
        }

        public Pair build() {
            return new Pair(id, main, other, status);
        }
    }
}
