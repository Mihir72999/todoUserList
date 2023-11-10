import { useEffect, useState } from 'react';
import './App.css';
import {useDeleteUserMutation , useUpdateUserMutation, usePostUserMutation} from './redux/userAddapter';
import { useDispatch, useSelector } from 'react-redux';
import { allUserData} from './redux/userReducer';
import CircleLoader	from "react-spinners/CircleLoader";
import { AiOutlineDelete} from 'react-icons/ai'
import {LiaEdit} from 'react-icons/lia'





function App() {
const [name ,setName]  = useState("")
const [email , setEmail] = useState("")
const [password,setPassword] = useState("")
const [userName , setUserName] = useState("")
const [userEmail , setUserEmail] = useState("")
const [update , setUpdate] = useState({
  upsertName:'' ,
  upsertPassword:'',
  upsertEmail:''})
const [openModal , setOpenModal] = useState(false)
const [deleteModal ,setDeleteModal] = useState(false)
const [deletePassword , setDeletePassword] = useState("")

const dispatch = useDispatch()
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

// get state of user's name and email
const handleName = e => setName(e.target.value)
const handleEmail = e => setEmail(e.target.value)
const handlePassword = e =>setPassword(e.target.value)
//get user data from database in to do list
const { allUser:user , isLoading , isError} = useSelector(state=>state.user)

const [postUser,{isError:onError , error} ] = usePostUserMutation()

// create user in to do list
const handleSubmit = async(e) =>{
 
  e.preventDefault()
 await postUser({name, email , password})
 
 setEmail("")
 setName("")
 setPassword("") 
 dispatch(allUserData())
}

//to delete user from to do list
const [deleteUser , {isError:getDeleteError ,error:deleteError}] = useDeleteUserMutation()
const handleDelete = async()=>{
  await deleteUser({password:deletePassword})
  dispatch(allUserData())
  setDeletePassword("")
  setDeleteModal(false)
}

//to open the modal for update user
const handleOpenModal = (usersName , usersEmail) =>{
  setOpenModal(true)
 setUserEmail(usersEmail)
  setUserName(usersName)
}

//update the userData 
const [updateUser , {isError:getUpdateError , error:updateError}] = useUpdateUserMutation()
const handleUpdateUser = async() =>{
  try{

 await updateUser({
        name:update.upsertName || userName,
    email:update.upsertEmail || userEmail,
    password:update.upsertPassword
  })
 
  
 dispatch(allUserData())
 setUpdate({...update,upsertName:'' , upsertEmail:'' , upsertPassword:''})
 
 setOpenModal(false)
}catch(err){
  alert(err.message)
}
}

// handle open delete modal
const handleDeleteModal = () =>{
  setDeleteModal(true)
 
}
// get data when page load
useEffect(()=>{

  dispatch(allUserData())
},[ dispatch])
if(isLoading){
  return  <CircleLoader	
  color={'blue'}
  loading={isLoading}
  cssOverride={override}
  size={50}
  aria-label="Loading Spinner"
  data-testid="loader"
/>

}

if(isError){
  return <div>went something wrong</div>
}
  return (
    <>
       
    <div className="App my-5">
        <p >welcome to our test monngodb-atlas app services</p>
       {onError && <div className='text-center text-red-600 font-semibold' aria-live='assertive'>{error?.message}</div>}
       {getDeleteError && <div className='text-center text-red-600 font-semibold' aria-live='assertive'>{deleteError?.message}</div>}
       {getUpdateError && <div className='text-center text-red-600 font-semibold ' aria-live='assertive'>{updateError?.message}</div>}

         {/* form to create user data  */}
        <div  className="space-y-6 w-fit mx-auto">
            <div className='w-[230px]'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                value={email}
                onChange={handleEmail}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
               enter your name
              </label>          
              <div className="mt-2">
               <input
                value={name}
                onChange={handleName}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
               enter your password
              </label>          
              <div className="mt-2">
                <input
                value={password}
                onChange={handlePassword}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md disabled:bg-indigo-300 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
                disabled={email.length < 10 || name.length < 3 || password.length < 3}
              >
                Add To do
              </button>
            </div>
          </div>
          {/* complete todo form */}

          {/* create user List table */}
          {user?.length && <table  className='w-[25%] mx-auto lg:scale-100 scale-90  my-10'>
            <thead >
             <tr>
              <th className='border border-gray-700 px-3 py-2'>name</th>
              <th className='border border-gray-700 px-3 py-2'>email</th>
              <th className='border border-gray-700 px-3 py-2'>edit</th>
              <th className='border border-gray-700 px-3 py-2'>delete</th>
              </tr> 
            </thead>
              <tbody>
              {user && user.map(users=>{
                return <tr key={users.id}>
                  <td className='border border-gray-700 px-3 py-2'>{users.name}</td>
                  <td className='border border-gray-700 px-3 py-2'>{users.email}</td>
                  <td onClick={()=>handleOpenModal(users.name , users.email)} className='border border-gray-700 px-3 py-2'><LiaEdit/></td>
                  <td onClick={handleDeleteModal} className='border border-gray-700 px-3 py-2'><AiOutlineDelete/></td>
                </tr>
              })}   
            </tbody>
           </table>
        }
        {!user.length && <div className='flex justify-center'>no user available</div>}       
            {/* end table */}
 
    {/* open the modal to update userData  */}
   {openModal && <div className='fixed  w-[300px] left-12 top-10 lg:left-[42%] my-9 text-center bg-zinc-200 text-gray-700'>
    <button className='absolute right-1 ' onClick={()=>setOpenModal(false)} >X</button>
      <div>update the user</div>
      <div className='flex flex-col text-left px-3 my-3 py-2'>
      <label className='py-2'>name</label>
      <input type='text' value={update.upsertName.length ? update.upsertName : userName} name='name' onChange={(e)=>setUpdate({...update, upsertName:e.target.value})} className='py-2 px-2' placeholder='jhon doe' />
      <label className='py-2'>enter your email</label>
      <input type='email' name='email' value={update.upsertEmail.length ? update.upsertEmail : userEmail } onChange={(e)=>setUpdate({...update , upsertEmail:e.target.value})} className='py-2 px-2' placeholder='example@gmail.com' />
      <label className='py-2'>enter your password</label>
      <input type='password' name='password' value={update.upsertPassword} onChange={(e)=>setUpdate({...update , upsertPassword:e.target.value})} className='py-2 px-2' placeholder='********' />
   
      </div>
      <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleUpdateUser}
              >
                update User
              </button>
    </div>}
    {/* close update modal  */}

    {/* open delete user modal  */}
    {deleteModal && <div className='fixed right-0 top-0 left-0 bottom-0 bg-slate-100 '>
    <div className='flex flex-col w-[200px] justify-center mx-auto  bg-zinc-200 text-left px-3 my-[200px] py-2'>
    <button className='relative ' onClick={()=>setDeleteModal(false)} >X</button>
    <label className='py-2'>enter your password</label>
    <input type='password' name='password' value={deletePassword} onChange={(e)=>setDeletePassword(e.target.value)} className='py-2 px-2' placeholder='********' />
     <button className='bg-sky-600 text-white w-full my-3 py-3 rounded-md' onClick={handleDelete}>delete todo</button>
      </div>
      </div>}
    {/* close delete user modal */}

    </div>
    </>
  );
}

export default App;
