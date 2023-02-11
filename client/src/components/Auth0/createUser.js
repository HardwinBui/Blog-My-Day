import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

const CreateUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [userList, setUsers] = useState([]);
  const [userInfo, setUser] = useState({
    user: "",
    blogs: [],
    followed_blogs: [],
    date_created: new Date(),
    date_modified: null,
  });
  var addedUser = false;
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    async function CheckUser() {
      const userResponse = await fetch(`https://blogmydaybackend.onrender.com/user/`);

      if (!userResponse.ok) {
        const message = `An error occurred: ${userResponse.statusText}`;
        window.alert(message);
        return;
      }

      var users = await userResponse.json().then(async response => {
        setUsers(response);
        setLoad(true);
      });

      // Check if user is in user datebase, if not then add them in
      if (isAuthenticated && !addedUser && loaded) {
        var foundUser = false;
        for (var i = 0; i < userList.length; i++) {
          if (userList[i].user === user.nickname) {
            foundUser = true;
            break;
          }
        }

        if (!foundUser) {
          addedUser = true;
          userInfo.user = user.nickname;
          const newUser = { ...userInfo };

          await fetch("https://blogmydaybackend.onrender.com/user/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .catch(error => {
              window.alert(error);
              return;
            });
        }
      }
    }

    CheckUser();
  }, [isAuthenticated, userList.length, loaded]);

  return (
    isAuthenticated && (
      <></>
    )
  );
};

export default CreateUser;