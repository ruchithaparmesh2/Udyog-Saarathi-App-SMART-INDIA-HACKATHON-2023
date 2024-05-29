import "./Card.css";
import { MdOutlineEventSeat } from "react-icons/md";
const Card = ({
  _id,
  img,
  organisation,
  cat,
  post,
  vacancies,
  link,
  appLink,
  lastDate,
}) => {
  return (
    <>
      <div
        className="job-item p-4 mb-4 card shadow-lg p-3 mb-5 bg-white rounded"
        key={_id}
      >
        <div className="card-body">
          <div className="row g-4">
            <div className="col-sm-12 col-md-8 d-flex align-items-center">
              <img
                className="flex-shrink-0 img-fluid border rounded"
                src={img}
                alt=""
                style={{ width: "80px", height: "80px" }}
              />
              <div className="text-start ps-4">
                <h3 className="mb-3 font-weight-bold">{organisation}</h3>
                <p className="lead">{post}</p>
                <span className="text-truncate me-3">
                  <i className="far fa-clock text-primary me-2"></i>
                  {cat}
                </span>
                <span className="text-truncate me-3">
                  <MdOutlineEventSeat className="me-2" />
                  {vacancies} Vacancies
                </span>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
              <div className="d-flex mb-3">
                <a className="btn btn-success m-2" href={link}>
                  Get Details
                </a>
                <a className="btn btn-danger m-2" href={appLink}>
                  Apply link
                </a>
              </div>
              <small className="text-truncate">
                <i className="far fa-calendar-alt text-primary me-2"></i>
                Last Date: {lastDate.split("-").reverse().join("-")}
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
