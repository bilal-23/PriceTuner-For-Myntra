import { useState, useEffect } from 'react';

const inputStyle = {
  width: '100%',
  height: '30px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '0',
};

const btnStyle = {
  width: '100%',
  height: '30px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '0',
};

function updateQueryParam(url, key, value) {
  const urlObj = new URL(url);
  urlObj.searchParams.set(key, value);
  return urlObj.href;
}

export default function App() {
  const [price, setPrice] = useState({ min: 0, max: 100000 });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const rf = url.searchParams.get('rf');
    const isCustomFilter = url.searchParams.get('custom-filter');
    if (rf && isCustomFilter === 'true') {
      const priceRange = rf.split('_');
      const minPrice = priceRange[0].split(':')[1].split('.')[0];
      const maxPrice = priceRange[1].split('.')[0];
      setPrice({ min: parseInt(minPrice), max: parseInt(maxPrice) });
    }
  }, []);

  useEffect(() => {
    if (price.min > price.max) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [price]);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minPrice = price.min;
    const maxPrice = price.max;
    if (minPrice > maxPrice) {
      return alert('Min price must be less than max price');
    }
    // GET Search Params
    const url = new URL(window.location.href);
    const oldRf = url.searchParams.get('rf');
    // Construct the 'rf' parameter value with '.0' appended to both min and max prices
    const rfValue = `Price:${minPrice}.0_${maxPrice}.0_${minPrice}.0 TO ${maxPrice}.0`;
    if (oldRf === rfValue) return alert('Same price range');
    // Update the 'rf' parameter in the current URL
    let newUrl = updateQueryParam(window.location.href, 'rf', rfValue);
    newUrl = updateQueryParam(newUrl, 'custom-filter', 'true');
    window.location.href = newUrl;
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="price-filter"
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 1fr',
        width: '100%',
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingRight: '10px',
        gap: '10px',
      }}>
      {/* Filter Input Number */}
      <input
        style={inputStyle}
        type="number"
        className="filter-input__input"
        value={price.min}
        min={0}
        step={1}
        onChange={e => setPrice({ ...price, min: parseInt(e.target.value) })}
      />
      <input
        style={inputStyle}
        type="number"
        className="filter-input__input"
        value={price.max}
        min={100}
        step={1}
        onChange={e => setPrice({ ...price, max: parseInt(e.target.value) })}
      />
      <button type="submit" style={btnStyle} disabled={buttonDisabled}>
        Go
      </button>
    </form>
  );
}
