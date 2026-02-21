import { useLoaderData } from 'react-router-dom';
import { Button } from '@/shared/ui/button'; // Shadcn example
import { ThemeProvider } from '@clearline7/theme'; // Hypothetical usage

export default function IndexPage() {
  const data = useLoaderData() as { message: string };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Proto Web Index</h1>
      <pre className="bg-slate-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      
      <div className="mt-4 flex gap-2">
        <Button onClick={() => console.log('Clicked')}>Shadcn Button</Button>
      </div>
    </div>
  );
}
