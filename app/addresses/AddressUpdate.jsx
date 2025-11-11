"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPencilAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateAddress } from "./EditAddress";

const formSchema = z.object({
  title: z.string().min(3, "نام طولانی تری انتخاب کنید"),
  address: z.string().min(20, "نشانی طولانی تری انتخاب کنید"),
});

const AddressUpdate = ({ addressData, setAddresses }) => {
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: addressData.title,
      address: addressData.address,
    },
  });

  async function onSubmit(values) {
    const { data: updated, status } = await updateAddress(
      addressData.id,
      values.title,
      values.address
    );
    if (status === 200) {
      // ✅ Update address in parent state
      setAddresses((prev) =>
        prev.map((item) => (item.id === addressData.id ? updated : item))
      );

      toast.success("✅ آدرس با موفقیت ویرایش شد");

      setOpenDialogUpdate(false);
    } else {
      toast.error("خطا در ویرایش آدرس");
    }
  }

  return (
    <Dialog open={openDialogUpdate} onOpenChange={setOpenDialogUpdate}>
      <DialogTrigger asChild>
        <Button>
          <p>ویرایش آدرس</p>
          <FaPencilAlt className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent dir="rtl">
        <DialogHeader className="sm:text-right">
          <DialogTitle>ویرایش آدرس</DialogTitle>
        </DialogHeader>

        <form
          id={`form-update-${addressData.id}`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-title">آدرس</FieldLabel>
                  <Input {...field} id="update-title" placeholder="نام آدرس" />
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
                  <FieldLabel htmlFor="update-address">نشانی</FieldLabel>
                  <Textarea
                    {...field}
                    id="update-address"
                    dir="rtl"
                    className="text-base lg:text-lg"
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
          form={`form-update-${addressData.id}`}
          className="text-base lg:text-lg"
        >
          ذخیره تغییرات
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddressUpdate;
