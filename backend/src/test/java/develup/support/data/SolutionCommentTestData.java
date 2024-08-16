package develup.support.data;

import java.time.LocalDateTime;
import develup.domain.member.Member;
import develup.domain.solution.Solution;
import develup.domain.solution.comment.SolutionComment;

public class SolutionCommentTestData {

    public static SolutionCommentBuilder defaultSolutionComment() {
        return new SolutionCommentBuilder()
                .withId(null)
                .withContent("안녕하세요. 피드백 잘 부탁 드려요.")
                .withSolution(SolutionTestData.defaultSolution().build())
                .withMember(MemberTestData.defaultMember().build())
                .withParentComment(null)
                .withDeletedAt(null);
    }

    public static class SolutionCommentBuilder {

        private Long id;
        private String content;
        private Solution solution;
        private Member member;
        private SolutionComment parentComment;
        private LocalDateTime deletedAt;

        public SolutionCommentBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public SolutionCommentBuilder withContent(String content) {
            this.content = content;
            return this;
        }

        public SolutionCommentBuilder withSolution(Solution solution) {
            this.solution = solution;
            return this;
        }

        public SolutionCommentBuilder withMember(Member member) {
            this.member = member;
            return this;
        }

        public SolutionCommentBuilder withParentComment(SolutionComment parentComment) {
            this.parentComment = parentComment;
            return this;
        }

        public SolutionCommentBuilder withDeletedAt(LocalDateTime deletedAt) {
            this.deletedAt = deletedAt;
            return this;
        }

        public SolutionComment build() {
            return new SolutionComment(
                    id,
                    content,
                    solution,
                    member,
                    parentComment,
                    deletedAt
            );
        }
    }
}
