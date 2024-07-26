/* eslint-disable react/no-unescaped-entities */
const HowToFork = () => {
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      <h1>미션 가이드</h1>

      <h2>1. 미션을 자신의 계정으로 fork</h2>
      <p>develup-mission의 repository에 저장되어 있는 미션을 자신의 계정으로 가져옵니다.</p>
      <img
        src="https://github.com/user-attachments/assets/2c835367-78ee-4ac9-8f63-b54ac5b064f1"
        alt="미션을 자신의 계정으로 fork"
        width={200}
        height={100}
      />

      <h2>2. fork한 저장소를 자신의 컴퓨터로 clone</h2>
      <p>자신의 계정으로 가져온 미션을 로컬 컴퓨터에 저장합니다.</p>

      <h2>3. 기능 구현</h2>
      <p>
        <code>README.md</code> 파일을 참고하여 미션을 진행합니다.
      </p>

      <h2>4. 기능 구현 후 add, commit</h2>
      <p>기능 구현 후 변경된 코드를 저장소에 반영하기 위해 add, commit 명령을 사용합니다.</p>
      <pre>
        <code>
          git status // 변경된 파일 확인 git add 파일명 또는 git add . // 변경된 단일 파일 또는 전체
          파일 반영 git commit -m '메세지' // 작업한 내용을 메시지에 기록
        </code>
      </pre>

      <h2>5. 본인 원격 저장소에 업로드</h2>
      <p>
        로컬에서 commit 명령을 실행하면 로컬 저장소에만 반영되고, 원격 github.com의 저장소에는
        반영되지 않습니다. github.com의 저장소에도 동일하게 반영하기 위해 push 명령어를 사용합니다.
      </p>
      <pre>
        <code>git push origin 브랜치이름 ex) git push origin develup</code>
      </pre>

      <h2>6. github 서비스에서 Pull Request 제출</h2>
      <p>
        Pull Request는 github에서 제공하는 기능으로 코드리뷰 요청을 보낼 때 사용합니다. Pull
        Request는 original 저장소의 main 브랜치와 앞 단계에서 생성한 브랜치 이름을 기준으로 합니다.
      </p>
    </div>
  );
};

export default HowToFork;
