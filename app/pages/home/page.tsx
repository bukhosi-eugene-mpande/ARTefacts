import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';

import HomeClient from './HomeClient';
import { cookies } from 'next/headers';
import { getUserDetails } from '@/app/actions/user/user';

export default async function HomePage() {
  const data = await getAllArtefacts(1, 10); // cacheable on server

  return <HomeClient initialArtefacts={data.artefacts} />;
}
