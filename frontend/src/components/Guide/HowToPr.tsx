import React from 'react';

export default function HowToPR() {
  return (
    <div>
      <h1>PR(풀 리퀘스트) 보내는 방법</h1>
      <p>효율적인 PR을 보내기 위해 아래의 단계를 따릅니다:</p>

      <h2>1. 준비 단계</h2>
      <ul>
        <li>변경 사항이 잘 작동하는지 로컬에서 충분히 테스트합니다.</li>
        <li>모든 관련된 이슈나 피처가 구현되었는지 확인합니다.</li>
        <li>코드 스타일 가이드를 준수했는지 확인합니다.</li>
      </ul>

      <h2>2. PR 생성</h2>
      <ol>
        <li>로컬 브랜치에서 변경 사항을 커밋합니다.</li>
        <li>원격 저장소의 관련 브랜치로 푸시합니다.</li>
        <li>깃허브 또는 다른 코드 호스팅 플랫폼에서 새로운 PR을 만듭니다.</li>
        <li>PR 제목과 설명을 작성합니다. 변경 사항과 이유를 명확히 기재합니다.</li>
      </ol>

      <div className="code-example">
        <h3>PR 생성 예시:</h3>
        <pre>
          <code>{`
# 새로운 브랜치 생성 및 이동
git checkout -b feature/my-feature

# 변경 사항 커밋
git add .
git commit -m "새로운 기능 추가"

# 원격 저장소로 푸시
git push origin feature/my-feature

# 깃허브에서 PR 생성
          `}</code>
        </pre>
      </div>

      <h2>3. PR 리뷰 요청</h2>
      <ul>
        <li>리뷰어를 지정하고 리뷰를 요청합니다.</li>
        <li>리뷰어가 변경 사항을 이해할 수 있도록 명확히 설명합니다.</li>
        <li>필요한 경우 추가적인 정보를 제공합니다.</li>
      </ul>

      <h2>4. 리뷰 반영</h2>
      <ul>
        <li>리뷰어의 피드백을 반영하고 필요한 수정을 합니다.</li>
        <li>수정된 내용을 다시 푸시하고 리뷰어에게 알려줍니다.</li>
        <li>리뷰가 완료되면 PR을 머지합니다.</li>
      </ul>
    </div>
  );
}
