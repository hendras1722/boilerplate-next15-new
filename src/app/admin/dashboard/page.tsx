"use client";

import BaseButton from "@/components/base/Button";
import BaseCard from "@/components/base/Card";
import BaseInput from "@/components/base/Input";
import { Icon } from "@iconify/react";
import { Template } from "use-react-utilities";

export default function Page() {

  return (
    <BaseCard>
      <Template name="header">Hello, Admin!</Template>
      <BaseInput className="!text-md">
        <Template name="leading">
          Rp.
        </Template>
      </BaseInput>
      <BaseButton className="text-white">
        <Template name="trailing">
          <Icon icon="lucide:banana" />
        </Template>
        Helloworld
      </BaseButton>


    </BaseCard>
  );
}
