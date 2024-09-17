package develup.support.data;

import java.time.LocalDateTime;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.member.Member;

public class DiscussionCommentTestData {

    public static DiscussionCommentBuilder defaultDiscussionComment() {
        return new DiscussionCommentBuilder()
                .withId(null)
                .withContent("안녕하세요. 피드백 잘 부탁 드려요.")
                .withDiscussion(DiscussionTestData.defaultDiscussion().build())
                .withMember(MemberTestData.defaultMember().build())
                .withParentComment(null)
                .withDeletedAt(null);
    }

    public static class DiscussionCommentBuilder {

        private Long id;
        private String content;
        private Discussion discussion;
        private Member member;
        private DiscussionComment parentComment;
        private LocalDateTime deletedAt;

        public DiscussionCommentBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public DiscussionCommentBuilder withContent(String content) {
            this.content = content;
            return this;
        }

        public DiscussionCommentBuilder withDiscussion(Discussion discussion) {
            this.discussion = discussion;
            return this;
        }

        public DiscussionCommentBuilder withMember(Member member) {
            this.member = member;
            return this;
        }

        public DiscussionCommentBuilder withParentComment(DiscussionComment parentComment) {
            this.parentComment = parentComment;
            return this;
        }

        public DiscussionCommentBuilder withDeletedAt(LocalDateTime deletedAt) {
            this.deletedAt = deletedAt;
            return this;
        }

        public DiscussionComment build() {
            return new DiscussionComment(
                    id,
                    content,
                    discussion,
                    member,
                    parentComment,
                    deletedAt
            );
        }
    }
}
