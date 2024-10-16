/* BLOCK DE VARIABLES */
document.addEventListener("DOMContentLoaded", () => {
  const spinner = document.getElementById("spinner");
  const tableContainer = document.getElementById("table-container");
  const userTableBody = document.getElementById("userTableBody");
  const pageNumber = document.getElementById("pageNumber");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");
/* CIERRA BLOCK DE VARIABLES */


  let currentPage = 1;  /* Que cargue desde la pag 1 */

  const fetchData = async (page) => {  /* cambié esta parte del enlace para que sólo diga el parámetro "page", así el fetch data va a poder poner una u otra dependiendo de lo que le pida que cargue */
/* mostrar spinner y tabla */

      spinner.style.display = "block";
      tableContainer.style.display = "none";

   /***** Llamada a la API con un json *****/
      const response = await fetch(`https://reqres.in/api/users?delay=3&page=${page}`);
      const data = await response.json(); /* transforma la info de la api a info visible */

/*  Llenar la tabla */
      userTableBody.innerHTML = data.data.map(user => `
          <tr>
              <td>${user.id}</td>
              <td>${user.first_name}</td>
              <td>${user.last_name}</td>
              <td>${user.email}</td>
              <td><img src="${user.avatar}" alt="${user.first_name}" class="rounded-circle" width="50"></td>
          </tr>
      `).join("");

/*      Actualizar la tabla y el spinner */

      spinner.style.display = "none";
      tableContainer.style.display = "block";
      pageNumber.textContent = page;
      prevPage.disabled = page === 1;
      nextPage.disabled = page === 2;  

      /* para que los botones obedezcan! */
      prevPage.onclick = () => {
          if (currentPage > 1) {
              currentPage--;
              fetchData(currentPage);
          }
      };
      
      nextPage.onclick = () => {
          if (currentPage < 2) {
              currentPage++;  /* aquí cargará la segunda página, se vva a volver page=2 al darle click */
              fetchData(currentPage);
          }
      };
  };

 
  fetchData(currentPage);  /* esto carga la primera página */
});