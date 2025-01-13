import React from 'react';
import DebounceInput from './components/DebounceInput';
import useFetchCountries from './hooks/useFetchCountries';

function App() {
  const { countries, isLoading, error } = useFetchCountries();

  console.log(countries.size, isLoading, error)
  return (
    <div>
      <DebounceInput onTimeout={() => console.log("Called")} />
    </div>
  );
}

export default App;
