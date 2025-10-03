import type { BikeListing } from '@shared/types';

export default function ListingCard({ title, price, description }: BikeListing) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>£{price}</p>
      <p style={{ fontSize: '1rem', color: '#555' }}>{description}</p>
    </div>
  );
}
