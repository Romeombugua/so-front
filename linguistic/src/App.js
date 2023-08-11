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
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import {Helmet} from "react-helmet";


const App = () => 
    (
    <Provider store={store}>
        <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Layout>< Home /></Layout>} />
                    <Route path="/transcribeGo" element={<Layout>
                        <Helmet>
                            <title>Convert Speech to Text on the Go</title>
                            <meta name='description' content='Convert Speech to Text without an account'/>
                        </Helmet>
                        < UploadAudioGo/>
                        </Layout>} />
                    <Route path="/translatego" element={<Layout>
                        <Helmet>
                            <title>Translate Audio to English on the Go</title>
                            <meta name='description' content='Convert Audio to English without an account'/>
                        </Helmet>
                        < TranslateAudioGo/>
                        </Layout>} />
                    <Route path="/translate" element={<Layout>
                        <Helmet>
                            <title>Translate Audio to English</title>
                            <meta name='description' content='Convert Audio in over 90 languages to English'/>
                        </Helmet>
                        < TranslateAudio/>
                        </Layout>} />
                    <Route path="/transcribe" element={<Layout>
                        <Helmet>
                            <title>Convert Speech to Text</title>
                            <meta name='description' content='Convert Speech to text with over 90% accuracy for a dime'/>
                        </Helmet>
                        < TranscribeAudio/>
                        </Layout>} />
                    <Route path="/transcripts" element={<Layout>
                        <Helmet>
                            <title>My Transcripts</title>
                        </Helmet>
                        < TranscriptionList/>
                        </Layout>} />
                    <Route path="/translations" element={<Layout>
                        <Helmet>
                            <title>
                                My Translations
                            </title>
                        </Helmet>
                        < TranslationList/>
                        </Layout>} />
                    <Route path="/about" element={<Layout>
                        <Helmet>
                            <title>
                                LinguifyHub | About Us
                            </title>
                        </Helmet>
                        <About/>
                        </Layout>} />
                    <Route path="/careers" element={<Layout>
                        <Helmet>
                            <title>
                                LinguifyHub | Careers
                            </title>
                        </Helmet>
                        <Careers/>
                        </Layout>} />
                    <Route path="/privacy" element={<Layout>
                        <Helmet>
                            <title>
                                Privacy
                            </title>
                        </Helmet>
                        <Privacy/>
                        </Layout>} />
                    <Route path="/theoffice" exact element={< TheOffice />} />
                    <Route path="/jobcorner/:id" element={<JobCorner/>} />
                    <Route path="/blogs" element={<ArticleList/>}/>
                    <Route path="blogs/:id" element={<Article/>}/>
                    <Route exact path='/login' element={<>
                        <Helmet>
                            <title>LinguifyHub | Login</title>
                            <meta name='description' content='Login into your account'/>
                        </Helmet> <Login/></>} />
                    <Route exact path='/signup' element={<>
                        <Helmet>
                            <title>LinguifyHub | Sign up</title>
                            <meta name='description' content='Create an account'/>
                            </Helmet> <Signup/></>} />
                    <Route exact path='/reset-password' element={<ResetPassword/>} />
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
                    <Route exact path='/activate/:uid/:token' element={<Activate/>} />
                </Routes>
        </BrowserRouter>
    </Provider>
  )

export default App