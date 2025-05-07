import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { addCircleOutline, arrowBackCircleOutline, arrowBackOutline, arrowForwardCircleOutline, arrowForwardOutline, shuffleOutline } from 'ionicons/icons';
import { IonInput, IonTextarea, IonModal, } from '@ionic/react';
import './Home.css';



const Home: React.FC = () => {
  const [flashcards, setFlashcards] = useState([
    { question: "What is a proposition in discrete math?", 
      answer: "A statement that is either true or false, but not both." },
    { question: "Is {1,2} a subset of {1,2,3}?", 
      answer: "Yes, all elements of {1,2} are in the other set." },
    { question: "What is the power set of a set S?", 
      answer: "The set of all subsets of S, including the empty set and S itself." },
    { question: "What is a tautology?", 
      answer: "A formula that is true in every possible interpretation." },
    { question: "What is a contradiction?", 
      answer: "A formula that is false in every possible interpretation." },
    { question: "What is the difference between a permutation and a combination?", 
      answer: "Permutation considers order, while combination does not." },
    { question: "What is the principle of mathematical induction?", 
      answer: "A method of proving statements for all natural numbers." },
    { question: "What is a graph in discrete math?", 
      answer: "A collection of vertices and edges connecting them." },
    { question: "What is a tree in graph theory?", 
      answer: "A connected graph with no cycles." },
    { question: "What is the pigeonhole principle?", 
      answer: "If n items are put into m containers, with n > m, then at least one container must contain more than one item." }
  ]);

  const [shuffledFlashcards, setShuffledFlashcards] = useState(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (currentIndex < shuffledFlashcards.length - 1) {
      const flashcardElement = document.querySelector('.flashcard');
      if (flashcardElement) {
        flashcardElement.classList.add('slide-left'); 
        setTimeout(() => {
          flashcardElement.classList.remove('slide-left'); 
          setCurrentIndex(currentIndex + 1); 
          setFlipped(false); 
        }, 500); 
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const flashcardElement = document.querySelector('.flashcard');
      if (flashcardElement) {
        flashcardElement.classList.add('slide-right'); // Add the slide-right class
        setTimeout(() => {
          flashcardElement.classList.remove('slide-right'); // Remove the class after animation
          setCurrentIndex(currentIndex - 1); 
          setFlipped(false); 
        }, 500); 
      }
    }
  };

  const handleShuffle = () => {
    const shuffled = [...shuffledFlashcards];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledFlashcards(shuffled);
    setCurrentIndex(0);
    setFlipped(false);

    const flashcardElement = document.querySelector('.flashcard');
    if (flashcardElement) {
      flashcardElement.classList.add('shuffle');
      setTimeout(() => {
        flashcardElement.classList.remove('shuffle');
      }, 500); 
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdminModal(true);
  };

  const handleAddFlashcard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newCard = {
        question: newQuestion.trim(),
        answer: newAnswer.trim()
      };
      // Update both flashcards and shuffledFlashcards
      setFlashcards([...flashcards, newCard]);
      setShuffledFlashcards([...shuffledFlashcards, newCard]);
      setNewQuestion('');
      setNewAnswer('');
      setShowAdminModal(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Flashcards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="flashcard-container">
          <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="front">{shuffledFlashcards[currentIndex].question}</div>
            <div className="back">{shuffledFlashcards[currentIndex].answer}</div>
          </div>
          <div className="controls">
            <IonButton onClick={handlePrev} disabled={currentIndex === 0}>
              <IonIcon icon={arrowBackCircleOutline} slot="icon-only" />
            </IonButton>
            <IonButton onClick={handleFlip}>
              {flipped ?' Show Question' : 'Show Answer'}
            </IonButton>
            <IonButton onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
              <IonIcon icon={arrowForwardCircleOutline} slot='icon-only'/>
            </IonButton>
            <IonButton onClick={handleShuffle}><IonIcon icon={shuffleOutline} /></IonButton>
          </div>
        </div>
        <div className="admin-controls">
            <IonButton 
              fill="clear" 
              size="small" 
              onClick={handleAdminLogin}
            >
              <IonIcon icon={addCircleOutline} /> Admin
            </IonButton>
          </div>

          <IonModal isOpen={showAdminModal} onDidDismiss={() => setShowAdminModal(false)}>
            <IonContent className="ion-padding">
              <h2>Add New Flashcard</h2>
              <IonInput
                value={newQuestion}
                placeholder="Enter question"
                onIonChange={e => setNewQuestion(e.detail.value!)}
                className="admin-input"
              />
              <IonTextarea
                value={newAnswer}
                placeholder="Enter answer"
                onIonChange={e => setNewAnswer(e.detail.value!)}
                className="admin-input"
              />
              <div className="admin-buttons">
                <IonButton onClick={handleAddFlashcard}>Add Flashcard</IonButton>
                <IonButton onClick={() => setShowAdminModal(false)}>Close</IonButton>
              </div>
            </IonContent>
          </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;