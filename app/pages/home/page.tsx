import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';

import HomeClient from './HomeClient';
import { cookies } from 'next/headers';
import { getUserDetails } from '@/app/actions/user/user';

export default async function HomePage() {
  const data = await getAllArtefacts(1, 10); // cacheable on server
  const accessToken =
    typeof window !== 'undefined'
      ? (localStorage.getItem('accessToken') ?? '')
      : '';

  let user = null;

  if (accessToken && !accessToken.includes('guest')) {
    try {
      user = await getUserDetails(accessToken);
    } catch {
      user = null; // fallback if fetch fails
    }
  } else {
    // Default guest user object
    user = {
      id: 'guest',
      username: 'Guest',
      avatar:
        'https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png',
      email: '',
      name: 'Guest User',
    };
  }

  return <HomeClient initialArtefacts={data.artefacts} initialUser={user} />;
}
