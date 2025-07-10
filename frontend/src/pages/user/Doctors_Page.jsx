import React from 'react'

import pageHeaderData from "../../data/pageHeaderData"; 
import PageHeader from '../../components/PageHeader';
import Team from '../../components/Team';
const Doctors_Page = () => {
    const pageData = pageHeaderData.find(page => page.page === 'doctor');
  return (
    <div>
        <PageHeader
                title={pageData.title}
                breadcrumbItems={pageData.breadcrumbItems}
                activeBreadcrumb={pageData.activeBreadcrumb}
        />
        <Team/>

    </div>
  )
}

export default Doctors_Page