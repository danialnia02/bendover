import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/DataViewer/ExploreContainer';
import './Home.css';
import App from '../components/DataViewer/DataViewer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>        
        <App/>           
      </IonContent>
    </IonPage>
  );
};

export default Home;
