import '../../../Contents/CSSFiles/AboutMe.css';
import React from 'react';
import {View} from './View.js'
import { Pictures } from './Pictures';
import {useState, useEffect} from 'react';

export const AboutMe = ()=>{
  
  const [schools,setSchools] = useState([]);
  const [noSchoolFound, setNoSchoolFound] =  useState("");
  const [trainings,setTrainings] = useState([]);
  const [hobbies,setHobbies] = useState([]);
  const [noTrainingFound, setNoTrainingFound] =  useState("");
  const [noHobbyFound, setNoHobbyFound] =  useState("");

  // const hobbies = ["Solving coding challenge","Reading books", "Love soccer","love basketball"]
          
   // Get Schools
   useEffect(()=>{
    fetch('http://localhost:3002/schools').then(res =>{
        return res.json();
     })
     .then((data) =>{
        if(data)setSchools(data);
        return
      })
     .catch(err=>{setNoSchoolFound('No school data found. Check of database exist');
                      console.log(err);
    })
   },[]);


   // Get Trainings
   useEffect(()=>{
    fetch('http://localhost:3002/trainings').then(res =>{
        return res.json();
     })
     .then((data) =>{
        if(data)setTrainings(data);
        return
      })
     .catch(err=>{setNoTrainingFound('No school data found. Check of database exist');
                      console.log(err);
    })
   },[]);

   // Get Hobbies
   useEffect(()=>{
    fetch('http://localhost:3002/hobbies')
     .then(res =>{
        return res.json();
     })
     .then((data) =>{
        if(data)setHobbies(data);
        return
      })
     .catch(err=>{setNoHobbyFound('No hobby data found. Check of database exist');
                      console.log(err);
    })
   },[]);
   

return(
  <div  class="body">
   
    {/* Education */}
    <div class="tab">
    <h1>Education</h1>   
    <div class="table">
    <table>
    <thead>
         <tr>
         <th>ID</th>
         <th>Honor</th>
         <th>School</th>
         <th>Course</th>
         <th>Graduation</th>
         </tr>
       </thead>
       <tbody style={{fontSize:'13px'}}> 
       {noSchoolFound ||
                  schools?.map((school,index)=>(               
                     <tr key = {index}>              
                     <th>{index+1}</th>
                     <td>{school.honor}</td>
                     <td>{school.school}</td>
                     <td>{school.course}
                     {school.courselink.length > 0 && <a href={school.courselink}
                         target="blank">{" | "}View
                      </a>}
                     </td> 
                     <td>{school.graduationyear}</td>                                
                     </tr>                   
                  ))}                    
            </tbody>
           </table>  
    </div>
    </div>

     {/* Trainig */}
     <div class="tab">
     <h1>Training</h1> 
    <div class="table">
    <table>
    <thead>
         <tr>
         <th>ID</th>
         <th>Course</th>
         <th>Company</th>
         <th>View certificate</th>
         <th>Year of completion</th>
         </tr>
       </thead>
       <tbody> 

       {noTrainingFound ||
                  trainings?.map((training,index)=>(               
                     <tr key = {index}>              
                     <th>{index+1}</th>
                     <td>
                     <a href={"\""+training.companywebsite.substring[0,training.companywebsite.length-2]+"/"+training.course+"\""} target="blank">
                     {training.course}
                     </a>
                     </td>
                     <td>
                      <div>
                      <h6>{training.company}</h6>
                      {training.companywebsite}
                      </div>
                      </td>
                     <td> <View image={training.certificate} what="View"/></td>
                     <td> {training.year}</td>                                                  
                     </tr>                   
                  ))} 
            </tbody>
           </table>  
  </div>
  </div>

 {/* Hobies */}
 <div class="tab">
     <h1>Hobbies and Sport</h1> 
    <div class="hobbies">
      {noHobbyFound || hobbies?.map((hobby,index)=>(
       <div>
        <strong>{index+1+". "}{hobby.hobby}</strong>
       </div>
      ))}
  </div>
  </div>
  <div>  
  </div>

  <div class="tab">
  <h1>Photos</h1> 
  <div class="photos">
    <Pictures/>
    </div>
    </div>
  </div>
);
}