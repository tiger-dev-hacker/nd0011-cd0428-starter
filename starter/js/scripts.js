const css_head_link = document.querySelectorAll("link");

css_head_link[0].href = "../css/normalize.css";

css_head_link[1].href = "../css/styles.css";

//Get information for the about me section
const getAboutMeSection = async () => {
  try {
    const fragment = document.createDocumentFragment();

    const responseData = await fetch("../data/aboutMeData.json");
    const aboutMeData = await responseData.json();

    const aboutMeContainer = document.querySelector("#aboutMeContainer");

    const aboutMeParent = document.querySelector("#aboutMe");

    const bio_data = document.createElement("p");
    bio_data.textContent = aboutMeData.aboutMe;

    aboutMeParent.append(bio_data);

    const headshotContainer = document.createElement("div");
    const headshotImage = document.createElement("img");

    headshotImage.src = aboutMeData.headshot;
    headshotImage.alt = "This is the image of the developer";

    headshotContainer.append(headshotImage);

    aboutMeParent.append(headshotContainer);

    fragment.append(aboutMeParent);

    aboutMeContainer.append(fragment);
  } catch (error) {
    console.error(error);
  }
};

const getProjectsList = async() => {
    try{
          const rawProjectInfoList = await fetch("../data/projectsData.json");
          const projectInfoList = await rawProjectInfoList.json();  
          return projectInfoList;
    }
    catch(error)
    {
        console.error(error);
        return []; 
    }
}

const getProjectsSection = async () => {
  try {
    const projectInfoList = await getProjectsList();

    const fragment = document.createDocumentFragment();

    const projectList = document.querySelector("#projectList");
    projectInfoList.forEach((projectInfo) => {
      const {
        project_id = "project_personal",
        project_name = "Personal Website",
        short_description = "Showcase your skills and projects.",
        long_description = "Build a website to highlight your programming abilities, experience, and portfolio. This is a great way to showcase your work to potential employers.",
        card_image = "../images/card_placeholder_bg.webp",
        spotlight_image = "../images/spotlight_placeholder_bg.webp",
        url = "https://example.com/project1",
      } = projectInfo;
      const projectCard = document.createElement("div");
      projectCard.classList.add("projectCard");
      projectCard.style.backgroundImage = `url(${card_image})`;
      projectCard_title = document.createElement("h4");
      projectCard_title.textContent = project_name;
      projectCard.append(projectCard_title);
      projectCard_description = document.createElement("p");
      projectCard_description.textContent = short_description;
      projectCard.append(projectCard_description);
      projectCard.id = project_id;
      fragment.append(projectCard);
    });
    
    projectList.append(fragment);
    projectList.addEventListener('pointerdown', changeSpotLightTiles); 
  } catch (error) {
    console.error(error);
  }
};

const createSpotLightTitles = async() => {
    try{  
        const fragment = document.createDocumentFragment(); 

        const project_parent_section = document.querySelector('#projectSection'); 
        const projectSpotlight = document.querySelector('#projectSpotlight'); 
        const spotLightTitles = document.querySelector('#spotlightTitles'); 

        const projectInfoList = await getProjectsList(); 

        projectSpotlight.style.backgroundImage = `url(${projectInfoList[0].spotlight_image})`;

        const spotlightTitles_heading = document.createElement('h3'); 
        const spotlightTitles_description = document.createElement('p');
        const spotlightTitles_url = document.createElement('a');

        spotlightTitles_heading.textContent = projectInfoList[0].project_name;
        spotlightTitles_description.textContent = projectInfoList[0].long_description;
        spotlightTitles_url.textContent = "Click here to learn more ..."; 
        spotlightTitles_url.href = projectInfoList[0].url; 

        spotLightTitles.append(spotlightTitles_heading,spotlightTitles_description, spotlightTitles_url); 
        projectSpotlight.append(spotLightTitles);
        fragment.append(projectSpotlight);
        project_parent_section.append(fragment); 
        

    }
    catch(error)
    {
        console.error(error); 
    }
}
const getInfoFromProjectList = async(project_id) => {
    const projectInfoList = await getProjectsList(); 
    let info_Object; 
    projectInfoList.forEach((projectInfo) => {
        if(projectInfo.project_id === project_id)
        {
             info_Object = {
                "spotlight_image" : projectInfo.spotlight_image,
                "project_name" : projectInfo.project_name,
                "long_description" : projectInfo.long_description,
                "url" : projectInfo.url
            }
        }
    })
    return info_Object; 
}

const changeSpotLightTiles = async(event) => {
    console.log("Change spotlight called\n"); 
    const project_id = event.target.closest('.projectCard').id;
    console.log(project_id); 


    const {spotlight_image, project_name, long_description, url} = await getInfoFromProjectList(project_id);
    console.log(spotlight_image); 
    console.log(project_name); 
    console.log(long_description); 
    console.log(url); 

    const projectSpotlight = document.querySelector('#projectSpotlight'); 
    const spotLightTitles = document.querySelector('#spotlightTitles'); 

    projectSpotlight.style.backgroundImage = `url(${spotlight_image ?? '../images/spotlight_placeholder_bg.webp'})`;
    console.log("Setting background to.."); 

    spotLightTitles.innerHTML = ""; 

    const spotlightTitles_heading = document.createElement('h3'); 
    spotlightTitles_heading.textContent = project_name;

    const spotlightTitles_description = document.createElement('p');
    spotlightTitles_description.textContent = long_description;

    const spotlightTitles_url = document.createElement('a');
    spotlightTitles_url.textContent = "Click here to learn more ..."; 

    spotlightTitles_url.href = url; 
    spotLightTitles.append(spotlightTitles_heading,spotlightTitles_description, spotlightTitles_url); 
    
    
}

getAboutMeSection();
createSpotLightTitles(); 
getProjectsSection();
