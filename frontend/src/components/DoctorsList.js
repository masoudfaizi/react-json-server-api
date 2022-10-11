import React, {useState} from "react";
import DoctorCard from "./DoctorCard";
import { Pagination } from "./Pagination";

import { useForm } from "react-hook-form";



const DoctorsList = (props) => {
   
    //Hooks variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(3);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const allRecords = props.doctors;
    console.log("Rest: ", allRecords);
    const currentPosts = allRecords.slice(firstPostIndex, lastPostIndex);

    //Component for displaying the records in body of table
    const renderDoctorList = currentPosts.map((doctor) => {
        return ( 
            <DoctorCard 
                doctor={doctor} 
                key={doctor.id} 
            />  
        );
    });
      
    
     //Form validation
     const { register, handleSubmit, formState: { errors } } = useForm();
        

    //Search form event (function)
    const getSearchTerm = ( data) => {
        
        //Calling the 'searchKeywords' props from DoctorList component
        props.searchKeyword(data);
        

    };
    return(
        <div className="main" style = {{marginTop:"50px"}}>
            <div className="ui huge form">

            <h2>Search Doctors</h2>   
            <form className="ui form" onSubmit={handleSubmit(getSearchTerm)}>
                
                <div className="ui huge form">
                    <div className="two fields">
                        <div className="field">
                            <label>City</label>
                            <input 
                                type="text" 
                                placeholder="City"
                                {...register("city", { required: true})}
                            />
                             {errors.city && <p style={{color: 'red'}}>Please check the City</p>}
                        </div>
                       
                        <div className="field">
                            <label>Facility</label>
                            <input 
                                type="text" 
                                placeholder="Facility"
                                {...register("facility", { required: true})}
                            />

                            {errors.facility && <p style={{color: 'red'}}>Please check the Facility</p>}
                        </div>
                       
                        <div className="field">
                            <label>Area of Expertise</label>
                            <input 
                                type="text" 
                                placeholder="Area of Expertise"
                                {...register("area_of_expertise", { required: true})}
                            />

                            {errors.area_of_expertise && <p style={{color: 'red'}}>Please check the Area of Expertise</p>}
                        </div>
                        
                    </div>
                    <button className="ui button blue">Search...</button>
                </div>
            </form>
            </div>
            
            <div className="ui celled list">


                <table className="ui celled padded table">
                    <thead>
                        <tr><th className="single line">First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Area of Expertise</th>
                        <th>Facility</th>
                    </tr></thead>
                    <tbody>

                        {renderDoctorList.length>0 
                            ? renderDoctorList 
                            : "No Records Available..."
                        } 
                    </tbody>
                    
                      
                    <Pagination 
                        totalPosts={props.doctors.length}
                        postPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                    />
                          
                </table>          
            </div>
        </div> 
    );
};

export default DoctorsList;