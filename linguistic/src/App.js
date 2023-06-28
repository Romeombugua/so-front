import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, UploadAudioGo, TranscriptionList, TranslationList, TranslateAudio , TranscribeAudio, TranslateAudioGo, TheOffice, About} from './components';
import { Signup, Login, ResetPassword, ResetPasswordConfirm, Activate} from './containers';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';
import JobCorner from './components/JobCorner';
import Careers from './components/Careers';
import Privacy from './components/Privacy';


const App = () => 
    (
    <Provider store={store}>
        <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Layout>< Home /></Layout>} />
                    <Route path="/transcribeGo" element={<Layout>< UploadAudioGo/></Layout>} />
                    <Route path="/translatego" element={<Layout>< TranslateAudioGo/></Layout>} />
                    <Route path="/translate" element={<Layout>< TranslateAudio/></Layout>} />
                    <Route path="/transcribe" element={<Layout>< TranscribeAudio/></Layout>} />
                    <Route path="/transcripts" element={<Layout>< TranscriptionList/></Layout>} />
                    <Route path="/translations" element={<Layout>< TranslationList/></Layout>} />
                    <Route path="/about" element={<Layout><About/></Layout>} />
                    <Route path="/careers" element={<Layout><Careers/></Layout>} />
                    <Route path="/privacy" element={<Layout><Privacy/></Layout>} />
                    <Route path="/theoffice" exact element={< TheOffice />} />
                    <Route path="/jobcorner/:id" element={<JobCorner/>} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/signup' element={<Signup/>} />
                    <Route exact path='/reset-password' element={<ResetPassword/>} />
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
                    <Route exact path='/activate/:uid/:token' element={<Activate/>} />
                </Routes>
        </BrowserRouter>
    </Provider>
  )

export default App