import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyCQjAHCdWFL3E07UvvE5Ve4CNAZkVGJYNY',
    authDomain: 'beer-advisor-81981.firebaseapp.com',
    databaseURL: 'https://beer-advisor-81981.firebaseio.com',
    projectId: 'beer-advisor-81981',
    storageBucket: 'beer-advisor-81981.appspot.com',
    messagingSenderId: '716209682893'
};
firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
