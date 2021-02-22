import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import './App.css';
import axios from 'axios';
import { SampleCard } from "./components/Card";
import { Buttons } from "./components/Buttons";

const TotalWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const CardHolder = styled.div`
  margin-right: 6px;
`;

const App = () => {

  const [movieDataArraysObj, setmovieDataArraysObj] = useState([]);

    const getAxiosResult = () => {
      axios.get(`${process.env.REACT_APP_MOVIE_API_ENDPOINT}/api/v1/movies`)
      .then((res) => {
        makemovieDataArraysObj(res.data)}
        );
    }

    const makemovieDataArraysObj = (data) => {
      const movieDataArraysObjResult = [];
      console.log(movieDataArraysObjResult);

     data.forEach((elm, index) => {
        movieDataArraysObjResult.push(elm);
      })
      console.log(movieDataArraysObjResult);
      setmovieDataArraysObj(movieDataArraysObjResult);
    }

    const alignCards = (data) => {
      const rowsWith3CardsNum = Math.floor(data.length /3);
      const restCardsNum = (data.length % 3);

      return (
        <CardsWrapper>
        {data.map((_data, i) => {
          return (
            <CardHolder><SampleCard 
            name={data[i].title}
            releaseDate={data[i].release_date}
            plot={data[i].plot}
            /> </ CardHolder>
          )
        })}
        </CardsWrapper>
      )
  }

  const initSignInButton = (gapi) => {
    gapi.load("auth2", () => {
      gapi.auth2.init({client_id: "520135566480-3vhfu46ml7asej7m25fkglqncjrccm2g.apps.googleusercontent.com"})
        .then(
          (result) => {
            gapi.signin2.render("google-signin-button", {
              "onsuccess": onSignIn,
              "onfailure": (err) => console.log(err)
            });
          },
          (err) => console.error(err),
        )
    })
  }

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const id_token = googleUser.getAuthResponse().id_token;
    console.log("id_token:", id_token);
  }

  const downloadGoogleScript = (callback) => {
    const element = document.getElementsByTagName("script")[0];
    const js = document.createElement("script");
    js.id = "google-platform";
    js.src = "//apis.google.com/js/platform.js";
    js.async = true;
    js.defer = true;
    element.parentNode.insertBefore(js, element);
    js.onload = () => callback(window.gapi);
  }

  useEffect(() => {
    downloadGoogleScript(initSignInButton)
  })

  return (
    <>
      <TotalWrapper>
      <div id="google-signin-button"></div>
      <div onClick={() => getAxiosResult()}>
      <Buttons/>
      </div>
      </TotalWrapper>
      {/* <CardsWrapper>
      <CardHolder>
      <SampleCard name="chinko"/>
      </CardHolder>
      <CardHolder>
      <SampleCard name="chinko"/>
      </CardHolder>
      <CardHolder>
      <SampleCard name="chinko"/>
      </CardHolder>
      <SampleCard name={"unko"}/>
      </CardsWrapper> */}
      {/* {movieDataArraysObj.map((elm) => {
        return <SampleCard key={elm} name={elm.name}/>
      })} */}
      {alignCards(movieDataArraysObj)}
  </>
  )
}

export default App;
