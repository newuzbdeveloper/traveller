import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { Trip } from '@features/trip/types';
import { auth, firestore } from '@services/firebase';

export async function getTrips() {
  if (!auth.currentUser) {
    throw Error('You are not authorized to make these changes!');
  }

  const userTripsQuery = query(
    collection(firestore, 'trips'),
    where('userUid', '==', auth.currentUser.uid),
  );

  const querySnapshot = await getDocs(userTripsQuery);
  return querySnapshot.docs.map((doc) => doc.data() as Trip);
}

export async function getTripById(tripId?: string) {
  if (!auth.currentUser) {
    throw Error('You are not authorized to make these changes!');
  }

  if (!tripId) {
    throw new Error('Trip is not found!');
  }

  const tripRef = doc(firestore, 'trips', tripId);
  const tripSnap = await getDoc(tripRef);

  if (!tripSnap.exists()) {
    throw new Error('Trip is not found!');
  }
  return tripSnap.data() as Trip;
}

export async function addTrip(trip: Trip) {
  if (!auth.currentUser) {
    throw Error('You are not authorized to make these changes!');
  }

  await setDoc(doc(firestore, 'trips', trip.id), {
    ...trip,
    userUid: auth.currentUser.uid,
  });
}

export async function updateTrip(tripId: string, data: Partial<Trip>) {
  if (!auth.currentUser) {
    throw Error('You are not authorized to make these changes!');
  }

  const tripRef = doc(firestore, 'trips', tripId);

  await updateDoc(tripRef, data);

  return true;
}
