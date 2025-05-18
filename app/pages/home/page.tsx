import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';

import HomeClient from './HomeClient';


export default async function HomePage() {
  const data = await getAllArtefacts(3, 10); // cacheable on server

  return <HomeClient initialArtefacts={data.artefacts} />;
}
