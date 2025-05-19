import { prisma } from '../../../../prisma/prisma-client';
import { columns } from './columns';
import { DataTable } from './data-table';

interface Props {
  email: string;
}
export default async function ExampleTable({ email }: Props) {
  const data = await prisma.order.findMany({
    where: {
      email,
    },
  });

  return (
    <div className='container mx-auto py-10 rounded-2xl overflow-hidden px-2 sm:px-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
