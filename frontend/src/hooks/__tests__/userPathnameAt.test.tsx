import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import usePathnameAt from '../usePathnameAt';

const TestComponent = ({ index }: { index: number }) => {
  const pathname = usePathnameAt(index);
  return <div data-testid="pathname">{pathname}</div>;
};

describe('usePathnameAt', () => {
  it('주어진 index(0)에 따라 올바른 pathname을 반환한다.', () => {
    const INDEX = 0;

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/home/about/contact']}>
        <TestComponent index={INDEX} />
      </MemoryRouter>,
    );

    expect(getByTestId('pathname').textContent).toBe('home');
  });

  it('주어진 index(양수)에 따라 올바른 pathname을 반환한다.', () => {
    const INDEX = 1;

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/home/about/contact']}>
        <TestComponent index={INDEX} />
      </MemoryRouter>,
    );

    expect(getByTestId('pathname').textContent).toBe('about');
  });

  it('주어진 index(음수)에 따라 올바른 pathname을 반환한다.', () => {
    const INDEX = -1;

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/home/about/contact']}>
        <TestComponent index={INDEX} />
      </MemoryRouter>,
    );

    expect(getByTestId('pathname').textContent).toBe('contact');
  });

  it('유효한 범위에서 벗어난 index(양수)일 경우 undefined를 반환한다.', () => {
    const INDEX = 3;

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/home/about/contact']}>
        <TestComponent index={INDEX} />
      </MemoryRouter>,
    );

    expect(getByTestId('pathname').textContent).toBe('');
  });

  it('유효한 범위에서 벗어난 index(음수)일 경우 undefined를 반환한다.', () => {
    const INDEX = -4;

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/home/about/contact']}>
        <TestComponent index={INDEX} />
      </MemoryRouter>,
    );

    expect(getByTestId('pathname').textContent).toBe('');
  });
});
