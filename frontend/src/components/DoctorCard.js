import React from "react";

const DoctorCard = (props) => {
    
    return (
        
            
           
            <tr>
                <td>
                    {props.doctor.first_name}
                </td>
                <td>
                    {props.doctor.last_name}
                </td>
                <td>
                    {props.doctor.email}
                </td>
                <td>
                    {props.doctor.city}
                </td>
                <td>
                    {props.doctor.area_of_expertise}
                </td>
                <td>
                    {props.doctor.facility}
                </td>
            </tr>




                
               
    );
};

export default DoctorCard;