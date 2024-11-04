import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader

} from "@/components/ui/dialog"

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc"
import axios from 'axios';



function Header() {
  const [openDialog, setOpenDialog] = useState(false);

  const user=JSON.parse(localStorage.getItem('user'));
  
  useEffect(()=>{
    console.log(user)
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
})

const GetUserProfile = (tokenInfo) => {
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
      }
  }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false);
     window.location.reload()
  })

}

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 ">
      <img src="logo.png" alt="Logo" />
      <div>
         {
           user ?
           <div className='flex items-center gap-5'>
            <a href='/create-trip'>
             <Button variant="outline"
              className="rounded-full" >+Create Trip</Button>
              </a>
            
             <a href='/my-trips'>
             <Button variant="outline"
              className="rounded-full" >My Trip</Button>
              </a>
              <Popover>
              <PopoverTrigger>
              <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
                </PopoverContent>
            </Popover>

           </div>
           :
         

        <Button 
         onClick={()=>setOpenDialog(true)}
        className="bg-blue-500 text-white hover:bg-blue-600">
          Sign In
        </Button>

          }
          <Dialog open={openDialog}>

<DialogContent>
    <DialogHeader>
        <DialogDescription>
            <img src='/logo.png' />
            <h2 className='font-bold text-lg mt-7' >Sign With Google</h2>

            <p>Sign in to the App with Google authentication securely</p>

            <Button
                
                onClick={login}
                className="w-full mt-5 bg-black text-white flex gap-4 items-center">

                <FcGoogle className='h-7 w-7' /> Sign In With Google


            </Button>
        </DialogDescription>
    </DialogHeader>
</DialogContent>
</Dialog>

      </div>
    </div>
  );
}

export default Header;