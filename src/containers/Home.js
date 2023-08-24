import Footer from "./Footer";
import Header from "./Header";

function Homepage() {
  /////-----------//////////////

  return (
    <>
      <Header />
      <div
        class="modal fade bg-white"
        id="templatemo_search"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            class="modal-content modal-body border-0 p-0"
          >
            <div class="input-group mb-2">
              <input
                type="text"
                class="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                class="input-group-text bg-success text-light"
              >
                <i class="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Banner */}

      <div
        id="template-mo-zay-hero-carousel"
        class="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="10000"
      >
        <ol class="carousel-indicators">
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="0"
            class="active"
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
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row1">
              <img class="banner" src="./assets/img/banner_01.png" alt="" />
            </div>
          </div>
          <div class="carousel-item ">
            <div class="row1">
              <div class="">
                <img class="banner" src="./assets/img/banner_01.jpg" alt="" />
              </div>
            </div>
          </div>
          <div class="carousel-item ">
            <div class="row1">
              <div class="">
                <img class="banner" src="./assets/img/banner_03.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev text-decoration-none w-auto ps-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <i class="fas fa-chevron-left"></i>
        </a>
        <a
          class="carousel-control-next text-decoration-none w-auto pe-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <i class="fas fa-chevron-right"></i>
        </a>
      </div>
      {/*End Banner */}
      {/*Start Categories of The Month */}
      <section class="container py-5">
        <div class="row text-center pt-3">
          <div class="col-lg-6 m-auto">
            <h1 class="h1">Categories of The Month</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 p-5 mt-3">
            <a href="#">
              <img
                src="./assets/img/category_img_01.jpg"
                class="rounded-circle img-fluid border"
              />
            </a>
            <h5 class="text-center mt-3 mb-3">Watches</h5>
            <p class="text-center">
              <a class="btn btn-success" href="shop">
                Go Shop
              </a>
            </p>
          </div>
          <div class="col-12 col-md-4 p-5 mt-3">
            <a href="#">
              <img
                src="./assets/img/category_img_02.jpg"
                class="rounded-circle img-fluid border"
              />
            </a>
            <h2 class="h5 text-center mt-3 mb-3">Shoes</h2>
            <p class="text-center">
              <a class="btn btn-success" href="shop">
                Go Shop
              </a>
            </p>
          </div>
          <div class="col-12 col-md-4 p-5 mt-3">
            <a href="#">
              <img
                src="./assets/img/category_img_03.jpg"
                class="rounded-circle img-fluid border"
              />
            </a>
            <h2 class="h5 text-center mt-3 mb-3">Accessories</h2>
            <p class="text-center">
              <a class="btn btn-success" href="shop">
                Go Shop
              </a>
            </p>
          </div>
        </div>
      </section>

      <section class="bg-light">
        <div class="container py-5">
          <div class="row text-center py-3">
            <div class="col-lg-6 m-auto">
              <h1 class="h1">Featured Product</h1>
              <p>
                Reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4 mb-4">
              <div class="card h-100">
                <a href="shop-single.html">
                  <img
                    src="./assets/img/feature_prod_01.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                </a>
                <div class="card-body">
                  <a
                    href="shop-single.html"
                    class="h2 text-decoration-none text-dark"
                  >
                    Gym Weight
                  </a>
                  <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt in culpa qui officia deserunt.
                  </p>
                  <ul class="list-unstyled d-flex justify-content-between">
                    <li class="text-muted text-right">$240.00</li>
                  </ul>
                  <a class="text-muted" href="/shop">
                    View
                  </a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 mb-4">
              <div class="card h-100">
                <a href="shop-single.html">
                  <img
                    src="./assets/img/feature_prod_02.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                </a>
                <div class="card-body">
                  <a
                    href="shop-single.html"
                    class="h2 text-decoration-none text-dark"
                  >
                    Cloud Nike Shoes
                  </a>
                  <p class="card-text">
                    Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                    vitae pharetra sed, commodo ullamcorper.
                  </p>
                  <ul class="list-unstyled d-flex justify-content-between">
                    <li class="text-muted text-right">Price: $480.00</li>
                  </ul>
                  <a class="text-muted" href="/shop">
                    View
                  </a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 mb-4">
              <div class="card h-100">
                <a href="shop-single.html">
                  <img
                    src="./assets/img/feature_prod_03.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                </a>
                <div class="card-body">
                  <a
                    href="shop-single.html"
                    class="h2 text-decoration-none text-dark"
                  >
                    Summer Addides Shoes
                  </a>

                  <p class="card-text">
                    Curabitur ac mi sit amet diam luctus porta. Phasellus
                    pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
                  </p>
                  <ul class="list-unstyled d-flex justify-content-between">
                    <li class="text-muted text-right">Price: $360.00</li>
                  </ul>
                  <a class="text-muted" href="/shop">
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
