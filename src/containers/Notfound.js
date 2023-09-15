import React from "react";
import backgroundImage from "../asset/images/404.jpg";
import Header from "./Header";
import Footer from "./Footer";
const Notfound = () => {
  return (
    <>
      <Header />
      <div
        className="container-fluid align-middle-center header"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="block dark container">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <div className="blurb">404: PAGE NOT FOUND</div>
              <div className="h1">WE LOOKED</div>
              <div className="h1"> EVERYWHERE</div>
              <p className="p">
                Sorry, but we couldn't find the page you were looking for!
                <br></br>Please try another page, and always remember to
                <br />
                <a
                  className="navbar-brand text-success logo h1 align-self-center"
                  href="./"
                >
                  NH Store
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notfound;
