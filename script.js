const serverUrl = 'http://localhost:3003';

// hämta in workexperience 
/*
async function fetchWorkExperiences() {
    try {
        const response = await fetch(`${serverUrl}/workexperience`);
        if (!response.ok) {
            throw new Error('Failed to fetch work experiences');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching work experiences:', error);
        return [];
    }
}
*/

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
          listItem.textContent = `${post.companyname} - ${post.jobtitle}, ${post.startdate}, ${post.enddate}: ${post.description}`;

          
          postList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });