const serverUrl = 'http://localhost:3003';


//inhämta data
document.addEventListener('DOMContentLoaded', function() {
    fetch(`${serverUrl}/workexperience`, {
      method: 'GET'
    }) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Presentera datan i en lista
        const postList = document.getElementById('postList');
        data.forEach(post => {
          const listItem = document.createElement('li');

          //ändrar formattering för datum
          const formattedStartDate = new Date(post.startdate).toISOString().split('T')[0];
          const formattedEndDate = new Date(post.enddate).toISOString().split('T')[0];

          listItem.textContent = `${post.companyname} - ${post.jobtitle}, ${formattedStartDate} - ${formattedEndDate}: ${post.description}`;
                // Skapa radera och ändra knappar för varje post
                const deleteButton = createDeleteButton(post._id);
                const editButton = createEditButton(post._id, post);
                listItem.appendChild(deleteButton);
                listItem.appendChild(editButton);
          
          postList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });

 
  
  
  //funktion för att lägga till arbetserfarenhet till databasen
function addWorkExperience(workExperienceData) {

    //kollar så att fälten är ifyllda
    for (const key in workExperienceData) {
      if (!workExperienceData[key]) {
        alert('Fyll i alla fält!');
        return;
      }
    }
  
    fetch(`${serverUrl}/workexperience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workExperienceData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add work experience');
      }
      return response.json();
    })
    .then(data => {
      console.log('Work experience added:', data);
  
      alert('Data tillagd!');
      resetFormFields();
    })
    .catch(error => {
      console.error('Error adding work experience:', error);
    });
  }
  
  function resetFormFields() {
    document.getElementById("workExperienceForm").reset();
  }
  
  // Funktion för att validera formuläret och visa felmeddelanden
  function validateFormAndDisplayErrors(formData) {
    // Objekt för att hålla reda på felmeddelanden
    const errors = {};
  
    // Validera varje fält
    if (!formData.companyname) {
      errors.companyname = "Fyll i företagets namn";
    }
    if (!formData.jobtitle) {
      errors.jobtitle = "Fyll i jobbtiteln";
    }
    if (!formData.location) {
      errors.location = "Fyll i platsen";
    }
    if (!formData.startdate) {
      errors.startdate = "Fyll i startdatum";
    }
    if (!formData.enddate) {
      errors.enddate = "Fyll i slutdatum";
    }
    if (!formData.description) {
      errors.description = "Fyll i beskrivningen";
    }
  
    // Visa felmeddelanden på skärmen
    for (const key in errors) {
      const errorMessage = errors[key];
      document.getElementById(`${key}Error`).textContent = errorMessage;
    }
  
    // Returnera true om det inte finns några fel, annars false
    return Object.keys(errors).length === 0;
  }
  
  //eventlistener till formuläret
  document.getElementById('workExperienceForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    //inhämtar formulärdata
    const formData = {
      companyname: document.getElementById('companyname').value,
      jobtitle: document.getElementById('jobtitle').value,
      location: document.getElementById('location').value,
      startdate: document.getElementById('startdate').value,
      enddate: document.getElementById('enddate').value,
      description: document.getElementById('description').value
    };
  
    //validera formulärdata och visa felmeddelanden
    if (validateFormAndDisplayErrors(formData)) {
      //lägg till data om fälten är ifyllda
      addWorkExperience(formData);
    }
  });

  
//skapar raderaknapp
function createDeleteButton(workExperienceId) {
  console.log('workExperienceId:', workExperienceId);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Radera';
  deleteButton.addEventListener('click', function() {
    //visa bekräftelseruta
    const confirmed = confirm("Är du säker på att du vill radera posten?");
    if (confirmed) {
      deleteWorkExperience(workExperienceId);
    }
  });
  return deleteButton;
}

function deleteWorkExperience(workExperienceId) {
  if (!workExperienceId) {
    console.error('workExperienceId is undefined');
    return;
  }

  fetch(`${serverUrl}/workexperience/${workExperienceId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete work experience');
    }
    console.log('Work experience deleted successfully');
    //ladda om sidan efter att posten har raderats
    window.location.reload();
  })
  .catch(error => {
    console.error('Error deleting work experience:', error);
  });
}
  

    //skapar ändraknapp
    function createEditButton(workExperienceId, formData) {
      const editButton = document.createElement('button');
      editButton.textContent = 'Ändra';
      editButton.addEventListener('click', function() {
        console.log('Redigera post med ID:', workExperienceId);
        console.log('Formulärdata:', formData);
      });
      return editButton;
    }
  
  