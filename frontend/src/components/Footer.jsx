import 'owl.carousel/dist/assets/owl.carousel.css'; 
import 'owl.carousel';  
import { Link} from "react-router-dom";
function Footer() {
  return (
    <div>
        {/* Footer Start */}
    <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light mb-4">Address</h5>
            <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />123 Street, New York, USA</p>
            <p className="mb-2"><i className="fa fa-phone-alt me-3" />+012 345 67890</p>
            <p className="mb-2"><i className="fa fa-envelope me-3" />info@example.com</p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-light btn-social rounded-circle" href="#"><i className="fab fa-twitter" /></a>
              <a className="btn btn-outline-light btn-social rounded-circle" href="#"><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-outline-light btn-social rounded-circle" href="#"><i className="fab fa-youtube" /></a>
              <a className="btn btn-outline-light btn-social rounded-circle" href="#"><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light mb-4">Services</h5>
            <a className="btn btn-link" href="#">Cardiology</a>
            <a className="btn btn-link" href="#">Pulmonary</a>
            <a className="btn btn-link" href="#">Neurology</a>
            <a className="btn btn-link" href="#">Orthopedics</a>
            <a className="btn btn-link" href="#">Laboratory</a>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light mb-4">Quick Links</h5>
                   <Link to="/home" className="btn btn-link">Home</Link>
            <Link to="/about" className="btn btn-link">About</Link>
            <Link to="/appointment" className="btn btn-link">Appointment</Link>
            <Link to="/team" className="btn btn-link">Our Doctor</Link>

            <Link to="/contact" className="btn btn-link">Contact</Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light mb-4">Newsletter</h5>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
           
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="row">
         
          
          </div>
        </div>
      </div>
    </div>
    {/* Footer End */}
    </div>
  )
}

export default Footer