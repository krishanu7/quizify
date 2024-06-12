import HistoryComponent from '@/components/HistoryComponent';
import {getAuthSession} from '@/lib/nextauth';
import {redirect} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import React from 'react';
import Link from 'next/link';
import {buttonVariants} from '@/components/ui/button';
import {LucideLayoutDashboard} from 'lucide-react';


type Props = {};

const History = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[500px] bg-white dark:bg-gray-800 shadow-lg dark:shadow-purple-400/60 dark:border-b-purple-300 dark:border-r-purple-300 rounded-xl overflow-hidden">
      <Card >
        <CardHeader className='flex flex-row items-center justify-between bg-gray-100 dark:bg-gray-700'>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">History</CardTitle>
            <Link className={buttonVariants({variant:"button"})} href="/dashboard">
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-scroll flex flex-col gap-4 my-2">
          <HistoryComponent limit={100} userId={session.user.id} />
          {/* TODO: IncompleComponents */}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
