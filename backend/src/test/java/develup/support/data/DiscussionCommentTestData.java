package develup.support.data;

import java.time.LocalDateTime;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.member.Member;

public class DiscussionCommentTestData {

    public static DiscussionCommentBuilder defaultRootDiscussionComment(Discussion discussion) {
        return new DiscussionCommentBuilder()
                .withContent("댓글 내용")
                .withDiscussion(discussion)
                .withMember(MemberTestData.defaultMember().build());
    }

    public static DiscussionCommentBuilder defaultReplyDiscussionComment(Discussion discussion, DiscussionComment parent) {
        return new DiscussionCommentBuilder()
                .withContent("댓글 내용")
                .withDiscussion(discussion)
                .withMember(MemberTestData.defaultMember().build())
                .withParentComment(parent);
    }

    public static class DiscussionCommentBuilder {
        private Long id;
        private String content;
        private Discussion discussion;
        private Member member;
        private DiscussionComment parentComment;
        private LocalDateTime deletedAt;

        // private 생성자로 외부에서 직접 Builder를 생성하지 못하도록 함
        private DiscussionCommentBuilder() {
        }

        // static 메서드를 통해 Builder 객체를 생성
        public static DiscussionCommentBuilder create() {
            return new DiscussionCommentBuilder();
        }

        // with prefix 메서드들
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

        // 최종적으로 DiscussionComment 객체를 빌드하여 반환
        public DiscussionComment build() {
            return new DiscussionComment(id, content, discussion, member, parentComment, deletedAt);
        }
    }
}
