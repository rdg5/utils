const admin = require('firebase-admin');
const readlinePromises = require('node:readline/promises');
const {
  stdin: input,
  stdout: output
} = require('process');


const serviceAccount = require('/Users/box/Downloads/newhome-89525-firebase-adminsdk-hke6b-46277ed4ac.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const getInput = async () => {
  try {
    const rl = readlinePromises.createInterface({
      input,
      output
    });
    const answer = await rl.question(' Year, Title, Author : ');
    return answer;
  } catch (err) {
    console.log(err.message);
  }
}

const addBook = async (year, title, author) => {
  try {
    const booksCollection = db.collection('books');
    const userInput = await getInput();
    const book = userInput.split(',');

    const newBook = {
      year: book[0],
      title: book[1],
      author: book[2]
    };
    const docRef = await booksCollection.add(newBook);
    console.log(`Added book with ID: ${docRef.id}`);
    process.exit(0);
  } catch (error) {
    console.error('Error adding book:', error);
    return;
  }
};

addBook();
