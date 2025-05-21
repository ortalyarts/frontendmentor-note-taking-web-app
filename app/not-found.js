import Link from 'next/link';

export default function NotFound() {
    return (
      <>
        
        <main className="not-found">
          <h1>Not found</h1>
          <p>Unfortunately, we could not find the requested page or resource.</p>
          <Link href="/user" className="btn-primary">Go back to home</Link>
        </main>
      </>
      
    );
  }