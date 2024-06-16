import { doc, setDoc } from 'firebase/firestore';

import { Trip } from '@features/trip/types';
import { auth, firestore } from '@services/firebase';

export async function addTrip(trip: Trip) {
  if (!auth.currentUser) {
    throw Error('You are not authorized to make these changes!');
  }

  await setDoc(doc(firestore, 'trips', trip.id), {
    ...trip,
    userUid: auth.currentUser.uid,
  });
}
