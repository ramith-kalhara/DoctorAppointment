
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

  return (
    <div>
       <PageHeader
                      title={pageData.title}
                      breadcrumbItems={pageData.breadcrumbItems}
                      activeBreadcrumb={pageData.activeBreadcrumb}
              />
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
            {appointments.map((appointment) => (
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
          </tbody>
        </table>
    </div>
  )
}

export default AppointmentDetails_Page