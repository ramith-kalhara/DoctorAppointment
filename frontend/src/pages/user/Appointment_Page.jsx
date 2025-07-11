import React from 'react'

import pageHeaderData from "../../data/pageHeaderData"; 
import PageHeader from '../../components/PageHeader';
import Appointment from '../../components/Appointment';

function Appointment_Page() {
    const pageData = pageHeaderData.find(page => page.page === 'appointment');
  return (
    <div>
        <PageHeader
                title={pageData.title}
                breadcrumbItems={pageData.breadcrumbItems}
                activeBreadcrumb={pageData.activeBreadcrumb}
        />
        <Appointment/>
    </div>
  )
}

export default Appointment_Page