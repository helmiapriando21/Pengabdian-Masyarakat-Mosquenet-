export default function Thead({ labels }: any) {
  return (
    <thead>
      <tr className="bg-yellow-400">
        { labels.map((label: any, index: number) => <th key={index} className="px-4 py-2 min-w-32">{label}</th>) }
      </tr>
    </thead>
  );
}