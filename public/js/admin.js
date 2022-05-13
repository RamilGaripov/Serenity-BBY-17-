//creates the dashboard table and populates it with data received from the app.get("/get-accounts") method on the server side. This is function declaration. The function is called at the bottom of this file!
async function getAccounts() {
    try {
        let response = await fetch("/get-accounts", {
            method: "GET"
        });

        //ATTRIBUTION: 
        //This table creation code is taken from the examples of our COMP2537 professor, Mr. Arron Ferguson. 
        //RDBMS-CRUD MySQL example. 

        if (response.status === 200) {
            const data = await response.json();
            // console.log("the data: ", data);
            let str = `<tr>
                <th class="id_header"><span>ID</span></th>
                <th class="first_name_header"><span>First Name</span></th>
                <th class="last_name_header"><span>Last Name</span></th>
                <th class="email_header"><span>Email</span></th>
                <th class="edit_header"></th>
                <th class="delete_header"></th>
                </tr>`;

            for (let i = 0; i < data.rows.length; i++) {
                let row = data.rows[i];
                //console.log("row", row);
                str += ("<tr><td class='id'>" + row.id +
                    "</td><td class='first_name'>" + row.first_name +
                    "</td><td class='last_name'>" + row.last_name +
                    "</td><td class='email'>" + row.email +
                    "</td><td class='edit'>" + "<button type='submit' class='edit_user'>Edit</button>" +
                    "</td><td class='delete'>" + "<button type='submit' class='delete_user'>Delete</button>" +
                    "</td></tr>");
                // id_array.push(row)
            }

            //provides EDIT BUTTON functionality 
            document.getElementById("accounts").innerHTML = str;
            const edits = document.getElementsByClassName("edit_user");
            for (let j = 0; j < edits.length; j++) {
                edits[j].addEventListener("click", function (e) {
                    e.preventDefault();
                    console.log("Let's edit the user with id", data.rows[j].id);
                    //When calling this function, we're passing a JSON object in the parameters, using {key : value} format.
                    editUser({
                        id: data.rows[j].id
                    });
                })
            }

            //provides DELETE BUTTON functionality 
            const deletes = document.getElementsByClassName("delete_user");
            for (let k = 0; k < deletes.length; k++) {
                deletes[k].addEventListener("click", function (e) {
                    e.preventDefault();
                    if (confirm("Delete " + data.rows[k].first_name + " " + data.rows[k].last_name + "'s account?")) {
                        console.log("Let's delete the user with id", data.rows[k].id);
                        deleteUser({
                            id: data.rows[k].id
                        });
                    }
                });
            }
        } else {
            console.log(response.status);
        }

    } catch (error) {
        console.log(error);
    }
}

//sends id of the user to the server. Redirects to the edit.html
async function editUser(data) {
    try {
        // console.log("Edit user activated.");
        // console.log(data);
        const response = await fetch("/edit-user", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        let parsedJSON = await response.json();
        if (parsedJSON.status == "fail") {
            console.log("Couldn't edit this user's info.");
        } else {
            window.location.replace("/edit");
        }
    } catch (err) {
        console.log(err);
    }
}

//deletes the user from the db and refreshes the page
async function deleteUser(data) {
    try {
        // console.log("Delete user activated");
        // console.log(data);

        const response = await fetch("/delete-user", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        let parsedJSON = await response.json();
        if (parsedJSON.status == "fail") {
            console.log("Cannot delete this user.");
        } else {
            console.log("User deleted.")
            getAccounts();
        }

    } catch (err) {
        console.log(err);
    }
}

getAccounts();