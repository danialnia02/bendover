import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import DataViewer from '../components/DataViewer/DataViewer';
import DataViewer2 from '../components/testFolder/DataViewer2';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>        
        <DataViewer2/>           
      </IonContent>
    </IonPage>
  );
};

export default Home;
