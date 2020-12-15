import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDTAFcZ7UbeHmFA3Kspz96noxjg69d5nBA",
  authDomain: "doannganh-b04ad.firebaseapp.com",
  databaseURL: "https://doannganh-b04ad.firebaseio.com",
  projectId: "doannganh-b04ad",
  storageBucket: "doannganh-b04ad.appspot.com",
  messagingSenderId: "298583938850",
  appId: "1:298583938850:web:fdb4f383e76b2880eab77b"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;