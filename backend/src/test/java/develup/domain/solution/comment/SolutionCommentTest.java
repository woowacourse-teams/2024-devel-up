package develup.domain.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

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

        assertSoftly(softly -> {
            softly.assertThat(comment.getContent()).isEqualTo(content);
            softly.assertThat(comment.getParentComment()).isNull();
            softly.assertThat(comment.getDeletedAt()).isNull();
        });
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
        SolutionComment parentComment = SolutionCommentTestData.defaultSolutionComment().build();
        String content = "답글입니다.";
        Member member = MemberTestData.defaultMember().build();

        SolutionComment reply = parentComment.reply(content, member);

        assertSoftly(softly -> {
            softly.assertThat(reply.getContent()).isEqualTo(content);
            softly.assertThat(reply.getSolution()).isEqualTo(parentComment.getSolution());
            softly.assertThat(reply.getMember()).isEqualTo(member);
            softly.assertThat(reply.getParentComment()).isEqualTo(parentComment);
            softly.assertThat(reply.getDeletedAt()).isNull();
        });
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
        SolutionComment rootComment = SolutionCommentTestData.defaultSolutionComment().build();
        SolutionComment reply = SolutionCommentTestData.defaultSolutionComment()
                .withParentComment(rootComment)
                .build();
        String content = "답글에 대한 답글입니다.";
        Member member = MemberTestData.defaultMember().build();

        assertThatThrownBy(() -> reply.reply(content, member))
                .isInstanceOf(DevelupException.class)
                .hasMessage("답글에는 답글을 작성할 수 없습니다.");
    }
}
