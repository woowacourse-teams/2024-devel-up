package develup.domain.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import develup.api.exception.DevelupException;
import develup.domain.member.Member;
import develup.support.data.MemberTestData;
import develup.support.data.SolutionCommentTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SolutionCommentTest {

    @Test
    @DisplayName("댓글을 생성할 수 있다.")
    void create() {
        String content = "댓글입니다.";
        SolutionComment comment = SolutionCommentTestData.defaultSolutionComment()
                .withContent(content)
                .build();

        assertAll(
                () -> assertThat(comment.getContent()).isEqualTo(content),
                () -> assertThat(comment.getParentCommentId()).isNull(),
                () -> assertThat(comment.getDeletedAt()).isNull()
        );
    }

    @Test
    @DisplayName("댓글 내용을 수정할 수 있다.")
    void updateContent() {
        SolutionComment comment = SolutionCommentTestData.defaultSolutionComment().build();
        String updatedContent = "수정된 댓글입니다.";

        comment.updateContent(updatedContent);

        assertThat(comment.getContent()).isEqualTo(updatedContent);
    }

    @Test
    @DisplayName("삭제된 댓글의 내용을 수정할 수 없다.")
    void updateContentFailedWhenAlreadyDeleted() {
        SolutionComment comment = SolutionCommentTestData.defaultSolutionComment()
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
        SolutionComment comment = SolutionCommentTestData.defaultSolutionComment().build();

        comment.delete();

        assertThat(comment.getDeletedAt()).isNotNull();
    }

    @Test
    @DisplayName("삭제된 댓글은 삭제할 수 없다.")
    void deleteFailedWhenAlreadyDeleted() {
        SolutionComment comment = SolutionCommentTestData.defaultSolutionComment()
                .withDeletedAt(LocalDateTime.now())
                .build();

        assertThatThrownBy(comment::delete)
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 삭제된 댓글입니다.");
    }

    @Test
    @DisplayName("댓글에 답글을 달 수 있다.")
    void reply() {
        SolutionComment parentComment = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .build();
        String content = "답글입니다.";
        Member member = MemberTestData.defaultMember().build();

        SolutionComment reply = parentComment.reply(content, member);

        assertAll(
                () -> assertThat(reply.getContent()).isEqualTo(content),
                () -> assertThat(reply.getSolution()).isEqualTo(parentComment.getSolution()),
                () -> assertThat(reply.getMember()).isEqualTo(member),
                () -> assertThat(reply.getParentCommentId()).isEqualTo(parentComment.getId()),
                () -> assertThat(reply.getDeletedAt()).isNull()
        );
    }

    @Test
    @DisplayName("삭제된 댓글에는 답글을 달 수 없다.")
    void replyFailedWhenAlreadyDeleted() {
        SolutionComment parentComment = SolutionCommentTestData.defaultSolutionComment()
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
        SolutionComment rootComment = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .build();
        SolutionComment reply = SolutionCommentTestData.defaultSolutionComment()
                .withId(2L)
                .withParentCommentId(rootComment.getId())
                .build();
        String content = "답글에 대한 답글입니다.";
        Member member = MemberTestData.defaultMember().build();

        assertThatThrownBy(() -> reply.reply(content, member))
                .isInstanceOf(DevelupException.class)
                .hasMessage("답글에는 답글을 작성할 수 없습니다.");
    }
}
