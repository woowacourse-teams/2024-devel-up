package develup.domain.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import develup.api.exception.DevelupException;
import develup.domain.member.Member;
import develup.support.data.DiscussionCommentTestData;
import develup.support.data.MemberTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionCommentTest {

    @Test
    @DisplayName("댓글을 생성할 수 있다.")
    void createRoot() {
        String content = "댓글입니다.";
        DiscussionComment comment = DiscussionCommentTestData.defaultDiscussionComment()
                .withContent(content)
                .build();

        assertAll(
                () -> assertThat(comment.getContent()).isEqualTo(content),
                () -> assertThat(comment.getParentComment()).isNull(),
                () -> assertThat(comment.getDeletedAt()).isNull()
        );
    }

    @Test
    @DisplayName("댓글 내용을 수정할 수 있다.")
    void updateContent() {
        DiscussionComment comment = DiscussionCommentTestData.defaultDiscussionComment().build();
        String updatedContent = "수정된 댓글입니다.";

        comment.updateContent(updatedContent);

        assertThat(comment.getContent()).isEqualTo(updatedContent);
    }

    @Test
    @DisplayName("삭제된 댓글의 내용을 수정할 수 없다.")
    void updateContentFailedWhenAlreadyDeleted() {
        DiscussionComment comment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDeletedAt(LocalDateTime.now())
                .build();
        String updatedContent = "수정된 댓글입니다.";

        assertThatThrownBy(() -> comment.updateContent(updatedContent))
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 삭제된 댓글입니다.");
    }


    @Test
    @DisplayName("댓글을 삭제할 수 있다.")
    void delete() {
        DiscussionComment comment = DiscussionCommentTestData.defaultDiscussionComment().build();

        comment.delete();

        assertThat(comment.getDeletedAt()).isNotNull();
    }

    @Test
    @DisplayName("삭제된 댓글은 삭제할 수 없다.")
    void deleteFailedWhenAlreadyDeleted() {
        DiscussionComment comment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDeletedAt(LocalDateTime.now())
                .build();

        assertThatThrownBy(comment::delete)
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 삭제된 댓글입니다.");
    }

    @Test
    @DisplayName("댓글에 답글을 달 수 있다.")
    void reply() {
        DiscussionComment parentComment = DiscussionCommentTestData.defaultDiscussionComment().build();
        String content = "답글입니다.";
        Member member = MemberTestData.defaultMember().build();

        DiscussionComment reply = parentComment.reply(content, member);

        assertAll(
                () -> assertThat(reply.getContent()).isEqualTo(content),
                () -> assertThat(reply.getDiscussion()).isEqualTo(parentComment.getDiscussion()),
                () -> assertThat(reply.getMember()).isEqualTo(member),
                () -> assertThat(reply.getParentComment()).isEqualTo(parentComment),
                () -> assertThat(reply.getDeletedAt()).isNull()
        );
    }

    @Test
    @DisplayName("삭제된 댓글에는 답글을 달 수 없다.")
    void replyFailedWhenAlreadyDeleted() {
        DiscussionComment parentComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDeletedAt(LocalDateTime.now())
                .build();
        String content = "답글입니다.";
        Member member = MemberTestData.defaultMember().build();

        assertThatThrownBy(() -> parentComment.reply(content, member))
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 삭제된 댓글입니다.");
    }

    @Test
    @DisplayName("답글에는 답글을 달 수 없다.")
    void replyFailedWhenAlreadyReply() {
        DiscussionComment rootComment = DiscussionCommentTestData.defaultDiscussionComment().build();
        DiscussionComment reply = DiscussionCommentTestData.defaultDiscussionComment()
                .withParentComment(rootComment)
                .build();
        String content = "답글에 대한 답글입니다.";
        Member member = MemberTestData.defaultMember().build();

        assertThatThrownBy(() -> reply.reply(content, member))
                .isInstanceOf(DevelupException.class)
                .hasMessage("답글에는 답글을 작성할 수 없습니다.");
    }
}
