import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accounts from "./Components/Accounts";
import Home from "./Components/Home";
import ViewOrUpdateBilling from "./Components/ViewOrUpdateBilling";
import Edit from "./Components/Edit";
import { Provider } from "react-redux";
import { Store, persistor } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Nopage from "./Components/Nopage";

export default function App() {
  return (
    <>
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />

              {console.log("4333", Boolean(localStorage.getItem("user-info")))}

              <Route
                path="/Home"
                element={
                  Boolean(localStorage.getItem("user-info4343657897")) ? (
                    <Home />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route
                path="/create-new-bill"
                element={
                  Boolean(localStorage.getItem("user-info4343657897")) ? (
                    <Accounts />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route
                path="/Home/view/:id"
                element={
                  Boolean(localStorage.getItem("user-info4343657897")) ? (
                    <ViewOrUpdateBilling />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route
                path="/Home/edit/:id"
                element={
                  Boolean(localStorage.getItem("user-info4343657897")) ? (
                    <Edit />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route path="/*" element={<Nopage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}
