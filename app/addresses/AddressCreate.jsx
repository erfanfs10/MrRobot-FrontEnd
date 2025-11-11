"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createAddress } from "./EditAddress";

const formSchema = z.object({
  title: z.string().min(3, "نام طولانی تری انتخاب کنید"),
  address: z.string().min(20, "نشانی طولانی تری انتخاب کنید"),
});

const AddressCreate = ({ setAddresses }) => {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
    },
  });

  async function onSubmit(data) {
    const { data: createdAddress, status } = await createAddress(
      data.title,
      data.address
    );

    if (status === 200) {
      setAddresses((prev) => [...prev, createdAddress]);
      toast.success("آدرس شما با موفقیعت ثبت شد");
      setOpenDialogCreate(false);
      form.reset();
    } else if (status === 400) {
      toast.error("شما مجاز به ثبت حداکثر ۵ آدرس هستید");
    } else {
      toast("با عرض پوزش لطفا دوباره امتحان کنید");
    }
  }

  return (
    <Dialog open={openDialogCreate} onOpenChange={setOpenDialogCreate}>
      <DialogTrigger asChild>
        <Button className="w-40 text-base lg:text-lg">ثبت آدرس جدید</Button>
      </DialogTrigger>
      <DialogContent dir="rtl">
        <DialogHeader className="sm:text-right">
          <DialogTitle>آدرس جدید خود را ثبت کنید</DialogTitle>
        </DialogHeader>

        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">آدرس</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="نام آدرس: خانه ,محل کار ..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-address">نشانی</FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-demo-address"
                    dir="rtl"
                    className="text-base lg:text-lg"
                    aria-invalid={fieldState.invalid}
                    placeholder="نشانی"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Button
          type="submit"
          form="form-rhf-demo"
          className="text-base lg:text-lg"
        >
          ثبت
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddressCreate;
