import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

function Homepage() {
  /////-----------//////////////

  return (
    <>
      <Header />
      <div
        className="modal fade bg-white"
        id="templatemo_search"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            className="modal-content modal-body border-0 p-0"
          >
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                className="input-group-text bg-success text-light"
              >
                <i className="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Banner */}

      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row1">
              <img className="banner" src="./assets/img/banner_01.png" alt="" />
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row1">
              <div className="">
                <img
                  className="banner"
                  src="./assets/img/banner_01.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row1">
              <div className="">
                <img
                  className="banner"
                  src="./assets/img/banner_03.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev text-decoration-none w-auto ps-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <i className="fas fa-chevron-left"></i>
        </a>
        <a
          className="carousel-control-next text-decoration-none w-auto pe-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>
      {/*End Banner */}
      {/*Start Categories of The Month */}
      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Categories of The Month</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 p-5 mt-3">
            <a href="/product:15">
              <img
                src="https://product.hstatic.net/1000026602/product/dsc02823_c7d561f325b04fca9e93d85730f62257_master.jpg"
                className="rounded-circle img-fluid border"
              />
            </a>
            <h5 className="text-center mt-3 mb-3">Hat</h5>
            <p className="text-center">
              <a className="submit-button" href="/product:15">
                Go Shop
              </a>
            </p>
          </div>
          <div className="col-12 col-md-4 p-5 mt-3">
            <a href="/product:4">
              <img
                src="https://product.hstatic.net/1000026602/product/img_1182_af26dbec5d23499b8ba4ef906fc1d414_master.jpg"
                className="rounded-circle img-fluid border"
              />
            </a>
            <h2 className="h5 text-center mt-3 mb-3">Bag</h2>
            <p className="text-center">
              <a className="submit-button" href="/product:4">
                Go Shop
              </a>
            </p>
          </div>
          <div className="col-12 col-md-4 p-5 mt-3">
            <a href="/product:3">
              <img
                src="https://product.hstatic.net/1000026602/product/img_0044_f2f9f82fb43b445686c959a8c382f9a8_master.jpg"
                className="rounded-circle img-fluid border"
              />
            </a>
            <h2 className="h5 text-center mt-3 mb-3">Accessories</h2>
            <p className="text-center">
              <a className="submit-button" href="product:3">
                Go Shop
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Featured Product</h1>
              <p>
                Reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <a href="/product:41">
                  <img
                    src="https://product.hstatic.net/1000026602/product/img_9213_80cc35f645cb4b32b51b0a1ab8bf5a49_master.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <a
                    href="/product:41"
                    className="h2 text-decoration-none text-dark"
                  >
                    Vertical Blue White Pock
                  </a>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt in culpa qui officia deserunt.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li className="text text-right">280.00 VND </li>
                  </ul>
                  <a className="text-view" href="/product:41">
                    View
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <a href="/product:87">
                  <img
                    src="https://product.hstatic.net/1000026602/product/img_9216_14b5f8c17aa544d7abae144a2d8fd476_master.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <a
                    href="/product:87"
                    className="h2 text-decoration-none text-dark"
                  >
                    Polo Blue Impress Placket
                  </a>
                  <p className="card-text">
                    Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                    vitae pharetra sed, commodo ullamcorper.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li className="text text-right">Price: 350.00 VND</li>
                  </ul>
                  <a className="text-view" href="/product:87">
                    View
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <a href="/product:85">
                  <img
                    src="https://product.hstatic.net/1000026602/product/img_3007_3931d480adaa4686b5fd41b1b5d70fed_master.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <a
                    href="/product:85"
                    className="h2 text-decoration-none text-dark"
                  >
                    Green Monogram Pattern
                  </a>

                  <p className="card-text">
                    Curabitur ac mi sit amet diam luctus porta. Phasellus
                    pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li className="text text-right">Price: 350.00 VND</li>
                  </ul>
                  <a className="text-view" href="/product:85">
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Homepage;
