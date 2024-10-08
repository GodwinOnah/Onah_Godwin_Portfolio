import React from 'react';
import '../../../Contents/CSSFiles/Skills.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

export const Skills = () => {

    let url = "https://www.google.com/search?q="

    const [skills,
        setSkills] = useState(null);
    const [noSkillFound,
        setNoSkillFound] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/skills`).then((res) => {
            if (res) 
                setSkills(res.data);
            return
        }).catch(err => {
            setNoSkillFound("No Skill found. Admin check if database exist");
            console.log(err);
        })
    }, []);

    return (
        <div class="skills">
            {noSkillFound || skills
                ?.map((skill, index) => (
                    <div
                        key={index}
                        style={{
                        margin: "10px",
                        cursor: "pointer"
                    }}>
                        {index + 1 + ". "}
                        <strong>
                            <a class="skills-a" href={url+skill.skill} target="blank">
                                {skill.skill}
                                <img src={`https://skillicons.dev/icons?i=${skill.skill.toLowerCase()}`}/>
                            </a>
                        </strong>
                    </div>
                ))}
        </div>
    )

}