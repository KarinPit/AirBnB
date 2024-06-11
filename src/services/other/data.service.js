export const fetchImages = () => {
    return fetch("/assets/img/filter-category/filter.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
      });
  };