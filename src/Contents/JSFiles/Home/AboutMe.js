import '../../../Contents/CSSFiles/AboutMe.css';
import React from 'react';
import {View} from './View.js'
import {Pictures} from './Pictures';
import {useState, useEffect} from 'react';
import axios from 'axios';

export const AboutMe = () => {

    const [schools,
        setSchools] = useState([]);
    const [noSchoolFound,
        setNoSchoolFound] = useState("");
    const [trainings,
        setTrainings] = useState([]);
    const [hobbies,
        setHobbies] = useState([]);
    const [noTrainingFound,
        setNoTrainingFound] = useState("");
    const [noHobbyFound,
        setNoHobbyFound] = useState("");

    let url = "https://www.google.com/search?q="

    // Get Schools
    useEffect(() => {
        axios(`${process.env.REACT_APP_URL}/schools`).then((res) => {
            if (res) 
                setSchools(res.data);
            return
        }).catch(err => {

            setNoSchoolFound('No school data found. Check of database exist or call the admin on: +44775177648' +
                    '3');

        })
    }, []);

    // Get Trainings
    useEffect(() => {
        axios(`${process.env.REACT_APP_URL}/trainings`).then((res) => {
            if (res) 
                setTrainings(res.data);
            return
        }).catch(err => {
            setNoTrainingFound('No training data found. Check of database exist or call the admin on: +447751776' +
                    '483');

        })
    }, []);

    // Get Hobbies
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/hobbies`).then((res) => {
            if (res) 
                setHobbies(res.data);
            return
        }).catch(err => {
            setNoHobbyFound('No hobby data found. Check of database exist or call the admin on: +447751776483');

        })
    }, []);

    return (
        <div class="body">

            {/* Education */}
            <div class="tab">
                <h1 class="shadow rounded">Education</h1>
                <div class="table shadow rounded">
                    <table class="shadow rounded">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Honor</th>
                                <th>School</th>
                                <th>Course</th>
                                <th>Graduation</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            {noSchoolFound || schools
                                ?.map((school, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{school.honor}</td>
                                        <td>{school.school}</td>
                                        <td>{school.course} {school.courselink.length > 0 && <a href={school.courselink} target="blank">{" | "}View
                                            </a>}
                                        </td>
                                        <td>{school.graduationyear}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Trainninig */}
            <div class="tab">
                <h1 class="shadow rounded">Training</h1>
                <div class="table shadow rounded">
                    <table class="shadow rounded">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Course</th>
                                <th>Company</th>
                                <th>View certificate</th>
                                <th>Year of completion</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">

                            {noTrainingFound || trainings
                                ?.map((training, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            {training.course}
                                        </td>
                                        <td>
                                            <a href={url + training.company}>{training.company}</a>
                                        </td>
                                        <td>
                                            <a href='#'><View
                                                item = {`${process.env.REACT_APP_URL}/certificates/` + training.certificate}
                                                what="View"/></a>
                                        </td>
                                        <td>
                                            {training.year}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hobies */}
            <div class="tab">
                <h1 class="shadow rounded">Hobbies and Sport</h1>
                <div class="hobbies shadow rounded">
                    {noHobbyFound || hobbies
                        ?.map((hobby, index) => (
                            <div>
                                <strong>{index + 1 + ". "}{hobby.hobby}</strong>
                            </div>
                        ))}
                </div>
            </div>
            <div></div>

            <div class="tab">
                <h1 class="shadow rounded">Photos</h1>
                <div class="photos shadow rounded">
                    <Pictures/>
                </div>
            </div>
        </div>
    );
}