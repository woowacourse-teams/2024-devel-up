export default function ErrorPage() {
  const handleError = () => {
    throw new Error();
  };

  return <button onClick={handleError}>에러 발생!</button>;
}
