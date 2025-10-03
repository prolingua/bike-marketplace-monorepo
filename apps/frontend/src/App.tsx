import { useEffect, useState } from 'react';
import type { BikeListing } from '@shared/types';
import ListingCard from './components/ListingCard';

function App() {
  const [listings, setListings] = useState<BikeListing[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    console.log('Using backend URL:', backendUrl);
    fetch(`${backendUrl}/listings?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => {
    setListings(data.listings);
    setTotal(data.total);
    })
    .catch((err) => console.error('Failed to fetch listings:', err))
    .finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
    setPage(1); // reset to first page on new search
    }, 500); // 500ms delay

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search });
    window.history.replaceState({}, '', `?${params.toString()}`);
  }, [page, search]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearch(params.get('search') || '');
    setPage(parseInt(params.get('page') || '1'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Available Bikes</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search bikes naturally (e.g. 'Electric bikes under £500 for commuting')"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: '1rem', padding: '0.5rem', width: '98.5%' }}
        />
        {search && (
        <button onClick={() => setSearch('')} style={{ marginLeft: '1rem' }}>
          Clear
        </button>)}
        </div>
      {loading ? <p>Loading...</p> : (
      <div style={{ display: 'grid', gap: '1rem' }}>
        {listings.map((listing) => (
        <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
      )}
      {listings.length === 0 && !loading && <p>No bikes matched your search.</p>}
      <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          ◀ Previous
        </button>
        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <span>{total} bikes found</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * limit >= total}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default App;
