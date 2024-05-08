import { useSearchParams } from 'react-router-dom';
import Select from './Select.jsx';

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={searchParams.get('sortBy') || ''}
      options={options}
      $type='white'
      onChange={handleChange}
    />
  );
}
