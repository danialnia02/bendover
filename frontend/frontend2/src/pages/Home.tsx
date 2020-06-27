import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Home.css';
import DataViewer from '../components/DataViewer/DataViewer';
import ResultViewer from '../components/ResultViewer/ResultViewer'

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>        
        <ResultViewer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
