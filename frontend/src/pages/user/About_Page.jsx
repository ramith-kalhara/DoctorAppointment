import React from 'react'



import pageHeaderData from "../../data/pageHeaderData"; 
import About from '../../components/About';
import PageHeader from '../../components/PageHeader';
import Team from '../../components/Team';
import Feature from '../../components/Feature';
const About_Page = () => {
    const pageData = pageHeaderData.find(page => page.page === 'about');
  return (
    <div>
        <div>
      
      
      <PageHeader
        title={pageData.title}
        breadcrumbItems={pageData.breadcrumbItems}
        activeBreadcrumb={pageData.activeBreadcrumb}
      />

      <About/>

      <Feature/>
      <Team limit={4}/>
    
    </div>
    </div>
  )
}

export default About_Page