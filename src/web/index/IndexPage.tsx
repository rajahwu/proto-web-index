import { useLoaderData, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

export default function IndexPage() {
  const data = useLoaderData() as { message: string };
  const navigate = useNavigate();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Proto Web Index</h1>
      <pre className="bg-slate-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      
      <div className="mt-4 flex gap-2">
        <Button onClick={() => navigate('/lite-game')}>Fallen Angels Lite Game</Button>
      </div>
    </div>
  );
}
