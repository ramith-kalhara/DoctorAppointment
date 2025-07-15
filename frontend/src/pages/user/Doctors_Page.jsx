import React from 'react'
import { useLocation } from 'react-router-dom';
import pageHeaderData from "../../data/pageHeaderData"; 
import PageHeader from '../../components/PageHeader';
import Team from '../../components/Team';
const Doctors_Page = () => {
    const pageData = pageHeaderData.find(page => page.page === 'doctor');

    // Read query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const departmentQuery = queryParams.get('department');
  return (
    <div>
        <PageHeader
                title={pageData.title}
                breadcrumbItems={pageData.breadcrumbItems}
                activeBreadcrumb={pageData.activeBreadcrumb}
        />
  <Team initialSearch={departmentQuery || ''} />

    </div>
  )
}

export default Doctors_Page