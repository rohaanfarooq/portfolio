import React, { useEffect, useState } from "react";
import axios from "../axios.js";
function Form(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const res = await axios.get("/projects");
      setProjects(res.data.projects);
    }
    fetchProjects();
  }, []);

  console.log(projects);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div className="form">
      {projects.map((project) => {
        /* const base64String = btoa(
          String.fromCharCode(...new Uint8Array(project.image.data.data))
        ); */
        const base64String = _arrayBufferToBase64(project.image.data.data);

        return (
          <div
            key={project._id}
            style={{
              width: "600px",
              padding: "0.75rem",
              border: "1px solid #333",
              margin: "1rem auto",
            }}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>{project.githubUrl}</p>
            <p>{project.deployUrl}</p>
            <img
              src={`data:image/png;base64, ${base64String}`}
              alt=""
              style={{
                width: "100%",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Form;
