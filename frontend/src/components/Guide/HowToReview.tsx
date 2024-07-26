import React from 'react';

export default function HowToReview() {
  return (
    <div>
      <h1>상호 간의 코드 리뷰 방법</h1>
      <p>효율적인 코드 리뷰를 위해 아래의 단계를 따릅니다:</p>

      <h2>1. 리뷰 준비</h2>
      <ul>
        <li>리뷰할 코드를 사전에 검토하여 이해합니다.</li>
        <li>코드의 목적과 작동 방식을 파악합니다.</li>
        <li>코드 작성자의 의도를 이해하려고 노력합니다.</li>
      </ul>

      <h2>2. 리뷰 수행</h2>
      <ol>
        <li>코드 스타일 준수 여부 확인</li>
        <li>코드의 가독성 및 명확성 평가</li>
        <li>반복되는 코드 또는 중복 코드 제거 제안</li>
        <li>성능 개선 방안 제안</li>
        <li>테스트 커버리지 확인 및 추가 테스트 제안</li>
      </ol>

      <div className="code-review">
        <h3>코드 예시:</h3>
        <pre>
          <code>{`
// 코드의 가독성을 높이기 위해 변수명을 명확하게 사용합니다.
const fetchData = async () => {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('데이터 가져오기에 실패했습니다:', error);
    }
};
          `}</code>
        </pre>
      </div>

      <h2>3. 피드백 제공</h2>
      <ul>
        <li>긍정적인 피드백과 개선 사항을 균형 있게 제공합니다.</li>
        <li>구체적이고 실용적인 조언을 제시합니다.</li>
        <li>개인적인 비판이 아닌 코드 자체에 대한 피드백을 줍니다.</li>
      </ul>

      <h2>4. 리뷰 후</h2>
      <ul>
        <li>리뷰 받은 사항을 반영하고, 필요한 경우 리뷰어와 추가 논의합니다.</li>
        <li>리뷰어에게 감사의 인사를 전합니다.</li>
        <li>코드 품질을 지속적으로 개선할 수 있는 방법을 모색합니다.</li>
      </ul>
    </div>
  );
}
