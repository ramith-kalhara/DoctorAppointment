
import pageHeaderData from '../../data/pageHeaderData'
import PageHeader from '../../components/PageHeader'

import { useEffect, useState } from "react";

import styles from "../../assets/style/css/tableStyle.module.css";

import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance";
const AppointmentDetails_Page = () => {
  const pageData = pageHeaderData.find(page => page.page === 'appointmentDetails')
    const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const storedUserId = user?.userId;

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);


  useEffect(() => {
    if (userId) {
      console.log("Fetching appointments for User ID:", userId);

      axiosInstance
        .get(`appointment/user/${userId}`) 
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => console.error("Error fetching appointments:", error));
    }
  }, [userId]); 

  const handleDelete = (id) => {
    axiosInstance
      .delete(`appointment/${id}`) 
      .then(() => {
        setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== id));
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };
  const handleUpdateClick = (appointmentId) => {
    navigate(`/updateAppointment/${appointmentId}`);
  };

  // Filter appointments based on doctor name (case-insensitive)
  const filteredAppointments = appointments.filter((appointment) =>
    appointment.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
       <PageHeader
                      title={pageData.title}
                      breadcrumbItems={pageData.breadcrumbItems}
                      activeBreadcrumb={pageData.activeBreadcrumb}
              />

               <div className="container my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Doctor Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
       <table className={styles.table}>
          <thead className={styles["thead-primary"]}>
            <tr>
             
              <th>Date</th>
              <th>Description</th>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Time</th>
              <th>Tp_Num</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
         <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td>{appointment.description}</td>
              <td>{appointment.doctor_name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.time}</td>
              <td>{appointment.tp_num}</td>
              <td>{appointment.name}</td>
              <td>
                <button onClick={() => handleDelete(appointment.id)} className={styles["btn-primary"]}>
                  Delete
                </button>
                <button onClick={() => handleUpdateClick(appointment.id)} className={styles["btn-primary"]}>
                  Update
                </button>
              </td>
            </tr>
          ))}
          {filteredAppointments.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-3">No appointments found for this doctor.</td>
            </tr>
          )}
        </tbody>
        </table>
    </div>
  )
}

export default AppointmentDetails_Page