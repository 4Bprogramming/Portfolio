import React from "react";
import * as C from "./styles";
import { MdMessage } from "react-icons/md";
//import {handleCreateChat2} from '../SidebarHeader/index'
import { auth, db } from "../../services/firebase";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Default4b from "../Default copy";
const getUser = (users, userLogged) =>
  users?.filter((user) => user !== userLogged?.email)[0];

const Default = () => {
  const [user] = useAuthState(auth);
  const users = [user.email, "4b.programming@gmail.com"];
 if (user.email==="4b.programming@gmail.com"){
  return <Default4b/>
 }
  let getUserItem
  let refChat2
  let chatsSnapshot2
console.log('HOLADEAFAULT');
  

  function Busqueda(algo) {
    return useCollection(algo);
  }
  if (user.email !== "4b.programming@gmail.com") {
    console.log('USERS.30=>',user);
    //   [getUserItem] = Busqueda(
    //   db.collection("users").where("email", "==",user.email)
    // );
     refChat2 = db
      .collection("chats")
      .where("users", "array-contains", user.email);
   [chatsSnapshot2] = Busqueda(refChat2);
  }
 
  
  const handleCreateChat2 = () => {
    const emailInput = "4b.programming@gmail.com";
    
    if (!emailInput) return;
    
    if (!EmailValidator.validate(emailInput)) {
      return alert("E-mail inválido!");
    } else if (emailInput === user.email) {
      return alert("Insira um e-mail diferente do seu!");
    }
    
    db.collection("chats").add({
      users: [user.email, emailInput],
    });
  };
  
  let veremos= chatsSnapshot2?.docs.length
  console.log("VEREMOOOOOOOSSS", veremos);
  
  return (
    <C.Container>
      {/* <MdMessage /> */}

      <div>
        
         {
          veremos>0?
          <div>  <C.Info style={{ color: "black" }}>Conversemos</C.Info>
          </div>:
          <div>
            <C.Title style={{ color: "black" }}>Chat 4B</C.Title>
            <C.Info style={{ color: "black" }}>Click en el Logo para conversar.</C.Info>
            <MdMessage onClick={handleCreateChat2} />

          </div>

         }
         
         
        
         </div>
    </C.Container>
  );
};

export default Default;

// const getUser = (users, userLogged) =>
// users?.filter((user) => user !== userLogged?.email)[0];

// const Default = () => {
//   const [user] = useAuthState(auth);
//   const users=[user.email, '4b.programming@gmail.com']
//   console.log('usersDefault', users)

//   const [getUserItem] = useCollection(
//     db.collection("users").where("email", "==", getUser(users, user))
//     );
//
//   const refChat2 = db
//     .collection("chats")
//     .where(user.uid, "array-contains", '4b.programming@gmail.com');
//   const [chatsSnapshot2] = useCollection(refChat2);

//   const handleCreateChat2 = () => {
//     const emailInput = "4b.programming@gmail.com";

//     if (!emailInput) return;

//     if (!EmailValidator.validate(emailInput)) {
//       return alert("E-mail inválido!");
//     } else if (emailInput === user.email) {
//       return alert("Insira um e-mail diferente do seu!");
//     }

//     db.collection("chats").add({
//       users: [user.email, emailInput],
//     });
//   };
//   const refChat3 = db
//     .collection("chats")
//     .where("users", "array-contains", user.email);
//   const [chatsSnapshot3] = useCollection(refChat3);
// console.log(chatsSnapshot2 ,"ver que trae2")
// console.log(chatsSnapshot3 ,"ver que trae3")
// console.log("getUserItemsDEfault", getUserItem ,)

//   return (
//     <C.Container>
//       {
//         chatsSnapshot2?.docs.length!==0 ?
//         <div>
//           <MdMessage />
//           <C.Title style={{ color: "black" }}>Chat 4B</C.Title>
//           <C.Info style={{ color: "black" }}>Ahora podrás enviar mensajes.</C.Info>
//         </div>:
//         <div>
//           <C.Title style={{ color: "black" }}>Chat 4B</C.Title>
//           <C.Info style={{ color: "black" }}>Click en el Logo para conversar.</C.Info>
//         <MdMessage onClick={handleCreateChat2} />
//         </div>

//       }
//     </C.Container>
//   );
// };

// export default Default;
