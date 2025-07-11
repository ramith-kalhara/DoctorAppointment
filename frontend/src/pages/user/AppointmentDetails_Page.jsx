import React from 'react'
import AppointmentTable from '../../components/AppointmentsTable'
import pageHeaderData from '../../data/pageHeaderData'
import PageHeader from '../../components/PageHeader'


const AppointmentDetails_Page = () => {
  const pageData = pageHeaderData.find(page => page.page === 'appointmentDetails')
  return (
    <div>
       <PageHeader
                      title={pageData.title}
                      breadcrumbItems={pageData.breadcrumbItems}
                      activeBreadcrumb={pageData.activeBreadcrumb}
              />
        <AppointmentTable/>
    </div>
  )
}

export default AppointmentDetails_Page