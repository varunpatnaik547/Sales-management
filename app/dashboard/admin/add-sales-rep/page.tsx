"use client";

import { useState } from "react";

export default function AddSalesRep() {

  const [form,setForm]=useState({
    employee_id:"",
    full_name:"",
    email:"",
    password:"",
    phone:"",
    home_city:"",
  });

  async function submit(){

    const res=await fetch("/api/admin/create-user",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    });

    const json=await res.json();

    if(json.error){
      alert(json.error);
      return;
    }

    alert("Sales Representative Created");

  }

  return(

<div className="space-y-4 max-w-lg">

<input
placeholder="Employee ID"
value={form.employee_id}
onChange={(e)=>setForm({...form,employee_id:e.target.value})}
/>

<input
placeholder="Full Name"
value={form.full_name}
onChange={(e)=>setForm({...form,full_name:e.target.value})}
/>

<input
placeholder="Email"
value={form.email}
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
placeholder="Password"
type="password"
value={form.password}
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<input
placeholder="Phone"
value={form.phone}
onChange={(e)=>setForm({...form,phone:e.target.value})}
/>

<input
placeholder="Home City"
value={form.home_city}
onChange={(e)=>setForm({...form,home_city:e.target.value})}
/>

<button
onClick={submit}
className="bg-indigo-600 text-white px-4 py-2 rounded"
>
Create Sales Representative
</button>

</div>

  );
}