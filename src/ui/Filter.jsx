import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  text-transform: capitalize;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dataAttr = `data-${filterField}`;

  function handleClick(e) {
    const { discount } = e.target.dataset;

    searchParams.set(filterField, discount);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          {...{ [dataAttr]: option.value }}
          onClick={handleClick}
          key={option.value}
          $active={option.value === (searchParams.get(filterField) || 'all')}
          disabled={option.value === (searchParams.get(filterField) || 'all')}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
