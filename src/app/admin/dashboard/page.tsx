'use client'

import BaseCard from "@/components/base/Card";
import { Template } from "use-react-utilities";

export default function Page(){
  return(
   <BaseCard>
     <Template name="header">
       Hello, Admin!
     </Template>
     <Template>
       Welcome to the Admin Dashboard
     </Template>
   </BaseCard>
  )
}
