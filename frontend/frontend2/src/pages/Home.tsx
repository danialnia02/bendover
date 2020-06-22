import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/DataViewer/ExploreContainer';
import './Home.css';
import DataViewer from '../components/DataViewer/DataViewer';
import Works from '../components/DataViewer/works';
import DataViewer2 from '../components/testFolder/DataViewer2';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <DataViewer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
